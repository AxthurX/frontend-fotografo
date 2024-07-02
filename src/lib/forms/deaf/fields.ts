import { civilStatusList } from "@/lib/forms/civilStatusList";
import { IField, IFieldArrayField, applicantFieldsArray, technicianFieldsArray } from "@/lib/forms/fields";
import { ufList } from "@/lib/forms/ufList";
import { CAR_RECORD_LABEL, CEP_LABEL, CITY_LABEL, CIVIL_STATUS_LABEL, COMPLEMENT_LABEL, DEAF_ADDRES_PF_OR_PJ, DEAF_APPLICANT_CPF_LABEL, DEAF_APPLICANT_RG_LABEL, DEAF_FLORESTAL_EXPLORATION, DEAF_PJ_CADASTRATE_NACIONALITY, DEAF_PROXY_CONTRACT_LABEL, DEAF_PROXY_CPF_LABEL, DEAF_PROXY_RG_LABEL, DEAF_RECORD_LABEL, DEAF_SOCIAL_CONTRACT_LABEL, DISTRICT_LABEL, JOB_LABEL, LATITUDE_LABEL, LONGITUDE_LABEL, NATIONALITY_LABEL, RG_LABEL, STATE_LABEL, STATE_REGISTRATION_LABEL, STREET_LABEL, STREET_NUMBER_LABEL, WOOD_CAP_CM, WOOD_HEIGHT_M, WOOD_NUMBER, WOOD_SPECIES, WOOD_TOTAL_VOLUME, WOOD_VOLUME } from "../labels";

const deafApplicantFieldsArray = structuredClone(applicantFieldsArray);
deafApplicantFieldsArray.push(
    {
        fieldId: "applicant.nationality",
        label: NATIONALITY_LABEL,
        fieldType: "text",
        maxLength: 30,
    },
    {
        fieldId: "applicant.civil_status",
        label: CIVIL_STATUS_LABEL,
        fieldType: "combobox",
        options: civilStatusList,
        className: "w-[164px]"
    },
    {
        fieldId: "applicant.job",
        label: JOB_LABEL,
        fieldType: "text",
        maxLength: 255
    },
    {
        fieldId: "applicant.rg",
        label: RG_LABEL,
        fieldType: "masked",
        minLength: 6,
        maxLength: 15
    },
    {
        fieldId: "applicant.state_registration",
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

const deafTechnicianFieldsArray = structuredClone(technicianFieldsArray);
deafTechnicianFieldsArray.push(
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

const deafFieldProps: IFieldArrayField[] = [
    {
        label: WOOD_NUMBER,
        fieldType: "text",
        minLength: 2,
        maxLength: 255
    },
    {
        label: WOOD_SPECIES,
        fieldType: "text",
        minLength: 2,
        maxLength: 255,
    },
    {
        label: WOOD_CAP_CM,
        fieldType: "masked",
        minLength: 1,
        maxLength: 5,
        pattern: /^\d+(\.\d{1,2})?$/
    },
    {
        label: WOOD_HEIGHT_M,
        fieldType: "masked",
        minLength: 1,
        maxLength: 5,
        pattern: /^\d+(\.\d{1,2})?$/
    },
    {
        label: WOOD_VOLUME,
        fieldType: "masked",
        minLength: 1,
        maxLength: 5
    }
];

const deafFieldData: IField[] = [
    {
        fieldId: "data_forest.total_volume",
        label: WOOD_TOTAL_VOLUME,
        fieldType: "text",
        pattern: /\b(\d+(?:\.\d+)?$)\b/g
    }
];

const deafFilesFieldsArray: IField[] = [
    {
        fieldId: "deafFiles.applicant_rg",
        label: DEAF_APPLICANT_RG_LABEL,
        fieldType: "file",
    },
    {
        fieldId: "deafFiles.applicant_cpf",
        label: DEAF_APPLICANT_CPF_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.proof_of_residence",
        label: DEAF_ADDRES_PF_OR_PJ,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.applicant_cnpj",
        label: DEAF_PJ_CADASTRATE_NACIONALITY,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.social_contract",
        label: DEAF_SOCIAL_CONTRACT_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.proxy_contract",
        label: DEAF_PROXY_CONTRACT_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.proxy_rg",
        label: DEAF_PROXY_RG_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.proxy_cpf",
        label: DEAF_PROXY_CPF_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.car_record_file",
        label: DEAF_RECORD_LABEL,
        fieldType: "file"
    },
    {
        fieldId: "deafFiles.forest_exploitation_motivation",
        label: DEAF_FLORESTAL_EXPLORATION,
        fieldType: "file"
    }
];

export { deafApplicantFieldsArray, deafFilesFieldsArray, deafTechnicianFieldsArray, propertyFieldsArray, deafFieldProps, deafFieldData };

