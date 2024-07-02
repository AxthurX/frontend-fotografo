'use client';

import AlertComponent from '@/components/Alert';
import UploadProgressv2 from '@/components/FileProgress/upload-progressv2';
import { FollowUpButton } from '@/components/FormInputs/FollowUpButton';
import { SubmitButton } from '@/components/FormInputs/SubmitButton';
import Fieldset from '@/components/FormStructure/Fieldset';
import FormContainer from '@/components/FormStructure/FormContainer';
import { Header } from '@/components/FormStructure/Header';
import Legend from '@/components/FormStructure/Legend';
import Separator from '@/components/FormStructure/Separator';
import { useToast } from '@/components/ui/use-toast';
import { UploadStatus, sendFilesv4 } from '@/lib/file/sendFilesv4';
import { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import { alertsByOption } from '@/lib/forms/dof/alertsByOption';
import {
	applicantFieldsArray,
	dofApplicantFieldsArray,
} from '@/lib/forms/dof/fields';
import { IDofSchema } from '@/lib/forms/dof/interfaces';
import { dofSchema } from '@/lib/forms/dof/schema';
import {
	renderComboboxField,
	renderField,
	renderMaskedField,
} from '@/lib/forms/generateFields';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import {
	CEP_MASKITO_OPTIONS,
	CPF_CNPJ_MASKITO_OPTIONS,
	NUMBER_MASKITO_OPTIONS,
	PHONE_MASKITO_OPTIONS,
} from "@/lib/maskito/masks";
import { onError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import lodash from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function DofForm() {
	const {
		register,
		control,
		handleSubmit,
		getValues,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ICombinedSchema>({
		resolver: zodResolver(dofSchema, { errorMap: zodErrorMap }),
	});
	const [status, setStatus] = useState<Array<UploadStatus>>([]);
	const [reqHash, setReqHash] = useState<string | null>(null);
	const sector: string = 'dof';
	const watchAssunto = watch('subject');
	const route = useRouter();

	const renderAlert = () => {
		if (watchAssunto && alertsByOption[watchAssunto]) {
			return (
				<AlertComponent
					color='error'
					disableCloseBttn
					key={watchAssunto}
					title='Atenção'
				>
					{alertsByOption[watchAssunto]}
				</AlertComponent>
			);
		}
		return null;
	};

	const { toast } = useToast();

	const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatus(currStatus);
	};

	const onSubmit = async (data: IDofSchema) => {
		const dataClone: Partial<IDofSchema> = structuredClone(data);
		delete dataClone.dofFile;
		dataClone.legal_representative = data.applicant.legal_representative;
		delete dataClone.applicant?.legal_representative;
		const formData = {
			requirement: {
				...dataClone,
			},
			files: {},
		};

		if (data.dofFile) {
			const files: Record<string, File> = {
				dofFile: data.dofFile[0],
			};

			try {
				console.log(formData);
				const response = await axios.post('/api/dof', formData);

				toast({
					title: 'INFO',
					description: response.data.message,
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
						description: promise.message,
						variant: 'destructive',
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
		}
	};

	const [showCepAlert, setShowCepAlert] = useState(false);
	const validarCep = useCallback(async () => {
		const cep = getValues('applicant.personal_data.address.zipcode');
		if (cep && cep.length > 8) {
			try {
				const response = await fetch(`/api/cep?cep=${cep}`);

				if (response.ok) {
					setShowCepAlert(false);
					const data = await response.json();
					setValue('applicant.personal_data.address.street', data?.logradouro);
					setValue('applicant.personal_data.address.city', data?.localidade);
					setValue('applicant.personal_data.address.state', data?.uf);
					setValue('applicant.personal_data.address.district', data?.bairro);
				} else {
					setShowCepAlert(true);
					await response.json();
				}
			} catch (error) {
				setShowCepAlert(true);
				console.error(error);
			}
		} else {
			return;
		}
	}, [getValues, setValue]);

	const watchZipcode = watch('applicant.personal_data.address.zipcode');

	useEffect(() => {
		validarCep();
	}, [validarCep, watchZipcode]);

	const [showOrientationPdf, setShowOrientationPdf] = useState<boolean>(false);
	const handleClick = () => {
		setShowOrientationPdf(true);
		const orientacaoDiv: HTMLElement | null =
			document.getElementById('orientacao');
		orientacaoDiv?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<UploadProgressv2 statusList={status} />
			<FormContainer>
				<Header>
					<Header.Title>Documento de Origem Florestal</Header.Title>
					<Header.Body>
						<Link
							target='_blank'
							prefetch={false}
							href='/ext-files/copam/2020/02/Modelo DOF 2024.docx'
							className='underline'
						>
							Modelo de Requerimento para procedimentos no Sistema DOF
						</Link>
						<br />
						<br />
						Este serviço possui uma extensa lista de requisitos, a depender do
						assunto da solicitação.{' '}
						<Link
							target='_blank'
							prefetch={false}
							href='/ext-files/copam/2020/02/Portaria-n°77-2020-DOF.pdf'
							className='underline'
						>
							Listagem de documentos para anexar
						</Link>
						<br />
						<br />O usuário declara, sob as penalidades do art. 299 do Código
						Penal, que as informações fornecidas são fiéis e verdadeiras, sem
						omissões ou dados que possam induzir a equívocos de julgamento,
						assumindo total responsabilidade pelo conteúdo declarado.
					</Header.Body>
				</Header>
				<Separator id='separador' className='mb-0 h-12 bg-sage-200' />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Fieldset id='identificacaoDoRequerente' className='flex flex-col'>
						<Legend> Identificação do requerente</Legend>
						<div className='mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2'>
							{/* Nome */}
							<div className='col-span-4 max-md:col-span-full '>
								{renderField(applicantFieldsArray[0], register, errors)}
							</div>

							{/* CPF/CNPJ */}
							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								{renderMaskedField(
									applicantFieldsArray[1],
									CPF_CNPJ_MASKITO_OPTIONS,
									control,
									errors,
								)}
							</div>

							<div className='col-span-4 max-md:col-span-6 max-sm:col-span-full'>
								{renderMaskedField(
									dofApplicantFieldsArray[3],
									NUMBER_MASKITO_OPTIONS,
									control,
									errors,
								)}
							</div>

							{/* Dados pessoais - Endereço - CEP */}
							<div className='col-span-full'>
								{renderMaskedField(
									applicantFieldsArray[2],
									CEP_MASKITO_OPTIONS,
									control,
									errors,
								)}
								{showCepAlert && (
									<p className='mx-0.5 mb-1 text-xs text-info text-opacity-80'>
										CEP informado não encontrado. Por favor, continue
										preenchendo seus dados.
									</p>
								)}
							</div>

							{/* Dados pessoais - Endereço - Logradouro */}
							<div className='col-span-9 max-sm:col-span-full'>
								{renderField(applicantFieldsArray[3], register, errors)}
							</div>

							{/* Dados pessoais - Endereço - Número */}
							<div className='col-span-3 max-sm:col-span-full'>
								{renderMaskedField(
									applicantFieldsArray[4],
									NUMBER_MASKITO_OPTIONS,
									control,
									errors,
								)}
							</div>

							{/* Dados pessoais - Endereço - Complemento */}
							<div className='col-span-full'>
								{renderField(applicantFieldsArray[5], register, errors)}
							</div>

							{/* Dados pessoais - Endereço - Bairro */}
							<div className='col-span-4  max-sm:col-span-full'>
								{renderField(applicantFieldsArray[6], register, errors)}
							</div>

							{/* Dados pessoais - Endereço - Cidade */}
							<div className='col-span-4  max-sm:col-span-full'>
								{renderField(applicantFieldsArray[7], register, errors)}
							</div>

							{/* Dados pessoais - Endereço - Estado */}
							<div className='col-span-4  max-sm:col-span-full'>
								{renderComboboxField(
									applicantFieldsArray[8],
									control,
									errors,
									setValue,
								)}
							</div>

							{/* Dados pessoais - Telefone */}
							<div className='col-span-6  max-sm:col-span-full'>
								{renderMaskedField(
									applicantFieldsArray[9],
									PHONE_MASKITO_OPTIONS,
									control,
									errors,
								)}
							</div>

							{/* Dados pessoais - Email */}
							<div className='col-span-6  max-sm:col-span-full'>
								{renderField(applicantFieldsArray[10], register, errors)}
							</div>

							{/* RESPONSAVEL LEGAL */}
							<div className='col-span-full'>
								{renderField(dofApplicantFieldsArray[2], register, errors)}
							</div>

							{/* ASSUNTO */}
							<div className="col-span-full">
								{renderComboboxField(
									dofApplicantFieldsArray[12],
									control,
									errors,
									setValue,
								)}
								{renderAlert()}
							</div>
							{/* FILE */}
							<div className="col-span-full">
								<label className="label my-1 py-0" htmlFor="additional_information">
									Informações adicionais - qualquer informação que possa ajudar a entender melhor a sua solicitação
								</label>
								<textarea
									className="w-full rounded-none border border-beige-300 bg-beige-200 px-2 py-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400"
									rows={4}
									maxLength={2048}
									{...register("additional_information")}
								/>
							</div>
							<div className="col-span-full">
								{renderField(dofApplicantFieldsArray[11], register, errors)}

								<button
									type="button"
									onClick={handleClick}
									className="text-secondary-focus duration-400 cursor-pointer text-opacity-90 transition hover:underline"
								>
									{
										"Clique aqui para orientações sobre como juntar arquivos .pdf"
									}
								</button>
							</div>
						</div >
					</Fieldset >
					<Separator sizing="xs" className="mb-6" />
					<SubmitButton.Wrapper>
						<SubmitButton>Enviar</SubmitButton>
						<FollowUpButton>
							<Link href={"/area-usuario?service=dof"}>Acompanhar solicitação</Link>
						</FollowUpButton>
					</SubmitButton.Wrapper>
				</form >
				<div
					className={`${showOrientationPdf
						? "mt-6 opacity-100 transition duration-500 ease-in-out"
						: "duration-400 hidden opacity-0 transition ease-in-out"
						}`}
				>
					<Fieldset id="orientacao_sobre_pdf" className={"mb-3 flex flex-col "}>
						<Legend>Como juntar PDFs em um único arquivo</Legend>
						<Header.Body>
							<div className="mx-1 mb-1 flex justify-center px-2">
								<ul>
									<li>
										1 - Acesse o site:{" "}
										<a
											href="https://www.ilovepdf.com"
											target="_blank"
											rel="noopener noreferrer"
											className="link-hover link link-primary"
										>
											ilovepdf.com
										</a>
									</li>
									<li>
										2 - Selecione a opção
										{/* eslint-disable-next-line quotes */}
										<span className="text-red-500">{' "Juntar PDF"'}</span>
									</li>
									<li>3 - Selecione os arquivos no seu computador</li>
									<li>
										4 - Clique em
										{/* eslint-disable-next-line quotes */}
										<span className="text-red-500">{' "Juntar PDF"'}</span>
									</li>
									<li>
										5 - <span className="text-yellow-600">Aguarde</span> e faça
										o download
									</li>
								</ul>
							</div>
						</Header.Body>
					</Fieldset>
				</div>
				{/* <DevT control={control} /> */}
			</FormContainer >
		</>
	);
}
