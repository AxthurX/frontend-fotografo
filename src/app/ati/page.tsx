"use client";

import UploadProgressv2 from "@/components/FileProgress/upload-progressv2";
import { FieldArrayButton } from "@/components/FormInputs/FieldArrayButton";
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
import {
  atiApplicantFieldsArray,
  certificateFieldProps,
  destinationFieldsArray,
  driverFieldProps,
  paymentFieldsArray,
  routeFieldProps,
  surveyCheckboxLabels,
  technicianFieldsArray,
  transportAuthorizationTypeArray,
  vehicleFieldsArray,
  wasteFieldProps,
} from "@/lib/forms/ati/fields";
import { IAtiSchema } from "@/lib/forms/ati/interfaces";
import { atiSchema } from "@/lib/forms/ati/schema";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import {
  renderComboboxField,
  renderField,
  renderFieldArrayComboboxField,
  renderFieldArrayField,
  renderFieldArrayMaskedField,
  renderMaskedField,
} from "@/lib/forms/generateFields";
import { ATI_CERTIFICATE_LABELS } from "@/lib/forms/labels";
import { zodErrorMap } from "@/lib/forms/zodErrorMap";
import {
  BARCODE_MASKITO_OPTIONS,
  CARGO_MASKITO_OPTIONS,
  CEP_MASKITO_OPTIONS,
  CPF_CNPJ_MASKITO_OPTIONS,
  LICENSE_PLATE_MASKITO_OPTIONS,
  NUMBER_MASKITO_OPTIONS,
  PHONE_MASKITO_OPTIONS,
  RG_MASKITO_OPTIONS,
} from "@/lib/maskito/masks";
import { onError } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import lodash from "lodash";
import get from "lodash/get";
import { ExternalLink } from "lucide-react";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

//Definição de objetos vazios para hook useFieldArray
const emptyRoute = { origin: "", destination: "", highways: "" };
const emptyDriver = {
  name: "",
  cnh: "",
  cnh_expiration: undefined,
  mopp_number: "",
  mopp_expiration: undefined,
};
const defaultCertificates = [
  { cert_type: "civ", number: "", expires_at: undefined },
  { cert_type: "cipp", number: "", expires_at: undefined },
  { cert_type: "antt", number: "", expires_at: undefined },
];
const emptyWaste = { name: "", classification: "", packaging: "" };
const emptyCheckbox = { checked: false };

export default function AtiForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setFocus,
    trigger,
    formState: { errors },
    getFieldState,
  } = useForm<ICombinedSchema>({
    resolver: zodResolver(atiSchema, { errorMap: zodErrorMap }),
    defaultValues: {
      routes: [emptyRoute],
      drivers: [emptyDriver],
      certificates: defaultCertificates,
      wastes: [emptyWaste],
      checkboxes: [emptyCheckbox, emptyCheckbox, emptyCheckbox],
    },
  });
  const [reqHash, setReqHash] = useState<string | null>(null);
  const route = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<Array<UploadStatus>>([]);
  const sector: string = "ati";
  const [trackingID, setTrackingID] = useState<string>();

  const updateUploadStatus = (currState: Array<UploadStatus>) => {
    const currStatus = currState.slice();
    setStatus(currStatus);
    console.log(status);
  };

  // Definição de hooks para uso de máscaras
  // Inputs mascarados são controlled inputs, ou seja, o valor está guardado dentro de um useState
  // Sabendo disso, precisaremos de uma chamada diferente de useMaskito() para cada campo que use a mesma máscara
  // serão utilizados nas chamadas de renderMaskedField mais abaixo
  const {
    fields: roadFields,
    append: roadAppend,
    remove: roadRemove,
  } = useFieldArray({
    control,
    name: "routes",
  });

  const {
    fields: driverFields,
    append: driverAppend,
    remove: driverRemove,
  } = useFieldArray({
    control,
    name: "drivers",
  });

  const { fields: checkboxFields } = useFieldArray({
    control,
    name: "checkboxes",
  });

  const {
    fields: wasteFields,
    append: wasteAppend,
    remove: wasteRemove,
  } = useFieldArray({
    control,
    name: "wastes",
  });

  const { fields: certificateFields } = useFieldArray({
    control,
    name: "certificates",
  });

  const onSubmit = async (data: IAtiSchema) => {
    const dataClone: Partial<IAtiSchema> = structuredClone(data);
    delete dataClone?.receipt;
    delete dataClone?.destination_license;
    const formData = {
      requirement: {
        ...dataClone,
      },
      files: {},
    };

    const files: Record<string, File> = {
      receipt: data.receipt[0],
      destination_license: data.destination_license[0],
    };

    formData.files = files;

    console.log("dados sem manipulação: ");
    console.log(data);
    console.log("dados pós-clonagem e remoção de algumas keys: ");
    console.log(formData);
    console.log("arquivos: ");
    console.log(files);

    try {
      const response = await axios.post("/api/ati", formData);

      toast({
        title: "Informação",
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
          title: "Erro",
          variant:"destructive",
          description: promise.message,
        });
      } else {
        toast({
          title: "Sucesso",
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

  const [fleetTypeClassNames, setFleetTypeClassNames] = useState(
    "col-span-12 md:col-span-24",
  );
  const [showCepAlert, setShowCepAlert] = useState(false);
  const [applicantAddressState, setApplicantAddressState] = useState<string>();
  const [showCepAlertTechnician, setShowCepAlertTechnician] = useState(false);
  const [technicianAddressState, setTechnicianAddressState] =
    useState<string>();
  const [showCepAlertDestination, setShowCepAlertDestination] = useState(false);
  const [destinationAddressState, setDestinationAddressState] =
    useState<string>();

  const validarCep = useCallback(
    async function (section: string) {
      if (section === "applicant") {
        const cep = getValues("applicant.personal_data.address.zipcode");
        if (cep && cep.length > 8) {
          try {
            const response = await fetch(`/api/cep?cep=${cep}`);
            if (response.ok) {
              setShowCepAlert(false);
              const data = await response.json();
              setValue(
                "applicant.personal_data.address.street",
                data?.logradouro,
              );
              setValue(
                "applicant.personal_data.address.city",
                data?.localidade,
              );
              setApplicantAddressState(data?.uf);
              setValue(
                "applicant.personal_data.address.district",
                data?.bairro,
              );
            } else {
              setShowCepAlert(true);
              await response.json();
            }
          } catch (error) {
            setShowCepAlert(true);
          }
        } else {
          return;
        }
      } else if (section === "technician") {
        const cep = getValues("technician.personal_data.address.zipcode");
        if (cep && cep.length > 8) {
          try {
            const response = await fetch(`/api/cep?cep=${cep}`);
            if (response.ok) {
              setShowCepAlertTechnician(false);
              const data = await response.json();
              setValue(
                "technician.personal_data.address.street",
                data?.logradouro,
              );
              setValue(
                "technician.personal_data.address.city",
                data?.localidade,
              );
              setTechnicianAddressState(data?.uf);
              setValue(
                "technician.personal_data.address.district",
                data?.bairro,
              );
            }
          } catch (err) {
            setShowCepAlertTechnician(true);
          }
        }
      } else if (section === "destination") {
        const cep = getValues("final_destination.address.zipcode");
        if (cep && cep.length > 8) {
          try {
            const response = await fetch(`/api/cep?cep=${cep}`);
            if (response.ok) {
              setShowCepAlertDestination(false);
              const data = await response.json();
              setValue("final_destination.address.street", data?.logradouro);
              setValue("final_destination.address.city", data?.localidade);
              setDestinationAddressState(data?.uf);
              setValue("final_destination.address.district", data?.bairro);
            }
          } catch (err) {
            setShowCepAlertDestination(true);
          }
        }
      }
    },
    [getValues, setValue],
  );

  const watchZipcode = watch("applicant.personal_data.address.zipcode");
  const watchZipcodeTechnician = watch(
    "technician.personal_data.address.zipcode",
  );
  const watchZipcodeDestination = watch("final_destination.address.zipcode");

  const watchFleetType = watch("fleet.type.select_type");
  const watchFleetOtherType = watch("fleet.type.other_type");

  useEffect(() => {
    if (watchFleetType && watchFleetType.toLowerCase() == "outros") {
      setFocus("fleet.type.other_type");
      setFleetTypeClassNames("col-span-12 sm:col-span-6 md:col-span-12");
    } else {
      setValue("fleet.type.other_type", "");
      setFleetTypeClassNames("col-span-12 md:col-span-24");
    }
  }, [setFocus, setValue, watchFleetType]);

  useEffect(() => {
    if (
      watchFleetType &&
      watchFleetOtherType != undefined &&
      // watchFleetOtherType != "" &&
      watchFleetOtherType.length < 2 &&
      watchFleetType.toLowerCase() == "outros" &&
      getFieldState("fleet.type.other_type").isDirty == true
    ) {
      trigger("fleet.type");
    }
  }, [watchFleetType, watchFleetOtherType, getFieldState, trigger]);

  useEffect(() => {
    validarCep("applicant");
  }, [validarCep, watchZipcode]);
  useEffect(() => {
    validarCep("technician");
  }, [validarCep, watchZipcodeTechnician]);
  useEffect(() => {
    validarCep("destination");
  }, [validarCep, watchZipcodeDestination]);

  return (
    <FormContainer>
      <Header>
        <Header.Title>Autorização de Transporte Intermunicipal</Header.Title>
        <Header.Body>
          O usuário declara, sob as penalidades do art. 299 do Código Penal, que
          as informações fornecidas são fiéis e verdadeiras, sem omissões ou
          dados que possam induzir a equívocos de julgamento, assumindo total
          responsabilidade pelo conteúdo declarado.
          <br />
          <br />A certidão pode ter sua autenticidade conferida através do
          número da autorização e CPF / CNPJ do requerente, disponíveis no
          documento. Em caso de dúvidas, veja nossas informações de contato{" "}
          <a
            className="text-blue-700 underline"
            href={"/contato"}
            target="_blank"
          >
            clicando aqui
            <ExternalLink size={16} className="mb-1 ml-1 inline" />
          </a>
          .
        </Header.Body>
      </Header>
      {/* TODO
      - save form values on page refresh (state store?)
      - look into react-hook-form's FormProvider to shave off the register={register} from literally all inputs
      */}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
        <div className="grid divide-x xl:grid-cols-2">
          <Fieldset id="identificacaoDoRequerente" className="pb-4">
            <Legend> Identificação do requerente</Legend>
            {/** INFORMAÇÕES NO ARRAY
             * 0 - Nome
             * 1 - CPF/CNPJ
             * 2 - Inscrição estadual
             * 3 - CEP
             * 4 - Endereço
             * 5 - Número
             * 6 - Complemento
             * 7 - Bairro
             * 8 - Cidade
             * 9 - Estado
             * 10 - Telefone
             * 11 - Email
             */}
            <Section variant="left">
              {/* Nome */}
              {renderField(
                atiApplicantFieldsArray[0],
                register,
                errors,
                "col-span-12 md:col-span-24",
              )}
              {/* CPF/CNPJ */}
              {renderMaskedField(
                atiApplicantFieldsArray[1],
                CPF_CNPJ_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 md:col-span-12",
              )}
              {/* Inscrição estadual */}
              {renderField(
                atiApplicantFieldsArray[2],
                register,
                errors,
                "col-span-6 md:col-span-12",
              )}
              {/* Dados pessoais - Endereço - CEP */}
              <div className="col-span-12 md:col-span-4">
                {renderMaskedField(
                  atiApplicantFieldsArray[3],
                  CEP_MASKITO_OPTIONS,
                  control,
                  errors,
                )}

                {showCepAlert && (
                  <p className="mx-0.5 mb-1 text-xs text-info text-opacity-80 md:hidden">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                )}
              </div>

              {/* Dados pessoais - Endereço - Endereço */}
              {renderField(
                atiApplicantFieldsArray[4],
                register,
                errors,
                "col-span-9 md:col-span-17",
              )}
              {/* Dados pessoais - Endereço - Número */}
              {renderMaskedField(
                atiApplicantFieldsArray[5],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-3 md:col-span-3",
              )}
              {showCepAlert && (
                <p className="col-span-full mx-0.5 -mt-3 mb-1 text-xs text-info text-opacity-80 max-md:hidden">
                  CEP informado não encontrado. Por favor, continue preenchendo
                  seus dados.
                </p>
              )}
              {/* Dados pessoais - Endereço - Complemento */}
              {renderField(
                atiApplicantFieldsArray[6],
                register,
                errors,
                "col-span-12 md:col-span-24",
              )}
              {/* Dados pessoais - Endereço - Bairro */}
              {renderField(
                atiApplicantFieldsArray[7],
                register,
                errors,
                "col-span-6 md:col-span-10",
              )}
              {/* Dados pessoais - Endereço - Cidade */}
              {renderField(
                atiApplicantFieldsArray[8],
                register,
                errors,
                "col-span-6 md:col-span-11",
              )}
              {/* Dados pessoais - Endereço - Estado */}
              {renderComboboxField(
                atiApplicantFieldsArray[9],
                control,
                errors,
                setValue,
                "col-span-3 md:col-span-3",
                applicantAddressState ?? "",
              )}
              {/* Dados pessoais - Telefone */}
              {renderMaskedField(
                atiApplicantFieldsArray[10],
                PHONE_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-9 md:col-span-8",
              )}
              {/* Dados pessoais - Email */}
              {renderField(
                atiApplicantFieldsArray[11],
                register,
                errors,
                "col-span-12 md:col-span-16",
              )}
            </Section>
          </Fieldset>
          <Fieldset id="dadosDoResponsavelTecnico" className="pb-4">
            <Legend> Dados do responsável técnico</Legend>
            {/**
             * Array Information:
             * technicianFieldsArray[0] - Nome
             * technicianFieldsArray[1] - CPF
             * technicianFieldsArray[2] - RG
             * technicianFieldsArray[3] - Carteira de conselho profissional
             * technicianFieldsArray[4] - Nome do conselho profissional
             * technicianFieldsArray[5] - UF da carteira profissional
             * technicianFieldsArray[6] - CEP
             * technicianFieldsArray[7] - Endereço
             * technicianFieldsArray[8] - Número
             * technicianFieldsArray[9] - Complemento
             * technicianFieldsArray[10] - Bairro
             * technicianFieldsArray[11] - Cidade
             * technicianFieldsArray[12] - Estado
             * technicianFieldsArray[13] - Telefone
             * technicianFieldsArray[14] - Email
             */}
            <Section variant="right">
              {/* Nome */}
              {renderField(
                technicianFieldsArray[0],
                register,
                errors,
                "col-span-12 md:col-span-18",
              )}
              {/* CPF */}
              {renderMaskedField(
                technicianFieldsArray[1],
                CPF_CNPJ_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 md:col-span-6",
              )}
              {/* RG */}
              {renderMaskedField(
                technicianFieldsArray[2],
                RG_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 md:col-span-6",
              )}
              {/* Carteira de conselho profissional */}
              {renderField(
                technicianFieldsArray[3],
                register,
                errors,
                "col-span-6 md:col-span-9",
              )}
              {/* Nome do conselho profissional */}
              {renderField(
                technicianFieldsArray[4],
                register,
                errors,
                "col-span-3 md:col-span-6",
              )}
              {/* UF da carteira profissional */}
              {renderComboboxField(
                technicianFieldsArray[5],
                control,
                errors,
                setValue,
                "col-span-3 md:col-span-3",
              )}
              {/* CEP */}
              <div className="col-span-12 md:col-span-4">
                {renderMaskedField(
                  technicianFieldsArray[6],
                  CEP_MASKITO_OPTIONS,
                  control,
                  errors,
                )}

                {showCepAlertTechnician && (
                  <p className="mx-0.5 -mt-1 mb-1 text-xs text-info text-opacity-80 md:hidden">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                )}
              </div>
              {/* Endereço */}
              {renderField(
                technicianFieldsArray[7],
                register,
                errors,
                "col-span-9 md:col-span-17",
              )}
              {/* Número */}
              {renderMaskedField(
                technicianFieldsArray[8],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-3 md:col-span-3",
              )}

              {showCepAlertTechnician && (
                <p className="col-span-full mx-0.5 -mt-3 mb-1 text-xs text-info text-opacity-80 max-md:hidden">
                  CEP informado não encontrado. Por favor, continue preenchendo
                  seus dados.
                </p>
              )}

              {/* Complemento */}
              {renderField(
                technicianFieldsArray[9],
                register,
                errors,
                "col-span-12 md:col-span-24",
              )}
              {/* Bairro */}
              {renderField(
                technicianFieldsArray[10],
                register,
                errors,
                "col-span-6 md:col-span-10",
              )}
              {/* Cidade */}
              {renderField(
                technicianFieldsArray[11],
                register,
                errors,
                "col-span-6 md:col-span-11",
              )}
              {/* Estado */}
              {renderComboboxField(
                technicianFieldsArray[12],
                control,
                errors,
                setValue,
                "col-span-3 md:col-span-3",
                technicianAddressState ?? "",
              )}
              {/* Telefone */}
              {renderMaskedField(
                technicianFieldsArray[13],
                PHONE_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-9 md:col-span-8",
              )}
              {/* Email */}
              {renderField(
                technicianFieldsArray[14],
                register,
                errors,
                "col-span-12 md:col-span-16",
              )}
            </Section>
          </Fieldset>
          <Fieldset id="dadosDoVeiculoDaAutorizacao" className="pb-4">
            <Legend> Dados do veículo da autorização</Legend>
            {/** INFORMAÇÕES NO ARRAY
             * 0 - Marca
             * 1 - Ano
             * 2 - Placa
             * 3 - Carga (toneladas)
             * 4 - Quantidade de vagões de carga
             * 5 - Tipo de veículo
             */}
            <Section variant="left">
              {/* Marca */}
              {renderField(
                vehicleFieldsArray[0],
                register,
                errors,
                "col-span-12 md:col-span-17",
              )}
              {/* Ano */}
              {renderMaskedField(
                vehicleFieldsArray[1],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 md:col-span-3",
              )}
              {/* Placa */}
              {renderMaskedField(
                vehicleFieldsArray[2],
                LICENSE_PLATE_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-6 md:col-span-4",
              )}
              {/* Tipo de veículo */}
              {renderComboboxField(
                vehicleFieldsArray[5],
                control,
                errors,
                setValue,
                fleetTypeClassNames,
              )}
              {watchFleetType && watchFleetType.toLowerCase() == "outros" && (
                <div className="col-span-12 sm:col-span-6 md:col-span-12">
                  {renderField(vehicleFieldsArray[6], register, errors, "")}
                  <ErrorMessage
                    errors={errors}
                    name="fleet.type"
                    render={({ message }) => (
                      <span className="label-text-alt mt-[-8px] block text-error">
                        {message}
                        {get(errors, ["fleet", "type", "root", "message"])}
                      </span>
                    )}
                  />
                </div>
              )}
              {/* Quantidade de vagões de carga */}
              {renderMaskedField(
                vehicleFieldsArray[4],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-12 sm:col-span-6 md:col-span-12",
              )}
              {/* Carga (toneladas) */}
              {renderMaskedField(
                vehicleFieldsArray[3],
                CARGO_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-12 sm:col-span-6 md:col-span-12",
              )}
              <div className="col-span-12 md:col-span-24">
                <section className="grid grid-cols-12 gap-2 sm:grid-cols-24">
                  {certificateFields.map((item, index) => (
                    <div
                      key={item.id}
                      className="mb-4 border border-sage-200 max-lg:p-2 max-sm:col-span-12 sm:col-span-8 sm:grid sm:gap-2 lg:px-2"
                    >
                      <div>
                        {renderFieldArrayMaskedField(
                          `certificates.${index}.number`,
                          certificateFieldProps[0],
                          control,
                          NUMBER_MASKITO_OPTIONS,
                          errors,
                          "sm:mb-5",
                          ATI_CERTIFICATE_LABELS[index],
                        )}
                        {renderFieldArrayField(
                          `certificates.${index}.expires_at`,
                          certificateFieldProps[1],
                          register,
                          errors,
                          "",
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </Section>
          </Fieldset>
          <Fieldset id="destinacaoFinal" className="pb-4">
            <Legend>Destinação final</Legend>
            {/** INFORMAÇÕES DA DESTINAÇÃO FINAL
             * 0 - Nome
             * 1 - CPF/CNPJ
             * 2 - Telefone
             * 3 - CEP
             * 4 - Endereço
             * 5 - Número
             * 6 - Complemento
             * 7 - Bairro
             * 8 - Cidade
             * 9 - Estado
             */}
            <Section variant="right">
              {/* Nome */}
              {renderField(
                destinationFieldsArray[0],
                register,
                errors,
                "col-span-12 md:col-span-24",
              )}
              {/* CPF/CNPJ */}
              {renderMaskedField(
                destinationFieldsArray[1],
                CPF_CNPJ_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-12 md:col-span-24",
              )}
              {/* CEP */}
              <div className="col-span-12 md:col-span-4">
                {renderMaskedField(
                  destinationFieldsArray[3],
                  CEP_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
                {showCepAlertDestination && (
                  <p className="mx-0.5 mb-1 text-xs text-info text-opacity-80 md:hidden">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                )}
              </div>
              {/* Endereço */}
              {renderField(
                destinationFieldsArray[4],
                register,
                errors,
                "col-span-9 md:col-span-17",
              )}
              {/* Número */}
              {renderMaskedField(
                destinationFieldsArray[5],
                NUMBER_MASKITO_OPTIONS,
                control,
                errors,
                "col-span-3 md:col-span-3",
              )}
              {showCepAlertDestination && (
                <p className="col-span-full -mt-3 mb-1 text-xs text-info text-opacity-80 max-md:hidden">
                  CEP informado não encontrado. Por favor, continue preenchendo
                  seus dados.
                </p>
              )}
              <div className="col-span-12 grid grid-cols-12 gap-2 border border-beige-100 md:col-span-24 md:grid-cols-24">
                {/* Complemento */}
                {renderField(
                  destinationFieldsArray[6],
                  register,
                  errors,
                  "col-span-12 md:col-span-24",
                )}
                {/* Bairro */}
                {renderField(
                  destinationFieldsArray[7],
                  register,
                  errors,
                  "col-span-6 md:col-span-8",
                )}
                {/* Cidade */}
                {renderField(
                  destinationFieldsArray[8],
                  register,
                  errors,
                  "col-span-6 md:col-span-8",
                )}
                {/* Estado */}
                {renderComboboxField(
                  destinationFieldsArray[9],
                  control,
                  errors,
                  setValue,
                  "col-span-3 md:col-span-3",
                  destinationAddressState ?? "",
                )}
                {/* Telefone */}
                {renderMaskedField(
                  destinationFieldsArray[2],
                  PHONE_MASKITO_OPTIONS,
                  control,
                  errors,
                  "col-span-9 md:col-span-5",
                )}
              </div>
            </Section>
          </Fieldset>
        </div>
        <Fieldset id="tipoDeAutorizacaoDeTransporte">
          <Legend className="mb-2"> Tipo de autorização de transporte</Legend>
          <div className="px-4">
            {renderField(transportAuthorizationTypeArray[0], register, errors)}
          </div>
          <Separator className="mb-4" />
          <div className="mb-2 px-4">
            {renderField(transportAuthorizationTypeArray[1], register, errors)}
          </div>
        </Fieldset>
        <Fieldset id="caracterizacaoDosResiduos">
          <Legend className="mb-2">
            Caracterização dos resíduos a serem transportados (quantidade atual:{" "}
            {wasteFields.length})
          </Legend>
          {/* Caracterização dos resíduos */}
          <Separator className="mb-4" />
          {wasteFields.map((item, index) => (
            <div key={item.id} className="mx-3 flex flex-row">
              <Section variant="array">
                {renderFieldArrayField(
                  `wastes.${index}.name`,
                  wasteFieldProps[0],
                  register,
                  errors,
                  "md:col-span-14 lg:col-span-9",
                )}
                {renderFieldArrayComboboxField(
                  `wastes.${index}.classification`,
                  wasteFieldProps[1],
                  control,
                  errors,
                  setValue,
                  "md:col-span-10 lg:col-span-6",
                )}
                {renderFieldArrayField(
                  `wastes.${index}.packaging`,
                  wasteFieldProps[2],
                  register,
                  errors,
                  "md:col-span-24 lg:col-span-9",
                )}
              </Section>
              {wasteFields.length > 1 && (
                <FieldArrayButton.Wrapper>
                  <FieldArrayButton
                    variant="remove"
                    onClick={() => wasteRemove(index)}
                  />
                </FieldArrayButton.Wrapper>
              )}
            </div>
          ))}
          {wasteFields.length < 10 && (
            <FieldArrayButton
              className={wasteFields.length > 1 ? "mr-[68px]" : ""}
              variant="append"
              onClick={() => wasteAppend(emptyWaste)}
            />
          )}
        </Fieldset>
        <Fieldset id="dadosDosMotoristas" className="my-4">
          <Legend>
            Dados dos motoristas (quantidade atual: {driverFields.length})
          </Legend>
          {driverFields.map((item, index) => (
            <div key={item.id} className="mx-3 flex flex-row">
              <Section variant="array">
                <div className="border border-beige-100 md:col-span-24 lg:col-span-8">
                  {renderFieldArrayField(
                    `drivers.${index}.name`,
                    driverFieldProps[0],
                    register,
                    errors,
                    "md:col-span-24 lg:col-span-8",
                  )}
                </div>
                <div className="border border-sage-200 px-2 md:col-span-24 md:grid md:grid-cols-24 md:gap-2 lg:col-span-8 lg:grid-cols-8">
                  {renderFieldArrayMaskedField(
                    `drivers.${index}.cnh`,
                    driverFieldProps[1],
                    control,
                    NUMBER_MASKITO_OPTIONS,
                    errors,
                    "md:col-span-12 lg:col-span-4",
                  )}
                  {renderFieldArrayField(
                    `drivers.${index}.cnh_expiration`,
                    driverFieldProps[2],
                    register,
                    errors,
                    "md:col-span-12 lg:col-span-4",
                  )}
                </div>
                <div className="border border-sage-200 px-2 md:col-span-24 md:grid md:grid-cols-24 md:gap-2 lg:col-span-8 lg:grid-cols-8">
                  {renderFieldArrayField(
                    `drivers.${index}.mopp_number`,
                    driverFieldProps[3],
                    register,
                    errors,
                    "md:col-span-12 lg:col-span-4",
                  )}
                  {renderFieldArrayField(
                    `drivers.${index}.mopp_expiration`,
                    driverFieldProps[4],
                    register,
                    errors,
                    "md:col-span-12 lg:col-span-4",
                  )}
                </div>
              </Section>
              {driverFields.length > 1 && (
                <FieldArrayButton.Wrapper>
                  <FieldArrayButton
                    variant="remove"
                    onClick={() => driverRemove(index)}
                  />
                </FieldArrayButton.Wrapper>
              )}
            </div>
          ))}
          {driverFields.length < 5 && (
            <FieldArrayButton
              className={driverFields.length > 1 ? "mr-[68px]" : ""}
              variant="append"
              onClick={() => driverAppend(emptyDriver)}
            />
          )}
        </Fieldset>
        <Fieldset id="rodoviasUtilizadas">
          <Legend>
            Rodovias a serem utilizadas (quantidade atual: {roadFields.length})
          </Legend>
          {roadFields.map((item, index) => (
            <div key={item.id} className="mx-3 flex flex-row">
              <Section variant="array">
                {renderFieldArrayField(
                  `routes.${index}.origin`,
                  routeFieldProps[0],
                  register,
                  errors,
                  "md:col-span-12 lg:col-span-8",
                )}
                {renderFieldArrayField(
                  `routes.${index}.destination`,
                  routeFieldProps[1],
                  register,
                  errors,
                  "md:col-span-12 lg:col-span-8",
                )}
                {renderFieldArrayField(
                  `routes.${index}.highways`,
                  routeFieldProps[2],
                  register,
                  errors,
                  "md:col-span-24 lg:col-span-8",
                )}
              </Section>
              {roadFields.length > 1 && (
                <FieldArrayButton.Wrapper>
                  <FieldArrayButton
                    variant="remove"
                    onClick={() => roadRemove(index)}
                  />
                </FieldArrayButton.Wrapper>
              )}
            </div>
          ))}
          {roadFields.length < 20 && (
            <FieldArrayButton
              className={"mb-4 " + (roadFields.length > 1 ? "mr-[68px]" : "")}
              variant="append"
              onClick={() => roadAppend(emptyRoute)}
            />
          )}
        </Fieldset>
        <hr />
        <Fieldset id="dadosDePagamento" className="mb-4">
          <Legend>Dados de pagamento</Legend>
          {/** INFORMAÇÕES DE PAGAMENTO
           * 0 - Código de barras
           * 1 - Comprovante de pagamento
           */}
          {/* Código de barras */}
          <section className="mx-3">
            {renderMaskedField(
              paymentFieldsArray[0],
              BARCODE_MASKITO_OPTIONS,
              control,
              errors,
            )}
            {/* Comprovante de pagamento */}
            {renderField(paymentFieldsArray[1], register, errors)}
          </section>
        </Fieldset>
        <Separator className="mb-4" />
        <Fieldset id="confirmacoes" className="mb-2">
          <span className="sr-only">Confirmações</span>
          {checkboxFields.map((item, index) => (
            <fieldset key={item.id} className="mx-4 my-2">
              {renderFieldArrayField(
                `checkboxes.${index}.checked`,
                surveyCheckboxLabels[index],
                register,
                errors,
              )}
            </fieldset>
          ))}
        </Fieldset>
        <Separator sizing="xs" className="mb-6" />
        <SubmitButton.Wrapper>
          <SubmitButton>Enviar</SubmitButton>
          <FollowUpButton>
            <Link href={"/area-usuario?service=ati"}>Acompanhar solicitação</Link>
          </FollowUpButton>
        </SubmitButton.Wrapper>
      </form>
      <UploadProgressv2 statusList={status}/>
      {/* <DevT control={control} /> */}
    </FormContainer>
  );
}
