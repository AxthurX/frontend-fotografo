import { activities } from "@/lib/forms/ditl/activities";
import { IField } from "@/lib/forms/fields";
import { CEP_LABEL, CITY_LABEL, COLMAM_ACTIVITY_TYPE_LABEL, COMPLEMENT_LABEL, DISTRICT_LABEL, EMAIL_LABEL, PHONE_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL } from "@/lib/forms/labels";
import { ufList } from "@/lib/forms/ufList";

export const ditlApplicantFieldsArray: IField[] = [
    {
        fieldId: "ditl_applicant.pf_or_pj",
        label: "",
        fieldType: "radio",
        options: [
            {
                value: "PF",
                label: "Pessoa Física"
            },
            {
                value: "PJ",
                label: "Pessoa Jurídica"
            },
        ],
        className: "flex gap-4"
    },
    {
        fieldId: "ditl_applicant.name",
        label: "Razão social",
        fieldType: "text",
        maxLength: 120
    },
    {
        fieldId: "ditl_applicant.cnpj",
        label: "CNPJ",
        fieldType: "masked",
        inputType: "text",
    },
    {
        fieldId: "ditl_applicant.legal_representative.lr_name",
        label: "Representante legal",
        fieldType: "text",
        maxLength: 120
    },
    {
        fieldId: "ditl_applicant.legal_representative.rg",
        label: "RG",
        fieldType: "masked",
        maxLength: 15
    },
    {
        fieldId: "ditl_applicant.legal_representative.cpf",
        label: "CPF",
        fieldType: "masked",
        inputType: "text",
        maxLength: 14
    },
    {
        fieldId: "ditl_applicant.classification",
        label: "Classificação do requerente",
        fieldType: "radio",
        options: [
            {
                value: "Estadual",
                label: "Estadual"
            },
            {
                value: "Municipal",
                label: "Municipal"
            },
            {
                value: "Agroindústria familiar",
                label: "Agroindústria familiar"
            },
        ],
        className: "flex gap-4"
    },
    {
        fieldId: "ditl_applicant.legal_representative.role",
        label: "Função",
        fieldType: "radio",
        options: [
            {
                value: "Prefeito",
                label: "Prefeito"
            },
            {
                value: "Secretário",
                label: "Secretário"
            },
            {
                value: "Proprietário",
                label: "Proprietário"
            },
        ],
        className: "flex gap-4"
    },
    {
        fieldId: "ditl_applicant.legal_representative.contact.email",
        label: EMAIL_LABEL,
        fieldType: "text",
        maxLength: 80
    },
    {
        fieldId: "ditl_applicant.legal_representative.contact.phone",
        label: PHONE_LABEL,
        fieldType: "masked",
        placeholder: "(00) 00000-0000"
    }
];

export const ditlActivityFieldArray: IField[] = [
    {
        fieldId: "activity.type",
        label: COLMAM_ACTIVITY_TYPE_LABEL,
        fieldType: "combobox",
        options: activities,
        className: "w-[90vw] max-sm:w-[85vw] max-w-[1334px]"
    },
    {
        fieldId: "activity.address.zipcode",
        label: CEP_LABEL,
        fieldType: "masked",
        inputType: "text",
    },
    {
        fieldId: "activity.address.street",
        label: STREET_LABEL,
        fieldType: "text",
        maxLength: 80
    },
    {
        fieldId: "activity.address.number",
        label: STREET_NUMBER_LABEL,
        fieldType: "masked",
        inputType: "number",
        maxLength: 5
    },
    {
        fieldId: "activity.address.complement",
        label: COMPLEMENT_LABEL,
        fieldType: "text",
        maxLength: 255
    },
    {
        fieldId: "activity.address.district",
        label: DISTRICT_LABEL,
        fieldType: "text",
        maxLength: 50
    },
    {
        fieldId: "activity.address.city",
        label: CITY_LABEL,
        fieldType: "text",
        maxLength: 50
    },
    {
        fieldId: "activity.address.state",
        label: STATE_LABEL,
        fieldType: "combobox",
        options: ufList
    },
];

