import { IAddress, ICombinedApplicant, ICombinedTechnician } from "../combinedInterfaces";

export interface IAtiDriver {
  name: string;
  cnh: string;
  cnh_expiration: Date | undefined;
  mopp_number: string;
  mopp_expiration: Date | undefined;
}

interface IAtiFleet {
  brand: string;
  year: number;
  plate: string;
  cargo: number;
  wagons: number;
  type: { 
    select_type: string;
    other_type?: string;
  }
}

export interface IAtiRoute {
  origin: string;
  destination: string;
  highways: string;
}

export interface IAtiCertificate {
  cert_type: string;
  number: string;
  expires_at: Date;
}

export interface IAtiWaste {
  name: string;
  classification: string;
  packaging: string;
}

interface IAtiFinalDestination {
  name: string;
  cpf_cnpj: string;
  phone: string;
  address: IAddress;
}

export interface IAtiCheckbox {
  checked: boolean;
}

export interface IAtiSchema {
  authorization_type: string;
  destination_license: FileList;
  barcode: string;
  receipt: FileList;
  applicant: ICombinedApplicant;
  technician: ICombinedTechnician;
  drivers: IAtiDriver[];
  fleet: IAtiFleet;
  routes: IAtiRoute[];
  certificates: IAtiCertificate[];
  wastes: IAtiWaste[];
  final_destination: IAtiFinalDestination;
  checkboxes: IAtiCheckbox[];
}