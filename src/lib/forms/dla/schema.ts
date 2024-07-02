import {
	ADDRESS_ZOD_OBJECT,
	APPLICANT_ZOD_OBJECT,
	CAR_RECORD_NUMBER_ZOD_FIELD,
	PDF_FILE_CUSTOM_ZOD_FIELD,
	RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
	YES_NO_ZOD_ENUM_FIELD,
} from "@/lib/forms/combinedInterfaces";
import { z } from "zod";

export const dlaSchema = z.object({
	applicant: APPLICANT_ZOD_OBJECT,
	activity: z.object({
		activity_type_id: z
			.string()
			.min(1)
			.transform((value) => {
				const matched = value.match(/(\d+) -/);
				if (matched) return matched[1];
			})
			.transform((value) => {
				if (typeof value === "string") return Number.parseInt(value);
			}),
		address_type: z.enum(["Zona rural", "Zona urbana"]),
		car_record: CAR_RECORD_NUMBER_ZOD_FIELD,
		dare_or_dop: z.string().length(55),
		blocked: z.coerce
			.number()
			.refine((value) => value !== null, "Este campo é obrigatório.")
			.pipe(z.coerce.boolean()),
		address: ADDRESS_ZOD_OBJECT,
		coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
	}),
	survey: z.object({
		entrepreneurship_status: z.enum([
			"Não iniciado",
			"Em instalação",
			"Instalado",
			"Em funcionamento",
		]),
		consepa_01_2019: YES_NO_ZOD_ENUM_FIELD,
		protected_areas_interference: YES_NO_ZOD_ENUM_FIELD,
		checkbox_1: z.literal(true),
		checkbox_2: z.literal(true),
		checkbox_3: z.literal(true),
	}),
	files_dare_payment_receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
	files_site_plan: PDF_FILE_CUSTOM_ZOD_FIELD,
	files_car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
});
