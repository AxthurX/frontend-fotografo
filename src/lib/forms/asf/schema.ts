import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CONTACT_INFO_ZOD_OBJECT, CPF_ZOD_FIELD, NAME_ZOD_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, RG_ZOD_FIELD, RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT, TECHNICIAN_ZOD_OBJECT, YES_NO_ZOD_ENUM_FIELD, ZIP_FILE_CUSTOM_ZOD_FIELD } from "@/lib/forms/combinedInterfaces";
import { z } from "zod";

const ASF_LEGAL_REPRESENTATIVE_ZOD_OBJECT = z.object({
  name: NAME_ZOD_FIELD,
  cpf: CPF_ZOD_FIELD,
  rg: RG_ZOD_FIELD,
  address: ADDRESS_ZOD_OBJECT,
  contact: CONTACT_INFO_ZOD_OBJECT,
});

const ACTIVITY_ZOD_OBJECT = z.object({
  type: z.string(),
  situation: z.string().min(1, "Este campo é obrigatório."),
  total_area: z.string().min(1, "Este campo é obrigatório."),
  location: 
    z.object({
      type_location: z.enum(["Ruas","Rodovia"]),
      streets: z.array(
        z.object({
          name: z.string().min(1, "Este campo é obrigatório."),
          zone: z.enum(["Zona rural", "Zona urbana"]),
          width: z.string().min(1, "Este campo é obrigatório."),
          extension: z.string().min(1, "Este campo é obrigatório."),
          coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
        })
      ),
    }),
  source: z.discriminatedUnion("source_supply", [
    z.object({
      source_supply: z.literal("Captação de Água Superficial"),
      number_outorga: z.string().min(1, "Este campo é obrigatório."),
    }),
    z.object({
      source_supply: z.literal("Captação de Água Subterrânea"),
      number_outorga: z.string().min(1, "Este campo é obrigatório."),
    }),
    z.object({
      source_supply: z.literal("Abastecimento público"),
    }),
  ]).optional()
});

const ASF_FILES_ZOD_OBJECT = z.object({
  rg_legal_representative: PDF_FILE_CUSTOM_ZOD_FIELD,
  cpf_legal_representative: PDF_FILE_CUSTOM_ZOD_FIELD,
  mayor_appointment: PDF_FILE_CUSTOM_ZOD_FIELD,
  council_license_number: PDF_FILE_CUSTOM_ZOD_FIELD,
  site_plan: PDF_FILE_CUSTOM_ZOD_FIELD,
  road_layout_shapefiles: ZIP_FILE_CUSTOM_ZOD_FIELD
});

const SURVEYS_ZOD_OBJECT = z.object({
  survey_0: YES_NO_ZOD_ENUM_FIELD,
  survey_1: YES_NO_ZOD_ENUM_FIELD,
  survey_2: YES_NO_ZOD_ENUM_FIELD,
  survey_3: YES_NO_ZOD_ENUM_FIELD,
  survey_4: YES_NO_ZOD_ENUM_FIELD,
  survey_5: YES_NO_ZOD_ENUM_FIELD,
  survey_6: YES_NO_ZOD_ENUM_FIELD,
  survey_7: YES_NO_ZOD_ENUM_FIELD,
  survey_8: YES_NO_ZOD_ENUM_FIELD,
  survey_9: YES_NO_ZOD_ENUM_FIELD,
  survey_10: YES_NO_ZOD_ENUM_FIELD,
  survey_11: YES_NO_ZOD_ENUM_FIELD,
  survey_12: YES_NO_ZOD_ENUM_FIELD,
  survey_13: YES_NO_ZOD_ENUM_FIELD,
  survey_14: YES_NO_ZOD_ENUM_FIELD,
}).required();

const CONFIRMATIONS_ZOD_OBJECT = z.object({
  activity_is_public_interest: z.literal(true),
  will_not_cause_environmental_impact: z.literal(true),
  does_not_restrict_the_union_supervisory_action: z.literal(true),
  raw_materials_must_come_from_licensed_area: z.literal(true),
  liable_regardless_fault: z.literal(true),
  material_should__collected_suitable_place: z.literal(true),
  no_waste_may_be_deposited_if_polluting: z.literal(true),
  construction_waste_must_not_stored_inappropriate_place: z.literal(true),
  submit_report_actions_taken_environmental_agency: z.literal(true),
  exemption_not_apply_local_undertakings_activities: z.literal(true),
  information_provided_is_true_accurate: z.literal(true),
}).required();

export const asfSchema = z.object({
  applicant: APPLICANT_ZOD_OBJECT.extend({ state_registration: z.string().min(9).max(14) }),
  asf_legal_representative: ASF_LEGAL_REPRESENTATIVE_ZOD_OBJECT,
  technician: TECHNICIAN_ZOD_OBJECT,
  activity: ACTIVITY_ZOD_OBJECT,
  asf_files: ASF_FILES_ZOD_OBJECT,
  surveys: SURVEYS_ZOD_OBJECT,
  confirmations: CONFIRMATIONS_ZOD_OBJECT
});