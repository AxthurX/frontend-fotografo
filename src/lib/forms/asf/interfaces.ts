import { IAddress, ICombinedActivity, ICombinedApplicant, ICombinedSurvey, ICombinedTechnician, IContact } from "../combinedInterfaces";

export interface IAsfSchema {
  applicant: ICombinedApplicant;
  asf_legal_representative: IAsfLegalRepresentative;
  technician: ICombinedTechnician;
  activity: ICombinedActivity;
  asf_files: IAsfFiles;
  surveys: ICombinedSurvey;
  confirmations: IAsfConfirmations;
}

export interface IAsfLegalRepresentative {
  name: string;
  cpf: string;
  rg: string;
  address: IAddress;
  contact: IContact;
}

export interface IAsfActivity {
  type: string;
  situation: string;
  total_area: string;
  location: {
    type_location: string;
   // highways?: IAsfHighways;
    streets?: IAsfHighways[];
  }
  source: {
    source_supply: string;
    number_outorga: string;
  }
}

export interface IAsfHighways {
  name: string;
  zone: string;
  width: string;
  extension: string;
  coordinates: {
    latitude: string,
    longitude: string,
  }
}

export interface IAsfFiles {
  rg_legal_representative: FileList;
  cpf_legal_representative: FileList;
  mayor_appointment: FileList;
  council_license_number: FileList;
  site_plan: FileList;
  road_layout_shapefiles: FileList;
}

export interface IAsfSurveys {
  survey_0: boolean;
  survey_1: boolean;
  survey_2: boolean;
  survey_3: boolean;
  survey_4: boolean;
  survey_5: boolean;
  survey_6: boolean;
  survey_7: boolean;
  survey_8: boolean;
  survey_9: boolean;
  survey_10: boolean;
  survey_11: boolean;
  survey_12: boolean;
  survey_13: boolean;
  survey_14: boolean;
}

export interface IAsfConfirmations {
  activity_is_public_interest: boolean;
  will_not_cause_environmental_impact: boolean;
  does_not_restrict_the_union_supervisory_action: boolean;
  raw_materials_must_come_from_licensed_area: boolean;
  liable_regardless_fault: boolean;
  material_should__collected_suitable_place: boolean;
  no_waste_may_be_deposited_if_polluting: boolean;
  construction_waste_must_not_stored_inappropriate_place: boolean;
  submit_report_actions_taken_environmental_agency: boolean;
  exemption_not_apply_local_undertakings_activities: boolean;
  information_provided_is_true_accurate: boolean;
}