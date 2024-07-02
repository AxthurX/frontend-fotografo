import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CAR_RECORD_NUMBER_ZOD_FIELD, CIVIL_STATUS_ZOD_ENUM_FIELD, CPF_ZOD_FIELD, OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, PERSONAL_DATA_ZOD_OBJECT, RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT } from "../combinedInterfaces";

const TECHNICIAN_ZOD_OBJECT = z.discriminatedUnion("verifyTechnician", [
    z.object({
        verifyTechnician: z.literal("Sim"),
        name: z.string().min(5).max(120),
        cpf: CPF_ZOD_FIELD,
        rg: z.string().min(6).max(15),
        nationality: z.string().min(3).max(30),
        civil_status: CIVIL_STATUS_ZOD_ENUM_FIELD,
        job: z.string().min(3).max(255),
        council_license: z.object({
            cl_name: z.string().min(3).max(40),
            cl_number: z.string().min(3).max(20),
            cl_state: z.string().length(2),
        }),
        personal_data: PERSONAL_DATA_ZOD_OBJECT,
    }),
    z.object({
        verifyTechnician: z.literal("Não"),
    }),
]);

export const deafSchema = z.object({
    applicant: APPLICANT_ZOD_OBJECT.extend({
        nationality: z.string().max(30).optional(),
        civil_status: CIVIL_STATUS_ZOD_ENUM_FIELD,
        job: z.string().max(255).optional(),
        rg: z.string().max(15).optional(),
        state_registration: z.string().min(9).max(14).or(z.literal("")),
    }),
    property: z.object({
        car_record: CAR_RECORD_NUMBER_ZOD_FIELD,
        address: ADDRESS_ZOD_OBJECT,
        coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
    }),
    technician: TECHNICIAN_ZOD_OBJECT,
    data_forest: z.object({
        data: z.array(
            z.object({
                wood: z.string().optional(),
                species_name: z.string().min(2).max(255),
                cap_cm: z.string().max(40),
                height_m: z.string().max(40),
                volume: z.string().max(40),
            })
        ),
        total_volume: z.coerce.number().lte(20, "O volume não pode passar os 20m³.")
    }),
    deafFiles: z.object({
        applicant_rg: PDF_FILE_CUSTOM_ZOD_FIELD,
        applicant_cpf: PDF_FILE_CUSTOM_ZOD_FIELD,
        proof_of_residence: PDF_FILE_CUSTOM_ZOD_FIELD,
        applicant_cnpj: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
        social_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
        proxy_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
        proxy_rg: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
        proxy_cpf: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
        car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
        forest_exploitation_motivation: PDF_FILE_CUSTOM_ZOD_FIELD,
    })
});