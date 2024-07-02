import { ICombinedApplicant } from "@/lib/forms/combinedInterfaces";

export interface IDofSchema {
    applicant: ICombinedApplicant,    
    legal_representative?: string | { name: string, cpf: string, rg: string },
    subject: string;
    dofFile: FileList;
    additional_information: string;
}


