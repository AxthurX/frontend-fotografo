import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, CONTACT_INFO_ZOD_OBJECT, CPF_CNPJ_ZOD_FIELD } from "../combinedInterfaces";

const ACTIVITY_DATA_ZOD_OBJECT = z.object({
    type: z.string().min(1).max(255),
    location: z.coerce.number().refine(data => data !== undefined, {
        message: "Selecione uma opção.",
    }),
    address: ADDRESS_ZOD_OBJECT
});

const APPLICANT_DATA_ZOD_OBJECT = z.object({
    name: z.string().min(5).max(120),
    cpf_cnpj: CPF_CNPJ_ZOD_FIELD,
    contact: CONTACT_INFO_ZOD_OBJECT
});

export const cilaSchema = z.object({
    requirement:z.object({
        applicant: APPLICANT_DATA_ZOD_OBJECT,
        activity: ACTIVITY_DATA_ZOD_OBJECT,
        additional_information: z.string().max(1250).optional()
    })
});
