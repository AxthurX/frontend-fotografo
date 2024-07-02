import { activityCilaLists } from "@/lib/forms/cila/activities";
import { IField } from "@/lib/forms/fields";
import { CEP_LABEL, CITY_LABEL, COLMAM_ACTIVITY_LOCATION_LABEL, COLMAM_ACTIVITY_TYPE_LABEL, COMPLEMENT_LABEL, CPF_OR_CNPJ_LABEL, DISTRICT_LABEL, EMAIL_LABEL, NAME_OR_CORPORATE_NAME_LABEL, PHONE_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL, WOOD_CAP_CM, WOOD_HEIGHT_M, WOOD_VOLUME } from "@/lib/forms/labels";

export const cilaApplicantFieldsArray: IField[] = [
    {
        fieldId: "requirement.applicant.name",
        label: NAME_OR_CORPORATE_NAME_LABEL,
        fieldType: "text",
        maxLength: 120
    },
    {
        fieldId: "requirement.applicant.cpf_cnpj",
        label: CPF_OR_CNPJ_LABEL,
        fieldType: "masked",
        inputType: "text",
    },
    {
        fieldId: "requirement.applicant.contact.email",
        label: EMAIL_LABEL,
        fieldType: "text",
        maxLength: 80
    },
    {
        fieldId: "requirement.applicant.contact.phone",
        label: PHONE_LABEL,
        fieldType: "masked",
        inputType: "text",
        placeholder: "(00) 00000-0000"
    }
];


export const cilaActivityFieldArray: IField[] = [
    {
        fieldId: "requirement.activity.type",
        label: COLMAM_ACTIVITY_TYPE_LABEL,
        fieldType: "combobox",
        options: activityCilaLists,
        className: "w-[90vw] max-sm:w-[85vw] max-w-[1334px]"
    },
    {
        fieldId: "requirement.activity.location",
        label: COLMAM_ACTIVITY_LOCATION_LABEL,
        fieldType: "radio",
        options: [
            {
                value: "zonaRural",
                label: "Zona Rural"
            },
            {
                value: "zonaUrbana",
                label: "Zona Urbana"
            },
        ]
    },
    {
        fieldId: "requirement.activity.address.zipcode",
        label: CEP_LABEL,
        fieldType: "masked",
        inputType: "text",
    },
    {
        fieldId: "requirement.activity.address.street",
        label: STREET_LABEL,
        fieldType: "text",
        maxLength: 80
    },
    {
        fieldId: "requirement.activity.address.number",
        label: STREET_NUMBER_LABEL,
        fieldType: "masked",
        inputType: "number",
        maxLength: 5
    },
    {
        fieldId: "requirement.activity.address.complement",
        label: COMPLEMENT_LABEL,
        fieldType: "text",
        maxLength: 255
    },
    {
        fieldId: "requirement.activity.address.district",
        label: DISTRICT_LABEL,
        fieldType: "text",
        maxLength: 50
    },
    {
        fieldId: "requirement.activity.address.city",
        label: CITY_LABEL,
        fieldType: "text",

    },
    {
        fieldId: "requirement.activity.address.state",
        label: STATE_LABEL,
        fieldType: "select",
        options: [{ label: "RO", value: "RO", checked: false }]
    },
];

