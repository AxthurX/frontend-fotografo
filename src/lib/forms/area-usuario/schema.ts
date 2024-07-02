import { z } from 'zod';
import {
	CPF_CNPJ_ZOD_FIELD,
	OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
	PDF_FILE_CUSTOM_ZOD_FIELD,
	ZIP_FILE_CUSTOM_ZOD_FIELD,
} from '../combinedInterfaces';

const DLA_FILES = z.object({
	dare_payment_receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
	site_plan: PDF_FILE_CUSTOM_ZOD_FIELD,
	car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
});

const AUF_FILES = z.object({
	applicant_rg: PDF_FILE_CUSTOM_ZOD_FIELD,
	applicant_cpf: PDF_FILE_CUSTOM_ZOD_FIELD,
	applicant_proof_of_residence: PDF_FILE_CUSTOM_ZOD_FIELD,
	applicant_cnpj: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD.optional(),
	social_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD.optional(),
	proxy_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD.optional(),
	proxy_rg: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD.optional(),
	proxy_cpf: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD.optional(),
	payment_receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
	car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
	shapefiles: ZIP_FILE_CUSTOM_ZOD_FIELD,
	pasture_cleaning_declaration_or_vegetation_suppression_authorization:
		PDF_FILE_CUSTOM_ZOD_FIELD,
});

const LPCA_FILES = z.object({
	cleaning_declaration: PDF_FILE_CUSTOM_ZOD_FIELD,
	professional_report: PDF_FILE_CUSTOM_ZOD_FIELD,
	technical_responsibility_note: PDF_FILE_CUSTOM_ZOD_FIELD,
	property_map_and_car: PDF_FILE_CUSTOM_ZOD_FIELD,
	shapefile_folder: ZIP_FILE_CUSTOM_ZOD_FIELD,
	previous_native_vegetation_suppression_authorizations:
		PDF_FILE_CUSTOM_ZOD_FIELD,
	environmental_agency_declaration: PDF_FILE_CUSTOM_ZOD_FIELD,
});

const DEAF_FILES = z.object({
	applicant_rg: PDF_FILE_CUSTOM_ZOD_FIELD,
	applicant_cpf: PDF_FILE_CUSTOM_ZOD_FIELD,
	proof_of_residence: PDF_FILE_CUSTOM_ZOD_FIELD,
	applicant_cnpj: PDF_FILE_CUSTOM_ZOD_FIELD,
	social_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
	proxy_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
	proxy_rg: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
	proxy_cpf: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
	car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
	forest_exploitation_motivation: PDF_FILE_CUSTOM_ZOD_FIELD,
})

const DOF_FILES = z.object({
	dofFile: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
});

const ATI_FILES = z.object({
	destination_license: PDF_FILE_CUSTOM_ZOD_FIELD,
	receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
});

const CASC_FILES = z.object({
	property_ownership_proof: PDF_FILE_CUSTOM_ZOD_FIELD,
	shapefile_folder: ZIP_FILE_CUSTOM_ZOD_FIELD,
	anm_title: PDF_FILE_CUSTOM_ZOD_FIELD,
});

const PISC_FILES = z.object({
	proportional_fee_payment: PDF_FILE_CUSTOM_ZOD_FIELD,
	personal_documents: PDF_FILE_CUSTOM_ZOD_FIELD,
	newspaper_publication: PDF_FILE_CUSTOM_ZOD_FIELD,
	city_hall_certificate: PDF_FILE_CUSTOM_ZOD_FIELD,
	preparation_schedule: PDF_FILE_CUSTOM_ZOD_FIELD,
	site_plan: ZIP_FILE_CUSTOM_ZOD_FIELD,
	technical_responsibility_note: PDF_FILE_CUSTOM_ZOD_FIELD,
	outorga: PDF_FILE_CUSTOM_ZOD_FIELD,
	licenses_issued: PDF_FILE_CUSTOM_ZOD_FIELD,
});
const ASF_FILES = z.object({
	rg_legal_representative: PDF_FILE_CUSTOM_ZOD_FIELD,
	cpf_legal_representative: PDF_FILE_CUSTOM_ZOD_FIELD,
	mayor_appointment: PDF_FILE_CUSTOM_ZOD_FIELD,
	council_license_number: PDF_FILE_CUSTOM_ZOD_FIELD,
	site_plan: PDF_FILE_CUSTOM_ZOD_FIELD,
	road_layout_shapefiles: ZIP_FILE_CUSTOM_ZOD_FIELD
});

const default_files = z.object({});

const trackingSchema = z.object({
	cpf_cnpj: CPF_CNPJ_ZOD_FIELD,
	tracking_id: z.string().min(10).max(20).toUpperCase(),
	select: z.string().min(3),
});

export const formTrackingSchema = z.object({
	tracking: trackingSchema,
});

export {
	ATI_FILES, AUF_FILES,PISC_FILES, CASC_FILES, DEAF_FILES, DLA_FILES, DOF_FILES, LPCA_FILES, ASF_FILES, default_files
};
