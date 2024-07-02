'use client';

import AlertComponent from '@/components/Alert';
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
import {
	activityFieldsArray,
	applicantFieldsArray,
	cascFiles,
	checkboxFieldsArray,
	legalRepresentativeFieldsArray,
	surveyFieldsArray,
} from '@/lib/forms/casc/fields';
import type { ICascSchema } from '@/lib/forms/casc/interfaces';
import { cascSchema } from '@/lib/forms/casc/schema';
import type { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import {
	renderComboboxField,
	renderField,
	renderMaskedField,
} from '@/lib/forms/generateFields';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import {
	CAR_RECORD_MASKITO_OPTIONS,
	CEP_MASKITO_OPTIONS,
	CPF_CNPJ_MASKITO_OPTIONS,
	NUMBER_MASKITO_OPTIONS,
	PHONE_MASKITO_OPTIONS,
	RG_MASKITO_OPTIONS,
	RONDONIA_LATITUDE_MASKITO_OPTIONS,
	RONDONIA_LONGITUDE_MASKITO_OPTIONS,
} from '@/lib/maskito/masks';
import { onError } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import lodash from 'lodash';
import get from 'lodash/get';
// import dynamic from "next/dynamic";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function CascForm() {
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
		resolver: zodResolver(cascSchema, { errorMap: zodErrorMap }),
	});

	const watchLongitude = watch('activity.coordinates.longitude');
	const watchLatitude = watch('activity.coordinates.latitude');
	const route = useRouter();
	useEffect(() => {
		if (watchLatitude && watchLongitude) {
			if (watchLongitude.length == 13 && watchLatitude.length == 13) {
				trigger('activity.coordinates');
			}
		}
	}, [watchLongitude, watchLatitude, trigger]);

	const { toast } = useToast();
	const [reqHash, setReqHash] = useState<string | null>(null);
	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const sector: string = 'casc';

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatus(currStatus);
		console.log(status);
	};

	const onSubmit = async (data: ICascSchema) => {
		const dataClone: Partial<ICascSchema> = structuredClone(data);
		delete dataClone?.property_ownership_proof;
		delete dataClone?.shapefile_folder;
		delete dataClone?.anm_title;
		const formData = {
			requirement: {
				...dataClone,
			},
			files: {},
		};

		const files: Record<string, File> = {
			property_ownership_proof: data.property_ownership_proof[0],
			shapefile_folder: data.shapefile_folder[0],
			anm_title: data.anm_title[0],
		};

		formData.files = files;
		try {
			const response = await axios.post('/api/casc', formData);

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
				formData.requirement.applicant?.cpf_cnpj &&
				formData.requirement.applicant?.cpf_cnpj.length > 5
			) {
				lodash.delay(() => {
					route.push(
						`area-usuario?tracking_id=${response.data.tracking_id}&cpf_cnpj=${formData.requirement.applicant?.cpf_cnpj}&service=${sector}`,
					);
				}, 1500);
			}
		} catch (err) {
			onError(err);
		}
	};

	const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
	const [showCepAlertActivity, setShowCepAlertActivity] = useState(false);

	const handleCepApiMessage = useCallback((section: string, state: boolean) => {
		if (section === 'applicant') {
			setShowCepAlertApplicant(state);
		} else if (section === 'activity') {
			setShowCepAlertActivity(state);
		} else return;
	}, []);

	const validarCep = useCallback(
		async (section: string) => {
			let sectionName: 'applicant.personal_data' | 'activity';
			switch (section) {
				case 'applicant':
					sectionName = 'applicant.personal_data';
					break;
				case 'activity':
					sectionName = 'activity';
					break;
				default:
					return;
			}

			const cepValue = getValues(`${sectionName}.address.zipcode`);
			if (cepValue && cepValue.length > 8) {
				try {
					const response = await fetch(`/api/cep?cep=${cepValue}`);
					if (response.ok) {
						handleCepApiMessage(section, false);
						const data = await response.json();
						setValue(`${sectionName}.address.street`, data?.logradouro);
						setValue(`${sectionName}.address.city`, data?.localidade);
						setValue(`${sectionName}.address.state`, data?.uf);
						setValue(`${sectionName}.address.district`, data?.bairro);
					} else {
						handleCepApiMessage(section, true);
					}
				} catch (_error) {
					handleCepApiMessage(section, true);
				}
			} else {
				return;
			}
		},
		[getValues, setValue, handleCepApiMessage],
	);

	const watchZipcodeApplicant = watch(
		'applicant.personal_data.address.zipcode',
	);
	const watchZipcodeActivity = watch('activity.address.zipcode');

	useEffect(() => {
		validarCep('applicant');
	}, [validarCep, watchZipcodeApplicant]);

	useEffect(() => {
		validarCep('activity');
	}, [validarCep, watchZipcodeActivity]);

	const surveyValues = watch([
		'survey.public_administration_extraction',
		'survey.in_operation',
		'survey.consepa_01_2019',
		'survey.commercial_use',
		'survey.legal_reserve_or_restricted_use_interference',
		'survey.protected_areas_interference',
		'survey.water_body_interference',
		'survey.indigenous_land_interference',
		'survey.safeguarded_assets_interference',
		'survey.depth_over_3m',
	]);

	const surveyCriteriaFailed = () => {
		if (surveyValues.some((value) => value === null || value === undefined)) {
			return false;
		} else if (
			surveyValues.toString() !== 'Sim,Não,Não,Não,Não,Não,Não,Não,Não,Não'
		) {
			return true;
		} else return false;
	};

	return (
		<FormContainer>
			<Header>
				<Header.Title>
					Dispensa de Licenciamento Ambiental para Extração de Cascalho
				</Header.Title>
				<Header.Body>
					O usuário declara, sob as penalidades do art. 299 do Código Penal, que
					as informações fornecidas são fiéis e verdadeiras, sem omissões ou
					dados que possam induzir a equívocos de julgamento, assumindo total
					responsabilidade pelo conteúdo declarado.
					<br />
					<br />
					Órgãos Públicos e Agroindustria Familiar devem obrigatoriamente
					inserir o Nº da Declaração de Isenção de Pagamento de Taxas, emitida
					no site da Sedam através do link{' '}
					<a
						href='http://www.sedam.ro.gov.br/declaracao'
						className='link-hover link'
					>
						http://www.sedam.ro.gov.br/declaracao
					</a>{' '}
					de acordo com a Legislação Art. 37 da Lei Nº 3.686 de 08 de dezembro
					de 2015. No Lugar do Comprovante de pagamento, carregar a Declaração.
					<br />
					<br />O Prazo de Homologação da Certidão de Dispensa de Licenciamento
					Ambiental é de 72 horas em dias úteis.
				</Header.Body>
			</Header>
			{/* TODO 
      - save form values on page refresh (state store?)
      - look into react-hook-form's FormProvider to shave off the register={register} from literally all inputs
      */}
			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
				<Fieldset>
					<Legend className='text-center'>Questionário</Legend>
					<Section>
						{renderField(
							surveyFieldsArray[0],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[1],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[2],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[3],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[4],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[5],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[6],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[7],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[8],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[9],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
					</Section>
				</Fieldset>
				{surveyCriteriaFailed() && (
					<div className='m-3 w-fit self-center px-5 py-10 ' role='alert'>
						<AlertComponent
							color='error'
							title='Atenção'
							label='Seu empreendimento ou atividade não se adequa à solicitação de dispensa. Procure a Secretaria para abertura de processo físico de licenciamento.'
							disableCloseBttn
						/>
					</div>
				)}
				<div className={surveyCriteriaFailed() ? 'hidden' : ''}>
					<Fieldset id='identificacaoDoRequerente' className='pb-4'>
						<Legend>Identificação do requerente</Legend>
						<Section>
							{/* Nome */}
							{renderField(
								applicantFieldsArray[0],
								register,
								errors,
								'col-span-12 lg:col-span-8',
							)}
							{/* CPF/CNPJ */}
							{renderMaskedField(
								applicantFieldsArray[1],
								CPF_CNPJ_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-12 lg:col-span-4',
							)}
							{/* Responsável legal - Nome */}
							{renderField(
								legalRepresentativeFieldsArray[0],
								register,
								errors,
								'col-span-12 lg:col-span-6',
							)}
							{/* Responsável legal - CPF */}
							{renderMaskedField(
								legalRepresentativeFieldsArray[1],
								CPF_CNPJ_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 lg:col-span-3',
							)}
							{/* Responsável legal - RG */}
							{renderMaskedField(
								legalRepresentativeFieldsArray[2],
								RG_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 lg:col-span-3',
							)}
							{/* Dados pessoais - Endereço - CEP */}
							<div className='col-span-12 md:col-span-5 lg:col-span-4'>
								{renderMaskedField(
									applicantFieldsArray[2],
									CEP_MASKITO_OPTIONS,
									control,
									errors,
								)}
								{showCepAlertApplicant && (
									<div className='mb-6 max-md:mb-10 max-sm:mb-14'>
										<p className='absolute mx-0.5 text-xs text-info text-opacity-80'>
											CEP informado não encontrado, por favor continue
											preenchendo seus dados.
										</p>
									</div>
								)}
							</div>
							{/* Dados pessoais - Endereço - Endereço */}
							{renderField(
								applicantFieldsArray[3],
								register,
								errors,
								'col-span-9 md:col-span-16 lg:col-span-9',
							)}
							{/* Dados pessoais - Endereço - Número */}
							{renderMaskedField(
								applicantFieldsArray[4],
								NUMBER_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-3 lg:col-span-2',
							)}
							{/* Dados pessoais - Endereço - Complemento */}
							{renderField(
								applicantFieldsArray[5],
								register,
								errors,
								'col-span-12 lg:col-span-9',
							)}
							{/* Dados pessoais - Endereço - Bairro */}
							{renderField(
								applicantFieldsArray[6],
								register,
								errors,
								'col-span-6 lg:col-span-5',
							)}
							{/* Dados pessoais - Endereço - Cidade */}
							{renderField(
								applicantFieldsArray[7],
								register,
								errors,
								'col-span-6 lg:col-span-5',
							)}
							{/* Dados pessoais - Endereço - Estado */}
							{renderComboboxField(
								applicantFieldsArray[8],
								control,
								errors,
								setValue,
								'col-span-3 lg:col-span-2',
								watch('applicant.personal_data.address.state'),
							)}
							{/* Dados pessoais - Telefone */}
							{renderMaskedField(
								applicantFieldsArray[9],
								PHONE_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-9 lg:col-span-4',
							)}
							{/* Dados pessoais - Email */}
							{renderField(
								applicantFieldsArray[10],
								register,
								errors,
								'col-span-12 lg:col-span-8',
							)}
						</Section>
					</Fieldset>
					<Fieldset className='pb-4'>
						<Legend>Caracterização da atividade</Legend>
						<Section>
							{/* Localização */}
							{renderField(
								activityFieldsArray[1],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{/* Tipo de atividade */}
							{renderComboboxField(
								activityFieldsArray[0],
								control,
								errors,
								setValue,
								'col-span-12 md:col-span-24',
							)}
							{/* Endereço - CEP */}
							<div className='col-span-4 md:col-span-4 lg:col-span-3'>
								{renderMaskedField(
									activityFieldsArray[2],
									CEP_MASKITO_OPTIONS,
									control,
									errors,
								)}
								{showCepAlertActivity && (
									<div className='mb-6 max-md:mb-10 max-sm:mb-14'>
										<p className='absolute mx-0.5 text-xs text-info text-opacity-80'>
											CEP informado não encontrado, por favor continue
											preenchendo seus dados.
										</p>
									</div>
								)}
							</div>
							{/* Endereço - Logradouro */}
							{renderField(
								activityFieldsArray[3],
								register,
								errors,
								'col-span-8 md:col-span-17 lg:col-span-9',
							)}
							{/* Endereço - Número */}
							{renderMaskedField(
								activityFieldsArray[4],
								NUMBER_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-3 lg:col-span-2',
							)}
							{/* Endereço - Complemento */}
							{renderField(
								activityFieldsArray[5],
								register,
								errors,
								'col-span-9 md:col-span-12 lg:col-span-10',
							)}
							{/* Endereço - Bairro */}
							{renderField(
								activityFieldsArray[6],
								register,
								errors,
								'col-span-12 md:col-span-6 lg:col-span-5',
							)}
							{/* Endereço - Município */}
							{renderField(
								activityFieldsArray[7],
								register,
								errors,
								'col-span-9 md:col-span-6 lg:col-span-5',
							)}
							{/* Endereço - Estado */}
							{renderComboboxField(
								activityFieldsArray[8],
								control,
								errors,
								setValue,
								'col-span-3 md:col-span-4 lg:col-span-2',
								watch('activity.address.state'),
							)}
							<div className='col-span-12 md:col-span-20 lg:col-span-12'>
								<div className='flex gap-2'>
									{/* Latitude */}
									{renderMaskedField(
										activityFieldsArray[9],
										RONDONIA_LATITUDE_MASKITO_OPTIONS,
										control,
										errors,
										'mb-0 w-1/2',
									)}
									{/* Longitude */}
									{renderMaskedField(
										activityFieldsArray[10],
										RONDONIA_LONGITUDE_MASKITO_OPTIONS,
										control,
										errors,
										'mb-0 w-1/2',
									)}
								</div>
								<ErrorMessage
									errors={errors}
									name='activity.coordinates'
									render={({ message }) => (
										<span className='label-text-alt block text-error'>
											{message}
											{get(errors, [
												'activity',
												'coordinates',
												'root',
												'message',
											])}
										</span>
									)}
								/>
							</div>
							{/* Número do CAR */}
							{renderMaskedField(
								activityFieldsArray[11],
								CAR_RECORD_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-12',
							)}
							{renderComboboxField(
								activityFieldsArray[12],
								control,
								errors,
								setValue,
								'col-span-12',
							)}
						</Section>
						<Separator className='w-full' sizing='xs' />
						<Section>
							{renderField(
								cascFiles[0],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								cascFiles[1],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								cascFiles[2],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
						</Section>
					</Fieldset>
					<Separator className='mb-4' />
					<Fieldset>
						<legend className='sr-only'>Confirmações</legend>
						<Section>
							{renderField(
								checkboxFieldsArray[0],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[1],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[2],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[3],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[4],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[5],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[6],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[7],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[8],
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
							<Link href={'/area-usuario?service=casc'}>
								Acompanhar solicitação
							</Link>
						</FollowUpButton>
					</SubmitButton.Wrapper>
				</div>
			</form>
			{/* <DevT control={control} /> */}
			<UploadProgressv2 statusList={status} />
		</FormContainer>
	);
}
