"use client";

import Checkbox from "@/components/FormInputs/Checkbox";
import { FollowUpButton } from "@/components/FormInputs/FollowUpButton";
import Radio from "@/components/FormInputs/Radio";
import { SubmitButton } from "@/components/FormInputs/SubmitButton";
import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Legend from "@/components/FormStructure/Legend";
import Separator from "@/components/FormStructure/Separator";
import { useToast } from "@/components/ui/use-toast";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import {
  ditlActivityFieldArray,
  ditlApplicantFieldsArray,
} from "@/lib/forms/ditl/fields";
import { IDitlSchema } from "@/lib/forms/ditl/interfaces";
import { ditlSchema } from "@/lib/forms/ditl/schemas";
import {
  renderComboboxField,
  renderField,
  renderMaskedField,
} from "@/lib/forms/generateFields";
import { zodErrorMap } from "@/lib/forms/zodErrorMap";
import {
  CEP_MASKITO_OPTIONS,
  CNPJ_MASKITO_OPTIONS,
  CPF_CNPJ_MASKITO_OPTIONS,
  NUMBER_MASKITO_OPTIONS,
  PHONE_MASKITO_OPTIONS,
  RG_MASKITO_OPTIONS,
} from "@/lib/maskito/masks";
import { onError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import lodash from "lodash";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<ICombinedSchema>({
    resolver: zodResolver(ditlSchema, { errorMap: zodErrorMap }),
  });

  const { toast } = useToast();
  const [showCepAlert, setShowCepAlert] = useState(false);
  const [isPf, setIsPf] = useState<boolean | undefined>(undefined);
  const [activityAddressUf, setActivityAddressUf] = useState<string>();
  const route = useRouter();
  const validarCep = useCallback(
    async function () {
      const cep = getValues("activity.address.zipcode");
      if (cep && cep.length > 8) {
        try {
          const response = await fetch(`/api/cep?cep=${cep}`);

          if (response.ok) {
            setShowCepAlert(false);
            const data = await response.json();
            setValue("activity.address.street", data?.logradouro);
            setValue("activity.address.city", data?.localidade);
            setActivityAddressUf(data?.uf);
            setValue("activity.address.district", data?.bairro);
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

  const watchZipcode = watch("activity.address.zipcode");
  useEffect(() => {
    validarCep();
  }, [validarCep, watchZipcode]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = async (data: IDitlSchema) => {
    const dataClone: Partial<IDitlSchema> = structuredClone(data);
    const formData = {
      requirement: {
        applicant: { ...dataClone.ditl_applicant },
        ...dataClone,
      },
    };
    delete formData.requirement.ditl_applicant;
    delete formData.requirement.checkbox1;
    delete formData.requirement.checkbox2;
    delete formData.requirement.checkbox3;
    delete formData.requirement.applicant.pf_or_pj;

    try {
      await axios.post("/api/ditl", formData).then((res) => {
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
        console.log(res.data.tracking_id,
          formData.requirement.applicant?.cnpj,
          formData.requirement.applicant?.cnpj);
        if (
          res.data.tracking_id &&
          formData.requirement.applicant?.cnpj || formData.requirement.applicant.legal_representative?.cpf
        ) {
          const document = formData.requirement.applicant.cnpj && formData.requirement.applicant?.cnpj?.length > 0 ?
            formData.requirement.applicant?.cnpj :
            formData.requirement.applicant.legal_representative?.cpf && formData.requirement.applicant.legal_representative?.cpf.length > 0 ?
              formData.requirement.applicant.legal_representative?.cpf : "";


          lodash.delay(() => {
            route.push(
              `area-usuario?tracking_id=${res.data.tracking_id}&cpf_cnpj=${document}&service=ditl`,
            );
          }, 1500);
        }
      });
    } catch (err) {
      onError(err);
    }
  };

  const handlePfOrPjChange = () => {
    const PfOrPjValue = getValues("ditl_applicant.pf_or_pj");
    if (PfOrPjValue === "PF") {
      setIsPf(true);
      setValue("ditl_applicant.name", "");
      setValue("ditl_applicant.cnpj", "");
      setValue("ditl_applicant.classification", "Agroindústria familiar");
      setValue("ditl_applicant.legal_representative.role", "Proprietário");
      if (isSubmitted) {
        trigger("ditl_applicant");
      }
    } else if (PfOrPjValue === "PJ") {
      setIsPf(false);
    }
    return;
  };

  return (
    <>
      <FormContainer>
        <Header>
          <Header.Title>
            Declaração de Isenção de Taxas de Licenciamento
          </Header.Title>
          <Header.Body>
            O usuário declara, sob as penalidades do art. 299 do Código Penal,
            que as informações fornecidas são fiéis e verdadeiras, sem omissões
            ou dados que possam induzir a equívocos de julgamento, assumindo
            total responsabilidade pelo conteúdo declarado.
            <br />
            <br />
          </Header.Body>
        </Header>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
          <Fieldset id="identificacaoDoRequerente" className="pb-4">
            <Legend> Identificação do requerente</Legend>
            <div className="mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:gap-2">
              <div className="col-span-full">
                <Radio
                  fieldId={"ditl_applicant.pf_or_pj"}
                  label={""}
                  register={register}
                  options={[
                    {
                      value: "PF",
                      label: "Pessoa Física",
                    },
                    {
                      value: "PJ",
                      label: "Pessoa Jurídica",
                    },
                  ]}
                  className={"flex gap-4"}
                  extraChange={handlePfOrPjChange}
                  errors={errors}
                />
              </div>
              <div className="col-span-9 max-md:col-span-6 max-sm:col-span-full">
                {renderField(
                  ditlApplicantFieldsArray[1],
                  register,
                  errors,
                  "",
                  isPf,
                )}
              </div>
              <div className="col-span-3 max-md:col-span-6 max-sm:col-span-full">
                {renderMaskedField(
                  ditlApplicantFieldsArray[2],
                  CNPJ_MASKITO_OPTIONS,
                  control,
                  errors,
                  "",
                  isPf,
                )}
              </div>
              <div className="col-span-6 max-md:col-span-6 max-sm:col-span-full">
                {renderField(ditlApplicantFieldsArray[3], register, errors)}
              </div>
              <div className="col-span-3 max-md:col-span-6 max-sm:col-span-full">
                {renderMaskedField(
                  ditlApplicantFieldsArray[4],
                  RG_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
              <div className="col-span-3 max-md:col-span-6 max-sm:col-span-full">
                {renderMaskedField(
                  ditlApplicantFieldsArray[5],
                  CPF_CNPJ_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
              <div className="col-span-6 max-lg:col-span-full">
                <Radio
                  fieldId={"ditl_applicant.classification"}
                  label={"Classificação do requerente"}
                  register={register}
                  options={[
                    {
                      value: "Estadual",
                      label: "Estadual",
                      disabled: isPf,
                    },
                    {
                      value: "Municipal",
                      label: "Municipal",
                      disabled: isPf,
                    },
                    {
                      value: "Agroindústria familiar",
                      label: "Agroindústria familiar",
                    },
                  ]}
                  className={"flex gap-4 max-sm:flex-col max-sm:gap-0"}
                  errors={errors}
                />
              </div>
              <div className="col-span-6 max-lg:col-span-full">
                <Radio
                  fieldId={"ditl_applicant.legal_representative.role"}
                  label={"Função"}
                  register={register}
                  options={[
                    {
                      value: "Prefeito",
                      label: "Prefeito",
                      disabled: isPf,
                    },
                    {
                      value: "Secretário",
                      label: "Secretário",
                      disabled: isPf,
                    },
                    {
                      value: "Proprietário",
                      label: "Proprietário",
                    },
                  ]}
                  className={"flex gap-4 max-sm:flex-col max-sm:gap-0"}
                  errors={errors}
                />
              </div>
              <div className="col-span-6 max-md:col-span-6 max-sm:col-span-full">
                {renderField(ditlApplicantFieldsArray[8], register, errors)}
              </div>
              <div className="col-span-6 max-md:col-span-6 max-sm:col-span-full">
                {renderMaskedField(
                  ditlApplicantFieldsArray[9],
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
                  ditlActivityFieldArray[0],
                  control,
                  errors,
                  setValue,
                )}
              </div>
              <div className="col-span-2 max-lg:col-span-3 max-sm:col-span-full">
                {renderMaskedField(
                  ditlActivityFieldArray[1],
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
              <div className="col-span-4 max-lg:col-span-7 max-sm:col-span-full">
                {renderField(ditlActivityFieldArray[2], register, errors)}
              </div>
              <div className="col-span-1 max-lg:col-span-2 max-sm:col-span-3">
                {renderMaskedField(
                  ditlActivityFieldArray[3],
                  NUMBER_MASKITO_OPTIONS,
                  control,
                  errors,
                )}
              </div>
              <div className="col-span-5 max-lg:col-span-full max-sm:col-span-9">
                {renderField(ditlActivityFieldArray[4], register, errors)}
              </div>
              <div className="col-span-5 max-sm:col-span-full">
                {renderField(ditlActivityFieldArray[5], register, errors)}
              </div>
              <div className="col-span-5 max-sm:col-span-8">
                {renderField(ditlActivityFieldArray[6], register, errors)}
              </div>
              <div className="col-span-2 max-sm:col-span-4">
                {renderComboboxField(
                  ditlActivityFieldArray[7],
                  control,
                  errors,
                  setValue,
                  "",
                  activityAddressUf ?? "",
                )}
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
                {...register("additional_information")}
              />
            </div>
          </Fieldset>
          <Separator className="my-4" />
          <div className="mx-1 mb-2 px-2">
            <div className="mb-2">
              <Checkbox
                className="mb-8"
                fieldId={"checkbox1"}
                label={
                  <>
                    Declaro que me enquadro no Art. 37 da Lei Nº 3.686 de 08 de
                    dezembro de 2015, onde estão isentos do pagamento das Taxas
                    de Licenciamento Ambiental:
                    <br />
                    <ul className="my-1 list-inside [&>li]:ml-5">
                      <li>
                        I - as obras e atividades executadas diretamente por
                        órgão da Administração Pública Direta ou Indireta dos
                        municípios integrantes do Estado de Rondônia;
                      </li>
                      <li>
                        II - atividades agropecuárias e agrossilvopastoris
                        exercidas por agricultor familiar e empreendedor
                        familiar rural, assim considerado aquele que pratica
                        atividades no meio rural, atendendo, simultaneamente,
                        aos seguintes requisitos:
                        <ul className="my-1 list-inside [&>li]:ml-5">
                          <li>
                            a) não detenha, a qualquer título, área maior do que
                            4 (quatro) módulos fiscais;
                          </li>
                          <li>
                            b) utilize predominantemente mão-de-obra da própria
                            família nas atividades econômicas do seu
                            estabelecimento ou empreendimento;
                          </li>
                          <li>
                            c) tenha percentual mínimo da renda familiar
                            originada de atividades econômicas do seu
                            estabelecimento ou empreendimento, na forma definida
                            pelo Poder Executivo;
                          </li>
                          <li>
                            d) dirija seu estabelecimento ou empreendimento com
                            sua família.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    Na hipótese mencionada no inciso I, quando as obras ou
                    atividades forem transferidas ou delegadas a pessoas
                    jurídicas de direito privado não integrantes da
                    Administração Pública, as Taxas de Licenciamento Ambiental
                    dos requerimentos serão pagas por essas pessoas jurídicas.
                  </>
                }
                register={register}
                errors={errors}
              />
            </div>
            <div className="mb-2">
              <Checkbox
                className="mb-8"
                fieldId={"checkbox2"}
                label={
                  <>
                    Ao submeter este formulário, declaro:
                    <br />
                    <ul className="my-1 list-inside [&>li]:ml-5">
                      <li>
                        Estar de acordo com as normas ambientais vigentes
                        aplicáveis ao empreendimento, especialmente as editadas
                        na Resolução CONSEPA nº 01/2019 mencionada acima, e que
                        atende integralmente aos critérios nela especificados;
                      </li>
                      <li>
                        Que estão implantados os controles definidos pela Lei
                        Estadual n° 3.686, de 8 de dezembro de 2015;
                      </li>
                      <li>
                        Que adotarei procedimentos para a destinação adequada de
                        resíduos (sólidos, líquidos e gasosos) eventualmente
                        gerados pela atividade;
                      </li>
                      <li>
                        Que a atividade não necessita realizar supressão de
                        vegetação nativa; não incide sobre área de preservação
                        permanente, com exceção da:
                        <ul className="mb-1 list-inside [&>li]:ml-5">
                          <li>
                            a) Abertura de pequenas vias de acesso interno e
                            suas pontes e pontilhões, quando necessárias à
                            travessia de um curso d’água e ao acesso de pessoas
                            e animais para a obtenção de água;
                          </li>
                          <li>
                            b) Construção e manutenção de cercas na propriedade;
                          </li>
                          <li>
                            c) Construção e manutenção de moradia de
                            agricultores familiares, remanescentes de
                            comunidades quilombolas e outras populações
                            extrativistas e tradicionais, onde o abastecimento
                            de água se dê pelo esforço próprio dos moradores.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Que a atividade não incide sobre terra indígena, unidade
                        de conservação e áreas de reserva legal e de uso
                        restrito;{" "}
                      </li>
                      <li>
                        Que a atividade não incide sobre área objeto de embargo
                        ambiental;
                      </li>
                      <li>
                        Estar ciente de que a dispensa de licenciamento
                        ambiental que trata esta Resolução, refere-se
                        exclusivamente aos aspectos ambientais da atividade, não
                        eximindo o seu titular da apresentação aos órgãos
                        competentes de outros documentos legalmente exigíveis e
                        não inibe ou restringe de qualquer forma a ação dos
                        demais órgãos e instituições fiscalizadoras, nem
                        desobriga a empresa ou interessado da obtenção de
                        autorizações, anuências, laudos, certidões,
                        certificados, ou outros documentos previstos na
                        legislação vigente, sendo de responsabilidade do
                        empreendedor a adoção de qualquer providência.
                      </li>
                    </ul>
                  </>
                }
                register={register}
                errors={errors}
              />
            </div>
            <div className="mb-2">
              <Checkbox
                fieldId={"checkbox3"}
                label={
                  <>
                    Declaro, sob as penas do artigo 299 do Código Penal, que as
                    informações fornecidas são fiéis e verdadeiras, não havendo
                    omissões ou dados que possam induzir a equívocos de
                    julgamento e assumo total responsabilidade pelo conteúdo
                    dessa declaração.
                  </>
                }
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <Separator sizing="xs" className="mb-6" />
          <SubmitButton.Wrapper>
            <SubmitButton>Enviar</SubmitButton>
            <FollowUpButton>
              <Link href={"/area-usuario?service=ditl"}>Acompanhar solicitação</Link>
            </FollowUpButton>
          </SubmitButton.Wrapper>
        </form>
        {/* <DevT control={control} /> */}
      </FormContainer>
    </>
  );
}
