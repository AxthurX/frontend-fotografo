import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CAR_RECORD_NUMBER_ZOD_FIELD, CIVIL_STATUS_ZOD_ENUM_FIELD, CONTACT_INFO_ZOD_OBJECT, COUNCIL_LICENSE_ZOD_OBJECT, CPF_ZOD_FIELD, JOB_ZOD_FIELD, NAME_ZOD_FIELD, NATIONALITY_ZOD_ENUM_FIELD, OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, RG_ZOD_FIELD, RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT, STATE_REGISTRATION_ZOD_FIELD, ZIP_FILE_CUSTOM_ZOD_FIELD } from "../combinedInterfaces";

const PROPERTY_ZOD_OBJECT = z.object({
  car_record: CAR_RECORD_NUMBER_ZOD_FIELD,
  address: ADDRESS_ZOD_OBJECT,
  coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
});

const BURN_ZOD_OBJECT = z.union([
  //TIPO DE QUEIMA - QUEIMA AGRÍCOLA
  z.object({
    type: z.literal("Queima agrícola"),
    category: z.enum(["Restos de cultura", "Queima da cana", "Pastos", "Outros"]),
    burn_zone: z.array(
      RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
    ).nonempty(),
    area: z.string().transform(value => value.replace(",", ".")).pipe(z.coerce.number().multipleOf(0.001).positive().safe()),
  }),
  //TIPO DE QUEIMA - QUEIMA FLORESTAL
  z.object({
    type: z.literal("Queima florestal"),
    category: z.enum(["Restos de exploração", "Espécies prejudiciais", "Manutenção de corta fogo (aceiro)"]),
    burn_zone: z.array(
      RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
    ).nonempty(),
    area: z.string().transform(value => value.replace(",", ".")).pipe(z.coerce.number().multipleOf(0.001).positive().safe()),
  })]);

const OPTIONAL_TECHNICIAN_ZOD_OBJECT = z.object({
  has_technician: z.literal("Sim"),
  name: NAME_ZOD_FIELD,
  cpf: CPF_ZOD_FIELD,
  rg: RG_ZOD_FIELD,
  nationality: NATIONALITY_ZOD_ENUM_FIELD,
  civil_status: CIVIL_STATUS_ZOD_ENUM_FIELD,
  council_license: COUNCIL_LICENSE_ZOD_OBJECT,
  personal_data: z.object({
    address: ADDRESS_ZOD_OBJECT,
    contact: CONTACT_INFO_ZOD_OBJECT,
  })
});

const FILES_ZOD_OBJECT = z.object({
  applicant_rg: PDF_FILE_CUSTOM_ZOD_FIELD,
  applicant_cpf: PDF_FILE_CUSTOM_ZOD_FIELD,
  applicant_proof_of_residence: PDF_FILE_CUSTOM_ZOD_FIELD,
  applicant_cnpj: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
  social_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
  proxy_contract: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
  proxy_rg: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
  proxy_cpf: OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD,
  payment_receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
  car_record_file: PDF_FILE_CUSTOM_ZOD_FIELD,
  shapefiles: ZIP_FILE_CUSTOM_ZOD_FIELD,
  pasture_cleaning_declaration_or_vegetation_suppression_authorization: PDF_FILE_CUSTOM_ZOD_FIELD,
});

export const aufSchema = z.object({
  applicant: APPLICANT_ZOD_OBJECT.extend({
    nationality: z.string().min(3).max(30),
    civil_status: z.enum(["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo", "Outro"]),
    job: JOB_ZOD_FIELD,
    rg: RG_ZOD_FIELD,
    state_registration: STATE_REGISTRATION_ZOD_FIELD
  }),
  optional_technician: z.discriminatedUnion("has_technician", [OPTIONAL_TECHNICIAN_ZOD_OBJECT, z.object({ has_technician: z.literal("Não") })]),
  property: PROPERTY_ZOD_OBJECT,
  burn: BURN_ZOD_OBJECT,
  files: FILES_ZOD_OBJECT,
});