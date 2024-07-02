'use client';

import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';
import { FieldArrayButton } from '@/components/FormInputs/FieldArrayButton';
import FieldArrayMaskedTextInput from '@/components/FormInputs/FieldArrayMaskedTextInput';
import { FollowUpButton } from '@/components/FormInputs/FollowUpButton';
import MaskedTextInput from '@/components/FormInputs/MaskedTextInput';
import RadioButton from '@/components/FormInputs/Radio';
import Select from '@/components/FormInputs/Select';
import { SubmitButton } from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import Fieldset from '@/components/FormStructure/Fieldset';
import FormContainer from '@/components/FormStructure/FormContainer';
import { Header } from '@/components/FormStructure/Header';
import Legend from '@/components/FormStructure/Legend';
import Section from '@/components/FormStructure/Section';
import Separator from '@/components/FormStructure/Separator';
import { useToast } from '@/components/ui/use-toast';
import { sendFilesv4, type UploadStatus } from '@/lib/file/sendFilesv4';
import { SendFileError } from '@/lib/file/sendfile-error';
import { aufFiles } from '@/lib/forms/auf/fields';
import type { IAufSchema } from '@/lib/forms/auf/interfaces';
import { aufSchema } from '@/lib/forms/auf/schema';
import type { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import { renderComboboxField, renderField } from '@/lib/forms/generateFields';
import {
	AUF_BURN_AREA_LABEL,
	AUF_BURN_OBJECTIVE_LABEL,
	AUF_BURN_TYPE_LABEL,
	CAR_RECORD_LABEL,
	CEP_LABEL,
	CITY_LABEL,
	CIVIL_STATUS_LABEL,
	COMPLEMENT_LABEL,
	COUNCIL_LICENSE_NUMBER_LABEL,
	COUNCIL_NAME_LABEL,
	CPF_LABEL,
	CPF_OR_CNPJ_LABEL,
	DISTRICT_LABEL,
	EMAIL_LABEL,
	GEOGRAPHIC_COORDINATES_LABEL,
	JOB_LABEL,
	LATITUDE_LABEL,
	LONGITUDE_LABEL,
	NAME_LABEL,
	NAME_OR_CORPORATE_NAME_LABEL,
	NATIONALITY_LABEL,
	PHONE_LABEL,
	RG_LABEL,
	STATE_LABEL,
	STATE_REGISTRATION_LABEL,
	STREET_LABEL,
	STREET_NUMBER_LABEL,
} from '@/lib/forms/labels';
import { ufList } from '@/lib/forms/ufList';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import {
	CARGO_MASKITO_OPTIONS,
	CAR_RECORD_MASKITO_OPTIONS,
	CEP_MASKITO_OPTIONS,
	CPF_CNPJ_MASKITO_OPTIONS,
	NUMBER_MASKITO_OPTIONS,
	PHONE_MASKITO_OPTIONS,
	RONDONIA_LATITUDE_MASKITO_OPTIONS,
	RONDONIA_LONGITUDE_MASKITO_OPTIONS,
} from '@/lib/maskito/masks';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import lodash from 'lodash';
import get from 'lodash/get';
// import dynamic from "next/dynamic";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function AufForm() {
	const { toast } = useToast();
	const sector: string = 'auf';
	const emptyBurnZone = { latitude: '', longitude: '' };
	const route = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<ICombinedSchema>({
		resolver: zodResolver(aufSchema, { errorMap: zodErrorMap }),
		defaultValues: {
			burn: {
				burn_zone: [emptyBurnZone],
			},
		},
	});

	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const [trackingID, setTrackingID] = useState<string>();
	const [reqHash, setReqHash] = useState<string | null>(null);

	// const updateUploadStatus = (currState: Array<sendStatus>) => {
	// 	const currStatus = currState.slice();
	// 	setStatus(currStatus);
	// 	console.log(status);
	// };

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatus(currStatus);
	};

	const {
		fields: burnZoneFields,
		append: burnZoneAppend,
		remove: burnZoneRemove,
	} = useFieldArray({
		control,
		name: 'burn.burn_zone',
	});

	const onSubmit = async (data: IAufSchema) => {
		const dataClone: Partial<IAufSchema> = structuredClone(data);
		const { applicant, property, burn, optional_technician } = dataClone;

		const files: Record<string, File> = {
			applicant_rg: data.files.applicant_rg[0],
			applicant_cpf: data.files.applicant_cpf[0],
			applicant_proof_of_residence: data.files.applicant_proof_of_residence[0],
			applicant_cnpj: data.files.applicant_cnpj[0],
			social_contract: data.files.social_contract[0],
			proxy_contract: data.files.proxy_contract[0],
			proxy_rg: data.files.proxy_rg[0],
			proxy_cpf: data.files.proxy_cpf[0],
			payment_receipt: data.files.payment_receipt[0],
			car_record_file: data.files.car_record_file[0],
			shapefiles: data.files.shapefiles[0],
			pasture_cleaning_declaration_or_vegetation_suppression_authorization:
				data.files
					.pasture_cleaning_declaration_or_vegetation_suppression_authorization[0],
		};

		data.property.address.state = 'RO';
		const formData = {
			requirement: {
				applicant: {
					...applicant,
					applicant_data: {
						civil_status: data.applicant.civil_status,
						document: data.applicant.rg,
						job: data.applicant.job,
						state_registration: data.applicant.state_registration,
					},
				},
				property: { ...property, burn_data: burn },
				technician: data.optional_technician,
			},
		};

		delete formData.requirement.applicant.civil_status;
		delete formData.requirement.applicant.rg;
		delete formData.requirement.applicant.job;
		delete formData.requirement.applicant.state_registration;
		optional_technician?.has_technician == 'Não' &&
			delete formData.requirement.technician;
		optional_technician?.has_technician == 'Sim' &&
			delete formData?.requirement?.technician?.has_technician;
		// console.log(formData.requirement);

		try {
			const response = await axios.post('/api/auf', formData);
			const respMsg = response.data.message;

			toast({
				title: 'INFO',
				description: response.data.message,
			});

			if (
				!trackingID ||
				(trackingID && trackingID !== response.data.tracking_id)
			)
				setTrackingID(response.data.tracking_id);

			if (
				!reqHash ||
				(reqHash &&
					reqHash !== response.data?.hash &&
					response.data?.hash != null)
			)
				setReqHash(response.data.hash);

			console.log(files);

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
					description: respMsg,
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
			} else
				toast({
					title: 'Erro',
					variant: 'destructive',
					description: 'Serviço indisponivel',
				});
		} catch (err) {
			console.log(err);
			const error: { message: string } = {
				message: 'Erro , Tente novamente mais tarde',
			};
			if (err instanceof AxiosError) {
				if (err.response)
					if (err.response.data.message)
						error.message = err?.response.data.message;
					else error.message = 'Serviço indisponivel';
			} else if (err instanceof SendFileError) error.message = err.message;

			toast({
				title: 'Erro',
				variant: 'destructive',
				description: error.message,
			});
		}
	};

	const watchCoordinates = watch('property.coordinates');

	useEffect(() => {
		if (watchCoordinates) {
			if (
				watchCoordinates.longitude.length === 13 &&
				watchCoordinates.latitude.length === 13
			) {
				trigger('property.coordinates');
			}
		}
	}, [
		trigger,
		watchCoordinates,
		watchCoordinates?.latitude,
		watchCoordinates?.longitude,
	]);

	const burnZoneExtraChange = async (index: number) => {
		const burnZoneLat = getValues(`burn.burn_zone.${index}.latitude`);
		const burnZoneLon = getValues(`burn.burn_zone.${index}.longitude`);
		if (burnZoneLat?.length == 13 && burnZoneLon?.length == 13) {
			await trigger(`burn.burn_zone.${index}`);
		}
	};

	const watchBurnType = watch('burn.type');

	const [enableTechnical, setEnableTechnical] = useState(false);
	const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
	const [showCepAlertTechnician, setShowCepAlertTechnician] = useState(false);
	const [showCepAlertProperty, setShowCepAlertProperty] = useState(false);

	const validarCep = useCallback(
		async (section: string) => {
			if (section === 'applicant') {
				const cep = getValues('applicant.personal_data.address.zipcode');
				if (cep && cep.length > 8) {
					try {
						const response = await fetch(`/api/cep?cep=${cep}`);
						if (response.ok) {
							setShowCepAlertApplicant(false);
							const data = await response.json();
							setValue(
								'applicant.personal_data.address.street',
								data?.logradouro,
							);
							setValue(
								'applicant.personal_data.address.city',
								data?.localidade,
							);
							setValue('applicant.personal_data.address.state', data?.uf);
							setValue(
								'applicant.personal_data.address.district',
								data?.bairro,
							);
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
			} else if (section === 'optional_technician') {
				const cep = getValues(
					'optional_technician.personal_data.address.zipcode',
				);
				if (cep && cep.length > 8) {
					try {
						const response = await fetch(`/api/cep?cep=${cep}`);
						if (response.ok) {
							setShowCepAlertTechnician(false);
							const data = await response.json();
							setValue(
								'optional_technician.personal_data.address.street',
								data?.logradouro,
							);
							setValue(
								'optional_technician.personal_data.address.city',
								data?.localidade,
							);
							setValue(
								'optional_technician.personal_data.address.state',
								data?.uf,
							);
							setValue(
								'optional_technician.personal_data.address.district',
								data?.bairro,
							);
						}
					} catch (_err) {
						setShowCepAlertTechnician(true);
					}
				}
			} else if (section === 'property') {
				const cep = getValues('property.address.zipcode');
				if (cep && cep.length > 8) {
					try {
						const response = await fetch(`/api/cep?cep=${cep}`);
						if (response.ok) {
							setShowCepAlertProperty(false);
							const data = await response.json();
							setValue('property.address.street', data?.logradouro);
							setValue('property.address.city', data?.localidade);
							setValue('property.address.state', data?.uf);
							setValue('property.address.district', data?.bairro);
						}
					} catch (_err) {
						setShowCepAlertProperty(true);
					}
				}
			}
		},
		[getValues, setValue],
	);
	const watchZipcode = watch('applicant.personal_data.address.zipcode');
	const watchZipcodeTechnician = watch(
		'optional_technician.personal_data.address.zipcode',
	);
	const watchZipcodeProperty = watch('property.address.zipcode');

	useEffect(() => {
		watchZipcode && validarCep('applicant');
	}, [validarCep, watchZipcode]);
	useEffect(() => {
		watchZipcodeTechnician && validarCep('optional_technician');
	}, [validarCep, watchZipcodeTechnician]);
	useEffect(() => {
		watchZipcodeProperty && validarCep('property');
	}, [validarCep, watchZipcodeProperty]);

	return (
		<>
			<FormContainer>
				<Header>
					<Header.Title>
						Solicitação de Autorização para Uso do Fogo
					</Header.Title>
					<Header.Body>
						O usuário declara, sob as penalidades do art. 299 do Código Penal,
						que as informações fornecidas são fiéis e verdadeiras, sem omissões
						ou dados que possam induzir a equívocos de julgamento, assumindo
						total responsabilidade pelo conteúdo declarado.
					</Header.Body>
				</Header>
				<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
				<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
					<Fieldset id='Identificação do Requerente' className='pb-6 '>
						<Legend>Identificação do requerente</Legend>
						<hr className='mb-4 rounded-3xl opacity-80' />
						<div className='mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2'>
							<div className='col-span-full'>
								<TextInput
									fieldId='applicant.name'
									label={NAME_OR_CORPORATE_NAME_LABEL}
									errors={errors}
									register={register}
									maxLength={120}
									minLength={5}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<MaskedTextInput
									fieldId='applicant.cpf_cnpj'
									label={CPF_OR_CNPJ_LABEL}
									errors={errors}
									control={control}
									maskitoOptions={CPF_CNPJ_MASKITO_OPTIONS}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.rg'
									label={RG_LABEL}
									errors={errors}
									register={register}
									maxLength={15}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.job'
									label={JOB_LABEL}
									errors={errors}
									register={register}
									maxLength={120}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<Select
									fieldId='applicant.nationality'
									errors={errors}
									register={register}
									label={NATIONALITY_LABEL}
									options={[
										{ label: 'Brasileiro(a)', value: 'brasileiro' },
										{ label: 'Estrangeiro(a)', value: 'estrangeiro' },
									]}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<Select
									fieldId='applicant.civil_status'
									errors={errors}
									register={register}
									label={CIVIL_STATUS_LABEL}
									options={[
										{ label: 'Solteiro(a)', value: 'Solteiro' },
										{ label: 'Casado(a)', value: 'Casado' },
										{ label: 'Separado(a)', value: 'Separado' },
										{ label: 'Divorciado(a)', value: 'Divorciado' },
										{ label: 'Viúvo(a)', value: 'Viúvo' },
										{ label: 'Outro(a)', value: 'Outro' },
									]}
								/>
							</div>
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.state_registration'
									label={STATE_REGISTRATION_LABEL}
									errors={errors}
									register={register}
									maxLength={14}
								/>
							</div>
							<div className='col-span-full'>
								<MaskedTextInput
									errors={errors}
									control={control}
									fieldId='applicant.personal_data.address.zipcode'
									maskitoOptions={CEP_MASKITO_OPTIONS}
									label={CEP_LABEL}
								/>
								{showCepAlertApplicant && (
									<p className='mx-0.5 mb-1 mt-0.5 text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								)}
							</div>
							<div className='col-span-8 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.personal_data.address.street'
									label={STREET_LABEL}
									errors={errors}
									register={register}
									maxLength={80}
									minLength={5}
								/>
							</div>
							<div className='col-span-4 max-sm:col-span-full'>
								<MaskedTextInput
									fieldId='applicant.personal_data.address.number'
									label={STREET_NUMBER_LABEL}
									errors={errors}
									control={control}
									maskitoOptions={NUMBER_MASKITO_OPTIONS}
									minLength={1}
									maxLength={5}
								/>
							</div>
							<div className='col-span-full'>
								<TextInput
									fieldId='applicant.personal_data.address.complement'
									label={COMPLEMENT_LABEL}
									errors={errors}
									register={register}
									maxLength={255}
								/>
							</div>
							<div className='col-span-5 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.personal_data.address.district'
									label={DISTRICT_LABEL}
									errors={errors}
									register={register}
									maxLength={50}
								/>
							</div>
							<div className='col-span-5 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.personal_data.address.city'
									label={CITY_LABEL}
									errors={errors}
									register={register}
								/>
							</div>
							<div className='col-span-2 max-sm:col-span-full'>
								{renderComboboxField(
									{
										fieldId: 'applicant.personal_data.address.state',
										label: STATE_LABEL,
										fieldType: 'combobox',
										options: ufList,
										className: 'w-[78px]',
									},
									control,
									errors,
									setValue,
									'',
									watch('applicant.personal_data.address.state'),
								)}
							</div>
							<div className='col-span-6 max-sm:col-span-full'>
								<MaskedTextInput
									fieldId='applicant.personal_data.contact.phone'
									label={PHONE_LABEL}
									errors={errors}
									control={control}
									maskitoOptions={PHONE_MASKITO_OPTIONS}
									placeholder='(00) 00000-0000'
								/>
							</div>
							<div className='col-span-6 max-sm:col-span-full'>
								<TextInput
									fieldId='applicant.personal_data.contact.email'
									inputType='email'
									label={EMAIL_LABEL}
									errors={errors}
									register={register}
									minLength={5}
									maxLength={80}
								/>
							</div>
						</div>
					</Fieldset>
					<Separator />
					<div className='mx-1 my-3 mb-8 px-4'>
						<span className='label'>
							Há um responsável técnico nesta solicitação?
						</span>
						<div className='m-1'>
							<div
								className='mb-2 flex items-center gap-1'
								key={'technicalsim'}
							>
								<input
									type='radio'
									id={'optional_technician.has_technician.sim'}
									{...register('optional_technician.has_technician')}
									value={'Sim'}
									onClick={() => setEnableTechnical(true)}
									className='radio-primary radio border-beige-200 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 max-lg:mr-2'
								/>
								<label htmlFor={'sim'}>Sim</label>
							</div>
							<div className='flex items-center gap-1' key={'technicalnao'}>
								<input
									type='radio'
									defaultChecked
									id={'optional_technician.has_technician.nao'}
									{...register('optional_technician.has_technician')}
									value={'Não'}
									onClick={() => setEnableTechnical(false)}
									className='radio-primary radio border-beige-200 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 max-lg:mr-2'
								/>
								<label htmlFor={'nao'}>Não</label>
							</div>
						</div>
					</div>
					{enableTechnical && (
						<Fieldset
							id='Identificação do Responsável Técnico'
							className={'pb-6'}
						>
							<Legend>Dados do responsável técnico</Legend>

							<div
								className={'mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2'}
							>
								<div className='col-span-12 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.name'
										label={NAME_LABEL}
										errors={errors}
										register={register}
										maxLength={120}
										minLength={5}
									/>
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='optional_technician.cpf'
										label={CPF_LABEL}
										maxLength={14}
										errors={errors}
										control={control}
										maskitoOptions={CPF_CNPJ_MASKITO_OPTIONS}
									/>
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='optional_technician.rg'
										label={RG_LABEL}
										errors={errors}
										minLength={6}
										maxLength={15}
										control={control}
										maskitoOptions={NUMBER_MASKITO_OPTIONS}
									/>
								</div>
								<div className='col-span-7 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.council_license.cl_number'
										label={COUNCIL_LICENSE_NUMBER_LABEL}
										errors={errors}
										register={register}
										maxLength={20}
									/>
								</div>
								<div className='col-span-3 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.council_license.cl_name'
										label={COUNCIL_NAME_LABEL}
										errors={errors}
										register={register}
										maxLength={40}
									/>
								</div>
								<div className='col-span-2 max-sm:col-span-full'>
									{renderComboboxField(
										{
											fieldId: 'optional_technician.council_license.cl_state',
											label: STATE_LABEL,
											fieldType: 'combobox',
											options: ufList,
											className: 'w-[78px]',
										},
										control,
										errors,
										setValue,
										'',
										watch('optional_technician.council_license.cl_state'),
									)}
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<Select
										fieldId='optional_technician.nationality'
										errors={errors}
										register={register}
										label={NATIONALITY_LABEL}
										options={[
											{ label: 'Brasileiro(a)', value: 'brasileiro' },
											{ label: 'Estrangeiro(a)', value: 'estrangeiro' },
										]}
									/>
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<Select
										fieldId='optional_technician.civil_status'
										errors={errors}
										register={register}
										label={CIVIL_STATUS_LABEL}
										options={[
											{ label: 'Solteiro(a)', value: 'solteiro' },
											{ label: 'Casado(a)', value: 'casado' },
											{ label: 'Separado(a)', value: 'separado' },
											{ label: 'Viúvo(a)', value: 'viuvo' },
											{ label: 'Outro(a)', value: 'outro' },
										]}
									/>
								</div>
								<div className='col-span-full'>
									<MaskedTextInput
										errors={errors}
										control={control}
										fieldId='optional_technician.personal_data.address.zipcode'
										maskitoOptions={CEP_MASKITO_OPTIONS}
										label={CEP_LABEL}
									/>
									{showCepAlertTechnician && (
										<p className='mx-0.5 mb-1 mt-0.5 text-xs text-info text-opacity-80'>
											CEP informado não encontrado. Por favor, continue
											preenchendo seus dados.
										</p>
									)}
								</div>
								<div className='col-span-9 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.personal_data.address.street'
										label={STREET_LABEL}
										errors={errors}
										register={register}
										maxLength={80}
										minLength={5}
									/>
								</div>
								<div className='col-span-3 max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='optional_technician.personal_data.address.number'
										label={STREET_NUMBER_LABEL}
										errors={errors}
										control={control}
										maskitoOptions={NUMBER_MASKITO_OPTIONS}
										minLength={1}
										maxLength={5}
									/>
								</div>
								<div className='col-span-full max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.personal_data.address.complement'
										label={COMPLEMENT_LABEL}
										errors={errors}
										register={register}
										maxLength={255}
									/>
								</div>
								<div className='col-span-4 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.personal_data.address.district'
										label={DISTRICT_LABEL}
										errors={errors}
										register={register}
										maxLength={50}
									/>
								</div>
								<div className='col-span-4 max-sm:col-span-full'>
									<TextInput
										fieldId='optional_technician.personal_data.address.city'
										label={CITY_LABEL}
										errors={errors}
										register={register}
										maxLength={50}
									/>
								</div>
								<div className='col-span-4 max-sm:col-span-full'>
									{renderComboboxField(
										{
											fieldId:
												'optional_technician.personal_data.address.state',
											label: STATE_LABEL,
											fieldType: 'combobox',
											options: ufList,
											className: 'w-[78px]',
										},
										control,
										errors,
										setValue,
										'',
										watch('optional_technician.personal_data.address.state'),
									)}
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='optional_technician.personal_data.contact.phone'
										label={PHONE_LABEL}
										errors={errors}
										control={control}
										maskitoOptions={PHONE_MASKITO_OPTIONS}
									/>
								</div>
								<div className='col-span-6 max-sm:col-span-full'>
									<TextInput
										inputType='email'
										fieldId='optional_technician.personal_data.contact.email'
										label={EMAIL_LABEL}
										errors={errors}
										register={register}
										minLength={5}
										maxLength={80}
									/>
								</div>
							</div>
						</Fieldset>
					)}
					<Fieldset id='Dados do Imovel' className='pb-6'>
						<Legend>Dados do imóvel</Legend>
						<div className='mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2'>
							<div className='col-span-12'>
								<MaskedTextInput
									fieldId='property.car_record'
									label={CAR_RECORD_LABEL}
									errors={errors}
									control={control}
									maxLength={50}
									maskitoOptions={CAR_RECORD_MASKITO_OPTIONS}
								/>
							</div>
							<div className='col-span-12 '>
								<MaskedTextInput
									errors={errors}
									control={control}
									fieldId='property.address.zipcode'
									maskitoOptions={CEP_MASKITO_OPTIONS}
									label={CEP_LABEL}
								/>
								{showCepAlertProperty && (
									<p className='mx-0.5 mb-1 mt-0.5 text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								)}
							</div>
							<div className='col-span-9 max-sm:col-span-full'>
								<TextInput
									fieldId='property.address.street'
									label={STREET_LABEL}
									errors={errors}
									register={register}
									maxLength={80}
									minLength={5}
								/>
							</div>
							<div className='col-span-3 max-sm:col-span-full'>
								<MaskedTextInput
									control={control}
									fieldId='property.address.number'
									label={STREET_NUMBER_LABEL}
									maskitoOptions={NUMBER_MASKITO_OPTIONS}
									errors={errors}
									maxLength={5}
								/>
							</div>
							<div className='col-span-4  max-sm:col-span-full'>
								<TextInput
									fieldId='property.address.district'
									label={DISTRICT_LABEL}
									errors={errors}
									register={register}
									minLength={5}
									maxLength={50}
								/>
							</div>
							<div className='col-span-4  max-sm:col-span-full'>
								<TextInput
									fieldId='property.address.city'
									label={CITY_LABEL}
									errors={errors}
									register={register}
									minLength={3}
									maxLength={50}
								/>
							</div>

							<div className='col-span-4  max-sm:col-span-full'>
								{renderComboboxField(
									{
										fieldId: 'property.address.state',
										label: STATE_LABEL,
										fieldType: 'combobox',
										options: ufList,
										className: 'w-[78px]',
									},
									control,
									errors,
									setValue,
									'',
									watch('property.address.state'),
								)}
							</div>
							<div className='col-span-full'>
								<TextInput
									fieldId='property.address.complement'
									label={COMPLEMENT_LABEL}
									errors={errors}
									register={register}
									maxLength={255}
								/>
							</div>
						</div>
						<div className='mx-1 mb-2 px-2'>
							<p className='mb-3 mt-2'>{GEOGRAPHIC_COORDINATES_LABEL}:</p>
							<div className='grid grid-cols-2 gap-2'>
								<div className='col-span-1  max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='property.coordinates.latitude'
										label={LATITUDE_LABEL}
										errors={errors}
										control={control}
										maskitoOptions={RONDONIA_LATITUDE_MASKITO_OPTIONS}
										maxLength={18}
									/>
								</div>
								<div className='col-span-1  max-sm:col-span-full'>
									<MaskedTextInput
										fieldId='property.coordinates.longitude'
										label={LONGITUDE_LABEL}
										errors={errors}
										control={control}
										maskitoOptions={RONDONIA_LONGITUDE_MASKITO_OPTIONS}
										maxLength={18}
									/>
								</div>
								<ErrorMessage
									errors={errors}
									name='property.coordinates'
									render={({ message }) => (
										<span className='label-text-alt col-span-2 block text-error'>
											{message}
											{get(errors, [
												'property',
												'coordinates',
												'root',
												'message',
											])}
										</span>
									)}
								/>
							</div>
						</div>
						<div className='mx-1 mb-2 px-2'>
							<RadioButton
								fieldId='burn.type'
								errors={errors}
								register={register}
								label={AUF_BURN_TYPE_LABEL}
								options={[
									{
										value: 'Queima agrícola',
										label: 'Queima agrícola',
									},
									{
										value: 'Queima florestal',
										label: 'Queima florestal',
									},
								]}
							/>
							{watchBurnType == 'Queima agrícola' ? (
								<RadioButton
									label={AUF_BURN_OBJECTIVE_LABEL}
									fieldId='burn.category'
									errors={errors}
									register={register}
									options={[
										{
											label: 'Restos de cultura',
											value: 'Restos de cultura',
										},
										{
											label: 'Queima da cana',
											value: 'Queima da cana',
										},

										{
											label: 'Pastos',
											value: 'Pastos',
										},
										{
											label: 'Outros',
											value: 'Outros',
										},
									]}
								/>
							) : watchBurnType == 'Queima florestal' ? (
								<RadioButton
									label={AUF_BURN_OBJECTIVE_LABEL}
									fieldId='burn.category'
									errors={errors}
									register={register}
									options={[
										{
											label: 'Restos de exploração',
											value: 'Restos de exploração',
										},
										{
											label: 'Espécies prejudiciais',
											value: 'Espécies prejudiciais',
										},
										{
											label: 'Manutenção de corta fogo (aceiro)',
											value: 'Manutenção de corta fogo (aceiro)',
										},
									]}
								/>
							) : (
								<></>
							)}
						</div>
						<div className='mx-1 mb-2 px-2'>
							<MaskedTextInput
								fieldId='burn.area'
								label={AUF_BURN_AREA_LABEL}
								errors={errors}
								control={control}
								maskitoOptions={CARGO_MASKITO_OPTIONS}
							/>
						</div>
					</Fieldset>
					<Fieldset className='pb-6' id='InformacoesSobreAQueima'>
						<Legend>
							Informações sobre a queima (quantidade atual:{' '}
							{burnZoneFields.length})
						</Legend>
						{burnZoneFields.map((field, index) => (
							<Fragment key={field.id}>
								<div className='mx-1 mb-2 flex flex-row px-2'>
									<Section variant='array'>
										<div className='mb-2 md:col-span-12'>
											<FieldArrayMaskedTextInput
												control={control}
												fieldId={`burn.burn_zone.${index}.latitude`}
												maskitoOptions={RONDONIA_LATITUDE_MASKITO_OPTIONS}
												label={LATITUDE_LABEL}
												extraChange={() => burnZoneExtraChange(index)}
											/>
										</div>
										<div className='mb-2 md:col-span-12'>
											<FieldArrayMaskedTextInput
												control={control}
												fieldId={`burn.burn_zone.${index}.longitude`}
												maskitoOptions={RONDONIA_LONGITUDE_MASKITO_OPTIONS}
												label={LONGITUDE_LABEL}
												extraChange={() => burnZoneExtraChange(index)}
											/>
										</div>
									</Section>
									{burnZoneFields.length > 1 && (
										<FieldArrayButton.Wrapper>
											<FieldArrayButton
												variant='remove'
												onClick={() => burnZoneRemove(index)}
											/>
										</FieldArrayButton.Wrapper>
									)}
								</div>
								<ErrorMessage
									errors={errors}
									name={`burn.burn_zone.${index}`}
									render={({ message }) => (
										<span className='label-text-alt col-span-2 mx-3 mb-2 block text-error max-sm:mb-6 lg:mt-[-20px]'>
											{message}
											{get(errors, [
												'burn',
												'burn_zone',
												`${index}`,
												'root',
												'message',
											])}
										</span>
									)}
								/>
							</Fragment>
						))}
						{burnZoneFields.length < 100 && (
							<FieldArrayButton
								className={burnZoneFields.length > 1 ? 'mr-[68px]' : ''}
								variant='append'
								onClick={() => burnZoneAppend(emptyBurnZone)}
							/>
						)}
					</Fieldset>
					<Fieldset id='Arquivos necessários'>
						<Legend>Arquivos necessários</Legend>
						<div className='mx-1 mb-1 grid grid-cols-12 gap-2 px-2'>
							{renderField(
								aufFiles[0],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[1],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[2],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[3],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}

							{renderField(
								aufFiles[4],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[5],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[6],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[7],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[8],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[9],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[10],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
							{renderField(
								aufFiles[11],
								register,
								errors,
								'col-span-6 max-lg:col-span-full',
							)}
						</div>
					</Fieldset>
					<Separator sizing='xs' className='mb-6' />
					<SubmitButton.Wrapper>
						<SubmitButton>Enviar</SubmitButton>
						<FollowUpButton>
							<Link href={'/area-usuario?service=auf'}>
								Acompanhar solicitação
							</Link>
						</FollowUpButton>
					</SubmitButton.Wrapper>
					<UploadProgressv2 statusList={status} />
				</form>
				{/* <DevT control={control} /> */}
			</FormContainer>
		</>
	);
}
