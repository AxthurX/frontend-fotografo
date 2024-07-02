import { IAddress, ICombinedApplicant, ICombinedTechnician } from "@/lib/forms/combinedInterfaces";

interface IBurn {
    burn_zone: {
        latitude: string;
        longitude: string;
    }[],
    type: string,
    category: string,
    area: number,
}

interface IProperty {
    car_record: string,
    address: IAddress
    coordinates: {
        latitude: string;
        longitude: string;
    }
}

export interface IAufFiles {
    applicant_rg: FileList,
    applicant_cpf: FileList,
    applicant_proof_of_residence: FileList,
    applicant_cnpj: FileList,
    social_contract: FileList,
    proxy_contract: FileList,
    proxy_rg: FileList,
    proxy_cpf: FileList,
    payment_receipt: FileList,
    car_record_file: FileList,
    shapefiles: FileList,
    pasture_cleaning_declaration_or_vegetation_suppression_authorization: FileList,
}

export interface IAufSchema {
    applicant: ICombinedApplicant,
    optional_technician?: ICombinedTechnician,
    property: IProperty,
    burn: IBurn,
    files: IAufFiles,
}