import { fleetTypeOptions } from "@/lib/forms/ati/fleetTypeOptions";
import { IField, IFieldArrayField, applicantFieldsArray, technicianFieldsArray } from "@/lib/forms/fields";
import { ATI_BRAND_AND_MODEL_LABEL, ATI_CARGO_LABEL, ATI_CHECKBOX_1_LABEL, ATI_CHECKBOX_2_LABEL, ATI_CHECKBOX_3_LABEL, ATI_DESTINATION_LABEL, ATI_DRIVER_CNH_LABEL, ATI_DRIVER_MOPP_LABEL, ATI_DRIVER_NAME_LABEL, ATI_FINAL_DESTINATION_LICENSE_FILE_LABEL, ATI_FLEET_TYPE_LABEL, ATI_HIGHWAYS_LABEL, ATI_LICENSE_PLATE_LABEL, ATI_ORIGIN_LABEL, ATI_OTHER_TYPE_LABEL, ATI_PAYMENT_BARCODE_LABEL, ATI_PAYMENT_RECEIPT_LABEL, ATI_WAGONS_LABEL, ATI_WASTE_CLASSIFICATION_LABEL, ATI_WASTE_NAME_LABEL, ATI_WASTE_PACKAGING_LABEL, ATI_YEAR_LABEL, CEP_LABEL, CITY_LABEL, COMPLEMENT_LABEL, CPF_OR_CNPJ_LABEL, DISTRICT_LABEL, EXPIRATION_DATE_LABEL, NAME_OR_CORPORATE_NAME_LABEL, PHONE_LABEL, STATE_LABEL, STREET_LABEL, STREET_NUMBER_LABEL } from "@/lib/forms/labels";
import { ufList } from "@/lib/forms/ufList";

const atiApplicantFieldsArray = structuredClone(applicantFieldsArray);
atiApplicantFieldsArray.splice(2, 0, { fieldId: "applicant.state_registration", label: "Inscrição estadual", fieldType: "text", minLength: 9, maxLength: 14 });

const transportAuthorizationTypeArray: IField[] = [
  {
    fieldId: "authorization_type",
    label: "",
    fieldType: "radio",
    options: [
      {
        label: "Transporte rodoviário de produtos e/ou resíduos perigosos, inflamáveis e/ou químicos, exceto transporte interestadual",
        value: "Transporte rodoviário de produtos e/ou resíduos perigosos, inflamáveis e/ou químicos, exceto transporte interestadual"
      },
      {
        label: "Coleta e transporte de óleo lubrificante usado ou contaminado",
        value: "Coleta e transporte de óleo lubrificante usado ou contaminado"
      },
      {
        label: "Coleta e transporte de resíduos e/ou efluentes sanitários oriundos de fossa séptica, sumidouro, caixa de gordura, caixa de esgoto, tubulação, galeria, drenagem ou correlatos, exceto transporte interestadual",
        value: "Coleta e transporte de resíduos e/ou efluentes sanitários oriundos de fossa séptica, sumidouro, caixa de gordura, caixa de esgoto, tubulação, galeria, drenagem ou correlatos, exceto transporte interestadual"
      },
      {
        label: "Coleta e transporte de resíduos sólidos urbanos, da construção civil, exceto transporte interestadual",
        value: "Coleta e transporte de resíduos sólidos urbanos, da construção civil, exceto transporte interestadual"
      },
      {
        label: "Coleta e transporte de resíduos de serviços de saúde, exceto transporte interestadual",
        value: "Coleta e transporte de resíduos de serviços de saúde, exceto transporte interestadual"
      }
    ]
  },
  {
    fieldId: "destination_license",
    label: ATI_FINAL_DESTINATION_LICENSE_FILE_LABEL,
    fieldType: "file"
  }
];

const vehicleFieldsArray: IField[] = [
  {
    fieldId: "fleet.brand",
    label: ATI_BRAND_AND_MODEL_LABEL,
    fieldType: "text",
    minLength: 2,
    maxLength: 15
  },
  {
    fieldId: "fleet.year",
    label: ATI_YEAR_LABEL,
    fieldType: "masked",
    minLength: 4,
    maxLength: 4,
    pattern: /^\d{4}$/
  },
  {
    fieldId: "fleet.plate",
    label: ATI_LICENSE_PLATE_LABEL,
    fieldType: "masked",
    minLength: 7,
    maxLength: 7
  },
  {
    fieldId: "fleet.cargo",
    label: ATI_CARGO_LABEL,
    fieldType: "masked",
    inputType: "text",
  },
  {
    fieldId: "fleet.wagons",
    label: ATI_WAGONS_LABEL,
    fieldType: "masked",
    pattern: /^\d+$/
  },
  {
    fieldId: "fleet.type.select_type",
    label: ATI_FLEET_TYPE_LABEL,
    fieldType: "combobox",
    options: fleetTypeOptions,
    className: "w-[350px]"
  },
  {
    fieldId: "fleet.type.other_type",
    label: ATI_OTHER_TYPE_LABEL,
    fieldType: "text",
  }
];

const destinationFieldsArray: IField[] = [
  {
    fieldId: "final_destination.name",
    label: NAME_OR_CORPORATE_NAME_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 120
  },
  {
    fieldId: "final_destination.cpf_cnpj",
    label: CPF_OR_CNPJ_LABEL,
    fieldType: "masked",
    minLength: 14,
    maxLength: 18,
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  },
  {
    fieldId: "final_destination.phone",
    label: PHONE_LABEL,
    fieldType: "masked",
    placeholder: "(00) 00000-0000",
    minLength: 14,
    maxLength: 15,
    pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/
  },
  {
    fieldId: "final_destination.address.zipcode",
    label: CEP_LABEL,
    fieldType: "masked",
    placeholder: "",
    minLength: 9,
    maxLength: 9
  },
  {
    fieldId: "final_destination.address.street",
    label: STREET_LABEL,
    fieldType: "text",
    minLength: 5,
    maxLength: 80
  },
  {
    fieldId: "final_destination.address.number",
    label: STREET_NUMBER_LABEL,
    fieldType: "masked",
    placeholder: "",
    minLength: 1,
    maxLength: 5,

  },
  {
    fieldId: "final_destination.address.complement",
    label: COMPLEMENT_LABEL,
    fieldType: "text",
    maxLength: 255
  },
  {
    fieldId: "final_destination.address.district",
    label: DISTRICT_LABEL,
    fieldType: "text",
    minLength: 4,
    maxLength: 50
  },
  {
    fieldId: "final_destination.address.city",
    label: CITY_LABEL,
    fieldType: "text",
    minLength: 3,
    maxLength: 50
  },
  {
    fieldId: "final_destination.address.state",
    label: STATE_LABEL,
    fieldType: "combobox",
    options: ufList,
    className: "w-[78px]"
  }
];

const paymentFieldsArray: IField[] = [
  {
    fieldId: "barcode",
    label: ATI_PAYMENT_BARCODE_LABEL,
    fieldType: "masked",
    minLength: 55,
    maxLength: 55
  },
  {
    fieldId: "receipt",
    label: ATI_PAYMENT_RECEIPT_LABEL,
    fieldType: "file"
  }
];

const surveyCheckboxLabels: IFieldArrayField[] = [
  {
    label: ATI_CHECKBOX_1_LABEL,
    fieldType: "checkbox"
  },
  {
    label: ATI_CHECKBOX_2_LABEL,
    fieldType: "checkbox"
  },
  {
    label: ATI_CHECKBOX_3_LABEL,
    fieldType: "checkbox"
  }
];

const routeFieldProps: IFieldArrayField[] = [
  {
    label: ATI_ORIGIN_LABEL,
    minLength: 2,
    maxLength: 255,
    fieldType: "text"
  },
  {
    label: ATI_DESTINATION_LABEL,
    minLength: 2,
    maxLength: 255,
    fieldType: "text"
  },
  {
    label: ATI_HIGHWAYS_LABEL,
    minLength: 2,
    maxLength: 255,
    fieldType: "text"
  }
];

const driverFieldProps: IFieldArrayField[] = [
  {
    label: ATI_DRIVER_NAME_LABEL,
    minLength: 2,
    maxLength: 120,
    fieldType: "text"
  },
  {
    label: ATI_DRIVER_CNH_LABEL,
    minLength: 10,
    maxLength: 11,
    fieldType: "masked"
  },
  {
    label: EXPIRATION_DATE_LABEL,
    fieldType: "text",
    inputType: "date"
  },
  {
    label: ATI_DRIVER_MOPP_LABEL,
    minLength: 8,
    maxLength: 40,
    fieldType: "text"
  },
  {
    label: EXPIRATION_DATE_LABEL,
    fieldType: "text",
    inputType: "date"
  }
];

const certificateFieldProps: IFieldArrayField[] = [
  {
    label: "",
    fieldType: "masked",
    minLength: 6,
    maxLength: 10
  },
  {
    label: EXPIRATION_DATE_LABEL,
    fieldType: "text",
    inputType: "date",
  }
];

const wasteFieldProps: IFieldArrayField[] = [
  {
    label: ATI_WASTE_NAME_LABEL,
    fieldType: "text",
    minLength: 2,
    maxLength: 255
  },
  {
    label: ATI_WASTE_CLASSIFICATION_LABEL,
    fieldType: "combobox",
    options: [
      { label: "Classe 1 - Explosivos", value: "Classe 1 - Explosivos" },
      { label: "Classe 2 - Gases", value: "Classe 2 - Gases" },
      { label: "Classe 3 - Líquidos inflamáveis", value: "Classe 3 - Líquidos inflamáveis" },
      { label: "Classe 4 - Sólidos inflamáveis", value: "Classe 4 - Sólidos inflamáveis" },
      { label: "Classe 5 - Substâncias oxidantes", value: "Classe 5 - Substâncias oxidantes" },
      { label: "Classe 6 - Substâncias tóxicas", value: "Classe 6 - Substâncias tóxicas" },
      { label: "Classe 7 - Substâncias radioativas", value: "Classe 7 - Substâncias radioativas" },
      { label: "Classe 8 - Substâncias corrosivas", value: "Classe 8 - Substâncias corrosivas" },
      { label: "Classe 9 - Substâncias diversas", value: "Classe 9 - Substâncias diversas" },
      { label: "Classe 10 - Resíduos perigosos", value: "Classe 10 - Resíduos perigosos" },
      { label: "Produtos não perigosos", value: "Produtos não perigosos" },
    ],
    className: "w-[350px]"
  },
  {
    label: ATI_WASTE_PACKAGING_LABEL,
    fieldType: "text",
    minLength: 2,
    maxLength: 255
  }
];

export const atiFiles: IField[] = [
  paymentFieldsArray[1],
  transportAuthorizationTypeArray[1]
];

export {
  atiApplicantFieldsArray,
  certificateFieldProps,
  destinationFieldsArray,
  driverFieldProps,
  paymentFieldsArray,
  routeFieldProps,
  surveyCheckboxLabels,
  technicianFieldsArray,
  transportAuthorizationTypeArray,
  vehicleFieldsArray,
  wasteFieldProps
};
