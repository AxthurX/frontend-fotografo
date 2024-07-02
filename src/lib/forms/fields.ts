import { IField, IFieldArrayField, IMaskedField } from "@/lib/forms/fields.d";
import { CEP_LABEL, CITY_LABEL, COMPLEMENT_LABEL, COUNCIL_LICENSE_NUMBER_LABEL, COUNCIL_NAME_LABEL, CPF_LABEL, CPF_OR_CNPJ_LABEL, DISTRICT_LABEL, EMAIL_LABEL, NAME_LABEL, NAME_OR_CORPORATE_NAME_LABEL, PHONE_LABEL, RG_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL } from "@/lib/forms/labels";
import { ufList } from "@/lib/forms/ufList";

export type { IField, IFieldArrayField, IMaskedField };

export const applicantFieldsArray: Array<IField> = [
  {
    fieldId: "applicant.name",
    label: NAME_OR_CORPORATE_NAME_LABEL,
    placeholder: "",
    fieldType: "text",
    minLength: 5,
    maxLength: 120,
  },
  {
    fieldId: "applicant.cpf_cnpj",
    label: CPF_OR_CNPJ_LABEL,
    placeholder: "",
    fieldType: "masked",
    minLength: 14,
    maxLength: 18,
  },
  {
    fieldId: "applicant.personal_data.address.zipcode",
    label: CEP_LABEL,
    placeholder: "",
    fieldType: "masked",
    minLength: 9,
    maxLength: 9,
    pattern: /^\d{5}-\d{3}$/
  },
  {
    fieldId: "applicant.personal_data.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
  {
    fieldId: "applicant.personal_data.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    minLength: 1,
    maxLength: 5,
    pattern: /^\d+$/
  },
  {
    fieldId: "applicant.personal_data.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255,
  },
  {
    fieldId: "applicant.personal_data.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50,
  },
  {
    fieldId: "applicant.personal_data.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50,
  },
  {
    fieldId: "applicant.personal_data.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "applicant.personal_data.contact.phone",
    label: PHONE_LABEL,
    placeholder: "(00) 00000-0000",
    fieldType: "masked",
    minLength: 14,
    maxLength: 15,
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  },
  {
    fieldId: "applicant.personal_data.contact.email",
    label: EMAIL_LABEL,
    placeholder: "",
    inputType: "email",
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
];



export const technicianFieldsArray: IField[] = [
  {
    fieldId: "technician.name",
    label: NAME_LABEL,
    placeholder: "",
    fieldType: "text",
    minLength: 5,
    maxLength: 120,
  },
  {
    fieldId: "technician.cpf",
    label: CPF_LABEL,
    placeholder: "",
    fieldType: "masked",
    minLength: 14,
    maxLength: 14,
  },
  {
    fieldId: "technician.rg",
    label: RG_LABEL,
    fieldType: "masked",
    minLength: 6,
    maxLength: 15,
  },
  {
    fieldId: "technician.council_license.cl_number",
    label: COUNCIL_LICENSE_NUMBER_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 20
  },
  {
    fieldId: "technician.council_license.cl_name",
    label: COUNCIL_NAME_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 12
  },
  {
    fieldId: "technician.council_license.cl_state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "technician.personal_data.address.zipcode",
    label: CEP_LABEL,
    fieldType: "masked",
    minLength: 9,
    maxLength: 9,
    pattern: /^\d{5}-\d{3}$/
  },
  {
    fieldId: "technician.personal_data.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
  {
    fieldId: "technician.personal_data.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    minLength: 1,
    maxLength: 5,
    pattern: /^\d+$/
  },
  {
    fieldId: "technician.personal_data.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255,
  },
  {
    fieldId: "technician.personal_data.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50,
  },
  {
    fieldId: "technician.personal_data.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50,
  },
  {
    fieldId: "technician.personal_data.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  },
  {
    fieldId: "technician.personal_data.contact.phone",
    label: PHONE_LABEL,
    placeholder: "(00) 00000-0000",
    fieldType: "masked",
    minLength: 14,
    maxLength: 15,
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  },
  {
    fieldId: "technician.personal_data.contact.email",
    label: EMAIL_LABEL,
    inputType: "email",
    fieldType: "text",
    minLength: 5,
    maxLength: 80,
  },
];
