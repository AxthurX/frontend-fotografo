'use client';

import { TrackingContext } from '@/components/AreaUsuario/TrackingContext';
import DataNotFound from '@/components/DataNotFound';
import UploadProgress from '@/components/FileProgress/fileprogress';
import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';

import { Header } from '@/components/FormStructure/Header';
import Legend from '@/components/FormStructure/Legend';
import Skeleton from '@/components/Skeleton';
import { toast } from '@/components/ui/use-toast';
import { asyncSendFileWS, type sendStatus } from '@/lib/file/sendFiles';
import { sendFilesv4, type UploadStatus } from '@/lib/file/sendFilesv4';
import { allFiles } from '@/lib/forms/allFIles';
import { listStatus } from '@/lib/forms/area-usuario/listOfStatus';
import {
	ASF_FILES,
	ATI_FILES,
	AUF_FILES,
	CASC_FILES,
	DEAF_FILES,
	DLA_FILES,
	DOF_FILES,
	LPCA_FILES,
	PISC_FILES,
	default_files,
} from '@/lib/forms/area-usuario/schema';

import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import { formatCpfCnpj } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns/format';
import { delay } from 'lodash';
import { useRouter } from 'next/navigation';
import {
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useForm } from 'react-hook-form';

export default function Dados() {
	const { tracking_id, cpf_cnpj, service } = useContext(TrackingContext);
	const router = useRouter();

	/* TRANSFORMA OS STATES UTILIZADOS PARA EXIBIÇÃO */
	const [name, setName] = useState<string>();
	const [createdAt, setCreatedAt] = useState<string>();
	const [hash, setHash] = useState<string>();
	const [idStatus, setIdStatus] = useState<number>();
	const [cpfCnpj, setCpfCnpj] = useState<string>();
	const [feedback, setFeedback] = useState<string>();
	const [pendingFiles, setPendingFiles] = useState<string[]>();
	const [showDataNotFound, setShowDataNotFound] = useState<boolean>(false);
	const [showLabelInputFiles, setShowLabelInputFiles] = useState<
		string[] | ReactNode[]
	>([]);
	const [shapefiles, setShapefiles] = useState<{
		filename: string;
		created_at: string;
	}>();
	const [loading, setLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<Array<sendStatus>>([]);
	const [statusv2, setStatusv2] = useState<Array<UploadStatus>>([]);

	const updateUploadStatus = (currState: Array<sendStatus>) => {
		const curr_status = currState.slice();
		setStatus(curr_status);
		const currStatus = currState.slice();
		setStatus(currStatus);
	};

	const updateUploadStatusv2 = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatusv2(currStatus);
	};

	const searchByForm = useCallback(
		(files_find: string[], service_find: string) => {
			const new_put_label_input_files = files_find.map((files) => {
				const position = findItemPosition(
					allFiles[`${service_find}_files`],
					files,
				);
				if (position !== -1) {
					return allFiles[`${service_find}_files`][position].label;
				} else {
					return 'Erro ao localizar o campo informado.';
				}
			});

			setShowLabelInputFiles((prev_state) => [
				...prev_state,
				...new_put_label_input_files,
			]);
		},
		[],
	);

	const findDataProtocol = useCallback(
		async (cpf_cnpj: string, tracking_id: string, service: string) => {
			try {
				const response = await axios.get('/api/tracking', {
					params: {
						cpf_cnpj: cpf_cnpj,
						tracking_id: tracking_id,
						service: service,
					},
				});

				const data = response.data.data;

				if (data) {
					if (data.requirement && 'requirement_hash' in data.requirement) {
						setHash(data.requirement.requirement_hash);
					}

					if (data.requirement.applicant) {
						setName(data.requirement.applicant.name);
					} else {
						setName(data.requirement.legal_representative.name);
					}

					setIdStatus(data.requirement.status);

					if (cpf_cnpj) {
						setCpfCnpj(formatCpfCnpj(cpf_cnpj));
					}

					if (data?.feedback?.created_at) {
						setCreatedAt(format(data.feedback.created_at, 'dd/MM/yyyy HH:mm'));
					}

					setFeedback(data.feedback?.reason);
					setPendingFiles(data.feedback?.active_pending_list);

					if (data.feedback?.active_pending_list) {
						if (service)
							searchByForm(data.feedback.active_pending_list, service);
					}

					if (
						(service === 'auf' || service === 'lpca') &&
						data.files?.shapefiles
					) {
						setShapefiles(data.files?.shapefiles);
					}
				}
			} catch (_e) {
				setShowDataNotFound(true);
				setHash(undefined);
				setName(undefined);
				setIdStatus(undefined);
				setCpfCnpj(undefined);
				setCreatedAt(undefined);
				setFeedback(undefined);
				setPendingFiles(undefined);
			}
		},
		[searchByForm],
	);

	useEffect(() => {
		if (tracking_id && cpf_cnpj && service) {
			if (
				typeof cpf_cnpj === 'string' &&
				typeof tracking_id === 'string' &&
				typeof service === 'string'
			) {
				findDataProtocol(cpf_cnpj, tracking_id, service);
			}
		} else {
			setTimeout(() => {
				setShowDataNotFound(true);
			}, 2000);
		}
	}, [service, tracking_id, cpf_cnpj, findDataProtocol]);

	const findItemPosition = (
		array: Array<{ fieldId: string }>,
		item_find: string,
	) => {
		const position = array.findIndex((field: { fieldId: string }) =>
			field.fieldId.includes(item_find),
		);
		return position;
	};

	const onSubmit = async (data: Record<string, FileList>) => {
		try {
			console.log(data);
			if (
				pendingFiles &&
				typeof service == 'string' &&
				hash &&
				Object.keys(data).length > 0
			) {
				setStatus([]);
				const selected_files: Record<string, File> = {};
				for (const [key, value] of Object.entries(data)) {
					selected_files[key] = value[0];
				}

				
				let promise: {rejected: boolean, message: string};
				if (
					[
						'auf',
						'dof',
						'lpca',
						'dla',
						'casc',
						'ati',
						'deaf',
						'asf',
						'pisc',
					].includes(service)
				) {
					const sendFiles = new sendFilesv4(hash, selected_files, service);
					promise = await sendFiles.sendFiles(updateUploadStatusv2);
				} else {
					const wsFile = new asyncSendFileWS(selected_files, {}, service, hash);
					promise = await wsFile.sendFiles(updateUploadStatus);
				}
				if (promise.rejected == true) {
					toast({
						title: 'Erro',
						variant: 'destructive',

						description: promise.message,
					});
				} else {
					toast({
						title: 'Sucesso',
						variant: 'default',
						description: 'Arquivos enviados com sucesso.',
					});
					delay(() => location.reload(), 2000);
				}
			} else throw new Error('Nenhum arquivo foi selecionado.');
		} catch (err) {
			console.log(err);
			const error: { message: string } = { message: '' };
			if (err instanceof AxiosError) {
				if (err.response)
					if (err.response.data.err) error.message = err?.response.data.err;
					else error.message = 'Serviço indisponível.';
			} else error.message = 'Erro. Tente novamente mais tarde.';
			toast({
				title: 'Erro',
				variant: 'destructive',
				description: error.message,
			});
		}
	};

	const handleDownloadButtonClick = async () => {
		setLoading(true);
		const query = `?cpf_cnpj=${cpf_cnpj}&tracking_id=${tracking_id}&service=${service}`;
		try {
			const response = await axios.get(`/api/pdf/${service}/${query}`, {
				timeout: 1000 * 60,
				withCredentials: true,
				responseType: 'blob',
			});
			const url = URL.createObjectURL(new Blob([response.data]));
			const a = document.createElement('a');
			a.href = url;
			a.download = `certidao-${tracking_id}.pdf`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (err) {
			const error: { message: string } = { message: '' };
			if (err instanceof AxiosError) {
				if (err.response?.data) {
					if (err.status == 408)
						error.message = 'Tempo limite excedido, Tente novamente.';
					else if (err.code == 'ECONNREFUSED')
						error.message = 'Erro ao conectar ao serviço, tente novamente.';
					else {
						try {
							error.message = `${JSON.parse(await err.response.data.text()).message}`;
						} catch (_err) {
							error.message = 'Erro. Tente novamente mais tarde.';
						}
					}
				}
			} else error.message = 'Erro. Tente novamente mais tarde.';
			toast({
				title: 'Erro',
				variant: 'destructive',
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	const arrayToObject = (array: string[]) => {
		return array.reduce(
			(acc, curr) => {
				acc[curr] = true;
				return acc;
			},
			{} as { [key: string]: true | undefined },
		);
	};

	const getSchemaForSector = (sector: string, fields?: string[]) => {
		switch (sector) {
			case 'dla':
				return fields ? DLA_FILES.pick(arrayToObject(fields)) : DLA_FILES;
			case 'auf':
				return fields ? AUF_FILES.pick(arrayToObject(fields)) : AUF_FILES;
			case 'lpca':
				return fields ? LPCA_FILES.pick(arrayToObject(fields)) : LPCA_FILES;
			case 'dof':
				return fields ? DOF_FILES.pick(arrayToObject(fields)) : DOF_FILES;
			case 'ati':
				return fields ? ATI_FILES.pick(arrayToObject(fields)) : ATI_FILES;
			case 'casc':
				return fields ? CASC_FILES.pick(arrayToObject(fields)) : CASC_FILES;
			case 'pisc':
				return fields ? PISC_FILES.pick(arrayToObject(fields)) : PISC_FILES;
			case 'deaf':
				return fields ? DEAF_FILES.pick(arrayToObject(fields)) : DEAF_FILES;
			case 'asf':
				return fields ? ASF_FILES.pick(arrayToObject(fields)) : ASF_FILES;

			default:
				return default_files;
		}
	};

	const {
		register: registerFiles,
		handleSubmit: handleSubmitFiles,
		formState: { errors: errorsFiles },
	} = useForm<Record<string, FileList>>({
		resolver: zodResolver(getSchemaForSector(service, pendingFiles), {
			errorMap: zodErrorMap,
		}),
	});

	if (tracking_id === '' || cpf_cnpj === '' || service === '') {
		return null;
	} else
		return (
			<>
				<>
					{name && idStatus != undefined ? (
						<>
							<Legend className='!border-b border-sage-200'>
								Dados da solicitação
							</Legend>
							<Header.Body className='rounded border border-sage-100 bg-beige-50 p-4'>
								<div className='p-2'>
									<span className='text-base max-sm:mb-2'>Protocolo </span>
									<p className='text-2xl text-coffee-950'>{tracking_id}</p>
								</div>
								<div className='p-2'>
									<span className='text-base max-sm:mb-2'>
										Nome do requerente{' '}
									</span>
									<p className='text-2xl text-coffee-950'>{name}</p>
								</div>
								<div className='p-2'>
									<span className='text-base max-sm:mb-2'>
										CPF/CNPJ do requerente{' '}
									</span>
									<p className='text-2xl text-coffee-950'>{cpfCnpj}</p>
								</div>
								<div className='p-2'>
									<span className='text-base max-sm:mb-2'>
										Status da solicitação{' '}
									</span>
									<p className='text-2xl text-coffee-950'>
										{listStatus[idStatus]?.status}
									</p>
								</div>
								{}

								{feedback && idStatus != 3 && (
									<>
										<div className='p-2'>
											<span className='text-base max-sm:mb-2'>
												Resposta à solicitação <br />
											</span>
											<p
												className='text-2xl text-coffee-950'
												// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
												dangerouslySetInnerHTML={{ __html: feedback }}
											/>
										</div>
									</>
								)}
								{createdAt && (
									<div className='p-2'>
										<span className='text-base max-sm:mb-2'>
											Data de resposta da solicitação
										</span>
										<p className='text-2xl text-coffee-950'>{createdAt}</p>
									</div>
								)}
								{pendingFiles &&
								pendingFiles.length > 0 &&
								(idStatus == 2 || idStatus == 0) ? (
									<>
										<div className='p-2'>
											<span>Arquivos a serem reenviados: </span>
											<form onSubmit={handleSubmitFiles(onSubmit)}>
												{pendingFiles.map((file_name, index) => (
													<>
														<div className='mb-4 flex flex-col' key={file_name}>
															<label
																htmlFor={file_name}
																className='label font-medium text-black'
															>
																{showLabelInputFiles[index]}
															</label>
															<input
																{...registerFiles(`${file_name}`)}
																type='file'
																id={`${file_name}`}
																className='file-input file-input-bordered h-10 w-full rounded-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300'
																accept='.pdf, .zip'
															/>
															{errorsFiles && (
																<ErrorMessage
																	errors={errorsFiles}
																	name={`${file_name}`}
																	render={({ message }) => (
																		<span className='my-1 text-xs text-error'>
																			{message}
																		</span>
																	)}
																/>
															)}
														</div>
													</>
												))}
												<div className='flex gap-3'>
													<button
														type='submit'
														className='btn btn-primary my-3 w-24 px-5'
													>
														Enviar
													</button>
													<button
														type='button'
														className='btn btn-secondary my-3 w-24 px-5'
														onClick={() => {
															router.push('/');
														}}
													>
														Voltar
													</button>
												</div>
											</form>
										</div>
										
									</>
								) : null}
								{(idStatus === 3 || idStatus === 6) && (
									<button
										onClick={handleDownloadButtonClick}
										type='button'
										disabled={loading}
										className='btn btn-primary mx-auto my-3 flex w-48'
									>
										{loading == true ? (
											<div className='flex'>
												<div className='loading loading-spinner ' />
												Aguarde...
											</div>
										) : (
											'Baixar documento '
										)}
									</button>
								)}
								{shapefiles && (
									<a
										href={`/api/download/${service}?created_at=${shapefiles.created_at}&filename=${shapefiles.filename}`}
										className='btn btn-secondary mx-auto my-3 flex w-48'
									>
										Baixar Shapefiles
									</a>
								)}
							</Header.Body>
						</>
					) : (
						<>
							{tracking_id || cpf_cnpj || service ? (
								<>
									{showDataNotFound ? (
										<>
											<Legend>Dados da solicitação</Legend>
											<DataNotFound />
										</>
									) : (
										<>
											<Legend>Dados da solicitação</Legend>
											<Skeleton />
										</>
									)}
								</>
							) : (
								<></>
							)}
						</>
					)}
				</>
				<UploadProgress statusList={status} />
				<UploadProgressv2 statusList={statusv2} />
			</>
		);
}
