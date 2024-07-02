import { IAddress, ICombinedApplicant, ICombinedTechnician } from "../combinedInterfaces";

interface ILpcaProperty {
    car_record: string;
    address: IAddress;
    coordinates: {
        latitude: string,
        longitude: string
    }
}

export interface ILpcaFiles {
    cleaning_declaration: FileList;
    professional_report: FileList;
    technical_responsibility_note: FileList;
    property_map_and_car: FileList;
    shapefile_folder: FileList;
    previous_native_vegetation_suppression_authorizations: FileList;
    environmental_agency_declaration: FileList;
}

export interface ILpcaSchema {
    applicant: ICombinedApplicant;
    property: ILpcaProperty;
    technician: ICombinedTechnician;
    lpcaFiles: ILpcaFiles;
}