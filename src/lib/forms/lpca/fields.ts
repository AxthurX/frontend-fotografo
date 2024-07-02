import { civilStatusList } from "@/lib/forms/civilStatusList";
import { IField, applicantFieldsArray, technicianFieldsArray } from "@/lib/forms/fields";
import { ufList } from "@/lib/forms/ufList";
import { CAR_RECORD_LABEL, CEP_LABEL, CITY_LABEL, CIVIL_STATUS_LABEL, COMPLEMENT_LABEL, DISTRICT_LABEL, JOB_LABEL, LATITUDE_LABEL, LONGITUDE_LABEL, LPCA_ART_LABEL, LPCA_CLEANING_DECLARATION_LABEL, LPCA_ENVIRONMENTAL_AGENCY_DECLARATION_LABEL, LPCA_PREVIOUS_NATIVE_VEGETATION_SUPPRESSION_AUTHORIZATIONS_LABEL, LPCA_PROFESSIONAL_REPORT_LABEL, LPCA_PROPERTY_MAP_AND_CAR_LABEL, LPCA_SHAPEFILE_FOLDER_LABEL, NATIONALITY_LABEL, RG_LABEL, STATE_LABEL, STATE_REGISTRATION_LABEL, STREET_LABEL, STREET_NUMBER_LABEL } from "../labels";

const lpcaApplicantFieldsArray = structuredClone(applicantFieldsArray);
lpcaApplicantFieldsArray.push(
  {
    fieldId: "applicant.nationality",
    label: NATIONALITY_LABEL,
    fieldType: "text",
    maxLength: 30,
  },
  {
    fieldId: "applicant.applicant_data.civil_status",
    label: CIVIL_STATUS_LABEL,
    fieldType: "combobox",
    options: civilStatusList,
    className: "w-[164px]"
  },
  {
    fieldId: "applicant.applicant_data.job",
    label: JOB_LABEL,
    fieldType: "text",
    maxLength: 255
  },
  {
    fieldId: "applicant.applicant_data.document",
    label: RG_LABEL,
    fieldType: "masked",
    minLength: 6,
    maxLength: 15
  },
  {
    fieldId: "applicant.applicant_data.state_registration",
    label: STATE_REGISTRATION_LABEL,
    fieldType: "text",
    maxLength: 14
  },
  {
    fieldId: "applicant.personal_data.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
);

const lpcaTechnicianFieldsArray = structuredClone(technicianFieldsArray);
lpcaTechnicianFieldsArray.push(
  {
    fieldId: "technician.nationality",
    label: NATIONALITY_LABEL,
    fieldType: "text",
    maxLength: 30
  },
  {
    fieldId: "technician.civil_status",
    label: CIVIL_STATUS_LABEL,
    fieldType: "combobox",
    options: civilStatusList,
    className: "w-[164px]"
  },
  {
    fieldId: "technician.job",
    label: JOB_LABEL,
    fieldType: "text",
    maxLength: 255
  },
);

const propertyFieldsArray: IField[] = [
  {
    fieldId: "property.car_record",
    label: CAR_RECORD_LABEL,
    fieldType: "masked",
    minLength: 50,
    maxLength: 50
  },
  {
    fieldId: "property.address.zipcode",
    label: CEP_LABEL,
    fieldType: "masked",
    minLength: 9,
    maxLength: 9,
    pattern: /^\d{5}-\d{3}$/
  },
  {
    fieldId: "property.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
  {
    fieldId: "property.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    minLength: 1,
    maxLength: 5,
    pattern: /^\d+$/
  },
  {
    fieldId: "property.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255,
  },
  {
    fieldId: "property.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50,
  },
  {
    fieldId: "property.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50,
  },
  {
    fieldId: "property.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "property.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
  {
    fieldId: "property.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
    minLength: 13,
    maxLength: 13
  },
];

const lpcaFilesFieldsArray: IField[] = [
  {
    fieldId: "lpcaFiles.cleaning_declaration",
    label: LPCA_CLEANING_DECLARATION_LABEL,
    fieldType: "file",
  },
  {
    fieldId: "lpcaFiles.professional_report",
    label: LPCA_PROFESSIONAL_REPORT_LABEL,
    fieldType: "file"
  },
  {
    fieldId: "lpcaFiles.technical_responsibility_note",
    label: LPCA_ART_LABEL,
    fieldType: "file"
  },
  {
    fieldId: "lpcaFiles.property_map_and_car",
    label: LPCA_PROPERTY_MAP_AND_CAR_LABEL,
    fieldType: "file"
  },
  {
    fieldId: "lpcaFiles.shapefile_folder",
    label: LPCA_SHAPEFILE_FOLDER_LABEL,
    fieldType: "file"
  },
  {
    fieldId: "lpcaFiles.previous_native_vegetation_suppression_authorizations",
    label: LPCA_PREVIOUS_NATIVE_VEGETATION_SUPPRESSION_AUTHORIZATIONS_LABEL,
    fieldType: "file"
  },
  {
    fieldId: "lpcaFiles.environmental_agency_declaration",
    label: LPCA_ENVIRONMENTAL_AGENCY_DECLARATION_LABEL,
    fieldType: "file"
  }
];

export { lpcaApplicantFieldsArray, lpcaFilesFieldsArray, lpcaTechnicianFieldsArray, propertyFieldsArray };

