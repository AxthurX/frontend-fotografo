import { IAddress, ICombinedActivity, ICombinedApplicant, ICombinedSurvey } from "../combinedInterfaces";

export interface IDlaActivity {
  activity_type_id: number;
  address_type: string;
  car_record: string;
  dare_or_dop: string;
  blocked: boolean;
  address: IAddress;
  coordinates: {
    latitude: string,
    longitude: string
  }
}
  
export interface IDlaSurvey {
  entrepreneurship_status: string;
  consepa_01_2019: string;
  protected_areas_interference: string;
  checkbox_1: boolean;
  checkbox_2: boolean;
  checkbox_3: boolean;
}
  
export interface IDlaSchema {
  applicant: ICombinedApplicant;
  activity: ICombinedActivity;
  survey: ICombinedSurvey;
  files_dare_payment_receipt: FileList;
  files_site_plan: FileList;
  files_car_record_file: FileList;
}