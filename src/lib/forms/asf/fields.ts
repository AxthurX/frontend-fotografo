import { IField, IFieldArrayField, applicantFieldsArray } from "@/lib/forms/fields";
import { ufList } from "@/lib/forms/ufList";
import { ASF_CHECKBOX_0_LABEL, ASF_CHECKBOX_1_LABEL, ASF_CHECKBOX_2_LABEL, ASF_CHECKBOX_3_LABEL, ASF_CHECKBOX_4_LABEL, ASF_CHECKBOX_5_LABEL, ASF_CHECKBOX_6_LABEL, ASF_CHECKBOX_7_LABEL, ASF_CHECKBOX_8_LABEL, CEP_LABEL, CITY_LABEL, COMPLEMENT_LABEL, CPF_LABEL, DISTRICT_LABEL, LATITUDE_LABEL, LONGITUDE_LABEL, RG_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL, ASF_CHECKBOX_9_LABEL, PHONE_LABEL, EMAIL_LABEL, NAME_LABEL, ASF_SURVEY_1_LABEL, ASF_SURVEY_2_LABEL, ASF_SURVEY_10_LABEL, ASF_SURVEY_9_LABEL, ASF_SURVEY_3_LABEL, ASF_SURVEY_4_LABEL, ASF_SURVEY_5_LABEL, ASF_SURVEY_6_LABEL, ASF_SURVEY_7_LABEL, ASF_SURVEY_8_LABEL, ASF_SURVEY_0_LABEL, ASF_SURVEY_11_LABEL, ASF_SURVEY_12_LABEL, ASF_SURVEY_13_LABEL, ASF_SURVEY_14_LABEL, ASF_SURVEY_15_LABEL, ASF_RG_LEGAL_REPRESENTATIVE_LABEL, ASF_CPF_LEGAL_REPRESENTATIVE_LABEL, ASF_SITUATION_LABEL, ASF_TOTAL_AREA_LABEL, ASF_COUNCIL_LICENSE_NUMBER_LABEL, ASF_SITE_PLAN_LABEL, ASF_ROAD_LAYOUT_SHAPEFILES_LABEL, ASF_MAYOR_APPOINTMENT_LABEL, ASF_ZONE_LABEL, ASF_WIDTH_LABEL, ASF_EXTENSION_LABEL, ASF_CHECKBOX_10_LABEL } from "../labels";
import { options, situations } from "./options";
import { technicianFieldsArray } from "../fields";

const asfApplicantFieldsArray = structuredClone(applicantFieldsArray);
asfApplicantFieldsArray.splice(2, 0, { fieldId: "applicant.state_registration", label: "Inscrição estadual", fieldType: "text", minLength: 9, maxLength: 14 });

const legalRepresentativeFieldsArray: IField[] = [
  {
    fieldId: "asf_legal_representative.name",
    label: NAME_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 120,
  },
  {
    fieldId: "asf_legal_representative.cpf",
    label: CPF_LABEL,
    fieldType: "masked",
    minLength: 14,
    maxLength: 14
  },
  {
    fieldId: "asf_legal_representative.rg",
    label: RG_LABEL,
    fieldType: "masked",
    minLength: 6,
    maxLength: 15
  },
  {
    fieldId: "asf_legal_representative.address.zipcode",
    label: CEP_LABEL,
    fieldType: "masked",
    placeholder: "",
    minLength: 9,
    maxLength: 9
  },
  {
    fieldId: "asf_legal_representative.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80
  },
  {
    fieldId: "asf_legal_representative.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    placeholder: "",
    minLength: 1,
    maxLength: 5,
  },
  {
    fieldId: "asf_legal_representative.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255
  },
  {
    fieldId: "asf_legal_representative.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50
  },
  {
    fieldId: "asf_legal_representative.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50
  },
  {
    fieldId: "asf_legal_representative.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "asf_legal_representative.contact.phone",
    label: PHONE_LABEL,
    fieldType: "masked",
    placeholder: "(00) 00000-0000",
    minLength: 14,
    maxLength: 15,
    pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/
  },
  {
    fieldId: "asf_legal_representative.contact.email",
    label: EMAIL_LABEL,
    fieldType: "text",
    maxLength: 80
  },
];

export const asfFiles: IField[] = [
  {
    fieldId: "asf_files.rg_legal_representative",
    label: ASF_RG_LEGAL_REPRESENTATIVE_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "asf_files.cpf_legal_representative",
    label: ASF_CPF_LEGAL_REPRESENTATIVE_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "asf_files.mayor_appointment",
    label: ASF_MAYOR_APPOINTMENT_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "asf_files.council_license_number",
    label: ASF_COUNCIL_LICENSE_NUMBER_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "asf_files.site_plan",
    label: ASF_SITE_PLAN_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "asf_files.road_layout_shapefiles",
    label: ASF_ROAD_LAYOUT_SHAPEFILES_LABEL,
    fieldType: "file",
  },
];

const checkboxFieldsArray: IField[] = [
  {
    fieldId: "confirmations.activity_is_public_interest",
    label: ASF_CHECKBOX_0_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.will_not_cause_environmental_impact",
    label: ASF_CHECKBOX_1_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.does_not_restrict_the_union_supervisory_action",
    label: ASF_CHECKBOX_2_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.raw_materials_must_come_from_licensed_area",
    label: ASF_CHECKBOX_3_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.liable_regardless_fault",
    label: ASF_CHECKBOX_4_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.material_should__collected_suitable_place",
    label: ASF_CHECKBOX_5_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.no_waste_may_be_deposited_if_polluting",
    label: ASF_CHECKBOX_6_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.construction_waste_must_not_stored_inappropriate_place",
    label: ASF_CHECKBOX_7_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.submit_report_actions_taken_environmental_agency",
    label: ASF_CHECKBOX_8_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.exemption_not_apply_local_undertakings_activities",
    label: ASF_CHECKBOX_9_LABEL,
    fieldType: "checkbox"
  },
  {
    fieldId: "confirmations.information_provided_is_true_accurate",
    label: ASF_CHECKBOX_10_LABEL,
    fieldType: "checkbox"
  }
];

const surveyFieldsArray: IField[] = [
  {
    fieldId: "surveys.survey_0",
    label: ASF_SURVEY_0_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_1",
    label: ASF_SURVEY_1_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_2",
    label: ASF_SURVEY_2_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_3",
    label: ASF_SURVEY_3_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_4",
    label: ASF_SURVEY_4_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_5",
    label: ASF_SURVEY_5_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_6",
    label: ASF_SURVEY_6_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_7",
    label: ASF_SURVEY_7_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_8",
    label: ASF_SURVEY_8_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_9",
    label: ASF_SURVEY_9_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_10",
    label: ASF_SURVEY_10_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_11",
    label: ASF_SURVEY_11_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_12",
    label: ASF_SURVEY_12_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_13",
    label: ASF_SURVEY_13_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  },
  {
    fieldId: "surveys.survey_14",
    label: ASF_SURVEY_14_LABEL,
    fieldType: "radio",
    className: "grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6"
  }
];

const activityFieldsArray: IField[] = [
  {
    fieldId: "activity.source.source_supply",
    label: ASF_SURVEY_15_LABEL,
    fieldType: "combobox",
    options,
    className: "w-[90vw] max-sm:w-[85vw] max-w-[1372px]"
  },
  {
    fieldId: "activity.situation",
    label: ASF_SITUATION_LABEL,
    fieldType: "combobox",
    options: situations,
  },
  {
    fieldId: "activity.total_area",
    label: ASF_TOTAL_AREA_LABEL,
    fieldType: "text",
  },
];

const highwaysFieldProps: IField[] = [
  {
    fieldId: "activity.location.highways.zone",
    label: ASF_ZONE_LABEL,
    minLength: 2,
    fieldType: "radio",
    options: [
      { label: "Zona rural", value: "Zona rural" },
      { label: "Zona urbana", value: "Zona urbana" },
    ],
    className: "grid grid-cols-2 md:grid-flow-col"
  },
  {
    fieldId: "activity.location.highways.name",
    label: NAME_LABEL,
    minLength: 2,
    fieldType: "text"
  },
  {
    fieldId: "activity.location.highways.width",
    label: ASF_WIDTH_LABEL,
    minLength: 2,
    fieldType: "masked"
  },
  {
    fieldId: "activity.location.highways.extension",
    label: ASF_EXTENSION_LABEL,
    minLength: 2,
    fieldType: "masked"
  },
  {
    fieldId: "activity.location.highways.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
  {
    fieldId: "activity.location.highways.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
];

const streetsFieldProps: IFieldArrayField[] = [
  {
    label: ASF_ZONE_LABEL,
    minLength: 2,
    fieldType: "radio",
    options: [
      { label: "Zona rural", value: "Zona rural" },
      { label: "Zona urbana", value: "Zona urbana" },
    ],
    className: "grid grid-cols-2 md:grid-flow-col"
  },
  {
    label: NAME_LABEL,
    minLength: 2,
    fieldType: "text"
  },
  {
    label: ASF_WIDTH_LABEL,
    minLength: 2,
    fieldType: "masked"
  },
  {
    label: ASF_EXTENSION_LABEL,
    minLength: 2,
    fieldType: "masked"
  },
  {
    label: LATITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
  {
    label: LONGITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
];

export { activityFieldsArray, asfApplicantFieldsArray, applicantFieldsArray, checkboxFieldsArray, legalRepresentativeFieldsArray, surveyFieldsArray, highwaysFieldProps, streetsFieldProps, technicianFieldsArray };