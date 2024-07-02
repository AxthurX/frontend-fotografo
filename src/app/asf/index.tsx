'use client';

import AlertComponent from '@/components/Alert';
import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';
import { FieldArrayButton } from '@/components/FormInputs/FieldArrayButton';
import FieldArrayMaskedTextInput from '@/components/FormInputs/FieldArrayMaskedTextInput';
import { FollowUpButton } from '@/components/FormInputs/FollowUpButton';
import RadioButton from '@/components/FormInputs/Radio';
import { SubmitButton } from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
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
	asfApplicantFieldsArray,
	asfFiles,
	checkboxFieldsArray,
	legalRepresentativeFieldsArray,
	streetsFieldProps,
	surveyFieldsArray,
	technicianFieldsArray,
} from '@/lib/forms/asf/fields';
import type { IAsfSchema } from '@/lib/forms/asf/interfaces';
import { asfSchema } from '@/lib/forms/asf/schema';
import type { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import {
	renderComboboxField,
	renderField,
	renderFieldArrayField,
	renderFieldArrayMaskedField,
	renderMaskedField,
} from '@/lib/forms/generateFields';
import {
	ASF_TYPE_LABEL,
	COUNCIL_LICENSE_NUMBER_LABEL,
	COUNCIL_NAME_LABEL,
	LATITUDE_LABEL,
	LONGITUDE_LABEL,
} from '@/lib/forms/labels';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import {
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const empty_streets = {
	name: '',
	zone: '',
	width: '',
	extension: '',
	coordinates: {
		latitude: '',
		longitude: '',
	},
};

export default function AsfForm() {
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
		resolver: zodResolver(asfSchema, { errorMap: zodErrorMap }),
		defaultValues: {
			activity: {
				location: {
					streets: [empty_streets],
				},
			},
		},
	});

	const {
		fields: activityFields,
		append: activityAppend,
		remove: activityRemove,
	} = useFieldArray({
		control,
		name: 'activity.location.streets',
	});

	const route = useRouter();
	const sector: string = 'asf';
	const { toast } = useToast();
	const [reqHash, setReqHash] = useState<string | null>(null);
	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
	const [showCepAlertTechnician, setShowCepAlertTechnician] = useState(false);
	const [showCepAlertLegalRepresentative, setShowCepAlertLegalRepresentative] =
		useState(false);

	const watch_zipcode_applicant = watch(
		'applicant.personal_data.address.zipcode',
	);
	const watch_zipcode_technician = watch(
		'technician.personal_data.address.zipcode',
	);
	const watch_zipcode_legal_representative = watch(
		'asf_legal_representative.address.zipcode',
	);
	const watch_source_supply = watch('activity.source.source_supply');
	const watch_type_location = watch('activity.location.type_location');
	//const watch_coordinates = watch("activity.location.highways.coordinates");

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const curr_status = currState.slice();
		setStatus(curr_status);
	};

	const survey_values = watch([
		'surveys.survey_0',
		'surveys.survey_1',
		'surveys.survey_2',
		'surveys.survey_3',
		'surveys.survey_4',
		'surveys.survey_5',
		'surveys.survey_6',
		'surveys.survey_7',
		'surveys.survey_8',
		'surveys.survey_9',
		'surveys.survey_10',
		'surveys.survey_11',
		'surveys.survey_12',
		'surveys.survey_13',
		'surveys.survey_14',
	]);

	const surveyCriteriaFailed = () => {
		if (survey_values.some((value) => value === null || value === undefined)) {
			return false;
		} else if (
			survey_values.toString() !==
			'Sim,Sim,Não,Não,Não,Não,Não,Não,Não,Não,Não,Não,Não,Não,Não'
		) {
			return true;
		} else {
			return false;
		}
	};

	const zoneExtraChange = async (index: number) => {
		const lat = getValues(
			`activity.location.streets.${index}.coordinates.latitude`,
		);
		const lon = getValues(
			`activity.location.streets.${index}.coordinates.longitude`,
		);
		if (lat.length == 13 && lon.length == 13) {
			await trigger(`activity.location.streets.${index}.coordinates`);
		}
	};

	// useEffect(() => {
	//   if (watch_coordinates) {
	//     if (
	//       watch_coordinates.longitude.length == 13 &&
	//       watch_coordinates.latitude.length == 13
	//     ) {
	//       trigger("activity.location.highways.coordinates");
	//     }
	//   }
	// }, [trigger, watch_coordinates, watch_coordinates?.latitude, watch_coordinates?.longitude]);

	const onSubmit = async (data: IAsfSchema) => {
		const data_clone: Partial<IAsfSchema> = structuredClone(data);
		console.log(data_clone);
		const { applicant, asf_legal_representative, technician, activity } =
			data_clone;

		const files: Record<string, File> = {
			council_license: data.asf_files.council_license_number[0],
			cpf_legal_representative: data.asf_files.cpf_legal_representative[0],
			mayor_appointment: data.asf_files.mayor_appointment[0],
			rg_legal_representative: data.asf_files.rg_legal_representative[0],
			road_layout_shapefiles: data.asf_files.road_layout_shapefiles[0],
			site_plan: data.asf_files.site_plan[0],
		};

		const form_data = {
			requirement: {
				applicant,
				legal_representative: asf_legal_representative,
				technician,
				activity,
			},
		};

		try {
			const response = await axios.post('/api/asf', form_data);
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
				form_data.requirement.applicant?.cpf_cnpj &&
				form_data.requirement.applicant?.cpf_cnpj.length > 5
			) {
				lodash.delay(() => {
					route.push(
						`area-usuario?tracking_id=${response.data.tracking_id}&cpf_cnpj=${form_data.requirement.applicant?.cpf_cnpj}&service=${sector}`,
					);
				}, 1500);
			}
		} catch (e) {
			onError(e);
		}
	};

	const handleCepApiMessage = useCallback((section: string, state: boolean) => {
		if (section === 'applicant') {
			setShowCepAlertApplicant(state);
		} else if (section === 'technician') {
			setShowCepAlertTechnician(state);
		} else if (section === 'asf_legal_representative') {
			setShowCepAlertLegalRepresentative(state);
		} else return;
	}, []);

	const validarCep = useCallback(
		async (section: string) => {
			let section_name:
				| 'applicant.personal_data'
				| 'technician.personal_data'
				| 'asf_legal_representative';

			if (section === 'applicant') section_name = 'applicant.personal_data';
			else if (section === 'technician')
				section_name = 'technician.personal_data';
			else if (section === 'asf_legal_representative')
				section_name = 'asf_legal_representative';
			else return;

			const cep = getValues(`${section_name}.address.zipcode`);
			if (cep && cep.length > 8) {
				try {
					const response = await fetch(`/api/cep?cep=${cep}`);
					if (response.ok) {
						handleCepApiMessage(section, false);
						const data = await response.json();
						if (data) {
							setValue(`${section_name}.address.street`, data.logradouro);
							setValue(`${section_name}.address.city`, data.localidade);
							setValue(`${section_name}.address.state`, data.uf);
							setValue(`${section_name}.address.district`, data.bairro);
						}
					} else {
						handleCepApiMessage(section, true);
						await response.json();
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

	useEffect(() => {
		watch_zipcode_applicant && validarCep('applicant');
	}, [validarCep, watch_zipcode_applicant]);

	useEffect(() => {
		watch_zipcode_technician && validarCep('technician');
	}, [validarCep, watch_zipcode_technician]);

	useEffect(() => {
		watch_zipcode_legal_representative &&
			validarCep('asf_legal_representative');
	}, [validarCep, watch_zipcode_legal_representative]);

	return (
		<FormContainer>
			<Header>
				<Header.Title>
					Dispensa de Licenciamento Ambiental para a Pavimentação Asfáltica
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
				<Fieldset id='questionario'>
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
						{renderField(
							surveyFieldsArray[10],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[11],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[12],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[13],
							register,
							errors,
							'col-span-12 md:col-span-24',
						)}
						{renderField(
							surveyFieldsArray[14],
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
					<div className='grid divide-x xl:grid-cols-2'>
						<Fieldset id='requerente' className='pb-4'>
							<Legend>Identificação do requerente</Legend>
							<Section variant='left'>
								{renderField(
									asfApplicantFieldsArray[0],
									register,
									errors,
									'col-span-12 md:col-span-24',
								)}
								{renderMaskedField(
									asfApplicantFieldsArray[1],
									CPF_CNPJ_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-6 md:col-span-12',
								)}
								{renderField(
									asfApplicantFieldsArray[2],
									register,
									errors,
									'col-span-6 md:col-span-12',
								)}
								<div className='col-span-4 sm:col-span-3 md:col-span-6'>
									{renderMaskedField(
										asfApplicantFieldsArray[3],
										CEP_MASKITO_OPTIONS,
										control,
										errors,
									)}
									{showCepAlertApplicant && (
										<p className='mx-0.5 mb-1 text-xs text-info text-opacity-80 md:hidden'>
											CEP informado não encontrado. Por favor, continue
											preenchendo seus dados.
										</p>
									)}
								</div>
								{renderField(
									asfApplicantFieldsArray[4],
									register,
									errors,
									'col-span-8 sm:col-span-6 md:col-span-14',
								)}
								{renderMaskedField(
									asfApplicantFieldsArray[5],
									NUMBER_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-3 md:col-span-4',
								)}
								{renderField(
									asfApplicantFieldsArray[7],
									register,
									errors,
									'col-span-4 md:col-span-8',
								)}
								{renderField(
									asfApplicantFieldsArray[8],
									register,
									errors,
									'col-span-5 md:col-span-11',
								)}
								{renderComboboxField(
									asfApplicantFieldsArray[9],
									control,
									errors,
									setValue,
									'col-span-3 md:col-span-5',
									watch('applicant.personal_data.address.state'),
								)}
								{renderField(
									asfApplicantFieldsArray[6],
									register,
									errors,
									'col-span-9 sm:col-span-12 md:col-span-24',
								)}
								{renderMaskedField(
									asfApplicantFieldsArray[10],
									PHONE_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-12 sm:col-span-5 md:col-span-8',
								)}
								{renderField(
									asfApplicantFieldsArray[11],
									register,
									errors,
									'col-span-12 sm:col-span-7 md:col-span-16',
								)}
							</Section>
						</Fieldset>

						<Fieldset id='responsavelLegal' className='pb-4'>
							<Legend>Dados do responsável legal</Legend>
							<Section variant='right'>
								{renderField(
									legalRepresentativeFieldsArray[0],
									register,
									errors,
									'col-span-24 md:col-span-24',
								)}
								{renderMaskedField(
									legalRepresentativeFieldsArray[1],
									CPF_CNPJ_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-13 md:col-span-12',
								)}
								{renderMaskedField(
									legalRepresentativeFieldsArray[2],
									RG_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-11 md:col-span-12',
								)}
								<div className='col-span-11 sm:col-span-5 md:col-span-6'>
									{renderMaskedField(
										legalRepresentativeFieldsArray[3],
										CEP_MASKITO_OPTIONS,
										control,
										errors,
									)}
									{showCepAlertLegalRepresentative && (
										<p className='mx-0.5 mb-1 text-xs text-info text-opacity-80 md:hidden'>
											CEP informado não encontrado. Por favor, continue
											preenchendo seus dados.
										</p>
									)}
								</div>
								{renderField(
									legalRepresentativeFieldsArray[4],
									register,
									errors,
									'col-span-13 sm:col-span-17 md:col-span-14',
								)}
								<div className='col-span-6 sm:col-span-2 md:col-span-4'>
									{renderMaskedField(
										legalRepresentativeFieldsArray[5],
										NUMBER_MASKITO_OPTIONS,
										control,
										errors,
									)}
								</div>
								{renderField(
									legalRepresentativeFieldsArray[7],
									register,
									errors,
									'col-span-10 sm:col-span-7 md:col-span-9',
								)}
								{renderField(
									legalRepresentativeFieldsArray[8],
									register,
									errors,
									'col-span-8 sm:col-span-13 md:col-span-10',
								)}
								<div className='col-span-7 sm:col-span-4 md:col-span-5'>
									{renderComboboxField(
										legalRepresentativeFieldsArray[9],
										control,
										errors,
										setValue,
										watch('asf_legal_representative.address.state'),
									)}
								</div>
								{renderField(
									legalRepresentativeFieldsArray[6],
									register,
									errors,
									'col-span-17 sm:col-span-24 md:col-span-24',
								)}
								{renderMaskedField(
									legalRepresentativeFieldsArray[10],
									PHONE_MASKITO_OPTIONS,
									control,
									errors,
									'col-span-24 sm:col-span-9 md:col-span-8',
								)}
								{renderField(
									legalRepresentativeFieldsArray[11],
									register,
									errors,
									'col-span-24 sm:col-span-15 md:col-span-16',
								)}
							</Section>
						</Fieldset>
					</div>

					<Fieldset id='responsavelTecnico' className='pb-4'>
						<Legend> Dados do responsável técnico</Legend>
						<Section variant='right'>
							{/* Name */}
							{renderField(
								technicianFieldsArray[0],
								register,
								errors,
								'col-span-12 md:col-span-12',
							)}
							{/* CPF */}
							{renderMaskedField(
								technicianFieldsArray[1],
								CPF_CNPJ_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 md:col-span-6',
							)}
							{/* RG */}
							{renderMaskedField(
								technicianFieldsArray[2],
								RG_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 md:col-span-6',
							)}
							<div className='col-span-12 md:col-span-10'>
								<TextInput
									fieldId='technician.council_license.cl_number'
									label={COUNCIL_LICENSE_NUMBER_LABEL}
									errors={errors}
									register={register}
									maxLength={20}
								/>
							</div>
							<div className='col-span-8 md:col-span-10'>
								<TextInput
									fieldId='technician.council_license.cl_name'
									label={COUNCIL_NAME_LABEL}
									errors={errors}
									register={register}
									maxLength={40}
								/>
							</div>
							<div className='col-span-4 md:col-span-4'>
								{renderComboboxField(
									technicianFieldsArray[5],
									control,
									errors,
									setValue,
									'',
									watch('technician.council_license.cl_state'),
								)}
							</div>
							{/* CEP */}
							<div className='col-span-3 md:col-span-5'>
								{renderMaskedField(
									technicianFieldsArray[6],
									CEP_MASKITO_OPTIONS,
									control,
									errors,
								)}
								{showCepAlertTechnician && (
									<p className='mx-0.5 -mt-1 mb-1 text-xs text-info text-opacity-80 md:hidden'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								)}
							</div>
							{/* Street */}
							{renderField(
								technicianFieldsArray[7],
								register,
								errors,
								'col-span-9 md:col-span-10',
							)}
							{/* Number */}
							{renderMaskedField(
								technicianFieldsArray[8],
								NUMBER_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-3 md:col-span-3',
							)}
							{/* District */}
							{renderField(
								technicianFieldsArray[10],
								register,
								errors,
								'col-span-4 md:col-span-6',
							)}
							{/* City */}
							{renderField(
								technicianFieldsArray[11],
								register,
								errors,
								'col-span-5 md:col-span-6',
							)}
							{/* State */}
							{renderComboboxField(
								technicianFieldsArray[12],
								control,
								errors,
								setValue,
								'col-span-3 md:col-span-3',
								watch('technician.personal_data.address.state'),
							)}
							{/* Complement */}
							{renderField(
								technicianFieldsArray[9],
								register,
								errors,
								'col-span-9 md:col-span-15',
							)}
							{/* Fone */}
							{renderMaskedField(
								technicianFieldsArray[13],
								PHONE_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-12 sm:col-span-5 md:col-span-12',
							)}
							{/* Email */}
							{renderField(
								technicianFieldsArray[14],
								register,
								errors,
								'col-span-12 sm:col-span-7 md:col-span-12',
							)}
						</Section>
					</Fieldset>

					<Fieldset id='atividade' className='pb-4'>
						<Legend>Atividade</Legend>
						<Section variant='center'>
							<div className='col-span-24'>
								{renderComboboxField(
									activityFieldsArray[0],
									control,
									errors,
									setValue,
									'col-span-24 md:col-span-24',
									watch('activity.source.source_supply'),
								)}
								{watch_source_supply === 'Captação de Água Superficial' ||
								watch_source_supply === 'Captação de Água Subterrânea' ? (
									<>
										<div className='mb-6 flex flex-col gap-x-4 col-span-11 md:col-span-10'>
											<TextInput
												fieldId='activity.source.number_outorga'
												label='N° de outorga ou dispensa de outorga'
												register={register}
												inputType='text'
												errors={errors}
											/>
										</div>
									</>
								) : null}
							</div>
							<div className='col-span-24 md:col-span-7'>
								<TextInput
									register={register}
									fieldId={'activity.type'}
									label={ASF_TYPE_LABEL}
									value={'Pavimentação Asfaltica'}
									readonly={true}
									inputType='text'
									required
								/>
							</div>
							{renderComboboxField(
								activityFieldsArray[1],
								control,
								errors,
								setValue,
								'col-span-24 md:col-span-10',
							)}
							{renderField(
								activityFieldsArray[2],
								register,
								errors,
								'col-span-24 md:col-span-7',
							)}
							<div className='mx-1 mb-2 px-2 col-span-24 justify-self-center text-center'>
								<RadioButton
									fieldId='activity.location.type_location'
									errors={errors}
									register={register}
									label='Localização das vias'
									className='grid grid-cols-2 md:grid-flow-col justify-items-center text-center'
									options={[
										{
											value: 'Rodovia',
											label: 'Rodovia',
										},
										{
											value: 'Ruas',
											label: 'Ruas',
										},
									]}
								/>
							</div>
						</Section>
					</Fieldset>
					{watch_type_location == 'Rodovia' ||
					watch_type_location === 'Ruas' ? (
						<Fieldset id='ruas'>
							<Legend>
								Vias ({'quantidade atual:'} {activityFields.length})
							</Legend>
							{activityFields.map((item, index) => (
								<Fragment key={item.id}>
									<div className='mx-2 flex'>
										<Section variant='array'>
											{renderFieldArrayField(
												`activity.location.streets.${index}.zone`,
												streetsFieldProps[0],
												register,
												errors,
												'col-span-12 md:col-span-24 md:flex',
											)}
											{renderFieldArrayField(
												`activity.location.streets.${index}.name`,
												streetsFieldProps[1],
												register,
												errors,
												'col-span-12 md:col-span-8 lg:col-span-8',
											)}
											{renderFieldArrayMaskedField(
												`activity.location.streets.${index}.width`,
												streetsFieldProps[2],
												control,
												NUMBER_MASKITO_OPTIONS,
												errors,
												'col-span-12 md:col-span-8 lg:col-span-8',
											)}
											{renderFieldArrayMaskedField(
												`activity.location.streets.${index}.extension`,
												streetsFieldProps[3],
												control,
												NUMBER_MASKITO_OPTIONS,
												errors,
												'col-span-12 md:col-span-8 lg:col-span-8',
											)}
											<div className='mb-2 col-span-12 md:col-span-12'>
												<FieldArrayMaskedTextInput
													control={control}
													fieldId={`activity.location.streets.${index}.coordinates.latitude`}
													maskitoOptions={RONDONIA_LATITUDE_MASKITO_OPTIONS}
													label={LATITUDE_LABEL}
													extraChange={() => zoneExtraChange(index)}
												/>
											</div>
											<div className='mb-2 col-span-12 md:col-span-12'>
												<FieldArrayMaskedTextInput
													control={control}
													fieldId={`activity.location.streets.${index}.coordinates.longitude`}
													maskitoOptions={RONDONIA_LONGITUDE_MASKITO_OPTIONS}
													label={LONGITUDE_LABEL}
													extraChange={() => zoneExtraChange(index)}
												/>
											</div>
										</Section>
										{activityFields.length > 1 && (
											<FieldArrayButton.Wrapper>
												<FieldArrayButton
													variant='remove'
													onClick={() => activityRemove(index)}
												/>
											</FieldArrayButton.Wrapper>
										)}
									</div>
									<ErrorMessage
										errors={errors}
										name={`activity.location.streets.${index}.coordinates`}
										render={({ message }) => (
											<span className='label-text-alt col-span-2 mx-3 my-2 block text-error text-center max-sm:mb-6 lg:mt-[-10px]'>
												{message}
												{get(errors, [
													'activity',
													'location',
													'streets',
													`${index}`,
													'coordinates',
													'root',
													'message',
												])}
											</span>
										)}
									/>
								</Fragment>
							))}
							{activityFields.length < 5 && watch_type_location === 'Ruas' && (
								<FieldArrayButton
									className={activityFields.length > 1 ? 'mr-[68px]' : ''}
									variant='append'
									onClick={() => activityAppend(empty_streets)}
								/>
							)}
						</Fieldset>
					) : (
						<></>
					)}
					<Separator className='w-full' sizing='xs' />
					<Fieldset id='files'>
						<Section>
							{renderField(
								asfFiles[0],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								asfFiles[1],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								asfFiles[2],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								asfFiles[3],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								asfFiles[4],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								asfFiles[5],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
						</Section>
					</Fieldset>
					<Separator className='mb-4' />
					<Fieldset id='confirmacoes'>
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
							{renderField(
								checkboxFieldsArray[9],
								register,
								errors,
								'col-span-12 md:col-span-24',
							)}
							{renderField(
								checkboxFieldsArray[10],
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
							<Link href={'/area-usuario?service=asf'}>
								Acompanhar solicitação
							</Link>
						</FollowUpButton>
					</SubmitButton.Wrapper>
				</div>
			</form>

			<UploadProgressv2 statusList={status} />
		</FormContainer>
	);
}
