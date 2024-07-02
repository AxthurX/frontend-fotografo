import axios, { AxiosError, type AxiosProgressEvent } from 'axios';
import { throwSendFileError } from './sendfile-error';

interface FileHeader {
	mimetype: string;
	filename: string;
	fieldname: string;
	size: number;
}

export interface UploadStatus extends FileHeader {
	progress: number;
	sending: boolean;
	status: string;
}

/**
 * Asynchronously sends files.
 *
 * @param {Record<string, File> | Array<File>} files - Files to be sent
 * @param {boolean} random_id - Optional parameter for contacting random string into filename
 */

export class sendFilesv4 {
	private file_header_arr: UploadStatus[] = [];
	private sector: string | undefined;
	private unique_id: string;
	private files: Array<File> = [];
	constructor(
		id: string,
		files: Record<string, File> | Array<File>,
		sector?: string,
	) {
		this.sector = sector;
		this.unique_id = id;
		if (Array.isArray(files)) {
			for (const file of files) {
				if (!file) continue;

				this.files.push(file);
				this.file_header_arr.push({
					progress: 0,
					sending: false,
					status: 'Em espera',
					mimetype: file.type,
					filename: file.name,
					fieldname: `${file.name.slice(0, file.name.lastIndexOf('.'))}`,
					size: file.size,
				});
			}
		} else {
			for (const [key, file] of Object.entries(files)) {
				if (!file) continue;
				this.files.push(file);
				this.file_header_arr.push({
					progress: 0,
					sending: false,
					status: 'Em espera',
					mimetype: file.type,
					filename: file.name,
					fieldname: `${key}`,
					size: file.size,
				});
			}
		}
	}

	async sendFiles(updateUploadStatus: (files: Array<UploadStatus>) => void) {
		const promises = [];
		try {
			await axios.post(`/api/queue/${this.sector}`, {
				id: this.unique_id,
				files: this.file_header_arr,
			});

			for (const [idx] of this.file_header_arr.entries()) {
				promises.push(this.asyncFileSend(idx, updateUploadStatus));
			}
			return Promise.all(promises)
				.then(async (results) => {
					console.log('Todas as promessas foram resolvidas:', results);
					return { rejected: false, message: ':D' };
				})
				.catch((errors) => {
					console.error('Pelo menos uma promessa foi rejeitada:', errors);

					return { rejected: true, message: errors };
				});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				if (error?.response?.data?.message)
					throwSendFileError(error?.response?.data?.message, 500);
			}
			throwSendFileError('Serviço indisponivel', 500);
		}
	}

	trackProgress(
		file_id: number,
		progressEvent: AxiosProgressEvent,
		updateUploadStatus: (files: Array<UploadStatus>) => void,
	) {
		console.log(progressEvent);
		if (progressEvent.total) {
			this.file_header_arr[file_id].progress =
				(progressEvent.loaded * 100) / progressEvent.total;
			this.file_header_arr[file_id].sending = true;
			this.file_header_arr[file_id].status = 'Enviando...';
			updateUploadStatus(this.file_header_arr);
		}
	}

	async operator(
		file_id: number,
		updateUploadStatus: (files: Array<UploadStatus>) => void,
		main_resolve: (value: string) => void,
		main_reject: (value: string) => void,
	) {
		let tries = 1;
		while (tries < 6) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			const controller = new AbortController();

			const file = this.files[file_id];
			const file_header = this.file_header_arr[file_id];
			const source = axios.CancelToken.source();
			const form = new FormData();
			form.append(`${file_header.fieldname}`, file);

			try {
				await axios
					.post(`/api/${this.sector}/sendfile/${this.unique_id}`, form, {
						timeout: 1000 * 60 * 20,
						cancelToken: source.token,
						onUploadProgress: (progressEvent) =>
							this.trackProgress(file_id, progressEvent, updateUploadStatus),
					})
					.then(() => {
						this.file_header_arr[file_id].sending = true;
						this.file_header_arr[file_id].status = 'Enviando com sucesso.';
						updateUploadStatus(this.file_header_arr);
					});

				main_resolve('Enviando com sucesso');
				tries = 99;
				break;
			} catch (error) {
				console.log(error);
				this.file_header_arr[file_id].sending = false;
				this.file_header_arr[file_id].progress = 0;
				controller.abort();
				if (error instanceof AxiosError) {
					if (
						error.request.status &&
						error.request.status !== 412 &&
						error.request.status !== 409
					) {
						this.file_header_arr[file_id].status =
							`Erro ao enviar, Tentando Novamente. ${tries}/5`;

						await new Promise((resolve) => setTimeout(resolve, 4000));
						tries += 1;
					}
					if (error.request.status && error.request.status === 412) {
						this.file_header_arr[file_id].status = 'Alto trafego, aguarde.';
						updateUploadStatus(this.file_header_arr);
						await new Promise((resolve) => setTimeout(resolve, 4000));
					}

					if (error.request.status && error.request.status === 409) {
						this.file_header_arr[file_id].status = 'Arquivo Já foi enviado.';
						updateUploadStatus(this.file_header_arr);
						tries = 99;
						break;
					}

					if (axios.isCancel(error)) {
						console.log('Upload cancelado');
						// Atualiza o status em caso de cancelamento
						this.file_header_arr[file_id].sending = false;
						this.file_header_arr[file_id].status = 'Cancelado';
						updateUploadStatus(this.file_header_arr);
						tries = 99;
						break; // Sai do loop se o upload for cancelado
					}
				} else {
					main_reject('Falha ao enviar.');
					break;
				}
			}
		}
		main_reject('Serviço indisponivel.');
	}
	async asyncFileSend(
		file_id: number,
		updateUploadStatus: (files: Array<UploadStatus>) => void,
	) {
		return new Promise((resolve, reject) => {
			this.operator(file_id, updateUploadStatus, resolve, reject);
		});
	}
}
