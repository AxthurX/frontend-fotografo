import { IAddress, IContact } from "@/lib/forms/combinedInterfaces";

interface IActivity {
    type: string,
    location: string,
    address: IAddress
}

interface IApplicant {
    name: string,
    cpf_cnpj: string,
    contact: IContact
}

export interface ICilaSchema {
    requirement:{
    applicant: IApplicant,
    activity: IActivity,
    additional_information: string,
    }
}