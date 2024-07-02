import {
	APPLICANT_ZOD_OBJECT,
	PDF_FILE_CUSTOM_ZOD_FIELD,
	RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
	ZIP_FILE_CUSTOM_ZOD_FIELD,
} from '@/lib/forms/combinedInterfaces';
import { z } from 'zod';

const PISC_FILES_ZOD_OBJECT = z.object({
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

const PISC_ACTIVITY_ZOD_OBJECT = z.object({
	area: z.string().min(1, 'Este campo é obrigatório.'),
	coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
	number_outorga: z.string().min(1, 'Este campo é obrigatório.'),
	car_record: z.string().min(1, 'Este campo é obrigatório.'),
	observations: z.string().optional(),
});

export const piscSchema = z.object({
	license_type: z.enum([
		'Licença Prévia',
		'Licença de Instalação',
		'Licença de Operação',
	]),
	applicant: APPLICANT_ZOD_OBJECT,
	pisc_activity: PISC_ACTIVITY_ZOD_OBJECT,
	pisc_files: PISC_FILES_ZOD_OBJECT,
});
