"use client";

import UploadProgressv2 from "@/components/FileProgress/upload-progressv2";
import { FollowUpButton } from "@/components/FormInputs/FollowUpButton";
import { SubmitButton } from "@/components/FormInputs/SubmitButton";
import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Legend from "@/components/FormStructure/Legend";
import Section from "@/components/FormStructure/Section";
import Separator from "@/components/FormStructure/Separator";
import { useToast } from "@/components/ui/use-toast";
import { UploadStatus, sendFilesv4 } from "@/lib/file/sendFilesv4";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import {
  renderComboboxField,
  renderField,
  renderMaskedField,
} from "@/lib/forms/generateFields";
import {
  lpcaApplicantFieldsArray,
  lpcaFilesFieldsArray,
  lpcaTechnicianFieldsArray,
  propertyFieldsArray,
} from "@/lib/forms/lpca/fields";
import { ILpcaSchema } from "@/lib/forms/lpca/interfaces";
import { lpcaSchema } from "@/lib/forms/lpca/schema";
import { zodErrorMap } from "@/lib/forms/zodErrorMap";
import {
  CAR_RECORD_MASKITO_OPTIONS,
  CEP_MASKITO_OPTIONS,
  CPF_CNPJ_MASKITO_OPTIONS,
  NUMBER_MASKITO_OPTIONS,
  PHONE_MASKITO_OPTIONS,
  RG_MASKITO_OPTIONS,
  RONDONIA_LATITUDE_MASKITO_OPTIONS,
  RONDONIA_LONGITUDE_MASKITO_OPTIONS,
} from "@/lib/maskito/masks";
import { onError } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import lodash from "lodash";
import get from "lodash/get";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function LpcaForm() {
  const {
    watch,
    trigger,
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ICombinedSchema>({
    resolver: zodResolver(lpcaSchema, { errorMap: zodErrorMap }),
  });

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { unsubscribe } = watch(async (value) => {
      if (
        value.property?.coordinates?.longitude?.length == 13 &&
        value.property?.coordinates?.latitude?.length == 13
      ) {
        await trigger("property.coordinates");
        return async () =>
          await new Promise((resolve) => resolve(unsubscribe()));
      }
    });
  }, [trigger, watch]);
  const [status, setStatus] = useState<Array<UploadStatus>>([]);
  const { toast } = useToast();
  const [reqHash, setReqHash] = useState<string | null>(null);
  const [trackingID, setTrackingID] = useState(null);
  const sector: string = "lpca";
  const route = useRouter();

  const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
  const [showCepAlertTechnician, setShowCepAlertTechnician] = useState(false);
  const [showCepAlertProperty, setShowCepAlertProperty] = useState(false);

  function handleCepApiMessage(section: string, state: boolean) {
    if (section === "applicant") {
      setShowCepAlertApplicant(state);
    } else if (section === "technician") {
      setShowCepAlertTechnician(state);
    } else if (section === "property") {
      setShowCepAlertProperty(state);
    } else return;
  }

  const validarCep = useCallback(
    async function (section: string) {
      let sectionName:
        | "applicant.personal_data"
        | "technician.personal_data"
        | "property";
      switch (section) {
        case "applicant":
          sectionName = "applicant.personal_data";
          break;
        case "technician":
          sectionName = "technician.personal_data";
          break;
        case "property":
          sectionName = "property";
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
        } catch (error) {
          handleCepApiMessage(section, true);
        }
      } else {
        return;
      }
    },
    [getValues, setValue],
  );

  const watchZipcodeApplicant = watch(
    "applicant.personal_data.address.zipcode",
  );
  const watchZipcodeActivity = watch(
    "technician.personal_data.address.zipcode",
  );
  const watchZipcodeProperty = watch("property.address.zipcode");

  useEffect(() => {
    validarCep("applicant");
  }, [validarCep, watchZipcodeApplicant]);
  useEffect(() => {
    validarCep("technician");
  }, [validarCep, watchZipcodeActivity]);
  useEffect(() => {
    validarCep("property");
  }, [validarCep, watchZipcodeProperty]);

  const updateUploadStatus = (currState: Array<UploadStatus>) => {
		const currStatus = currState.slice();
		setStatus(currStatus);
	};

  const onSubmit = async (data: ILpcaSchema) => {
    const dataClone: Partial<ILpcaSchema> = structuredClone(data);
    delete dataClone?.lpcaFiles;

    console.log(dataClone);

    const files: Record<string, File> = {
      cleaning_declaration: data.lpcaFiles.cleaning_declaration[0],
      professional_report: data.lpcaFiles.professional_report[0],
      technical_responsibility_note: data.lpcaFiles.technical_responsibility_note[0],
      property_map_and_car: data.lpcaFiles.property_map_and_car[0],
      shapefile_folder: data.lpcaFiles.shapefile_folder[0],
      previous_native_vegetation_suppression_authorizations:
        data.lpcaFiles.previous_native_vegetation_suppression_authorizations[0],
      environmental_agency_declaration:
        data.lpcaFiles.environmental_agency_declaration[0],
    };

    const formData = {
      requirement: {
        ...dataClone,
      },
    };

    try {
      const response = await axios.post("/api/lpca", {
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
          title: "Erro",
          description: promise.message,
        });
      } else {
        toast({
          title: "Sucesso",
          description: response.data.message,
        });
      }

      console.log(response.data.tracking_id, formData.requirement.applicant?.cpf_cnpj);
      if (response.data.tracking_id && formData.requirement?.applicant?.cpf_cnpj && formData.requirement?.applicant?.cpf_cnpj?.length > 4) {
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

  return (
    <FormContainer>
      <Header>
        <Header.Title>
          Limpeza de Pastagem e/ou Cultura Agrícola em Imóvel Rural
        </Header.Title>
        <Header.Body>
          O usuário declara, sob as penalidades do art. 299 do Código Penal, que
          as informações fornecidas são fiéis e verdadeiras, sem omissões ou
          dados que possam induzir a equívocos de julgamento, assumindo total
          responsabilidade pelo conteúdo declarado. <br />
          <br />
          <b>Orientações:</b>
          <br />
          Preencher corretamente os dados do formulário solicitado.
          <br />O padrão de Coordenadas Geográficas deve ser preenchido de
          acordo com o formato <b>Geodésico</b>
          <br />
          <br />
          <b>Exemplo:</b>
          <br />
          Graus, minutos e segundos (DDDº MM’ SS”) <br />
          Latitude: 09°05’56″S <br />
          Longitude: 61°40’30″O <br />
          <br />
          <b>Observações:</b>
          <br />
          <li>
            Preenchimentos incorretos podem acarretar em reprovação da análise.
          </li>
          <li>
            Após o cadastro, solicitamos que o número de acompanhamento
            informado seja devidamente anotado para futuros acompanhamentos na
            análise.
          </li>
        </Header.Body>
      </Header>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
        <div className="grid divide-x xl:grid-cols-2">
          <Fieldset id="identificacaoDoRequerente" className="pb-4">
            <Legend> Identificação do requerente</Legend>
            {/** INFORMAÇÕES NO ARRAY
             * 0 - Nome
             * 1 - CPF/CNPJ
             * 2 - CEP
             * 3 - Endereço
             * 4 - Número
             * 5 - Complemento
             * 6 - Bairro
             * 7 - Cidade
             * 8 - Estado
             * 9 - Telefone
             * 10 - Email
             * 11 - Nacionalidade
             * 12 - Estado civil
             * 13 - Profissão
             * 14 - RG
             * 15 - Inscrição estadual
             */}
            <Section className="sm:grid-cols-24" variant="left">
              {/* Nome */}
              {renderField(
                lpcaApplicantFieldsArray[0],
                register,
                errors,
                "col-span-12 sm:col-span-24",
              )}
              {/* CPF/CNPJ */}
              {renderMaskedField(
                lpcaApplicantFieldsArray[1],
                CPF_CNPJ_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* RG */}
              {renderMaskedField(
                lpcaApplicantFieldsArray[14],
                RG_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* Nacionalidade */}
              {renderField(
                lpcaApplicantFieldsArray[11],
                register,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* Estado civil */}
              {renderComboboxField(
                lpcaApplicantFieldsArray[12],
                control,
                errors,
                setValue,
                "col-span-6 sm:col-span-6",
              )}
              {/* Profissão */}
              {renderField(
                lpcaApplicantFieldsArray[13],
                register,
                errors,
                "col-span-12 sm:col-span-12",
              )}
              {/* Inscrição estadual */}
              {renderField(
                lpcaApplicantFieldsArray[15],
                register,
                errors,
                "col-span-12 sm:col-span-12",
              )}
              {/* Dados pessoais - Endereço - CEP */}
              {renderMaskedField(
                lpcaApplicantFieldsArray[2],
                CEP_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-4 sm:col-span-4",
              )}
              {/* Dados pessoais - Endereço - Endereço */}
              {renderField(
                lpcaApplicantFieldsArray[3],
                register,
                errors,
                "col-span-8 sm:col-span-17",
              )}
              {windowWidth <= 640 && showCepAlertApplicant && (
                <div className="col-span-12 mx-1 -mt-3 mb-4 sm:hidden">
                  <p className="text-xs text-info text-opacity-80">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                </div>
              )}
              {/* Dados pessoais - Endereço - Número */}
              {renderMaskedField(
                lpcaApplicantFieldsArray[4],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-3 sm:col-span-3",
              )}
              {windowWidth > 640 && showCepAlertApplicant && (
                <div className="col-span-24 -mt-3 mb-4 max-sm:hidden">
                  <p className="text-xs text-info text-opacity-80">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                </div>
              )}
              {/* Dados pessoais - Endereço - Complemento */}
              {renderField(
                lpcaApplicantFieldsArray[5],
                register,
                errors,
                "col-span-9 sm:col-span-24",
              )}
              {/* Dados pessoais - Endereço - Bairro */}
              {renderField(
                lpcaApplicantFieldsArray[6],
                register,
                errors,
                "col-span-6 sm:col-span-10",
              )}
              {/* Dados pessoais - Endereço - Cidade */}
              {renderField(
                lpcaApplicantFieldsArray[7],
                register,
                errors,
                "col-span-6 sm:col-span-11",
              )}
              {/* Dados pessoais - Endereço - Estado */}
              {renderComboboxField(
                lpcaApplicantFieldsArray[16],
                control,
                errors,
                setValue,
                "col-span-3 sm:col-span-3",
                watch("applicant.personal_data.address.state"),
              )}
              {/* Dados pessoais - Telefone */}
              {renderMaskedField(
                lpcaApplicantFieldsArray[9],
                PHONE_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-9 sm:col-span-8",
              )}
              {/* Dados pessoais - Email */}
              {renderField(
                lpcaApplicantFieldsArray[10],
                register,
                errors,
                "col-span-12 sm:col-span-16",
              )}
            </Section>
          </Fieldset>
          <Fieldset id="identificacaoDoTecnico" className="pb-4">
            <Legend>Dados do responsável técnico</Legend>
            {/** INFORMAÇÕES NO ARRAY
             * 0 - Nome
             * 1 - CPF
             * 2 - RG
             * 3 - Carteira de conselho profissional
             * 4 - Conselho profissional
             * 5 - UF da carteira profissional
             * 6 - CEP
             * 7 - Endereço
             * 8 - Número
             * 9 - Complemento
             * 10 - Bairro
             * 11 - Cidade
             * 12 - Estado
             * 13 - Telefone
             * 14 - Email
             * 15 - Nacionalidade
             * 16 - Estado civil
             * 17 - Profissão
             */}
            <Section className="sm:grid-cols-24" variant="right">
              {/* Nome */}
              {renderField(
                lpcaTechnicianFieldsArray[0],
                register,
                errors,
                "col-span-12 sm:col-span-24",
              )}
              {/* CPF */}
              {renderMaskedField(
                lpcaTechnicianFieldsArray[1],
                CPF_CNPJ_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* RG */}
              {renderMaskedField(
                lpcaTechnicianFieldsArray[2],
                RG_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* Nacionalidade */}
              {renderField(
                lpcaTechnicianFieldsArray[15],
                register,
                errors,
                "col-span-6 sm:col-span-6",
              )}
              {/* Estado civil */}
              {renderComboboxField(
                lpcaTechnicianFieldsArray[16],
                control,
                errors,
                setValue,
                "col-span-6 sm:col-span-6",
              )}
              {/* Profissão */}
              {renderField(
                lpcaTechnicianFieldsArray[17],
                register,
                errors,
                "col-span-12 sm:col-span-7",
              )}
              {/* Carteira de conselho profissional */}
              {renderField(
                lpcaTechnicianFieldsArray[3],
                register,
                errors,
                "col-span-12 sm:col-span-8",
              )}
              {/* Conselho profissional */}
              {renderField(
                lpcaTechnicianFieldsArray[4],
                register,
                errors,
                "col-span-9 sm:col-span-6",
              )}
              {/* UF da carteira profissional */}
              {renderComboboxField(
                lpcaTechnicianFieldsArray[5],
                control,
                errors,
                setValue,
                "col-span-3 sm:col-span-3",
              )}
              {/* CEP */}
              {renderMaskedField(
                lpcaTechnicianFieldsArray[6],
                CEP_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-4 sm:col-span-4",
              )}
              {/* Endereço */}
              {renderField(
                lpcaTechnicianFieldsArray[7],
                register,
                errors,
                "col-span-8 sm:col-span-17",
              )}
              {windowWidth <= 640 && showCepAlertTechnician && (
                <div className="col-span-12 mx-1 -mt-3 mb-4 sm:hidden">
                  <p className="text-xs text-info text-opacity-80">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                </div>
              )}
              {/* Número */}
              {renderMaskedField(
                lpcaTechnicianFieldsArray[8],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-3 sm:col-span-3",
              )}
              {windowWidth > 640 && showCepAlertTechnician && (
                <div className="col-span-24 -mt-3 mb-4 max-sm:hidden">
                  <p className="text-xs text-info text-opacity-80">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                </div>
              )}
              {/* Complemento */}
              {renderField(
                lpcaTechnicianFieldsArray[9],
                register,
                errors,
                "col-span-9 sm:col-span-24",
              )}
              {/* Bairro */}
              {renderField(
                lpcaTechnicianFieldsArray[10],
                register,
                errors,
                "col-span-6 sm:col-span-10",
              )}
              {/* Cidade */}
              {renderField(
                lpcaTechnicianFieldsArray[11],
                register,
                errors,
                "col-span-6 sm:col-span-11",
              )}
              {/* Estado */}
              {renderComboboxField(
                lpcaTechnicianFieldsArray[12],
                control,
                errors,
                setValue,
                "col-span-3 sm:col-span-3",
                watch("technician.personal_data.address.state"),
              )}
              {/* Telefone */}
              {renderMaskedField(
                lpcaTechnicianFieldsArray[13],
                PHONE_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-9 sm:col-span-8",
              )}
              {/* Email */}
              {renderField(
                lpcaTechnicianFieldsArray[14],
                register,
                errors,
                "col-span-12 sm:col-span-16",
              )}
            </Section>
          </Fieldset>
        </div>
        <Fieldset id="identificacaoDoImovel" className="pb-4">
          <Legend>Identificação do imóvel</Legend>
          {/** INFORMAÇÕES NO ARRAY
           * 0 - Número do CAR
           * 1 - Endereço - CEP
           * 2 - Endereço - Logradouro
           * 3 - Endereço - Número
           * 4 - Endereço - Complemento
           * 5 - Endereço - Bairro
           * 6 - Endereço - Cidade
           * 7 - Endereço - UF
           * 8 - Coordenadas - Latitude
           * 9 - Coordenadas - Longitude
           */}
          <Section className="sm:grid-cols-24">
            {/* Número do CAR */}
            {renderMaskedField(
              propertyFieldsArray[0],
              CAR_RECORD_MASKITO_OPTIONS,
              control,
              errors,
              "col-span-12 sm:col-span-10 lg:col-span-11",
            )}
            <div className="col-span-12 sm:col-span-10 lg:col-span-10">
              <div className="flex gap-2">
                {/* Latitude */}
                {renderMaskedField(
                  propertyFieldsArray[8],
                  RONDONIA_LATITUDE_MASKITO_OPTIONS,
                  control,
                  errors,
                  "mb-0 w-1/2",
                )}
                {/* Longitude */}
                {renderMaskedField(
                  propertyFieldsArray[9],
                  RONDONIA_LONGITUDE_MASKITO_OPTIONS,
                  control,
                  errors,
                  "mb-0 w-1/2",
                )}
              </div>
              <ErrorMessage
                errors={errors}
                name="property.coordinates"
                render={({ message }) => (
                  <span className="label-text-alt block text-error">
                    {message}
                    {get(errors, [
                      "property",
                      "coordinates",
                      "root",
                      "message",
                    ])}
                  </span>
                )}
              />
            </div>
            <div className="col-span-12 sm:col-span-4 lg:col-span-3">
              {/* Endereço - CEP */}
              {renderMaskedField(
                propertyFieldsArray[1],
                CEP_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-12 sm:col-span-4 lg:col-span-3",
              )}
              {showCepAlertProperty && (
                <div className="col-span-12 mx-1 mb-4">
                  <p className="text-xs text-info text-opacity-80">
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
              "col-span-9 lg:col-span-6",
            )}
            {/* Endereço - Número */}
            {renderMaskedField(
              propertyFieldsArray[3],
              NUMBER_MASKITO_OPTIONS,
              control,
              errors,
              "col-span-3 lg:col-span-2",
            )}
            {/* Endereço - Complemento */}
            {renderField(
              propertyFieldsArray[4],
              register,
              errors,
              "col-span-12 lg:col-span-6",
            )}
            {/* Endereço - Bairro */}
            {renderField(
              propertyFieldsArray[5],
              register,
              errors,
              "col-span-12 sm:col-span-10 lg:col-span-4",
            )}
            {/* Endereço - Cidade */}
            {renderField(
              propertyFieldsArray[6],
              register,
              errors,
              "col-span-9 sm:col-span-10 lg:col-span-4",
            )}
            {/* Endereço - UF */}
            {renderComboboxField(
              propertyFieldsArray[7],
              control,
              errors,
              setValue,
              "col-span-3 sm:col-span-4 lg:col-span-2",
              watch("property.address.state"),
            )}
          </Section>
        </Fieldset>
        <Fieldset id="identificacaoDosAnexos">
          <Legend>Anexos</Legend>
          {/** INFORMAÇÕES NO ARRAY
           * 0 - Declaração de limpeza
           * 1 - Laudo profissional
           * 2 - ART
           * 3 - Mapa e CAR
           * 4 - Shapefile
           * 5 - Autorizações prévias
           * 6 - Declaração do órgão ambiental
           */}
          <Section className="sm:grid-cols-24">
            {/* Declaração de limpeza */}
            {renderField(
              lpcaFilesFieldsArray[0],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* Laudo profissional */}
            {renderField(
              lpcaFilesFieldsArray[1],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* ART */}
            {renderField(
              lpcaFilesFieldsArray[2],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* Mapa e CAR */}
            {renderField(
              lpcaFilesFieldsArray[3],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* Shapefile */}
            {renderField(
              lpcaFilesFieldsArray[4],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* Autorizações prévias */}
            {renderField(
              lpcaFilesFieldsArray[5],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
            {/* Declaração do órgão ambiental */}
            {renderField(
              lpcaFilesFieldsArray[6],
              register,
              errors,
              "col-span-12 sm:col-span-24",
            )}
          </Section>
        </Fieldset>
        <Separator sizing="xs" />
        <SubmitButton.Wrapper>
          <SubmitButton>Enviar</SubmitButton>
          <FollowUpButton>
            <Link href={"/area-usuario?service=lpca"}>Acompanhar solicitação</Link>
          </FollowUpButton>
        </SubmitButton.Wrapper>
      </form>
      {/* <DevT control={control} /> */}
      <UploadProgressv2 statusList={status}/>
    </FormContainer>
  );
}
