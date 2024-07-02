import { IField, applicantFieldsArray } from "@/lib/forms/fields";
import { ufList } from "@/lib/forms/ufList";
import { CAR_RECORD_LABEL, CAR_RECORD_SITUATION_LABEL, CASC_ANM_TITLE_LABEL, CASC_CHECKBOX_0_LABEL, CASC_CHECKBOX_1_LABEL, CASC_CHECKBOX_2_LABEL, CASC_CHECKBOX_3_LABEL, CASC_CHECKBOX_4_LABEL, CASC_CHECKBOX_5_LABEL, CASC_CHECKBOX_6_LABEL, CASC_CHECKBOX_7_LABEL, CASC_CHECKBOX_8_LABEL, CASC_PROPERTY_OWNERSHIP_PROOF_LABEL, CASC_SHAPEFILE_FOLDER_LABEL, CEP_LABEL, CITY_LABEL, COLMAM_ACTIVITY_LOCATION_LABEL, COLMAM_ACTIVITY_TYPE_LABEL, COMMERCIAL_USE_LABEL, COMPLEMENT_LABEL, CONSEPA_01_2019_LABEL, CPF_LABEL, DEPTH_OVER_3M_LABEL, DISTRICT_LABEL, INDIGENOUS_LAND_INTERFERENCE_LABEL, IN_OPERATION_LABEL, LATITUDE_LABEL, LEGAL_REPRESENTATIVE_LABEL, LEGAL_RESERVE_OR_RESTRICTED_USE_INTERFERENCE_LABEL, LONGITUDE_LABEL, PROTECTED_AREAS_INTERFERENCE_LABEL, PUBLIC_ADMINISTRATION_EXTRACTION_LABEL, RG_LABEL, SAFEGUARDED_ASSETS_INTERFERENCE_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL, WATER_BODY_INTERFERENCE_LABEL } from "../labels";

const activityFieldsArray: IField[] = [
  {
    fieldId: "activity.activity_type",
    label: COLMAM_ACTIVITY_TYPE_LABEL,
    fieldType: "combobox",
    options: [{ 
      label: "Extração de cascalho para recuperação de estradas, Lei nº 4564 de 23/08/2019",
      value: "Extração de cascalho para recuperação de estradas, Lei nº 4564 de 23/08/2019"
    }],
    className: "w-[90vw] max-sm:w-[85vw] max-w-[1372px]"
  },
  {
    fieldId: "activity.address_type",
    label: COLMAM_ACTIVITY_LOCATION_LABEL,
    fieldType: "radio",
    options: [
      { label: "Zona rural", value: "Zona rural" },
      { label: "Zona urbana", value: "Zona urbana" },
    ],
    className: "grid grid-cols-2 md:grid-flow-col lg:grid-cols-3"
  },
  {
    fieldId: "activity.address.zipcode",
    label: CEP_LABEL,
    placeholder: "00000-000",
    fieldType: "masked",
    minLength: 9,
    maxLength: 9
  },
  {
    fieldId: "activity.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
  {
    fieldId: "activity.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    minLength: 1,
    maxLength: 5
  },
  {
    fieldId: "activity.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255,
  },
  {
    fieldId: "activity.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50,
  },
  {
    fieldId: "activity.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50
  },
  {
    fieldId: "activity.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "activity.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
  {
    fieldId: "activity.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
  {
    fieldId: "activity.car_record",
    label: CAR_RECORD_LABEL,
    fieldType: "masked",
  },
  {
    fieldId: "activity.car_record_situation",
    label: CAR_RECORD_SITUATION_LABEL,
    fieldType: "combobox",
    options: [{
      label: "Ativo",
      value: "Ativo"
    }, {
      label: "Pendente",
      value: "Pendente"
    }, {
      label: "Suspenso",
      value: "Suspenso"
    }, {
      label: "Cancelado",
      value: "Cancelado"
    }],
    className: "w-[90vw] max-sm:w-[85vw] max-w-[120px]"
  },
];

const surveyFieldsArray: IField[] = [
  {
    fieldId: "survey.public_administration_extraction",
    label: PUBLIC_ADMINISTRATION_EXTRACTION_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.in_operation",
    label: IN_OPERATION_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.consepa_01_2019",
    label: CONSEPA_01_2019_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.commercial_use",
    label: COMMERCIAL_USE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.legal_reserve_or_restricted_use_interference",
    label: LEGAL_RESERVE_OR_RESTRICTED_USE_INTERFERENCE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.protected_areas_interference",
    label: PROTECTED_AREAS_INTERFERENCE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.water_body_interference",
    label: WATER_BODY_INTERFERENCE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.indigenous_land_interference",
    label: INDIGENOUS_LAND_INTERFERENCE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.safeguarded_assets_interference",
    label: SAFEGUARDED_ASSETS_INTERFERENCE_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "survey.depth_over_3m",
    label: DEPTH_OVER_3M_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  }
];

const legalRepresentativeFieldsArray: IField[] = [
  {
    fieldId: "legal_representative.name",
    label: LEGAL_REPRESENTATIVE_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 120,
  },
  {
    fieldId: "legal_representative.cpf",
    label: CPF_LABEL,
    fieldType: "masked",
    minLength: 14,
    maxLength: 14
  },
  {
    fieldId: "legal_representative.rg",
    label: RG_LABEL,
    fieldType: "masked",
    minLength: 6,
    maxLength: 15
  }
];

const checkboxFieldsArray: IField[] = [
  {
    fieldId: "checkbox_0",
    label: CASC_CHECKBOX_0_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_1",
    label: CASC_CHECKBOX_1_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_2",
    label: CASC_CHECKBOX_2_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_3",
    label: CASC_CHECKBOX_3_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_4",
    label: CASC_CHECKBOX_4_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_5",
    label: CASC_CHECKBOX_5_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_6",
    label: CASC_CHECKBOX_6_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_7",
    label: CASC_CHECKBOX_7_LABEL,
    fieldType: "checkbox",
  },
  {
    fieldId: "checkbox_8",
    label: CASC_CHECKBOX_8_LABEL,
    fieldType: "checkbox",
  }
];

export const cascFiles: IField[] = [
  {
    fieldId: "property_ownership_proof",
    label: CASC_PROPERTY_OWNERSHIP_PROOF_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "shapefile_folder",
    label: CASC_SHAPEFILE_FOLDER_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "anm_title",
    label: CASC_ANM_TITLE_LABEL,
    fieldType: "file",
  }
];

export { activityFieldsArray, applicantFieldsArray, checkboxFieldsArray, legalRepresentativeFieldsArray, surveyFieldsArray };

