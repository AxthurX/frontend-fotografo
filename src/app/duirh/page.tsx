"use client";

//TODAS AS IMPORTAÇÕES DO DOA

import AlertComponent from "@/components/Alert";
import { FollowUpButton } from "@/components/FormInputs/FollowUpButton";
import Radio from "@/components/FormInputs/Radio";
import Select from "@/components/FormInputs/Select";
import { SubmitButton } from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Legend from "@/components/FormStructure/Legend";
import Separator from "@/components/FormStructure/Separator";
import { useToast } from "@/components/ui/use-toast";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import {
  captureAllUsesFieldArray,
  captureTankMaintenanceFieldArray,
  dimensionExcavatedTankFieldArray,
  doaApplicantFieldsArray,
  domesticUseFieldsArray,
  infoAmazonWellFieldsArray,
  irrigationDataFieldsArray,
  launchTankMaintenanceFieldArray,
  pickupPointFieldsArray,
  piscicultureDataFieldsArray,
  propertyDataFieldArray,
  technicianFieldsArray,
  verifyActiveFieldArray,
  wateringDataFieldsArray,
} from "@/lib/forms/doa/fields";
import {
  buildFormData,
  verifyActivity,
  verifyPurposeUse,
} from "@/lib/forms/doa/functions";
import { IOutorgaSchema } from "@/lib/forms/doa/interfaces";
import { outorgaSchema } from "@/lib/forms/doa/schema";
import {
  renderComboboxField,
  renderField,
  renderMaskedField,
} from "@/lib/forms/generateFields";
import {
  DOA_ACTIVITY_LABEL,
  DOA_ANIMAL_BREEDING_PER_CAPITA_CONSUMPTION_LABEL,
  DOA_ANIMAL_BREEDING_QUANTITY_LABEL,
  DOA_ANIMAL_BREEDING_SPECIES_LABEL,
  DOA_ANIMAL_BREEDING_TOTAL_CONSUMPTION_LABEL,
  DOA_ANIMAL_BREEDING_TYPE_LABEL,
  DOA_DEHYDRATION_OCCUR_LABEL,
} from "@/lib/forms/labels";
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
import { Path, useFieldArray, useForm } from "react-hook-form";
// const DevT: React.ElementType = dynamic(
//   () => import("@hookform/devtools").then((module) => module.DevTool),
//   { ssr: false },
// );

export default function OutorgaForm() {
  const { toast } = useToast();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ICombinedSchema>({
    resolver: zodResolver(outorgaSchema, { errorMap: zodErrorMap }),
    defaultValues: {
      animal_data: {
        use_purpose: [
          {
            select_animal: undefined,
            breed: undefined,
            number_heads: undefined,
            per_capita_consumption: undefined,
            total_consumption: undefined,
          },
        ],
        pasture_data: {
          pasture_which_months: [],
        },
      },
    },
  });

  const route = useRouter();

  const {
    fields: purposeFields,
    append: purposeAppend,
    remove: purposeRemove,
  } = useFieldArray({
    control,
    name: "animal_data.use_purpose",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: IOutorgaSchema) => {

    try {
      setLoading(true);

      const activities: (string | null)[] = [
        data.animal_data?.active == "Sim" ? "Criação animal" : null,
        data.domestic_use?.active == "Sim" ? "Consumo humano" : null,
        data.pisciculture?.active == "Sim" ? "Piscicultura" : null,
        data.irrigation_data?.active == "Sim" ? "Irrigação" : null,
        data.other_activity?.active == "Sim"
          ? data.other_activity.activity_description &&
            data.other_activity.activity_description.length > 0
            ? "Outros: " + data.other_activity.activity_description
            : "Outros"
          : null,
      ];
      const allNull = activities.every((activity) => activity === null);

      if (allNull) {
        toast({
          variant: "destructive",
          title: "Tente novamente",
          description: "Insira alguma atividade realizada.",
        });
        return;
      }

      const concatActivities = verifyActivity(activities);

      whichMonths.map((months) => {
        if (months.checked == true) {
          data.animal_data.pasture_data.pasture_which_months?.push(
            months.value,
          );
        }
      });

      const {
        newIsBreak,
        amount_animals,
        breed,
        classification,
        per_capita_consumption,
        total_consumption,
      } = verifyPurposeUse(data.animal_data.use_purpose);

      if (newIsBreak == true) {
        const orientacaoDiv: HTMLElement | null =
          document.getElementById("criacao animal");
        orientacaoDiv?.scrollIntoView({ behavior: "smooth", block: "center" });

        toast({
          variant: "destructive",
          title: "Preencha corretamente",
          description: "Preencha todos os dados da criação de animais.",
        });
        setLoading(false);
        return;
      }

      let formData = undefined;
      try {
        formData = buildFormData({
          data,
          concatActivities,
          classification,
          breed,
          amount_animals,
          per_capita_consumption,
          total_consumption,
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Erro",
          description:
            "Erro ao enviar dados, entre em contato com o suporte CTI-SEDAM",
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/duirh", formData);

        toast({
          title: "Sucesso",
          description: response.data.message,
        });

        if (
          response.data.tracking_id &&
          formData.requirement.applicant?.cpf_cnpj &&
          formData.requirement.applicant?.cpf_cnpj.length > 5
        ) {
          lodash.delay(() => {
            route.push(
              `area-usuario?tracking_id=${response.data.tracking_id}&cpf_cnpj=${formData.requirement.applicant?.cpf_cnpj}&service=duirh`,
            );
          }, 1500);
        }
      } catch (err) {
        onError(err);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao enviar o formulário, tente novamente mais tarde!",
      });
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const [showCepAlertApplicant, setShowCepAlertApplicant] = useState(false);
  const [showCepAlertTechnical, setShowCepAlertTechnical] = useState(false);

  const validarCep = useCallback(
    async (fieldName: "applicant" | "technician") => {
      const cepApplicant = getValues(
        `${fieldName}.personal_data.address.zipcode`,
      );
      const alertChecker = (
        fieldName: "applicant" | "technician",
        variant: boolean,
      ) => {
        if (fieldName === "applicant") setShowCepAlertApplicant(variant);
        else setShowCepAlertTechnical(variant);
      };

      if (cepApplicant && cepApplicant.length > 8) {
        try {
          const response = await fetch(`/api/cep?cep=${cepApplicant}`);

          if (response.ok) {
            alertChecker(fieldName, false);
            const data = await response.json();
            setValue(
              `${fieldName}.personal_data.address.street`,
              data?.logradouro,
            );
            setValue(
              `${fieldName}.personal_data.address.city`,
              data?.localidade,
            );
            setValue(`${fieldName}.personal_data.address.state`, data?.uf);
            setValue(
              `${fieldName}.personal_data.address.district`,
              data?.bairro,
            );
          } else {
            alertChecker(fieldName, true);
          }
        } catch (error) {
          alertChecker(fieldName, true);
          console.error(error);
        }
      } else {
        return;
      }
    },
    [getValues, setValue],
  );

  const watchCheckbox = watch("process_formalized.checkbox_closing_process");

  const watchZipcodeApplicant = watch(
    "applicant.personal_data.address.zipcode",
  );
  const watchZipcodeTechnical = watch(
    "technician.personal_data.address.zipcode",
  );
  useEffect(() => {
    validarCep("applicant");
  }, [validarCep, watchZipcodeApplicant]);

  useEffect(() => {
    validarCep("technician");
  }, [validarCep, watchZipcodeTechnical]);

  const watchArea = watch("embargoed_area");

  const watchFundingSource = watch("pickup_point.funding_source");

  const watchDehydrationOccur = watch(
    "animal_data.watering_data.dehydration_occur",
  );

  const watchRadioProcessInSedam = watch(
    "process_formalized.radio_process_in_sedam",
  );

  const [whichMonths] = useState([
    { label: "Janeiro", value: "janeiro", checked: false },
    { label: "Fevereiro", value: "fevereiro", checked: false },
    { label: "Março", value: "marco", checked: false },
    { label: "Abril", value: "abril", checked: false },
    { label: "Maio", value: "maio", checked: false },
    { label: "Junho", value: "junho", checked: false },
    { label: "Julho", value: "julho", checked: false },
    { label: "Agosto", value: "agosto", checked: false },
    { label: "Setembro", value: "setembro", checked: false },
    { label: "Outubro", value: "outubro", checked: false },
    { label: "Novembro", value: "novembro", checked: false },
    { label: "Dezembro", value: "dezembro", checked: false },
  ]);

  const coordinateTrigger = useCallback(
    (
      latitude: string,
      longitude: string,
      triggerName: Path<ICombinedSchema>,
    ) => {
      if (
        latitude &&
        longitude &&
        latitude.length == 13 &&
        longitude.length == 13
      ) {
        trigger(triggerName);
      }
    },
    [trigger],
  );

  const watchWateringDataLatitude = watch(
    "animal_data.watering_data.coordinates.latitude",
  );
  const watchWateringDataLongitude = watch(
    "animal_data.watering_data.coordinates.longitude",
  );
  const watchPickupPointCapturePointLatitude = watch(
    "pickup_point.coordinates.latitude",
  );
  const watchPickupPointCapturePointLongitude = watch(
    "pickup_point.coordinates.longitude",
  );
  const watchPickupPointPropertyEntranceLatitude = watch(
    "property_data.coordinates.latitude",
  );
  const watchPickupPointPropertyEntranceLongitude = watch(
    "property_data.coordinates.longitude",
  );
  const watchNumberPeoples = watch("domestic_use.number_peoples");
  const watchPerCapitaComsuption = watch("domestic_use.per_capita_consumption");
  const watchPiscicultureData = watch("pisciculture.pisciculture_data");
  const watchCaptureData = watch("capture_for_all_uses");
  const watchCaptureTankMaintenance = watch(
    "pisciculture.capture_tank_maintenance",
  );
  const watchLaunchTank = watch("pisciculture.launch_tank_maintenance");

  const watchActiveAnimalData =
    watch("animal_data.active") == "Sim" ? true : false;
  const watchActiveDomesticUse =
    watch("domestic_use.active") == "Sim" ? true : false;
  const watchActivePisciculture =
    watch("pisciculture.active") == "Sim" ? true : false;

  const watchActiveIrrigationData =
    watch("irrigation_data.active") == "Sim" ? true : false;
  const watchActiveOtherActivity =
    watch("other_activity.active") == "Sim" ? true : false;

  const enableTechnical =
    watch("technician.verifyTechnician") == "Sim" ? false : true;

  const setTotal = useCallback(
    (
      firstValue: number,
      secondValue: number,
      field: "domestic_use.total_consumption_domestic",
      unit: string = "m³",
    ) => {
      const total = (firstValue * secondValue) / 1000 + ` ${unit}`;
      setValue(field, total);
    },
    [setValue],
  );

  useEffect(() => {
    //Calculando o volume total armazenado
    watchPiscicultureData?.water_mirror_area &&
      watchPiscicultureData?.medium_depth &&
      setValue(
        "pisciculture.pisciculture_data.total_volume_stored",
        Number((Number(watchPiscicultureData?.water_mirror_area) *
          Number(watchPiscicultureData.medium_depth)).toFixed(2)),
      );

    //Calculando volume diário necessário para renovação
    watchPiscicultureData?.total_volume_stored &&
      watchPiscicultureData?.rate_daily_water_renewal &&
      setValue(
        "pisciculture.pisciculture_data.daily_volume_required_renewal",
        Number((Number(watchPiscicultureData.total_volume_stored) *
          (Number(watchPiscicultureData.rate_daily_water_renewal) / 100)).toFixed(2)),
      );

    //Calculando o volume anual necessario para renovação
    watchPiscicultureData?.daily_volume_required_renewal &&
      watchPiscicultureData?.number_days_water_renewal &&
      setValue(
        "pisciculture.pisciculture_data.yearly_volume_required_renewal",
        Number((Number(watchPiscicultureData.daily_volume_required_renewal) *
          Number(watchPiscicultureData.number_days_water_renewal)).toFixed(2)),
      );
  }, [
    watchPiscicultureData?.water_mirror_area,
    watchPiscicultureData?.medium_depth,
    watchPiscicultureData?.total_volume_stored,
    watchPiscicultureData?.rate_daily_water_renewal,
    watchPiscicultureData?.daily_volume_required_renewal,
    watchPiscicultureData?.number_days_water_renewal,
    setValue,
  ]);


  useEffect(() => {
    watchCaptureData?.capture_time_hours_per_day &&
      watchCaptureData?.period_use_days_per_month &&
      setValue(
        "capture_for_all_uses.capture_time_hours_per_month",
        Number(watchCaptureData?.capture_time_hours_per_day) *
        Number(watchCaptureData?.period_use_days_per_month),
      );
    watchCaptureData?.daily_collection_flow &&
      watchCaptureData?.period_use_days_per_month &&
      setValue(
        "capture_for_all_uses.total_flow_per_month",
        Number(watchCaptureData?.daily_collection_flow) *
        Number(watchCaptureData?.period_use_days_per_month),
      );

    watchCaptureData?.total_flow_per_month &&
      watchCaptureData.period_use_month_per_year &&
      setValue(
        "capture_for_all_uses.total_flow_per_year",
        Number(watchCaptureData?.total_flow_per_month) *
        Number(watchCaptureData?.period_use_month_per_year),
      );
  }, [
    setValue,
    watchCaptureData,
    watchCaptureData?.capture_time_hours_per_day,
    watchCaptureData?.capture_time_hours_per_month,
    watchCaptureData?.daily_collection_flow,
    watchCaptureData?.maximum_capture_flow,
    watchCaptureData?.period_use_days_per_month,
    watchCaptureData?.period_use_month_per_year,
    watchCaptureData?.total_flow_per_month,
    watchCaptureData?.total_flow_per_year,
  ]);

  useEffect(() => {
    watchLaunchTank?.launch_time_hours_per_day &&
      watchLaunchTank?.period_use_days_per_month &&
      setValue(
        "pisciculture.launch_tank_maintenance.launch_time_hours_per_month",
        Number(watchLaunchTank?.launch_time_hours_per_day) *
        Number(watchLaunchTank?.period_use_days_per_month),
      );
    watchLaunchTank?.daily_launch_flow &&
      watchLaunchTank?.period_use_days_per_month &&
      setValue(
        "pisciculture.launch_tank_maintenance.total_launch_per_month",
        Number(watchLaunchTank?.daily_launch_flow) *
        Number(watchLaunchTank?.period_use_days_per_month),
      );

    watchLaunchTank?.total_launch_per_month &&
      watchLaunchTank.period_use_month_per_year &&
      setValue(
        "pisciculture.launch_tank_maintenance.total_launch_per_year",
        Number(watchLaunchTank?.total_launch_per_month) *
        Number(watchLaunchTank?.period_use_month_per_year),
      );
  }, [
    setValue,
    watchLaunchTank,
    watchLaunchTank?.launch_time_hours_per_day,
    watchLaunchTank?.launch_time_hours_per_month,
    watchLaunchTank?.daily_launch_flow,
    watchLaunchTank?.maximum_launch_flow,
    watchLaunchTank?.period_use_days_per_month,
    watchLaunchTank?.period_use_month_per_year,
    watchLaunchTank?.total_launch_per_month,
    watchLaunchTank?.total_launch_per_year,
  ]);

  useEffect(() => {
    watchCaptureTankMaintenance?.capture_time_hours_per_day &&
      watchCaptureTankMaintenance?.period_use_days_per_month &&
      setValue(
        "pisciculture.capture_tank_maintenance.capture_time_hours_per_month",
        Number(watchCaptureTankMaintenance?.capture_time_hours_per_day) *
        Number(watchCaptureTankMaintenance?.period_use_days_per_month),
      );
    watchCaptureTankMaintenance?.daily_collection_flow &&
      watchCaptureTankMaintenance?.period_use_days_per_month &&
      setValue(
        "pisciculture.capture_tank_maintenance.total_flow_per_month",
        Number(watchCaptureTankMaintenance?.daily_collection_flow) *
        Number(watchCaptureTankMaintenance?.period_use_days_per_month),
      );

    watchCaptureTankMaintenance?.total_flow_per_month &&
      watchCaptureTankMaintenance.period_use_month_per_year &&
      setValue(
        "pisciculture.capture_tank_maintenance.total_flow_per_year",
        Number(watchCaptureTankMaintenance?.total_flow_per_month) *
        Number(watchCaptureTankMaintenance?.period_use_month_per_year),
      );
  }, [
    setValue,
    watchCaptureTankMaintenance,
    watchCaptureTankMaintenance?.capture_time_hours_per_day,
    watchCaptureTankMaintenance?.capture_time_hours_per_month,
    watchCaptureTankMaintenance?.daily_collection_flow,
    watchCaptureTankMaintenance?.maximum_capture_flow,
    watchCaptureTankMaintenance?.period_use_days_per_month,
    watchCaptureTankMaintenance?.period_use_month_per_year,
    watchCaptureTankMaintenance?.total_flow_per_month,
    watchCaptureTankMaintenance?.total_flow_per_year,
  ]);

  useEffect(() => {
    watchNumberPeoples &&
      watchPerCapitaComsuption &&
      setTotal(
        watchNumberPeoples,
        watchPerCapitaComsuption,
        "domestic_use.total_consumption_domestic",
      );
  }, [watchNumberPeoples, watchPerCapitaComsuption, setTotal]);

  useEffect(() => {
    coordinateTrigger(
      watchPickupPointCapturePointLatitude,
      watchPickupPointCapturePointLongitude,
      "pickup_point.coordinates",
    );
  }, [
    watchPickupPointCapturePointLongitude,
    watchPickupPointCapturePointLatitude,
    coordinateTrigger,
  ]);

  useEffect(() => {
    coordinateTrigger(
      String(watchPickupPointPropertyEntranceLatitude),
      String(watchPickupPointPropertyEntranceLongitude),
      "property_data.coordinates",
    );
  }, [
    watchPickupPointPropertyEntranceLongitude,
    watchPickupPointPropertyEntranceLatitude,
    coordinateTrigger,
  ]);

  useEffect(() => {
    coordinateTrigger(
      watchWateringDataLatitude,
      watchWateringDataLongitude,
      "animal_data.watering_data.coordinates",
    );
  }, [
    watchWateringDataLongitude,
    watchWateringDataLatitude,
    coordinateTrigger,
  ]);

  useEffect(() => {
    setValue("process_formalized.process_in_sedam_protocol", undefined);
  }, [setValue, watchRadioProcessInSedam]);

  useEffect(() => {
    setValue("pickup_point.occurrence_point", "");
  }, [setValue, watchFundingSource]);

  const watchDimensionExcavatedTank = watch(
    "animal_data.watering_data.dimension_excavated_tank",
  );
  useEffect(() => {
    watchDimensionExcavatedTank?.total_water_blade &&
      watchDimensionExcavatedTank?.medium_depth &&
      setValue(
        "animal_data.watering_data.dimension_excavated_tank.estimated_volume",
        Number(
          (Number(watchDimensionExcavatedTank?.total_water_blade) *
            Number(watchDimensionExcavatedTank?.medium_depth)).toFixed(2),
        ),
      );
  }, [
    setValue,
    watchDimensionExcavatedTank,
    watchDimensionExcavatedTank?.total_water_blade,
    watchDimensionExcavatedTank?.medium_depth,
  ]);

  return (
    <>
      <FormContainer className="flex-grow overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>
            <Header.Title>
              Declaração de Uso Insignificante de Recursos Hidricos
            </Header.Title>
            <Header.Body className="mx-6">
              O usuário declara, sob as penalidades do art. 299 do Código Penal,
              que as informações fornecidas são fiéis e verdadeiras, sem
              omissões ou dados que possam induzir a equívocos de julgamento,
              assumindo total responsabilidade pelo conteúdo declarado.
              <br /> <br />
              Declara ainda, ser o <b>legítimo proprietário do imóvel</b> onde
              ocorrerá a captação ou estar na condição de possuidor autorizado
              (anuência) pelo proprietário para proceder a intervenção.
              <br /> <br />
              Por este instrumento, solicita a SEDAM a emissão da Declaração de
              Regularidade de Usos da Água que Independem de Outorga, nos termos
              do Decreto Estadual n° 10.114 de 20 de setembro de 2002, da
              Resolução CRH/RO nº 04 de 18 de março de 2014 e das Portarias
              SEDAM nº 081/GAB/SEDAM de 23 de março de 2017 e nº 449/SEDAM-COREH
              de 19 de novembro de 2019.
              <br />
              <br />
              <div>
                <span className="font-bold">Portarias e Decretos:</span>
                <br />
              </div>
              <ul className="mt-2 flex list-disc flex-col gap-3">
                <li>
                  <Link
                    href="/ext-files/files/forms/DUIRH/Decreto Estadual n° 10.114 de 20 de setembro de 2002.pdf"
                    target="_blank"
                    prefetch={false}
                    className="link-hover link link-info"
                  >
                    Decreto Estadual n° 10.114 de 20 de setembro de 2002
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ext-files/files/forms/DUIRH/Portaria-nº-449-2019-SEDAM-COREH-diof-19-11-2019.pdf"
                    target="_blank"
                    prefetch={false}
                    className="link-hover link link-info"
                  >
                    Portaria nº 449/SEDAM-COREH de 19 de novembro de 2019.
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ext-files/files/forms/DUIRH/Resolução CRH-RO nº 04 de 18 de março de 2014.pdf"
                    target="_blank"
                    prefetch={false}
                    className="link-hover link link-info"
                  >
                    Resolução CRH/RO nº 04 de 18 de março de 2014
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ext-files/files/forms/DUIRH/Portaria 081.pdf"
                    target="_blank"
                    prefetch={false}
                    className="link-hover link link-info"
                  >
                    Portaria SEDAM nº 081/GAB/SEDAM de 23 de março de 2017
                  </Link>
                </li>
              </ul>
            </Header.Body>
          </Header>
          <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
          <Fieldset id="identificacaoDoRequerente" className="pb-6">
            <Legend>Informações essenciais</Legend>
            <div className="mx-auto mt-3 flex w-full justify-center">
              <Radio
                fieldId="embargoed_area"
                register={register}
                label="A propriedade se encontra em área embargada (IBAMA):"
                centered
                isVertical
              />
            </div>
          </Fieldset>

          <div className={`${watchArea == "Não" ? "" : "hidden"}`}>
            <div className="mx-auto flex w-full justify-center text-center">
              <Radio
                label="Possui técnico responsável"
                fieldId="technician.verifyTechnician"
                register={register}
                isVertical
                errors={errors}
                centered
              />
            </div>
            <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
            <div className="grid divide-x xl:grid-cols-2  ">
              <Fieldset id="identificacaoDoRequerente" className="pb-6">
                <Legend>Identificação do requerente</Legend>
                <div className="grid grid-cols-12 gap-x-4 max-xl:container xl:ml-8 xl:mr-1">
                  <div
                    id="nome"
                    className="col-span-full"
                  >
                    {renderField(doaApplicantFieldsArray[0], register, errors)}
                  </div>
                  <div
                    id="cpf_cnpj"
                    className="col-span-4 max-sm:col-span-full"
                  >
                    {renderMaskedField(
                      doaApplicantFieldsArray[3],
                      CPF_CNPJ_MASKITO_OPTIONS,
                      control,
                      errors,
                    )}
                  </div>

                  <div
                    id="responsavel_legal"
                    className="col-span-4 max-sm:col-span-full xl:col-span-4"
                  >
                    {renderField(doaApplicantFieldsArray[2], register, errors)}
                  </div>
                  <div
                    id="inscricao_estadual"
                    className="col-span-4 max-sm:col-span-full xl:col-span-4"
                  >
                    {renderField(doaApplicantFieldsArray[4], register, errors)}
                  </div>
                  {/* <div className="col-span-6 max-md:col-span-full">
                    {renderField(doaApplicantFieldsArray[16], register, errors)}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderMaskedField(
                      doaApplicantFieldsArray[17],
                      CAR_RECORD_MASKITO_OPTIONS,
                      control,
                      errors,
                    )}
                  </div> */}
                  <div id="cep" className="col-span-full">
                    {renderMaskedField(
                      doaApplicantFieldsArray[5],
                      CEP_MASKITO_OPTIONS,
                      control,
                      errors,
                    )}
                    {showCepAlertApplicant && (
                      <p className="mx-0.5 mb-1 text-xs text-info text-opacity-80">
                        CEP informado não encontrado, por favor continue
                        preenchendo seus dados.
                      </p>
                    )}
                  </div>
                  <div
                    id="logradouro"
                    className="col-span-6 max-sm:col-span-full"
                  >
                    {renderField(doaApplicantFieldsArray[6], register, errors)}
                  </div>
                  <div id="numero" className="col-span-6 max-sm:col-span-full">
                    {renderMaskedField(
                      doaApplicantFieldsArray[7],
                      NUMBER_MASKITO_OPTIONS,
                      control,
                      errors,
                    )}
                  </div>
                  <div id="complemento" className="col-span-full">
                    {renderField(doaApplicantFieldsArray[8], register, errors)}
                  </div>
                  <div id="bairro" className="col-span-5 max-sm:col-span-full">
                    {renderField(doaApplicantFieldsArray[9], register, errors)}
                  </div>
                  <div
                    id="municipio"
                    className="col-span-5 max-sm:col-span-full"
                  >
                    {renderField(doaApplicantFieldsArray[10], register, errors)}
                  </div>
                  <div id="uf" className="col-span-2 max-sm:col-span-full">
                    {renderComboboxField(
                      doaApplicantFieldsArray[11],
                      control,
                      errors,
                      setValue,
                      "",
                      watch("applicant.personal_data.address.state"),
                    )}
                  </div>
                  <div
                    id="telefone"
                    className="col-span-6 max-sm:col-span-full"
                  >
                    {renderMaskedField(
                      doaApplicantFieldsArray[12],
                      PHONE_MASKITO_OPTIONS,
                      control,
                      errors,
                    )}
                  </div>

                  <div id="email" className="col-span-6 max-sm:col-span-full">
                    {renderField(doaApplicantFieldsArray[13], register, errors)}
                  </div>
                </div>
              </Fieldset>

              <Fieldset
                title="Dados do responsável técnico pelas informações do pedido"
                className="pb-6"
              >
                <Legend>
                  Dados do responsável técnico pelas informações do pedido
                </Legend>
                <div className="max-xl:container xl:ml-1 xl:mr-8">
                  <div className="grid grid-cols-12 gap-x-4 " id="tecnico">
                    <div className="col-span-full">
                      {renderField(
                        technicianFieldsArray[0],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-8 max-md:col-span-full">
                      {renderMaskedField(
                        technicianFieldsArray[1],
                        CPF_CNPJ_MASKITO_OPTIONS,
                        control,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-4 max-md:col-span-full">
                      {renderMaskedField(
                        technicianFieldsArray[2],
                        RG_MASKITO_OPTIONS,
                        control,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-5 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[3],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-5 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[4],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-2 max-sm:col-span-full">
                      {renderComboboxField(
                        technicianFieldsArray[5],
                        control,
                        errors,
                        setValue,
                        "",
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-5 max-sm:col-span-full">
                      {renderMaskedField(
                        technicianFieldsArray[6],
                        CEP_MASKITO_OPTIONS,
                        control,
                        errors,
                        "",
                        enableTechnical,
                      )}
                      {showCepAlertTechnical && (
                        <div className="col-span-12">
                          <p className="mx-0.5 mb-1 text-xs text-info text-opacity-80">
                            CEP informado não encontrado, por favor continue
                            preenchendo seus dados.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="col-span-5 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[7],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-2 max-sm:col-span-full">
                      {renderMaskedField(
                        technicianFieldsArray[8],
                        NUMBER_MASKITO_OPTIONS,
                        control,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-full">
                      {renderField(
                        technicianFieldsArray[9],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-4 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[10],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-4 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[11],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-4 max-sm:col-span-full">
                      {renderComboboxField(
                        technicianFieldsArray[12],
                        control,
                        errors,
                        setValue,
                        "",
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-6 max-sm:col-span-full">
                      {renderMaskedField(
                        technicianFieldsArray[13],
                        PHONE_MASKITO_OPTIONS,
                        control,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                    <div className="col-span-6 max-sm:col-span-full">
                      {renderField(
                        technicianFieldsArray[14],
                        register,
                        errors,
                        "",
                        enableTechnical,
                      )}
                    </div>
                  </div>
                </div>
              </Fieldset>
            </div>
            <Fieldset title="Informações do imóvel" className="pb-6">
              <Legend>Informações do imóvel</Legend>
              <div className="container grid grid-cols-12 gap-x-4">
                {/* CAR */}
                {renderMaskedField(
                  propertyDataFieldArray[0],
                  CAR_RECORD_MASKITO_OPTIONS,
                  control,
                  errors,
                  "col-span-6 max-sm:col-span-full",
                )}

                {/* IDARON */}
                {renderField(
                  propertyDataFieldArray[1],
                  register,
                  errors,
                  "col-span-6 max-sm:col-span-full",
                )}

                <div className="col-span-full mt-6">
                  <p className="font-medium">
                    Coordenadas geográficas da entrada do imóvel
                  </p>
                </div>

                {/* Latitude e Longitude */}
                <div className="col-span-12 mb-5 gap-x-4 sm:grid sm:grid-cols-2 ">
                  {renderMaskedField(
                    propertyDataFieldArray[2],
                    RONDONIA_LATITUDE_MASKITO_OPTIONS,
                    control,
                    errors,
                  )}
                  {renderMaskedField(
                    propertyDataFieldArray[3],
                    RONDONIA_LONGITUDE_MASKITO_OPTIONS,
                    control,
                    errors,
                  )}
                  {errors && (
                    <ErrorMessage
                      errors={errors}
                      name="property_data.coordinates"
                      render={({ message }) => (
                        <span className="label-text-alt mt-[-8px] block text-error">
                          {message}
                          {get(errors, [
                            "property_data",
                            "coordinates",
                            "root",
                            "message",
                          ])}
                        </span>
                      )}
                    />
                  )}
                </div>
              </div>
            </Fieldset>

            <Fieldset
              title="Especificações do ponto de interferência"
              className="pb-6"
            >
              <Legend>Ponto de captação</Legend>

              <div className="container grid grid-cols-12 gap-x-4">
                {/* Tipo de Interferencia */}
                {renderField(
                  pickupPointFieldsArray[11],
                  register,
                  errors,
                  "col-span-3 max-lg:col-span-6  max-sm:col-span-full max-lg:my-3 sm:mx-auto mt-3",
                )}

                {/* Sistema de captação */}
                {renderField(
                  pickupPointFieldsArray[8],
                  register,
                  errors,
                  "col-span-3 max-lg:col-span-6 max-sm:col-span-full max-lg:my-3 sm:mx-auto mt-3",
                )}

                {/* Tipo de adução */}
                {renderField(
                  pickupPointFieldsArray[9],
                  register,
                  errors,
                  "col-span-3 max-lg:col-span-6 max-sm:col-span-full max-lg:my-3 sm:mx-auto mt-3",
                )}

                {/* Fonte de captação */}
                {renderField(
                  pickupPointFieldsArray[10],
                  register,
                  errors,
                  "col-span-3 max-lg:col-span-6 max-sm:col-span-full max-lg:my-3 sm:mx-auto mt-3",
                )}

                <div className="col-span-full mt-6">
                  <p className="font-medium">
                    Coordenadas geográficas do ponto de captação
                  </p>
                </div>
                <div className="col-span-12 mb-5 gap-x-4 sm:grid sm:grid-cols-2 ">
                  {/* Latitude */}
                  {renderMaskedField(
                    pickupPointFieldsArray[0],
                    RONDONIA_LATITUDE_MASKITO_OPTIONS,
                    control,
                    errors,
                  )}

                  {/* Longitude */}
                  {renderMaskedField(
                    pickupPointFieldsArray[1],
                    RONDONIA_LONGITUDE_MASKITO_OPTIONS,
                    control,
                    errors,
                  )}
                  <ErrorMessage
                    errors={errors}
                    name="pickup_point.coordinates"
                    render={({ message }) => (
                      <span className="label-text-alt mt-[-8px] block text-error">
                        {message}
                        {get(errors, [
                          "pickup_point",
                          "coordinates",
                          "root",
                          "message",
                        ])}
                      </span>
                    )}
                  />
                </div>
                <div className="col-span-full my-2" />

                {/* Número de pontos de captação */}
                {renderField(
                  pickupPointFieldsArray[2],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {/* Cota do terreno */}
                {renderField(
                  pickupPointFieldsArray[3],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {/* Corpo hidríco */}
                {renderField(
                  pickupPointFieldsArray[4],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {/* Bacia hidrográfica */}
                {renderField(
                  pickupPointFieldsArray[5],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {/* Sub-Bacia hidrográfica */}
                {renderField(
                  pickupPointFieldsArray[6],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {/* Vazão do corpo hídrico */}
                {renderField(
                  pickupPointFieldsArray[7],
                  register,
                  errors,
                  "col-span-4 max-md:col-span-full ",
                )}

                {watchFundingSource === "Subterrânea" ? (
                  <>
                    <div className="col-span-full mt-5 rounded-2xl border-2 border-gray-300 p-8 shadow-md">
                      <div className="mb-3 text-center">
                        <span className="text-center font-bold">
                          Informações da fonte de captação
                        </span>
                        <hr className="mt-2 border-gray-300" />
                      </div>
                      <Radio
                        fieldId="pickup_point.occurrence_point"
                        register={register}
                        options={[
                          {
                            label: "Poço escavado (poço caçimba / amazônica)",
                            value: "Poço escavado (poço caçimba / amazônica)",
                            checked: true,
                          },
                        ]}
                      />
                      <div>
                        {renderField(
                          infoAmazonWellFieldsArray[0],
                          register,
                          errors,
                        )}
                        {renderField(
                          infoAmazonWellFieldsArray[1],
                          register,
                          errors,
                        )}
                        {renderField(
                          infoAmazonWellFieldsArray[2],
                          register,
                          errors,
                        )}
                        {renderField(
                          infoAmazonWellFieldsArray[3],
                          register,
                          errors,
                        )}
                        {renderField(
                          infoAmazonWellFieldsArray[4],
                          register,
                          errors,
                        )}
                      </div>
                    </div>
                  </>
                ) : watchFundingSource === "Superficial" ? (
                  <>
                    <div className="col-span-full mt-5 rounded-2xl border-2 border-gray-300 p-8 shadow-md">
                      <div className="mb-3 text-center">
                        <span className="text-center font-bold">
                          Informações da fonte de captação
                        </span>
                        <hr className="mt-2 border-gray-300" />
                      </div>
                      <Radio
                        fieldId="pickup_point.occurrence_point"
                        register={register}
                        options={[
                          {
                            label: "Rio / Igarapé",
                            value: "Rio / Igarapé",
                          },
                          {
                            label: "Lago",
                            value: "lago",
                          },
                        ]}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Fieldset>

            <Fieldset title="Informações da Atividade" className="pb-6">
              <Legend id="atividade">Informações da atividade</Legend>
              <div className="container grid grid-cols-12 gap-x-4">
                <div className="col-span-full mb-3 mt-1">
                  <span className="label mb-6 mt-1 justify-center py-0 font-semibold">
                    {DOA_ACTIVITY_LABEL}
                  </span>
                  <div className="my-3 grid grid-cols-12 gap-4 ">
                    {verifyActiveFieldArray.map((data, index) => (
                      <div
                        key={`${data.label} - ${index}`}
                        className="col-span-4 mx-auto gap-x-4 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-full"
                      >
                        <Radio
                          fieldId={data.fieldId}
                          label={data.label}
                          register={register}
                          isVertical
                          centered
                          errors={errors}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="col-span-full">
                  {renderField(activityFieldsArray[0], register, errors)}
                </div> */}
              </div>
            </Fieldset>

            {watchActiveAnimalData == true && (
              <div>
                <Fieldset
                  id="criacao animal"
                  title="Finalidade do Uso"
                  className="pb-6"
                >
                  <Legend>Criação Animal</Legend>
                  <div className="container">
                    <div className="flex flex-col">
                      <span className="mb-6 text-center text-sm font-normal">
                        Adicione mais campos para cada tipo de criação
                      </span>
                    </div>
                    <div className="w-auto">
                      {purposeFields.map((index, id) => (
                        <div
                          key={index.id}
                          className="grid grid-cols-12 gap-x-4"
                        >
                          <div className="col-span-full mx-1 hidden w-full justify-center p-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (id > 0) {
                                  purposeRemove(id);
                                } else {
                                  if (purposeFields.length < 4) {
                                    purposeAppend({
                                      breed: "",
                                      select_animal: "",
                                      number_heads: 0,
                                      per_capita_consumption: 0,
                                      total_consumption: "",
                                    });
                                  }
                                }
                              }}
                              className={
                                id > 0
                                  ? "mb-2 mr-2 mt-1 w-full rounded-full bg-red-700 py-1 text-center text-xl font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  : "hidden"
                              }
                            >
                              {"-"}
                            </button>
                          </div>
                          <div className="col-span-6 max-sm:col-span-full">
                            <Select
                              label={DOA_ANIMAL_BREEDING_TYPE_LABEL}
                              fieldId={`animal_data.use_purpose.${id}.select_animal`}
                              register={register}
                              errors={errors}
                              options={[
                                {
                                  value: "Ave",
                                  label: "Ave",
                                },
                                {
                                  value: "Bovino",
                                  label: "Bovino",
                                },
                                {
                                  value: "Caprino",
                                  label: "Caprino",
                                },
                                {
                                  value: "Suíno",
                                  label: "Suíno",
                                },
                                {
                                  value: "Outro",
                                  label: "Outro (especificar)",
                                },
                              ]}
                            />
                          </div>
                          <div className="col-span-6 max-sm:col-span-full">
                            <TextInput
                              label={DOA_ANIMAL_BREEDING_SPECIES_LABEL}
                              fieldId={`animal_data.use_purpose.${id}.breed`}
                              register={register}
                              errors={errors}
                              placeholder="Ex: Bovino de Corte"
                            />
                          </div>
                          <div className="col-span-6 max-sm:col-span-full">
                            <TextInput
                              label={DOA_ANIMAL_BREEDING_QUANTITY_LABEL}
                              fieldId={`animal_data.use_purpose.${id}.number_heads`}
                              inputType="number"
                              register={register}
                              handleChange={() => {
                                const calculate =
                                  Number(
                                    getValues(
                                      `animal_data.use_purpose.${id}.per_capita_consumption`,
                                    ),
                                  ) *
                                  Number(
                                    getValues(
                                      `animal_data.use_purpose.${id}.number_heads`,
                                    ),
                                  );
                                setValue(
                                  `animal_data.use_purpose.${id}.total_consumption`,
                                  String(calculate / 1000) + " m³",
                                );
                              }}
                              errors={errors}
                            />
                          </div>
                          <div className="col-span-6 max-sm:col-span-full">
                            <TextInput
                              label={
                                DOA_ANIMAL_BREEDING_PER_CAPITA_CONSUMPTION_LABEL
                              }
                              fieldId={`animal_data.use_purpose.${id}.per_capita_consumption`}
                              inputType="number"
                              register={register}
                              errors={errors}
                              placeholder="Litros por cabeça por dia"
                              handleChange={() => {
                                const calculate =
                                  Number(
                                    getValues(
                                      `animal_data.use_purpose.${id}.per_capita_consumption`,
                                    ),
                                  ) *
                                  Number(
                                    getValues(
                                      `animal_data.use_purpose.${id}.number_heads`,
                                    ),
                                  );
                                setValue(
                                  `animal_data.use_purpose.${id}.total_consumption`,
                                  String(calculate / 1000) + " m³",
                                );
                              }}
                            />
                          </div>

                          <div className="col-span-full">
                            <TextInput
                              label={
                                DOA_ANIMAL_BREEDING_TOTAL_CONSUMPTION_LABEL
                              }
                              fieldId={`animal_data.use_purpose.${id}.total_consumption`}
                              register={register}
                              errors={errors}
                              disabled
                            />
                          </div>

                          {id === 0 ? (
                            <div className="col-span-full my-2 ml-auto w-24">
                              <button
                                type="button"
                                onClick={() => {
                                  if (purposeFields.length < 4) {
                                    purposeAppend({
                                      breed: "",
                                      select_animal: "",
                                      number_heads: 0,
                                      per_capita_consumption: 0,
                                      total_consumption: "",
                                    });
                                  }
                                }}
                                className={
                                  "w-full rounded-2xl bg-green-700 text-center text-4xl font-light text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                                }
                              >
                                {"+"}
                              </button>
                            </div>
                          ) : (
                            <div className="col-span-full my-2 ml-auto w-24">
                              <button
                                type="button"
                                onClick={() => {
                                  if (id > 0) {
                                    purposeRemove(id);
                                  } else {
                                    if (purposeFields.length < 4) {
                                      purposeAppend({
                                        breed: "",
                                        select_animal: "",
                                        number_heads: 0,
                                        per_capita_consumption: 0,
                                        total_consumption: "",
                                      });
                                    }
                                  }
                                }}
                                className={
                                  id > 0
                                    ? "w-full rounded-2xl bg-red-700 py-1 text-center text-4xl font-light text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
                                    : "hidden"
                                }
                              >
                                {"-"}
                              </button>
                            </div>
                          )}
                          <hr className="col-span-full my-3 border-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Fieldset>

                <Fieldset title="Dados de Pastagem" className="pb-6">
                  <Legend>Dados de pastagem</Legend>
                  <div className="container">
                    <div>
                      {/* <legend className="label py-0 max-sm:mb-2">
                    Há irrigação de pastagem?
                  </legend> */}
                      <div className="mb-1 flex items-center gap-2 max-sm:gap-1 max-sm:pb-2 md:py-1">
                        <div className="col-span-4 max-xl:col-span-full">
                          <Radio
                            fieldId={
                              "animal_data.pasture_data.pasture_irrigation"
                            }
                            label={"Há irrigação de pastagem"}
                            register={register}
                            errors={errors}
                            isVertical
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className="mb-2">
                        Em quais meses é realizada a pastagem dos animais?
                        (Adicione mais opções em caso de mais de um mês)
                      </span>
                      <div className="mt-3 grid grid-cols-12 gap-y-2">
                        {whichMonths.map((months) => (
                          <div
                            key={months.value}
                            className=" col-span-1 flex items-center gap-1 max-2xl:col-span-2 max-md:col-span-3 max-sm:col-span-6"
                          >
                            <input
                              type="checkbox"
                              className="checkbox border-beige-200 bg-beige-50  focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                              id={months.value}
                              value={months.value}
                              onChange={(e) => {
                                months.checked = e.target.checked;
                              }}
                            />
                            <label htmlFor={months.value}>{months.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Fieldset>

                <Fieldset
                  title="Dados de dessedentação (Obrigatório para Criação de Animais - MARQUE ZERO (0) SE NÃO APLICA)"
                  className="pb-6"
                >
                  <Legend>Dados de dessedentação</Legend>
                  {/* <div  className="flex flex-col">
                <span className="mb-3 text-center font-bold">
                  Obrigatório para criação de animais
                </span>
              </div> */}
                  <div className="container grid grid-cols-12 gap-x-4">
                    <div className=" col-span-full flex">
                      <Radio
                        fieldId="animal_data.watering_data.dehydration_occur"
                        label={DOA_DEHYDRATION_OCCUR_LABEL}
                        register={register}
                        errors={errors}
                        options={[
                          { label: "Não ocorre", value: "Não ocorre" },
                          {
                            label: "Tanque escavado",
                            value: "Tanque escavado",
                          },
                          { label: "Rio / Igarapé", value: "Rio / Igarapé" },
                          { label: "Lago", value: "Lago" },
                        ]}
                      />
                    </div>
                    {watchDehydrationOccur == "Tanque escavado" && (
                      <>
                        <div className="col-span-full my-2 rounded-2xl border-2 border-gray-300 p-8 shadow-md">
                          <div className="mb-3 text-center">
                            <span className="text-center font-bold">
                              Dimensão e volume do tanque escavado
                            </span>
                          </div>
                          <div>
                            <div className="mb-3 ml-1">
                              <Radio
                                fieldId="animal_data.watering_data.dimension_excavated_tank.dehydration_occur_optional"
                                register={register}
                                options={[
                                  {
                                    label: "Rio, igarapé, lago",
                                    value: "Rio, igarapé, lago",
                                    checked: true,
                                  },
                                ]}
                              />
                            </div>
                            <div className="grid grid-cols-12 gap-x-4">
                              <div className="col-span-4 max-xl:col-span-full">
                                {renderField(
                                  dimensionExcavatedTankFieldArray[0],
                                  register,
                                  errors,
                                )}
                              </div>
                              <div className="col-span-4 max-xl:col-span-full">
                                {renderField(
                                  dimensionExcavatedTankFieldArray[1],
                                  register,
                                  errors,
                                )}
                              </div>
                              <div className="col-span-4 max-xl:col-span-full">
                                {renderField(
                                  dimensionExcavatedTankFieldArray[2],
                                  register,
                                  errors,
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-span-full">
                      {renderField(
                        wateringDataFieldsArray[0],
                        register,
                        errors,
                      )}
                    </div>
                    <div className="col-span-6 max-sm:col-span-full">
                      {renderField(
                        wateringDataFieldsArray[1],
                        register,
                        errors,
                      )}
                    </div>
                    <div className="col-span-6 max-sm:col-span-full">
                      {renderField(
                        wateringDataFieldsArray[2],
                        register,
                        errors,
                      )}
                    </div>
                    <hr className="col-span-full my-3" />
                    <div className="col-span-full">
                      <p>
                        Coordenada geográfica do ponto de dessedentação
                        <br />
                      </p>
                    </div>
                    <div className="col-span-12 grid grid-cols-2 gap-x-4 max-sm:col-span-full">
                      {renderMaskedField(
                        wateringDataFieldsArray[3],
                        RONDONIA_LATITUDE_MASKITO_OPTIONS,
                        control,
                        errors,
                        "max-sm:col-span-full",
                      )}
                      {renderMaskedField(
                        wateringDataFieldsArray[4],
                        RONDONIA_LONGITUDE_MASKITO_OPTIONS,
                        control,
                        errors,
                        "max-sm:col-span-full",
                      )}
                      <ErrorMessage
                        errors={errors}
                        name="watering_data.coordinates"
                        render={({ message }) => (
                          <span className="label-text-alt mt-[-8px] block text-error">
                            {message}
                            {get(errors, [
                              "watering_data",
                              "coordinates",
                              "root",
                              "message",
                            ])}
                          </span>
                        )}
                      />
                    </div>
                  </div>
                </Fieldset>
              </div>
            )}

            {watchActiveDomesticUse == true && (
              <Fieldset title="Consumo Humano" className="pb-6">
                <Legend>Consumo Humano</Legend>
                <div className="container grid grid-cols-12 gap-x-4">
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(domesticUseFieldsArray[0], register, errors)}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(domesticUseFieldsArray[1], register, errors)}
                  </div>
                  <div className="col-span-full">
                    {renderField(domesticUseFieldsArray[2], register, errors)}
                  </div>
                </div>
              </Fieldset>
            )}

            {watchActivePisciculture == true && (
              <Fieldset title="Dados de piscicultura" className="pb-6">
                <Legend>Dados de piscicultura</Legend>
                <div className="container grid grid-cols-12 gap-x-4">
                  <div
                    className={`${watch(
                      "pisciculture.pisciculture_data.type_area_culture",
                    ) == "Outros"
                      ? "col-span-6 max-md:col-span-full"
                      : "col-span-full"
                      }`}
                  >
                    {renderField(
                      piscicultureDataFieldsArray[0],
                      register,
                      errors,
                    )}
                  </div>
                  <div
                    className={`${watch(
                      "pisciculture.pisciculture_data.type_area_culture",
                    ) == "Outros"
                        ? "col-span-6 max-md:col-span-full"
                        : "hidden"
                      }`}
                  >
                    {renderField(
                      piscicultureDataFieldsArray[9],
                      register,
                      errors,
                    )}
                  </div>
                  <div className={"col-span-6 max-md:col-span-full"}>
                    {renderField(
                      piscicultureDataFieldsArray[1],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[2],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[3],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[4],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[5],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[6],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[7],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-md:col-span-full">
                    {renderField(
                      piscicultureDataFieldsArray[8],
                      register,
                      errors,
                    )}
                  </div>
                </div>
              </Fieldset>
            )}

            {watchActiveIrrigationData == true && (
              <Fieldset title="Dados de irrigação" className="pb-6">
                <Legend>Dados de irrigação</Legend>
                <div className="container grid grid-cols-12 gap-x-4">
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[0],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[1],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[2],
                      register,
                      errors,
                    )}
                  </div>{" "}
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[3],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[4],
                      register,
                      errors,
                    )}
                  </div>
                  <div className="col-span-6 max-sm:col-span-full">
                    {renderField(
                      irrigationDataFieldsArray[5],
                      register,
                      errors,
                    )}
                  </div>
                </div>
              </Fieldset>
            )}

            {watchActiveOtherActivity == true && (
              <Fieldset
                title="Informações sobre outras atividades"
                className="mb-6"
              >
                <Legend>Informações sobre outras atividades</Legend>
                <div className="container grid grid-cols-12 gap-x-4">
                  <div className="col-span-full">
                    <label
                      htmlFor={"other_activity.activity_description"}
                      className="label my-1 py-0"
                    >
                      Descreva a atividade
                    </label>
                    <textarea
                      className="w-full rounded-none border border-beige-300 bg-beige-200 px-2 py-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400"
                      rows={3}
                      maxLength={1250}
                      placeholder="Descreva aqui a sua atividade"
                      {...register("other_activity.activity_description")}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="other_activity.activity_description"
                      render={({ message }) => (
                        <span className="label-text-alt mt-[-8px] block text-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
              </Fieldset>
            )}
            <Fieldset
              title="Dados de captação para todos os usos e enchimentos de tanques"
              className="mb-6"
            >
              <Legend>
                Dados de captação para todos os usos e enchimentos de tanques
              </Legend>
              <div className="flex flex-col">
                <span className="mb-3 text-center font-bold">
                  Exceto manutenção de tanques
                </span>
              </div>
              <div className="container grid grid-cols-12 gap-x-4">
                {renderField(
                  captureAllUsesFieldArray[0],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}

                {renderField(
                  captureAllUsesFieldArray[1],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[2],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[3],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[4],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[5],
                  register,
                  errors,
                  "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[6],
                  register,
                  errors,
                  "col-span-6 max-sm:col-span-full",
                )}
                {renderField(
                  captureAllUsesFieldArray[7],
                  register,
                  errors,
                  "col-span-6 max-sm:col-span-full",
                )}
              </div>
            </Fieldset>

            {watchActivePisciculture == true && (
              <>
                <Fieldset
                  title="Dados de captação para manutenção de tanques"
                  className="mb-6"
                >
                  <Legend>Dados de captação para manutenção de tanques</Legend>
                  <div className="container grid grid-cols-12 gap-x-4">
                    {/* Vazão de captação diária (m³/dia)*/}
                    {renderField(
                      captureTankMaintenanceFieldArray[0],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[1],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[2],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[3],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[4],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[5],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[6],
                      register,
                      errors,
                      "col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      captureTankMaintenanceFieldArray[7],
                      register,
                      errors,
                      "col-span-6 max-sm:col-span-full",
                    )}
                  </div>
                </Fieldset>

                <Fieldset
                  title="Dados de lançamento para manutenção de tanques"
                  className="mb-6"
                >
                  <Legend>
                    Dados de lançamento para manutenção de tanques
                  </Legend>
                  <div className="container grid grid-cols-12 gap-x-4">
                    {/* Vazão de captação diária (m³/dia)*/}
                    {renderField(
                      launchTankMaintenanceFieldArray[0],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[1],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[2],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[3],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[4],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[5],
                      register,
                      errors,
                      "col-span-4 max-lg:col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[6],
                      register,
                      errors,
                      "col-span-6 max-sm:col-span-full",
                    )}
                    {renderField(
                      launchTankMaintenanceFieldArray[7],
                      register,
                      errors,
                      "col-span-6 max-sm:col-span-full",
                    )}
                  </div>
                </Fieldset>
              </>
            )}

            <Separator className="mb-6 " />
            <div className="container mx-1">
              <section id="submitChecks" className="mb-3 flex flex-col">
                <Radio
                  isVertical
                  fieldId="process_formalized.radio_process_in_sedam"
                  label="Possui processo de dispensa de outorga formalizado na SEDAM?"
                  register={register}
                  errors={errors}
                />
                {watchRadioProcessInSedam == "Sim" && (
                  <div className="mb-6 mt-2 flex flex-col gap-x-4">
                    <TextInput
                      fieldId="process_formalized.process_in_sedam_protocol"
                      label="Protocolo / Processo"
                      register={register}
                      inputType="text"
                      errors={errors}
                    />
                    <div className="mt-2 flex items-center gap-x-4">
                      <input
                        type="checkbox"
                        className="checkbox border-beige-200 bg-beige-50  focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
                        id="checkboxClosingProcess"
                        {...register(
                          "process_formalized.checkbox_closing_process",
                        )}
                      />
                      <label htmlFor="checkboxClosingProcess">
                        Solicito encerramento do mesmo
                      </label>
                    </div>
                  </div>
                )}
              </section>
            </div>
            <Separator className="mb-6" />
            <SubmitButton.Wrapper className="mx-2">
              <SubmitButton
                disabled={
                  (watchRadioProcessInSedam == "Sim" && !watchCheckbox) ||
                  loading
                }
              >
                {loading == true ? (
                  <div className="loading loading-spinner" />
                ) : (
                  "Enviar"
                )}
              </SubmitButton>
              <FollowUpButton>
                <Link href={"/area-usuario?service=duirh"}>Acompanhar solicitação</Link>
              </FollowUpButton>
            </SubmitButton.Wrapper>
          </div>

          <div
            className={`container mx-auto my-6 justify-center ${watchArea == "Sim" ? "block" : "hidden"
              }`}
          >
            <AlertComponent
              color="error"
              title="Atenção"
              label="Você não se adequa à dispensa da solicitação, favor procurar a secretaria para abrir um processo físico."
              disableCloseBttn
            />
          </div>
        </form>
        {/* <DevT control={control} /> */}
      </FormContainer>
    </>
  );
}
