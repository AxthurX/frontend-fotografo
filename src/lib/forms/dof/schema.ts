import {
  APPLICANT_ZOD_OBJECT,
  OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
} from "@/lib/forms/combinedInterfaces";
import { z } from "zod";

export const dofSchema = z.object({
  applicant: APPLICANT_ZOD_OBJECT.extend({
    legal_representative: z.string().min(5).max(120),
    state_registration: z.string().min(9).max(14),
  }),
  subject: z.string().max(255),
  additional_information: z.string().max(2048),
  dofFile: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
});
