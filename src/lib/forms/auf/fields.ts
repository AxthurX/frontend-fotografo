import { IField } from "@/lib/forms/fields";
import { AUF_APPLICANT_CNPJ_LABEL, AUF_APPLICANT_CPF_LABEL, AUF_APPLICANT_PROOF_OF_RESIDENCE_LABEL, AUF_APPLICANT_RG_LABEL, AUF_PAYMENT_RECEIPT_LABEL, AUF_PCD_OR_VSA_LABEL, AUF_PROXY_CONTRACT_LABEL, AUF_PROXY_CPF_LABEL, AUF_PROXY_RG_LABEL, AUF_SHAPEFILES_LABEL, AUF_SOCIAL_CONTRACT_LABEL, CAR_RECORD_FILE_LABEL } from "@/lib/forms/labels";

export const aufFiles: IField[] = [{
    fieldId: "files.applicant_rg",
    label: AUF_APPLICANT_RG_LABEL,
    fieldType: "file"
},
{
    fieldType: "file",
    fieldId: "files.applicant_cpf",
    label: AUF_APPLICANT_CPF_LABEL,
},
{
    fieldType: "file",
    fieldId: "files.applicant_proof_of_residence",
    label: AUF_APPLICANT_PROOF_OF_RESIDENCE_LABEL,
},
{
    fieldType: "file",
    fieldId: "files.applicant_cnpj",
    label: AUF_APPLICANT_CNPJ_LABEL,

},
{
    fieldType: "file",
    fieldId: "files.social_contract",
    label: AUF_SOCIAL_CONTRACT_LABEL

},
{
    fieldType: "file",
    fieldId: "files.proxy_contract",
    label: AUF_PROXY_CONTRACT_LABEL
},
{
    fieldType: "file",
    fieldId: "files.proxy_rg",
    label: AUF_PROXY_RG_LABEL

},
{
    fieldType: "file",
    fieldId: "files.proxy_cpf",
    label: AUF_PROXY_CPF_LABEL
},
{
    fieldType: "file",
    fieldId: "files.payment_receipt",
    label: AUF_PAYMENT_RECEIPT_LABEL

},
{
    fieldType: "file",
    fieldId: "files.pasture_cleaning_declaration_or_vegetation_suppression_authorization",
    label: AUF_PCD_OR_VSA_LABEL
},
{
    fieldType: "file",
    fieldId: "files.shapefiles",
    label: AUF_SHAPEFILES_LABEL
},
{
    fieldType: "file",
    fieldId: "files.car_record_file",
    label: CAR_RECORD_FILE_LABEL
}];
