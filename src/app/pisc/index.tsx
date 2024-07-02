'use client';

import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';
import { FollowUpButton } from '@/components/FormInputs/FollowUpButton';
import { SubmitButton } from '@/components/FormInputs/SubmitButton';
import Fieldset from '@/components/FormStructure/Fieldset';
import FormContainer from '@/components/FormStructure/FormContainer';
import { Header } from '@/components/FormStructure/Header';
import Legend from '@/components/FormStructure/Legend';
import Section from '@/components/FormStructure/Section';
import Separator from '@/components/FormStructure/Separator';
import { useToast } from '@/components/ui/use-toast';
import { type UploadStatus, sendFilesv4 } from '@/lib/file/sendFilesv4';
import type { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import {
	renderComboboxField,
	renderField,
	renderMaskedField,
} from '@/lib/forms/generateFields';
import {
	piscActivity,
	piscApplicantFieldsArray,
	piscFiles,
	piscPrevious,
} from '@/lib/forms/pisc/fields';
import type { IPiscSchema } from '@/lib/forms/pisc/interfaces';
import { piscSchema } from '@/lib/forms/pisc/schema';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import {
	CAR_RECORD_MASKITO_OPTIONS,
	CEP_MASKITO_OPTIONS,
	CPF_CNPJ_MASKITO_OPTIONS,
	NUMBER_MASKITO_OPTIONS,
	PHONE_MASKITO_OPTIONS,
	RONDONIA_LATITUDE_MASKITO_OPTIONS,
	RONDONIA_LONGITUDE_MASKITO_OPTIONS,
} from '@/lib/maskito/masks';
import { onError } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import lodash, { get } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function PiscForm() {
	const {
		trigger,
		register,
		control,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<ICombinedSchema>({
		resolver: zodResolver(piscSchema, { errorMap: zodErrorMap }),
	});

	const { toast } = useToast();
	const sector: string = 'pisc';
	const route = useRouter();
	const [reqHash, setReqHash] = useState<string | null>(null);

	const watch_zipcode_applicant = watch(
		'applicant.personal_data.address.zipcode',
	);
	const watch_longitude = watch('activity.coordinates.longitude');
	const watch_latitude = watch('activity.coordinates.latitude');	
	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const curr_status = currState.slice();
		setStatus(curr_status);
	};

	const validarCep = useCallback(async () => {
		const section_name = 'applicant.personal_data';
		const cep_value = getValues(`${section_name}.address.zipcode`);

		if (cep_value && cep_value.length > 8) {
			try {
				const response = await fetch(`/api/cep?cep=${cep_value}`);
				if (response.ok) {
					setShowCepAlertApplicant(false);
					const data = await response.json();
					if (data) {
						setValue(`${section_name}.address.street`, data.logradouro);
						setValue(`${section_name}.address.city`, data.localidade);
						setValue(`${section_name}.address.state`, data.uf);
						setValue(`${section_name}.address.district`, data.bairro);
					}
				} else {
					setShowCepAlertApplicant(true);
					await response.json();
				}
			} catch (_error) {
				setShowCepAlertApplicant(true);
			}
		} else {
			return;
		}
	}, [getValues, setValue]);

	useEffect(() => {
		watch_zipcode_applicant && validarCep();
	}, [validarCep, watch_zipcode_applicant]);

	useEffect(() => {
		if (watch_latitude && watch_longitude) {
			if (watch_longitude.length == 13 && watch_latitude.length == 13) {
				trigger('activity.coordinates');
			}
		}
	}, [watch_longitude, watch_latitude, trigger]);

	const onSubmit = async (data: IPiscSchema) => {
		const data_clone: Partial<IPiscSchema> = structuredClone(data);
		

		const files: Record<string, File> = {
			proportional_fee_payment: data.pisc_files.proportional_fee_payment[0],
			personal_documents: data.pisc_files.personal_documents[0],
			newspaper_publication: data.pisc_files.newspaper_publication[0],
			city_hall_certificate: data.pisc_files.city_hall_certificate[0],
			preparation_schedule: data.pisc_files.preparation_schedule[0],
			site_plan: data.pisc_files.site_plan[0],
			technical_responsibility_note:
				data.pisc_files.technical_responsibility_note[0],
			outorga: data.pisc_files.outorga[0],
			licenses_issued: data.pisc_files.licenses_issued[0],
		};

		const form_data = {
			requirement: {
				activity: data_clone.pisc_activity,
				applicant: data.applicant,
				license_type: data.license_type,
			},
		};

		try {
			const response = await axios.post('/api/pisc', form_data);
			if (
				!reqHash ||
				(reqHash &&
					reqHash !== response.data?.hash &&
					response.data?.hash != null)
			)
				setReqHash(response.data.hash);

			const sendFiles = new sendFilesv4(
				response.data?.hash || reqHash,
				files,
				sector,
			);

			const promise = await sendFiles.sendFiles(updateUploadStatus);
			if (promise.rejected) {
				toast({
					title: 'Erro',
					variant: 'destructive',
					description: promise.message,
				});
			} else {
				toast({
					title: 'Sucesso',
					description: response.data.message,
				});
			}

			if (
				response.data.tracking_id &&
				form_data.requirement.applicant &&
				form_data.requirement.applicant.cpf_cnpj &&
				form_data.requirement.applicant.cpf_cnpj.length > 5
			) {
				lodash.delay(() => {
					route.push(
						`area-usuario?tracking_id=${response.data.tracking_id}&cpf_cnpj=${form_data.requirement.applicant?.cpf_cnpj}&service=${sector}`,
					);
				}, 1500);
			}
		} catch (error) {
			onError(error);
		}
	};

	return (
		<FormContainer>
			<Header>
				<Header.Title>
					Licenciamento Ambiental Simplificado de Piscicultura
				</Header.Title>
				<Header.Body>
					O usuário declara, sob as penalidades do art. 299 do Código Penal, que
					as informações fornecidas são fiéis e verdadeiras, sem omissões ou
					dados que possam induzir a equívocos de julgamento, assumindo total
					responsabilidade pelo conteúdo declarado.
				</Header.Body>
			</Header>
			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
				<br />
				<Fieldset id='previous'>
					<div className='col-span-2 mx-3 mb-3 grid justify-center text-center'>
						{renderField(
							piscPrevious[0],
							register,
							errors,
							'col-span-6 lg:col-span-6',
						)}
					</div>
				</Fieldset>
				<Fieldset id='requerente' className='pb-4'>
					<Legend>Requerente</Legend>
					<Section>
						{/* Nome */}
						{renderField(
							piscApplicantFieldsArray[0],
							register,
							errors,
							'col-span-12 lg:col-span-8',
						)}
						{/* CPF/CNPJ */}
						{renderMaskedField(
							piscApplicantFieldsArray[1],
							CPF_CNPJ_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-6 lg:col-span-4',
						)}
						{/* Dados pessoais - Endereço - CEP */}
						<div className='col-span-6 lg:col-span-3'>
							{renderMaskedField(
								piscApplicantFieldsArray[2],
								CEP_MASKITO_OPTIONS,
								control,
								errors,
							)}
							{showCepAlertApplicant && (
								<div className='mb-6 max-md:mb-10 max-sm:mb-14'>
									<p className='absolute mx-0.5 text-xs text-info text-opacity-80'>
										CEP informado não encontrado, por favor continue preenchendo
										seus dados.
									</p>
								</div>
							)}
						</div>
						{/* Dados pessoais - Endereço - Logradouro */}
						{renderField(
							piscApplicantFieldsArray[3],
							register,
							errors,
							'col-span-6 md:col-span-18 lg:col-span-9',
						)}
						{/* Dados pessoais - Endereço - Número */}
						{renderMaskedField(
							piscApplicantFieldsArray[4],
							NUMBER_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-3 lg:col-span-2',
						)}
						{/* Dados pessoais - Endereço - Bairro */}
						{renderField(
							piscApplicantFieldsArray[6],
							register,
							errors,
							'col-span-6 lg:col-span-5',
						)}
						{/* Dados pessoais - Endereço - Cidade */}
						{renderField(
							piscApplicantFieldsArray[7],
							register,
							errors,
							'col-span-6 lg:col-span-5',
						)}
						{/* Dados pessoais - Endereço - Estado */}
						{renderComboboxField(
							piscApplicantFieldsArray[8],
							control,
							errors,
							setValue,
							'col-span-3 lg:col-span-2',
							watch('applicant.personal_data.address.state'),
						)}
						{/* Dados pessoais - Endereço - Complemento */}
						{renderField(
							piscApplicantFieldsArray[5],
							register,
							errors,
							'col-span-12 lg:col-span-10',
						)}
						{/* Dados pessoais - Telefone */}
						{renderMaskedField(
							piscApplicantFieldsArray[9],
							PHONE_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-6 md:col-span-12 lg:col-span-12',
						)}
						{/* Dados pessoais - Email */}
						{renderField(
							piscApplicantFieldsArray[10],
							register,
							errors,
							'col-span-6 md:col-span-12 lg:col-span-12',
						)}
					</Section>
				</Fieldset>

				<Fieldset id='atividade' className='pb-4'>
					<Legend>Atividade</Legend>
					<Section>
						{renderField(
							piscActivity[0],
							register,
							errors,
							'col-span-12 md:col-span-8',
						)}
						{renderMaskedField(
							piscActivity[1],
							RONDONIA_LATITUDE_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-12 md:col-span-8',
						)}
						{renderMaskedField(
							piscActivity[2],
							RONDONIA_LONGITUDE_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-12 md:col-span-8',
						)}
						<ErrorMessage
							errors={errors}
							name={'pisc_activity.coordinates'}
							render={({ message }) => (
								<span className='label-text-alt col-span-2 mx-3 my-2 block justify-center text-center text-error max-sm:mb-6 lg:mt-[-10px]'>
									{message}
									{get(errors, [
										'pisc_activity',
										'coordinates',
										'root',
										'message',
									])}
								</span>
							)}
						/>
						{renderField(
							piscActivity[3],
							register,
							errors,
							'col-span-12 md:col-span-12',
						)}
						{renderMaskedField(
							piscActivity[4],
							CAR_RECORD_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-12 md:col-span-12',
						)}
						<div className='col-span-12 md:col-span-24'>
							<textarea
								className='w-full rounded-none border border-beige-300 bg-beige-200 px-2 py-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400'
								rows={4}
								maxLength={1250}
								placeholder='Insira sua observação aqui'
								{...register('pisc_activity.observations')}
							/>
						</div>
					</Section>
				</Fieldset>

				<Fieldset id='files'>
					<Legend>Anexos</Legend>
					<Section>
						{renderField(
							piscFiles[0],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[1],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[2],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[3],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[4],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[5],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[6],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[7],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							piscFiles[8],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
					</Section>
				</Fieldset>
				<Separator sizing='xs' className='mb-6' />
				<SubmitButton.Wrapper>
					<SubmitButton>Enviar</SubmitButton>
					<FollowUpButton>
						<Link href={'/area-usuario?service=pisc'}>
							Acompanhar solicitação
						</Link>
					</FollowUpButton>
				</SubmitButton.Wrapper>
			</form>

			
			<UploadProgressv2 statusList={status} />
		</FormContainer>
	);
}
