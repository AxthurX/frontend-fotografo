import { IAddress, ICombinedActivity, ICombinedApplicant, ICombinedSurvey } from "../combinedInterfaces";

export interface ICascActivity {
  activity_type: number;
  address_type: string;
  car_record: string;
  car_record_situation: string;
  address: IAddress;
  coordinates: {
    latitude: string,
    longitude: string
  }
}
  
export interface ICascSurvey {
  public_administration_extraction: string;
  in_operation: string;
  consepa_01_2019: string;
  commercial_use: string;
  legal_reserve_or_restricted_use_interference: string;
  protected_areas_interference: string;
  water_body_interference: string;
  indigenous_land_interference: string;
  safeguarded_assets_interference: string;
  depth_over_3m: string;
}
  
export interface ICascSchema {
  applicant: ICombinedApplicant;
  legal_representative?: {
    name: string;
    cpf: string;
    rg: string;
  } | string;
  activity: ICombinedActivity;
  survey: ICombinedSurvey;
  property_ownership_proof: FileList;
  shapefile_folder: FileList;
  anm_title: FileList;
  checkbox_0: boolean;
  checkbox_1: boolean;
  checkbox_2: boolean;
  checkbox_3: boolean;
  checkbox_4: boolean;
  checkbox_5: boolean;
  checkbox_6: boolean;
  checkbox_7: boolean;
  checkbox_8: boolean;
}