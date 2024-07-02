import { IField, applicantFieldsArray } from "@/lib/forms/fields";
import { DOF_SUBJECT_LABEL, LEGAL_REPRESENTATIVE_LABEL, STATE_REGISTRATION_LABEL } from "../labels";

const dofApplicantFieldsArray = structuredClone(applicantFieldsArray);
dofApplicantFieldsArray.splice(2, 0, {
  fieldId: "applicant.state_registration",
  label: STATE_REGISTRATION_LABEL,
  maxLength: 14,
  fieldType: "masked",
});

dofApplicantFieldsArray.splice(2, 0, {
  fieldId: "applicant.legal_representative",
  label: LEGAL_REPRESENTATIVE_LABEL,
  minLength: 2,
  maxLength: 255,
  fieldType: "text"
});

dofApplicantFieldsArray.splice(applicantFieldsArray.length, 0, {
  fieldId: "subject",
  label: DOF_SUBJECT_LABEL,
  fieldType: "combobox",
  options: [
    {
      label: "Ajuste administrativo",
      value: "Ajuste administrativo"
    },
    {
      label: "Cancelamento de DOF",
      value: "Cancelamento de DOF"
    },
    {
      label: "Homologação de AUTEX",
      value: "Homologação de AUTEX"
    },
    {
      label: "Homologação de pátio",
      value: "Homologação de pátio"
    },
    {
      label: "Liberação de oferta",
      value: "Liberação de oferta"
    },
    {
      label: "Liberação/desbloqueio de pátio",
      value: "Liberação/desbloqueio de pátio"
    },
    {
      label: "Liberação de veículo",
      value: "Liberação de veículo"
    },
    {
      label: "Cancelamento de veículo",
      value: "Cancelamento de veículo"
    },
    {
      label: "Prorrogação de DOF",
      value: "Prorrogação de DOF"
    },
    {
      label: "Suspensão de DOF",
      value: "Suspensão de DOF"
    },
    {
      label: "Reativação de DOF",
      value: "Reativação de DOF"
    },
    {
      label: "Inserção de créditos de reposição florestal",
      value: "Inserção de créditos de reposição florestal"
    },
    {
      label: "Transferência de créditos de reposição florestal",
      value: "Transferência de créditos de reposição florestal"
    }
],className: "w-[90vw] max-sm:w-[85vw] max-w-[1334px]"
});


export const fileFields = {
  "CANCELAMENTO DE DOF": {
    fieldId: "justification",
    label: "Justification",
    fieldType: "file"
  },
  "AJUSTE ADMINISTRATIVO": {
    fieldId: "report",
    label: "Report",
    fieldType: "file"
  },
  "HOMOLOGAÇÃO DE PÁTIO": {
    fieldId: "photographic_register",
    label: "Photographic Register",
    fieldType: "file"
  },
  "LIBERAÇÃO DE OFERTA": {
    fieldId: "spread_sheet",
    label: "Spread Sheet",
    fieldType: "file"
  },
  "LIBERAÇÃO/DESBLOQUEIO DE PÁTIO": {
    fieldId: "dof_file",
    label: "DOF File",
    fieldType: "file"
  },
  "LIBERAÇÃO DE VEÍCULO": {
    fieldId: "invoice",
    label: "Invoice",
    fieldType: "file"
  },
  "CANCELAMENTO DE VEÍCULO": {
    fieldId: "inform_products",
    label: "Inform Products",
    fieldType: "file"
  },
  "SUSPENSÃO DE DOF": {
    fieldId: "requirement",
    label: "Requirement",
    fieldType: "file"
  },
  "PRORROGAÇÃO DE DOF": {
    fieldId: "operating_license",
    label: "Operating License",
    fieldType: "file"
  },
  "REATIVAÇÃO DE DOF": {
    fieldId: "art",
    label: "Art",
    fieldType: "file"
  },
  // ... restante dos campos
};

dofApplicantFieldsArray.splice(applicantFieldsArray.length, 0, {
  fieldId: "dofFile",
  label: "Arquivo",
  fieldType: "file",
});

export const dofFiles: IField[] = [
  dofApplicantFieldsArray[11]
];

export { applicantFieldsArray, dofApplicantFieldsArray };

