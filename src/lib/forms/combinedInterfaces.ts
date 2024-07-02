import { IAtiSchema } from "@/lib/forms/ati/interfaces";
import { IAufFiles, IAufSchema } from "@/lib/forms/auf/interfaces";
import {
  ICascActivity,
  ICascSchema,
  ICascSurvey,
} from "@/lib/forms/casc/interfaces";
import { ICilaSchema } from "@/lib/forms/cila/interfaces";
import {
  IDlaActivity,
  IDlaSchema,
  IDlaSurvey,
} from "@/lib/forms/dla/interfaces";
import { IOutorgaSchema } from "@/lib/forms/doa/interfaces";
import { IDofSchema } from "@/lib/forms/dof/interfaces";
import { ILpcaFiles, ILpcaSchema } from "@/lib/forms/lpca/interfaces";
import { geoRondoniaPolygon } from "@/lib/geo/geoRondoniaPolygon";
import { validateCnpj, validateCpf, validateCpfOrCnpj } from "@/lib/utils";
import isPointInPolygon from "geolib/es/isPointInPolygon";
import sexagesimalToDecimal from "geolib/es/sexagesimalToDecimal";
import { z } from "zod";
import { IAsfActivity, IAsfSchema, IAsfSurveys } from "./asf/interfaces";
import { IDeafSchema } from "./deaf/interfaces";
import { IDitlActivity, IDitlSchema } from "./ditl/interfaces";
import { IPiscSchema } from "./pisc/interfaces";

export interface IContact {
  phone: string;
  fax?: string;
  email: string;
}

export interface IAcompanhamento {
  cpf_cnpj: string;
  tracking_id: string;
}

export interface IAddress {
  street: string;
  number: string;
  complement?: string;
  district: string;
  zipcode: string;
  city: string;
  state: string;
}
export interface IGeographicCoordinates {
  latitude: string;
  longitude: string;
}

export interface IPersonalData {
  address: IAddress;
  contact: IContact;
}

export interface IApplicant {
  name: string;
  cpf_cnpj: string;
  personal_data: IPersonalData;
}

export interface ITechnician {
  name: string;
  cpf: string;
  rg: string;
  council_license: {
    cl_name: string;
    cl_number: string;
    cl_state: string;
  };
  personal_data: IPersonalData;
}

export interface ICombinedTechnician extends ITechnician {
  has_technician?: "Sim" | "Não";
  nationality?: string;
  job?: string;
  civil_status?: string;
  verifyTechnician?: string;
}

export interface ICombinedFiles extends IAufFiles, ILpcaFiles {}

export interface ICombinedApplicant extends IApplicant {
  state_registration?: string;
  fantasy_name?: string;
  nationality?: string;
  civil_status?: string;
  legal_representative?:
    | string
    | {
        name: string;
        cpf: string;
        rg: string;
        role: string;
        contact: IContact;
      };
  applicant_data?: {
    document?: string;
    job?: string;
    state_registration?: string;
    civil_status?: string;
    nationality?: string;
  };
  rg?: string;
  job?: string;
  property_entrance?: IGeographicCoordinates;
  idaron_number?: string;
  car_record?: string;
}
interface ITracking {
  cpf_cnpj?: string;
  tracking_id?: string;
  select?: string;
}
export interface IFormTracking {
  tracking: ITracking;
}

export interface ICombinedSurvey extends IDlaSurvey, ICascSurvey, IAsfSurveys {}

export interface ICombinedActivity
  extends ICascActivity,
    IDlaActivity,
    IDitlActivity, IAsfActivity {}

// Aqui cria-se a interface que estende todos os tipos de formulários para garantir a tipagem correta nos componentes
// Novas adições devem manualmente adicionadas às extensões da interface

export interface ICombinedSchema
  extends 
    IAtiSchema,
    IDlaSchema,
    IOutorgaSchema,
    IAufSchema,
    IDofSchema,
    ILpcaSchema,
    ICilaSchema,
    ICascSchema,
    IAcompanhamento,
    IDitlSchema,
    IFormTracking, 
    IAsfSchema, 
    IDeafSchema,
    IPiscSchema {}


export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
export const ACCEPTED_FILE_TYPE_PDF = ["application/pdf"];
export const ACCEPTED_FILE_TYPE_ZIP = ["application/zip", "application/x-zip", "application/x-zip-compressed", "application/x-compressed-zip"];
export const ZOD_REGEX_ERROR_MESSAGE = "Formato inválido.";

export const NAME_ZOD_FIELD = z.string().min(5).max(120);
export const CPF_CNPJ_ZOD_FIELD = z
  .string()
  .min(14)
  .max(18)
  .regex(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    ZOD_REGEX_ERROR_MESSAGE,
  )
  .refine(validateCpfOrCnpj, "Formato inválido.")
  .transform((value) => value.replace(/[^0-9]/g, ""));
export const CPF_ZOD_FIELD = z
  .string()
  .length(14)
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, ZOD_REGEX_ERROR_MESSAGE)
  .refine(validateCpf, "CPF inválido.")
  .transform((value) => value.replace(/[^0-9]/g, ""));
export const CNPJ_ZOD_FIELD = z
  .string()
  .length(18)
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, ZOD_REGEX_ERROR_MESSAGE)
  .refine(validateCnpj, "CNPJ inválido.")
  .transform((value) => value.replace(/[^0-9]/g, ""));
export const COERCED_DATE_FIELD = z.coerce
  .date()
  .refine((date) => date !== undefined, "Insira uma data válida.");
export const YES_NO_ZOD_ENUM_FIELD = z.enum(["Sim", "Não"]);
export const NATIONALITY_ZOD_ENUM_FIELD = z.enum(["brasileiro", "estrangeiro"]);
export const CIVIL_STATUS_ZOD_ENUM_FIELD = z.enum([
  "solteiro",
  "casado",
  "separado",
  "divorciado",
  "viúvo",
  "outro",
]);
export const LITERAL_TRUE_FIELD = z.literal(true);
export const CHECKBOX_ZOD_ARRAY = z
  .array(
    z
      .object({
        checked: z.boolean().refine((value) => value === true, "Obrigatório."),
      })
      .required(),
  )
  .nonempty();
export const CAR_RECORD_NUMBER_ZOD_FIELD = z
  .string()
  .length(50)
  .transform((value) => value.toUpperCase());
export const RG_ZOD_FIELD = z.string().min(6).max(15);
export const STATE_REGISTRATION_ZOD_FIELD = z.string().min(9).max(14);
export const COUNCIL_LICENSE_ZOD_OBJECT = z.object({
  cl_name: z.string().min(3).max(40),
  cl_number: z.string().min(3).max(20),
  cl_state: z.string().length(2),
});
export const JOB_ZOD_FIELD = z.string().min(3).max(255);
// Definição personalizada de arquivo com checks de existência, tamanho máximo e extensão
export const PDF_FILE_CUSTOM_ZOD_FIELD = z
  .custom<FileList>()
  .refine((files) => files?.[0]?.size ?? undefined, "Este campo é obrigatório.")
  .refine(
    (files) => ACCEPTED_FILE_TYPE_PDF.includes(files?.[0]?.type),
    "Somente arquivos .pdf são permitidos.",
  )
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    "Somente arquivos abaixo de 100 MB são permitidos.",
  );
export const OPTIONAL_PDF_FILE_CUSTOM_ZOD_FIELD = z
  .custom<FileList>()
  .optional();
export const ZIP_FILE_CUSTOM_ZOD_FIELD = z
  .custom<FileList>()
  .refine((files) => files?.[0]?.size ?? undefined, "Este campo é obrigatório.")
  .refine(
    (files) => ACCEPTED_FILE_TYPE_ZIP.includes(files?.[0]?.type),
    "Somente arquivos .zip são permitidos.",
  )
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    "Somente arquivos abaixo de 100 MB são permitidos.",
  );
export const CONTACT_INFO_ZOD_OBJECT = z.object({
  phone: z
    .string()
    .min(14)
    .max(15)
    .transform((value) => value.replace(/[^0-9]/g, "")),
  fax: z.string().max(60).optional(),
  email: z.string().email().min(5).max(80),
});
export const OPTIONAL_CONTACT_INFO_ZOD_OBJECT = z.object({
  phone: z
    .string()
    .min(14)
    .max(15)
    .transform((value) => value.replace(/[^0-9]/g, ""))
    .or(z.literal(""))
    .optional(),
  fax: z.string().max(60).optional().or(z.literal("")).optional(),
  email: z.string().email().min(5).max(80).or(z.literal("")).optional(),
});
export const RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT = z
  .object({
    latitude: z.string().length(13),
    longitude: z.string().length(13),
  })
  .transform((object) => {
    const localizedLongitude = object.longitude.replace(/O/, "W");
    return {
      latitude: object.latitude,
      longitude: localizedLongitude,
    };
  })
  .superRefine(async (object, context) => {
    const refinement = await new Promise<boolean>((resolve) =>
      resolve(isPointInPolygon(object, geoRondoniaPolygon)),
    );
    if (!refinement)
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Coordenadas não pertencem ao estado de Rondônia.",
      });
  })
  .transform(async (object) => {
    return {
      latitude: await new Promise<number>((resolve) =>
        resolve(sexagesimalToDecimal(object.latitude)),
      ),
      longitude: await new Promise<number>((resolve) =>
        resolve(sexagesimalToDecimal(object.longitude)),
      ),
    };
  });
export const OPTIONAL_ADDRESS_ZOD_OBJECT = z.object({
  street: z.string().min(5).max(80).or(z.literal("").optional()),
  number: z.string().min(1).max(5).or(z.literal("").optional()),
  complement: z.string().max(255).or(z.literal("")).optional(),
  district: z.string().min(4).max(50).or(z.literal("").optional()),
  zipcode: z
    .string()
    .min(9)
    .max(9)
    .transform((value) => value.replace(/[^0-9]/g, ""))
    .refine(
      (value) => validarCEPRondonia(value),
      "O CEP deve estar na faixa de Rondônia (76800-000 a 76999-999)",
    )
    .or(z.literal("").optional()),
  city: z.string().min(3).max(50).or(z.literal("").optional()),
  state: z
    .string()
    .length(2)
    .regex(/^[a-zA-Z]+$/, "Formato inválido.")
    .transform((value) => value.toUpperCase())
    .or(z.literal("").optional()),
});
export const ADDRESS_ZOD_OBJECT = z.object({
  street: z.string().min(5).max(80),
  number: z.string().min(1).max(5),
  complement: z.string().max(255).optional(),
  district: z.string().min(4).max(50),
  zipcode: z
    .string()
    .length(9)
    .transform((value) => value.replace(/[^0-9]/g, ""))
    .refine(
      (value) => validarCEPRondonia(value),
      "O CEP deve estar na faixa de Rondônia (76800-000 a 76999-999)",
    ),
  city: z.string().min(3).max(50),
  state: z
    .string()
    .length(2)
    .regex(/^[a-zA-Z]+$/, "Formato inválido.")
    .transform((value) => value.toUpperCase()),
});

export const OPTIONAL_PERSONAL_DATA_ZOD_OBJECT = z.object({
  adress: OPTIONAL_ADDRESS_ZOD_OBJECT,
  contact: OPTIONAL_CONTACT_INFO_ZOD_OBJECT,
});
export const PERSONAL_DATA_ZOD_OBJECT = z.object({
  address: ADDRESS_ZOD_OBJECT,
  contact: CONTACT_INFO_ZOD_OBJECT,
});
export const APPLICANT_ZOD_OBJECT = z.object({
  name: z.string().min(5).max(120),
  cpf_cnpj: CPF_CNPJ_ZOD_FIELD,
  personal_data: PERSONAL_DATA_ZOD_OBJECT,
});
export const TECHNICIAN_ZOD_OBJECT = z.object({
  name: z.string().min(5).max(120),
  cpf: CPF_ZOD_FIELD,
  rg: z.string().min(6).max(15),
  council_license: z.object({
    cl_name: z.string().min(3).max(40),
    cl_number: z.string().min(3).max(20),
    cl_state: z.string().length(2),
  }),
  personal_data: PERSONAL_DATA_ZOD_OBJECT,
});
export const AcompanhamentoSchema = z.object({
  cpf_cnpj: CPF_CNPJ_ZOD_FIELD,
  tracking_id: z.string().min(8).max(20),
});

export function validarCEPRondonia(value: string) {
  const cep = value.replace(/[^0-9]/g, "");
  return /^76[89]\d{2}-?\d{3}$/.test(cep);
}
export function messageMaxValue(value: string | number) {
  return "Este valor deve ser menor ou igual a " + String(value) + ".";
}
