"use client";

import { FollowUpButton } from "@/components/FormInputs/FollowUpButton";
import { SubmitButton } from "@/components/FormInputs/SubmitButton";
import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Legend from "@/components/FormStructure/Legend";
import Separator from "@/components/FormStructure/Separator";
import { useToast } from "@/components/ui/use-toast";
import {
  cilaActivityFieldArray,
  cilaApplicantFieldsArray,
} from "@/lib/forms/cila/fields";
import { ICilaSchema } from "@/lib/forms/cila/interfaces";
import { cilaSchema } from "@/lib/forms/cila/schemas";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import {
  renderComboboxField,
  renderField,
  renderMaskedField,
} from "@/lib/forms/generateFields";
import {
  COLMAM_ACTIVITY_LOCATION_LABEL,
  COLMAM_CONSEPA_CRITERIA_CHECKBOX_LABEL,
} from "@/lib/forms/labels";
import { zodErrorMap } from "@/lib/forms/zodErrorMap";
import {
  CEP_MASKITO_OPTIONS,
  CPF_CNPJ_MASKITO_OPTIONS,
  NUMBER_MASKITO_OPTIONS,
  PHONE_MASKITO_OPTIONS,
} from "@/lib/maskito/masks";
import { onError } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import lodash from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import dynamic from "next/dynamic";
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function CilaForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ICombinedSchema>({
    resolver: zodResolver(cilaSchema, { errorMap: zodErrorMap }),
  });

  const { toast } = useToast();
  const [showCepAlert, setShowCepAlert] = useState(false);
  const route = useRouter();
  const validarCep = useCallback(
    async function () {
      const cep = getValues("requirement.activity.address.zipcode");
      if (cep && cep.length > 8) {
        try {
          const response = await fetch(`/api/cep?cep=${cep}`);

          if (response.ok) {
            setShowCepAlert(false);
            const data = await response.json();
            setValue("requirement.activity.address.street", data?.logradouro);
            setValue("requirement.activity.address.city", data?.localidade);
            setValue("requirement.activity.address.state", data?.uf);
            setValue("requirement.activity.address.district", data?.bairro);
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
    },
    [getValues, setValue],
  );

  const watchZipcode = watch("requirement.activity.address.zipcode");
  useEffect(() => {
    validarCep();
  }, [validarCep, watchZipcode]);

  const onSubmit = async (requirement: ICilaSchema) => {
    const formData = requirement;
    console.log(formData);

    try {
      await axios.post("/api/cila", formData).then((res) => {
        res.status === 201
          ? toast({
            title: "Sucesso",
            description: res.data.message,
          })
          : toast({
            title: "Erro",
            description:
              "Não foi possível enviar os dados, tente novamente mais tarde.",
            variant: "destructive",
          });

        if (
          res.data.tracking_id &&
          formData.requirement.applicant?.cpf_cnpj &&
          formData.requirement.applicant?.cpf_cnpj.length > 5
        ) {
          lodash.delay(() => {
            route.push(
              `area-usuario?tracking_id=${res.data.tracking_id}&cpf_cnpj=${formData.requirement.applicant?.cpf_cnpj}&service=cila`,
            );
          }, 1500);
        }
      });
    } catch (err) {
      onError(err);
    }
  };

  const [firstCheckbox, setFirstCheckbox] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);
  const [thirdCheckbox, setThirdCheckbox] = useState(false);

  return (
    <>
      <FormContainer>
        <Header>
          <Header.Title>
            Certidão de Inexigibilidade de Licenciamento Ambiental
          </Header.Title>
          <Header.Body>
            O usuário declara, sob as penalidades do art. 299 do Código Penal,
            que as informações fornecidas são fiéis e verdadeiras, sem omissões
            ou dados que possam induzir a equívocos de julgamento, assumindo
            total responsabilidade pelo conteúdo declarado.
            <br />
            <br />
            A Certidão pode ter sua AUTENTICIDADE conferida através do número
            impresso e do CPF / CNPJ cadastrado.
            <br />
            <Link
              href="/area-usuario"
              className="link-hover link link-primary underline-offset-1"
            >
              Se você já possui uma solicitação em andamento, clique aqui
            </Link>
          </Header.Body>
        </Header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
          <Fieldset id="identificacaoDoRequerente" className="pb-4">
            <Legend> Identificação do requerente</Legend>
            <div className="mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2">
              <div
                id="Name"
                className="col-span-3 max-md:col-span-6 max-sm:col-span-full"
              >
                {renderField(cilaApplicantFieldsArray[0], register, errors)}
              </div>
              <div
                id="CPF / CNPJ"
                className="col-span-3 max-md:col-span-6 max-sm:col-span-full"
              >
                {renderMaskedField(
                  cilaApplicantFieldsArray[1],
                  CPF_CNPJ_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
              <div
                id="Email"
                className="col-span-3 max-md:col-span-6 max-sm:col-span-full"
              >
                {renderField(cilaApplicantFieldsArray[2], register, errors)}
              </div>
              <div
                id="Telefone"
                className="col-span-3 max-md:col-span-6 max-sm:col-span-full"
              >
                {renderMaskedField(
                  cilaApplicantFieldsArray[3],
                  PHONE_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
            </div>
          </Fieldset>
          <Fieldset id="caracterizacaoDaAtividade" className="pb-4">
            <Legend>Caracterização da atividade</Legend>
            <div className="mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2">
              <div className="col-span-full">
                {renderComboboxField(
                  cilaActivityFieldArray[0],
                  control,
                  errors,
                  setValue,
                )}
              </div>
              <div id="Localização" className="col-span-full mb-4">
                <div className="mb-2 sm:flex sm:flex-row sm:gap-2">
                  <legend className="label">
                    {COLMAM_ACTIVITY_LOCATION_LABEL}
                  </legend>
                  <div className="flex gap-x-2 max-sm:flex-col">
                    <div className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        id="rural"
                        className="radio-primary radio border-beige-300 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                        value={0}
                        {...register("requirement.activity.location")}
                      />
                      <label className="label" htmlFor="rural">
                        {" "}
                        Zona rural
                      </label>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        id="urbana"
                        className="radio-primary radio border-beige-300 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                        value={1}
                        {...register("requirement.activity.location")}
                      />
                      <label htmlFor="urbana" className="label">
                        {" "}
                        Zona urbana
                      </label>
                    </div>
                  </div>
                </div>
                {errors && (
                  <div className="-mt-4 mb-2 ml-1">
                    <ErrorMessage
                      errors={errors}
                      name={"requirement.activity.location"}
                      render={({ message }) => (
                        <span className="my-1 text-xs text-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                )}
              </div>

              <div id="CEP" className="col-span-full">
                {renderMaskedField(
                  cilaActivityFieldArray[2],
                  CEP_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
                {showCepAlert && (
                  <p className="mx-0.5 mb-1 text-xs text-info text-opacity-80">
                    CEP informado não encontrado. Por favor, continue
                    preenchendo seus dados.
                  </p>
                )}
              </div>

              <div id="Logradouro" className="col-span-9 max-sm:col-span-full">
                {renderField(cilaActivityFieldArray[3], register, errors)}
              </div>
              <div id="Numero" className="col-span-3 max-sm:col-span-full">
                {renderMaskedField(
                  cilaActivityFieldArray[4],
                  NUMBER_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
              <div id="Bairro" className="col-span-12 max-md:col-span-full">
                {renderField(cilaActivityFieldArray[5], register, errors)}
              </div>
              <div id="Complemento" className="col-span-4 max-sm:col-span-full">
                {renderField(cilaActivityFieldArray[6], register, errors)}
              </div>
              <div id="Cidade" className="col-span-4 max-sm:col-span-full">
                {renderField(cilaActivityFieldArray[7], register, errors)}
              </div>
              <div id="UF" className="col-span-4 max-sm:col-span-full">
                {renderField(cilaActivityFieldArray[8], register, errors)}
              </div>
            </div>
          </Fieldset>
          <Fieldset id="informacoesAdicionais">
            <Legend>Informações adicionais</Legend>
            <div className="mx-1 mb-2 px-2">
              <textarea
                className="w-full rounded-none border border-beige-300 bg-beige-200 px-2 py-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400"
                rows={4}
                maxLength={1250}
                placeholder="Insira suas informações adicionais aqui"
                {...register("requirement.additional_information")}
              />
            </div>
          </Fieldset>
          <Separator className="my-4" />
          <div className="mx-1 mb-2 px-2">
            <div className="my-3 inline-flex items-center gap-1">
              <input
                type="checkbox"
                id="firstCheckbox"
                className="checkbox-primary checkbox border-beige-200 bg-beige-50  focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                onChange={(e) => {
                  setFirstCheckbox(e.target.checked);
                }}
              />
              <label htmlFor={"firstCheckbox"} className="label">
                {/* DECLARO QUE A ATIVIDADE ATENDE AOS CRITÉRIOS ESTABELECIDOS NO
                ART. 1º DA RESOLUÇÃO N. 01/2019/SEDAM-CONSEPA */}
                {COLMAM_CONSEPA_CRITERIA_CHECKBOX_LABEL}
              </label>
            </div>
            <div className="mb-3 inline-flex items-center gap-1">
              <input
                type="checkbox"
                id="secondCheckbox"
                className="checkbox-primary checkbox mt-3 border-beige-200 bg-beige-50  focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                onChange={(e) => {
                  setSecondCheckbox(e.target.checked);
                }}
              />

              <label htmlFor={"secondCheckbox"} className="flex flex-col">
                Ao submeter este formulário, declaro: <br />
                Estar de acordo com as normas ambientais vigentes aplicáveis ao
                empreendimento, especialmente as editadas na Resolução do
                CONSEPA nº 01/2019 e que atende integralmente aos critérios nela
                especificados; <br />
                Que estão implantados os controles definidos pela Lei Estadual
                n° 3.686, de 8 de dezembro de 2015; <br />
                Que adotarei procedimentos para a destinação adequada de
                resíduos (sólidos, líquidos e gasosos) eventualmente gerados
                pela atividade; <br />
                Que a atividade não necessita realizar supressão de vegetação
                nativa;
                <br />
                Que a atividade não incide sobre área de preservação permanente,
                com exceção da:
                <br />
                <ul className="mb-1 list-inside [&>li]:ml-5">
                  <li>
                    Abertura de pequenas vias de acesso interno e suas pontes e
                    pontilhões, quando necessárias à travessia de um curso
                    d’água e ao acesso de pessoas e animais para a obtenção de
                    água;
                  </li>
                  <li>Construção e manutenção de cercas na propriedade;</li>
                  <li>
                    Construção e manutenção de moradia de agricultores
                    familiares, remanescentes de comunidades quilombolas e
                    outras populações extrativistas e tradicionais, onde o
                    abastecimento de água se dê pelo esforço próprio dos
                    moradores;
                  </li>
                </ul>
                Que a atividade não incide sobre terra indígena, unidade de
                conservação e áreas de reserva legal e de uso restrito;
                <br />
                Que a atividade não incide sobre área objeto de embargo
                ambiental;
                <br />
                Estar ciente de que a dispensa de licenciamento ambiental
                refere-se exclusivamente aos aspectos ambientais da atividade,
                não eximindo o seu titular da apresentação aos órgãos
                competentes de outros documentos legalmente exigíveis e não
                inibe ou restringe de qualquer forma a ação dos demais órgãos e
                instituições fiscalizadoras, nem desobriga a empresa ou
                interessado da obtenção de autorizações, anuências, laudos,
                certidões, certificados, ou outros documentos previstos na
                legislação vigente, sendo de responsabilidade do empreendedor a
                adoção de qualquer providência.
              </label>
            </div>

            <div className="mb-3 inline-flex items-center gap-1">
              <input
                type="checkbox"
                id="thirdCheckbox"
                className="checkbox-primary checkbox border-beige-200 bg-beige-50  focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                onChange={(e) => {
                  setThirdCheckbox(e.target.checked);
                }}
              />
              <label htmlFor={"thirdCheckbox"} className="label">
                Declaro, sob as penas do artigo 299 do Código Penal, que as
                informações fornecidas são fiéis e verdadeiras, não havendo
                omissões ou dados que possam induzir a equívocos de julgamento e
                assumo total responsabilidade pelo conteúdo dessa declaração.
              </label>
            </div>
          </div>
          <Separator sizing="xs" className="mb-6" />
          <SubmitButton.Wrapper>
            <SubmitButton
              className={`${firstCheckbox && secondCheckbox && thirdCheckbox
                  ? ""
                  : "cursor-not-allowed opacity-90"
                }`}
              disabled={!firstCheckbox || !secondCheckbox || !thirdCheckbox}
            >
              Enviar
            </SubmitButton>
            <FollowUpButton>
              <Link href={"/area-usuario?service=cila"}>Acompanhar solicitação</Link>
            </FollowUpButton>
          </SubmitButton.Wrapper>
        </form>
        {/* <DevT control={control} /> */}
      </FormContainer>
    </>
  );
}
