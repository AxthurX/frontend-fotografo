import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CAR_RECORD_NUMBER_ZOD_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT, YES_NO_ZOD_ENUM_FIELD, ZIP_FILE_CUSTOM_ZOD_FIELD } from "@/lib/forms/combinedInterfaces";
import { z } from "zod";

export const cascSchema = z.object({
  applicant: APPLICANT_ZOD_OBJECT,
  legal_representative: z.object({
    name: z.string().min(3).max(120),
    cpf: z.string().length(14).transform((value) => value.replace(/[^0-9]/g, "")),
    rg: z.string().min(6).max(15),
  }),
  activity: z.object({
    activity_type: z.literal("Extração de cascalho para recuperação de estradas, Lei nº 4564 de 23/08/2019"),
    address_type: z.enum(["Zona rural", "Zona urbana"]),
    car_record: CAR_RECORD_NUMBER_ZOD_FIELD,
    car_record_situation: z.enum(["Ativo", "Pendente", "Suspenso", "Cancelado"]),
    address: ADDRESS_ZOD_OBJECT,
    coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
  }),
  survey: z.object({
    public_administration_extraction: YES_NO_ZOD_ENUM_FIELD,
    in_operation: YES_NO_ZOD_ENUM_FIELD,
    consepa_01_2019: YES_NO_ZOD_ENUM_FIELD,
    commercial_use: YES_NO_ZOD_ENUM_FIELD,
    legal_reserve_or_restricted_use_interference: YES_NO_ZOD_ENUM_FIELD,
    protected_areas_interference: YES_NO_ZOD_ENUM_FIELD,
    water_body_interference: YES_NO_ZOD_ENUM_FIELD,
    indigenous_land_interference: YES_NO_ZOD_ENUM_FIELD,
    safeguarded_assets_interference: YES_NO_ZOD_ENUM_FIELD,
    depth_over_3m: YES_NO_ZOD_ENUM_FIELD,
  }),
  checkbox_0: z.literal(true),
  checkbox_1: z.literal(true),
  checkbox_2: z.literal(true),
  checkbox_3: z.literal(true),
  checkbox_4: z.literal(true),
  checkbox_5: z.literal(true),
  checkbox_6: z.literal(true),
  checkbox_7: z.literal(true),
  checkbox_8: z.literal(true),
  property_ownership_proof: PDF_FILE_CUSTOM_ZOD_FIELD,
  shapefile_folder: ZIP_FILE_CUSTOM_ZOD_FIELD,
  anm_title: PDF_FILE_CUSTOM_ZOD_FIELD,
});