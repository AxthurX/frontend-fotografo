import { ICombinedApplicant } from '../combinedInterfaces';

export interface IPiscSchema {
	license_type: string;
	applicant: ICombinedApplicant;
	pisc_activity: IPiscActivity;
	pisc_files: IPiscFiles;
}

export interface IPiscActivity {
	area: string;
	coordinates: IPiscCoordinates;
	number_outorga: string;
	car_record: string;
	observations: string;
}

export interface IPiscCoordinates {
	latitude: string;
	longitude: string;
}

export interface IPiscFiles {
	proportional_fee_payment: FileList;
	personal_documents: FileList;
	newspaper_publication: FileList;
	city_hall_certificate: FileList;
	preparation_schedule: FileList;
	site_plan: FileList;
	technical_responsibility_note: FileList;
	outorga: FileList;
	licenses_issued: FileList;
}
