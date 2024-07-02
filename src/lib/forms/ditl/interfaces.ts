import { IAddress, ICombinedActivity, IContact } from "@/lib/forms/combinedInterfaces";

export interface IDitlActivity {
    type: string,
    address: IAddress
}

interface IDitlApplicant {
    pf_or_pj: string,
    name: string,
    cnpj: string,
    classification: string,
    legal_representative: {
        lr_name: string,
        cpf: string,
        rg: string,
        role: string,
        contact: IContact
    }
}

export interface IDitlSchema {
    ditl_applicant: IDitlApplicant,
    activity: ICombinedActivity,
    additional_information: string,
    checkbox1: boolean,
    checkbox2: boolean,
    checkbox3: boolean
}