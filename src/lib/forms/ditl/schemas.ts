import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, CONTACT_INFO_ZOD_OBJECT } from "../combinedInterfaces";

const ACTIVITY_DATA_ZOD_OBJECT = z.object({
    type: z.enum(["Autorização de Transporte Intermunicipal", "Dispensa de Licenciamento Ambiental", "Certidão de Inexigibilidade de Licenciamento Ambiental"]),
    address: ADDRESS_ZOD_OBJECT
});

const DITL_PF_APPLICANT_ZOD_OBJECT = z.object({
    pf_or_pj: z.literal("PF"),
    classification: z.literal("Agroindústria familiar"),
    legal_representative: z.object({
        role: z.literal("Proprietário"),
        lr_name: z.string().min(5).max(120),
        cpf: z.string().length(14).transform((value) => value.replace(/[^0-9]/g, "")),
        rg: z.string().min(6).max(15),
        contact: CONTACT_INFO_ZOD_OBJECT
    }),
});

const DITL_PJ_APPLICANT_ZOD_OBJECT = z.object({
    pf_or_pj: z.literal("PJ"),
    classification: z.enum(["Estadual", "Municipal", "Agroindústria familiar"]),
    name: z.string().min(5).max(120),
    cnpj: z.string().length(18).transform((value) => value.replace(/[^0-9]/g, "")),
    legal_representative: z.object({
        role: z.enum(["Prefeito", "Secretário", "Proprietário"]),
        lr_name: z.string().min(5).max(120),
        cpf: z.string().length(14).transform((value) => value.replace(/[^0-9]/g, "")),
        rg: z.string().min(6).max(15),
        contact: CONTACT_INFO_ZOD_OBJECT
    }),
});

const APPLICANT_DATA_ZOD_OBJECT = z.discriminatedUnion("pf_or_pj", [DITL_PF_APPLICANT_ZOD_OBJECT, DITL_PJ_APPLICANT_ZOD_OBJECT]);

export const ditlSchema = z.object({
    ditl_applicant: APPLICANT_DATA_ZOD_OBJECT,
    activity: ACTIVITY_DATA_ZOD_OBJECT,
    additional_information: z.string().max(1250).optional(),
    checkbox1: z.literal(true),
    checkbox2: z.literal(true),
    checkbox3: z.literal(true),
});
