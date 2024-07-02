import { IAddress, ICombinedApplicant, ICombinedTechnician } from "../combinedInterfaces";

interface IDeafProperty {
    car_record: string;
    address: IAddress;
    coordinates: {
        latitude: string,
        longitude: string
    }
}

export interface IDeafWood {
    wood?: string;
    species_name: string;
    cap_cm: string;
    height_m: string;
    volume: string;
}

export interface IDeafAux {
    total_volume: string;
}

export interface IDeafFiles {
    applicant_rg: FileList;
    applicant_cpf: FileList;
    proof_of_residence: FileList;
    applicant_cnpj: FileList;
    social_contract: FileList;
    proxy_contract: FileList;
    proxy_rg: FileList;
    proxy_cpf: FileList;
    car_record_file: FileList;
    forest_exploitation_motivation: FileList;
}

export interface IDeafForest {
    data: IDeafWood[]
    total_volume: string;
}

export interface IDeafSchema {
    applicant: ICombinedApplicant;
    property: IDeafProperty;
    data_forest: IDeafForest
    technician: ICombinedTechnician;
    deafFiles: IDeafFiles;
}