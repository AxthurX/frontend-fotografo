'use client';

import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';
import { FieldArrayButton } from '@/components/FormInputs/FieldArrayButton';
import FieldArrayMaskedTextInput from '@/components/FormInputs/FieldArrayMaskedTextInput';
import { FollowUpButton } from '@/components/FormInputs/FollowUpButton';
import Radio from '@/components/FormInputs/Radio';
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
import type { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import {
	deafApplicantFieldsArray,
	deafFieldData,
	deafFieldProps,
	deafFilesFieldsArray,
	deafTechnicianFieldsArray,
	propertyFieldsArray,
} from '@/lib/forms/deaf/fields';
import type { IDeafSchema } from '@/lib/forms/deaf/interfaces';
import { deafSchema } from '@/lib/forms/deaf/schema';
import {
	renderComboboxField,
	renderField,
	renderFieldArrayField,
	renderFieldArrayMaskedField,
	renderMaskedField,
} from '@/lib/forms/generateFields';
import { WOOD_CAP_CM, WOOD_HEIGHT_M } from '@/lib/forms/labels';
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
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import lodash from 'lodash';
import get from 'lodash/get';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const emptyDeafs = {
	species_name: '',
	cap_cm: '',
	height_m: '',
	volume: '',
};

export default function DeafForm() {
	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		getValues,
		trigger,
		formState: { errors },
	} = useForm<ICombinedSchema>({
		resolver: zodResolver(deafSchema, { errorMap: zodErrorMap }),
		defaultValues: {
			data_forest: {
				data: [emptyDeafs],
			},
		},
	});
	const [reqHash, setReqHash] = useState<string | null>(null);
	const [windowWidth, setWindowWidth] = useState(0);
	const { toast } = useToast();
	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const sector: string = 'deaf';
	const route = useRouter();
	const [currentApplicant, setCurrentApplicant] = useState<string>('');
	const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
	const [showCepAlertTechnician, setShowCepAlertTechnician] = useState(false);
	const [showCepAlertProperty, setShowCepAlertProperty] = useState(false);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const {
		fields: deafFields,
		append: deafsAppend,
		remove: deafsRemove,
	} = useFieldArray({
		control,
		name: 'data_forest.data',
	});

	useEffect(() => {
		const { unsubscribe } = watch(async (value) => {
			if (
				value.property?.coordinates?.longitude?.length == 13 &&
				value.property?.coordinates?.latitude?.length == 13
			) {
				await trigger('property.coordinates');
				return async () =>
					await new Promise((resolve) => resolve(unsubscribe()));
			}
		});
	}, [trigger, watch]);

	const handleCepApiMessage = useCallback((section: string, state: boolean) => {
		if (section === 'applicant') {
			setShowCepAlertApplicant(state);
		} else if (section === 'technician') {
			setShowCepAlertTechnician(state);
		} else if (section === 'property') {
			setShowCepAlertProperty(state);
		} else return;
	}, []);

	const validarCep = useCallback(
		async (section: string) => {
			let sectionName:
				| 'applicant.personal_data'
				| 'technician.personal_data'
				| 'property';
			switch (section) {
				case 'applicant':
					sectionName = 'applicant.personal_data';
					break;
				case 'technician':
					sectionName = 'technician.personal_data';
					break;
				case 'property':
					sectionName = 'property';
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
	const watchZipcodeActivity = watch(
		'technician.personal_data.address.zipcode',
	);
	const watchZipcodeProperty = watch('property.address.zipcode');
	const disableTechnician = watch('technician.verifyTechnician') != 'Sim';

	useEffect(() => {
		watchZipcodeApplicant && validarCep('applicant');
	}, [validarCep, watchZipcodeApplicant]);

	useEffect(() => {
		watchZipcodeActivity && validarCep('technician');
	}, [validarCep, watchZipcodeActivity]);

	useEffect(() => {
		watchZipcodeProperty && validarCep('property');
	}, [validarCep, watchZipcodeProperty]);

	const calculateVolume = (index: number) => {
		const capValue = Number.parseFloat(
			getValues(`data_forest.data.${index}.cap_cm`),
		);
		const heigthValue = Number.parseFloat(
			getValues(`data_forest.data.${index}.height_m`),
		);

		if (capValue && heigthValue) {
			const volume = ((capValue ** 2 * 0.3183) / 40000) * heigthValue * 0.7;
			deafFields[index].cap_cm = capValue.toString();
			deafFields[index].height_m = heigthValue.toString();
			deafFields[index].volume = volume.toString();

			setValue(
				`data_forest.data.${index}.volume`,
				volume.toFixed(3).toString(),
			);

			if (volume) {
				calculateTotalVolume();
			}
		} else {
			return 0;
		}
	};

	const calculateTotalVolume = () => {
		const totalVolume = deafFields.reduce(
			(acc, item) => acc + Number.parseFloat(item.volume || '0'),
			0,
		);

		if (totalVolume > 20) {
			toast({
				title: 'Erro',
				description: 'O volume não pode passar os 20m³.',
				variant: 'destructive',
			});
		}

		setValue('data_forest.total_volume', totalVolume.toFixed(3).toString());
	};

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatus(currStatus);
	};

	const onSubmit = async (data: IDeafSchema) => {
		const dataClone: Partial<IDeafSchema> = structuredClone(data);
		const { applicant, property, data_forest, technician, deafFiles } =
			dataClone;

		if (dataClone.applicant?.cpf_cnpj)
			setCurrentApplicant(dataClone.applicant.cpf_cnpj);

		const files: Record<string, File> = {
			applicant_rg: data.deafFiles.applicant_rg[0],
			applicant_cpf: data.deafFiles.applicant_cpf[0],
			proof_of_residence: data.deafFiles.proof_of_residence[0],
			applicant_cnpj: data.deafFiles.applicant_cnpj[0],
			social_contract: data.deafFiles.social_contract[0],
			proxy_contract: data.deafFiles.proxy_contract[0],
			proxy_rg: data.deafFiles.proxy_rg[0],
			proxy_cpf: data.deafFiles.proxy_cpf[0],
			car_record_file: data.deafFiles.car_record_file[0],
			forest_exploitation_motivation:
				data.deafFiles.forest_exploitation_motivation[0],
		};

		const formData = {
			requirement: {
				applicant,
				property,
				data_forest,
				technician,
				deafFiles,
			},
		};

		delete dataClone?.deafFiles;

		try {
			const response = await axios.post('/api/deaf', {
				requirement: formData.requirement,
			});

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
				currentApplicant &&
				currentApplicant.length > 4
			) {
				lodash.delay(() => {
					route.push(
						`area-usuario?tracking_id=${response.data.tracking_id}&cpf_cnpj=${formData.requirement.applicant?.cpf_cnpj}&service=${sector}`,
					);
				}, 1500);
			}
		} catch (err) {
			const error: { message: string } = { message: '' };
			if (err instanceof AxiosError) {
				if (err.response)
					if (err.response.data.message)
						error.message = err?.response.data.message;
					else error.message = 'Serviço indisponivel';
			} else error.message = 'Erro , Tente novamente mais tarde';

			toast({
				title: 'Erro',
				description: error.message,
			});
		}
	};

	return (
		<FormContainer>
			<Header>
				<Header.Title>
					Declaração de Exploração Anual Florestal na Propriedade Rural
				</Header.Title>
				<Header.Body>
					O manejo sustentável para exploração florestal eventual sem propósito
					comercial, para consumo no próprio imóvel, independe de autorização
					dos órgãos competentes, devendo apenas ser declarados previamente ao
					órgão ambiental a motivação da exploração e o volume explorado,
					limitada a exploração anual a 20 (vinte) metros cúbicos.
				</Header.Body>
			</Header>

			<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
			<div className='mx-auto mt-4 flex w-full justify-center text-center'>
				<Radio
					label='Possui técnico responsável'
					fieldId='technician.verifyTechnician'
					register={register}
					isVertical
					errors={errors}
					centered
				/>
			</div>

			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
				<div className='grid divide-x xl:grid-cols-2'>
					<Fieldset id='identificacaoDoRequerente' className='pb-4'>
						<Legend> Identificação do requerente</Legend>
						<Section className='sm:grid-cols-24' variant='left'>
							{/* Nome */}
							{renderField(
								deafApplicantFieldsArray[0],
								register,
								errors,
								'col-span-12 sm:col-span-24',
							)}
							{/* CPF/CNPJ */}
							{renderMaskedField(
								deafApplicantFieldsArray[1],
								CPF_CNPJ_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 sm:col-span-6',
							)}
							{/* RG */}
							{renderMaskedField(
								deafApplicantFieldsArray[14],
								RG_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 sm:col-span-6',
							)}
							{/* Nacionalidade */}
							{renderField(
								deafApplicantFieldsArray[11],
								register,
								errors,
								'col-span-6 sm:col-span-6',
							)}
							{/* Estado civil */}
							{renderComboboxField(
								deafApplicantFieldsArray[12],
								control,
								errors,
								setValue,
								'col-span-6 sm:col-span-6',
							)}
							{/* Profissão */}
							{renderField(
								deafApplicantFieldsArray[13],
								register,
								errors,
								'col-span-12 sm:col-span-12',
							)}
							{/* Inscrição estadual */}
							{renderField(
								deafApplicantFieldsArray[15],
								register,
								errors,
								'col-span-12 sm:col-span-12',
							)}
							{/* Dados pessoais - Endereço - CEP */}
							{renderMaskedField(
								deafApplicantFieldsArray[2],
								CEP_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-4 sm:col-span-4',
							)}
							{/* Dados pessoais - Endereço - Endereço */}
							{renderField(
								deafApplicantFieldsArray[3],
								register,
								errors,
								'col-span-8 sm:col-span-17',
							)}
							{windowWidth <= 640 && showCepAlertApplicant && (
								<div className='col-span-12 mx-1 -mt-3 mb-4 sm:hidden'>
									<p className='text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								</div>
							)}
							{/* Dados pessoais - Endereço - Número */}
							{renderMaskedField(
								deafApplicantFieldsArray[4],
								NUMBER_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-3 sm:col-span-3',
							)}
							{windowWidth > 640 && showCepAlertApplicant && (
								<div className='col-span-24 -mt-3 mb-4 max-sm:hidden'>
									<p className='text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								</div>
							)}
							{/* Dados pessoais - Endereço - Complemento */}
							{renderField(
								deafApplicantFieldsArray[5],
								register,
								errors,
								'col-span-9 sm:col-span-24',
							)}
							{/* Dados pessoais - Endereço - Bairro */}
							{renderField(
								deafApplicantFieldsArray[6],
								register,
								errors,
								'col-span-6 sm:col-span-10',
							)}
							{/* Dados pessoais - Endereço - Cidade */}
							{renderField(
								deafApplicantFieldsArray[7],
								register,
								errors,
								'col-span-6 sm:col-span-11',
							)}
							{/* Dados pessoais - Endereço - Estado */}
							{renderComboboxField(
								deafApplicantFieldsArray[16],
								control,
								errors,
								setValue,
								'col-span-3 sm:col-span-3',
								watch('applicant.personal_data.address.state'),
							)}
							{/* Dados pessoais - Telefone */}
							{renderMaskedField(
								deafApplicantFieldsArray[9],
								PHONE_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-9 sm:col-span-8',
							)}
							{/* Dados pessoais - Email */}
							{renderField(
								deafApplicantFieldsArray[10],
								register,
								errors,
								'col-span-12 sm:col-span-16',
							)}
						</Section>
					</Fieldset>
					<Fieldset id='dadosDoResponsavelTecnico' className='pb-4'>
						<Legend>Dados do responsável técnico</Legend>
						<Section className='sm:grid-cols-24' variant='right'>
							{/* Nome */}
							{renderField(
								deafTechnicianFieldsArray[0],
								register,
								errors,
								'col-span-12 sm:col-span-24',
								disableTechnician,
							)}
							{/* CPF */}
							{renderMaskedField(
								deafTechnicianFieldsArray[1],
								CPF_CNPJ_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 sm:col-span-6',
								disableTechnician,
							)}
							{/* RG */}
							{renderMaskedField(
								deafTechnicianFieldsArray[2],
								RG_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-6 sm:col-span-6',
								disableTechnician,
							)}
							{/* Nacionalidade */}
							{renderField(
								deafTechnicianFieldsArray[15],
								register,
								errors,
								'col-span-6 sm:col-span-6',
								disableTechnician,
							)}
							{/* Estado civil */}
							{renderComboboxField(
								deafTechnicianFieldsArray[16],
								control,
								errors,
								setValue,
								'col-span-6 sm:col-span-6',
								'',
								disableTechnician,
							)}
							{/* Profissão */}
							{renderField(
								deafTechnicianFieldsArray[17],
								register,
								errors,
								'col-span-12 sm:col-span-7',
								disableTechnician,
							)}
							{/* Carteira de conselho profissional */}
							{renderField(
								deafTechnicianFieldsArray[3],
								register,
								errors,
								'col-span-12 sm:col-span-8',
								disableTechnician,
							)}
							{/* Conselho profissional */}
							{renderField(
								deafTechnicianFieldsArray[4],
								register,
								errors,
								'col-span-9 sm:col-span-6',
								disableTechnician,
							)}
							{/* UF da carteira profissional */}
							{renderComboboxField(
								deafTechnicianFieldsArray[5],
								control,
								errors,
								setValue,
								'col-span-3 sm:col-span-3',
								'',
								disableTechnician,
							)}
							{/* CEP */}
							{renderMaskedField(
								deafTechnicianFieldsArray[6],
								CEP_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-4 sm:col-span-4',
								disableTechnician,
							)}
							{/* Endereço */}
							{renderField(
								deafTechnicianFieldsArray[7],
								register,
								errors,
								'col-span-8 sm:col-span-17',
								disableTechnician,
							)}
							{windowWidth <= 640 && showCepAlertTechnician && (
								<div className='col-span-12 mx-1 -mt-2s sm:hidden'>
									<p className='text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								</div>
							)}
							{/* Número */}
							{renderMaskedField(
								deafTechnicianFieldsArray[8],
								NUMBER_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-3 sm:col-span-3',
								disableTechnician,
							)}
							{windowWidth > 640 && showCepAlertTechnician && (
								<div className='col-span-24 -mt-3 mb-4 max-sm:hidden'>
									<p className='text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								</div>
							)}
							{/* Complemento */}
							{renderField(
								deafTechnicianFieldsArray[9],
								register,
								errors,
								'col-span-9 sm:col-span-24',
								disableTechnician,
							)}
							{/* Bairro */}
							{renderField(
								deafTechnicianFieldsArray[10],
								register,
								errors,
								'col-span-6 sm:col-span-10',
								disableTechnician,
							)}
							{/* Cidade */}
							{renderField(
								deafTechnicianFieldsArray[11],
								register,
								errors,
								'col-span-6 sm:col-span-11',
								disableTechnician,
							)}
							{/* Estado */}
							{renderComboboxField(
								deafTechnicianFieldsArray[12],
								control,
								errors,
								setValue,
								'col-span-3 sm:col-span-3',
								watch('technician.personal_data.address.state'),
								disableTechnician,
							)}
							{/* Telefone */}
							{renderMaskedField(
								deafTechnicianFieldsArray[13],
								PHONE_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-9 sm:col-span-8',
								disableTechnician,
							)}
							{/* Email */}
							{renderField(
								deafTechnicianFieldsArray[14],
								register,
								errors,
								'col-span-12 sm:col-span-16',
								disableTechnician,
							)}
						</Section>
					</Fieldset>
				</div>
				<Fieldset id='dadosFlorestais' className='mt-4'>
					<Legend className='mb-2'>
						Dados florestais (quantidade atual: {deafFields.length})
					</Legend>
					{deafFields.map((item, index) => (
						<div key={item.id} className='mx-3 flex flex-row'>
							<Section variant='array'>
								<div className='mb-2 sm:col-span-2 md:col-span-4'>
									<TextInput
										register={register}
										fieldId={`data_forest.data.${index}.wood`}
										label='Nº árvore'
										value={(index + 1).toString()}
										readonly={true}
										inputType='text'
										required
										key={item.id}
									/>
								</div>
								{renderFieldArrayField(
									`data_forest.data.${index}.species_name`,
									deafFieldProps[1],
									register,
									errors,
									'md:col-span-5',
								)}
								<div className='mb-2 md:col-span-5 sm:col-span-6'>
									<FieldArrayMaskedTextInput
										control={control}
										fieldId={`data_forest.data.${index}.cap_cm`}
										maskitoOptions={NUMBER_MASKITO_OPTIONS}
										label={WOOD_CAP_CM}
										extraChange={() => calculateVolume(index)}
									/>
								</div>
								<div className='mb-2 md:col-span-5 sm:col-span-6'>
									<FieldArrayMaskedTextInput
										control={control}
										fieldId={`data_forest.data.${index}.height_m`}
										maskitoOptions={NUMBER_MASKITO_OPTIONS}
										label={WOOD_HEIGHT_M}
										extraChange={() => calculateVolume(index)}
									/>
								</div>
								{renderFieldArrayMaskedField(
									`data_forest.data.${index}.volume`,
									deafFieldProps[4],
									control,
									NUMBER_MASKITO_OPTIONS,
									errors,
									'sm:col-span-8 md:col-span-5',
									'',
									true,
								)}
							</Section>
							{deafFields.length > 1 && (
								<FieldArrayButton.Wrapper>
									<FieldArrayButton
										variant='remove'
										onClick={() => deafsRemove(index)}
									/>
								</FieldArrayButton.Wrapper>
							)}
						</div>
					))}

					<div className='mx-3 flex flex-row'>
						<Section
							className={deafFields.length > 1 ? 'gap-4  mr-[58px]' : 'gap-2'}
							variant='array'
						>
							<div
								className={
									deafFields.length > 1
										? 'md:col-span-18 lg:col-span-19'
										: 'md:col-span-19 lg:col-span-19'
								}
							/>
							<div className='sm:col-span-6 md:col-span-5 lg:col-span-5'>
								<div className='items-center'>
									{renderField(
										deafFieldData[0],
										register,
										errors,
										'col-span-3 lg:pl-0',
										false,
										true,
									)}
								</div>
							</div>
						</Section>
					</div>

					{deafFields.length < 10 && (
						<FieldArrayButton
							className={deafFields.length > 1 ? 'mr-[68px]' : ''}
							variant='append'
							onClick={() => deafsAppend(emptyDeafs)}
						/>
					)}
				</Fieldset>
				<Fieldset id='identificacaoDoImovel' className='mt-4 pb-4'>
					<Legend>Identificação do imóvel</Legend>
					<Section className='sm:grid-cols-24'>
						{/* Número do CAR */}
						{renderMaskedField(
							propertyFieldsArray[0],
							CAR_RECORD_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-12 sm:col-span-10 lg:col-span-11',
						)}
						<div className='col-span-12 sm:col-span-10 lg:col-span-10'>
							<div className='flex gap-2'>
								{/* Latitude */}
								{renderMaskedField(
									propertyFieldsArray[8],
									RONDONIA_LATITUDE_MASKITO_OPTIONS,
									control,
									errors,
									'mb-0 w-1/2',
								)}
								{/* Longitude */}
								{renderMaskedField(
									propertyFieldsArray[9],
									RONDONIA_LONGITUDE_MASKITO_OPTIONS,
									control,
									errors,
									'mb-0 w-1/2',
								)}
							</div>
							<ErrorMessage
								errors={errors}
								name='property.coordinates'
								render={({ message }) => (
									<span className='label-text-alt text-center block text-error mt-[7px]'>
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
						<div className='col-span-12 sm:col-span-4 lg:col-span-3'>
							{/* Endereço - CEP */}
							{renderMaskedField(
								propertyFieldsArray[1],
								CEP_MASKITO_OPTIONS,
								control,
								errors,
								'col-span-12 sm:col-span-4 lg:col-span-3',
							)}
							{showCepAlertProperty && (
								<div className='col-span-12 mx-1 mb-4'>
									<p className='text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								</div>
							)}
						</div>
						{/* Endereço - Logradouro */}
						{renderField(
							propertyFieldsArray[2],
							register,
							errors,
							'col-span-9 lg:col-span-6',
						)}
						{/* Endereço - Número */}
						{renderMaskedField(
							propertyFieldsArray[3],
							NUMBER_MASKITO_OPTIONS,
							control,
							errors,
							'col-span-3 lg:col-span-2',
						)}
						{/* Endereço - Complemento */}
						{renderField(
							propertyFieldsArray[4],
							register,
							errors,
							'col-span-12 lg:col-span-6',
						)}
						{/* Endereço - Bairro */}
						{renderField(
							propertyFieldsArray[5],
							register,
							errors,
							'col-span-12 sm:col-span-10 lg:col-span-4',
						)}
						{/* Endereço - Cidade */}
						{renderField(
							propertyFieldsArray[6],
							register,
							errors,
							'col-span-9 sm:col-span-10 lg:col-span-4',
						)}
						{/* Endereço - UF */}
						{renderComboboxField(
							propertyFieldsArray[7],
							control,
							errors,
							setValue,
							'col-span-3 sm:col-span-4 lg:col-span-2',
							watch('property.address.state'),
						)}
					</Section>
				</Fieldset>
				<Fieldset id='identificacaoDosAnexos'>
					<Legend>Anexos</Legend>
					<Section className='sm:grid-cols-24'>
						{/* Declaração de limpeza */}
						{renderField(
							deafFilesFieldsArray[0],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* Laudo profissional */}
						{renderField(
							deafFilesFieldsArray[1],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* ART */}
						{renderField(
							deafFilesFieldsArray[2],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* Mapa e CAR */}
						{renderField(
							deafFilesFieldsArray[3],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* Shapefile */}
						{renderField(
							deafFilesFieldsArray[4],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* Autorizações prévias */}
						{renderField(
							deafFilesFieldsArray[5],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{/* Declaração do órgão ambiental */}
						{renderField(
							deafFilesFieldsArray[6],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{renderField(
							deafFilesFieldsArray[7],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{renderField(
							deafFilesFieldsArray[8],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
						{renderField(
							deafFilesFieldsArray[9],
							register,
							errors,
							'col-span-12 sm:col-span-24',
						)}
					</Section>
				</Fieldset>
				<Separator sizing='xs' />
				<SubmitButton.Wrapper>
					<SubmitButton>Enviar</SubmitButton>
					<FollowUpButton>
						<Link href={'/area-usuario?service=deaf'}>
							Acompanhar solicitação
						</Link>
					</FollowUpButton>
				</SubmitButton.Wrapper>
			</form>

			<UploadProgressv2 statusList={status} />
		</FormContainer>
	);
}
