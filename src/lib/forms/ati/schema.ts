import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CHECKBOX_ZOD_ARRAY, COERCED_DATE_FIELD, CPF_CNPJ_ZOD_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, TECHNICIAN_ZOD_OBJECT } from "../combinedInterfaces";

export const atiSchema = z.object({
  authorization_type: z.string(),
  destination_license: PDF_FILE_CUSTOM_ZOD_FIELD,
  barcode: z.string().length(55),
  receipt: PDF_FILE_CUSTOM_ZOD_FIELD,
  applicant: APPLICANT_ZOD_OBJECT.extend({ state_registration: z.string().min(9).max(14) }),
  technician: TECHNICIAN_ZOD_OBJECT,
  drivers: z.array(
    z.object({
      name: z.string().min(5).max(120),
      cnh: z.string().min(10).max(11),
      cnh_expiration: COERCED_DATE_FIELD,
      mopp_number: z.string().max(40).or(z.literal('')),
      mopp_expiration: z.coerce
      .date()
      .refine((date) => date !== undefined, "Insira uma data válida.").or(z.literal('')),
    }).required(),
  ).nonempty(),
  fleet: z.object({
    brand: z.string().min(2).max(15),
    year: z.string().length(4).refine((value) => parseInt(value) > 1900, "Insira um ano válido."),
    plate: z.string().length(7).transform(value => value.toLocaleUpperCase("pt-BR")),
    cargo: z.string().transform(value => value.replace(",", ".")).pipe(z.coerce.number().multipleOf(0.001).positive().safe()),
    wagons: z.coerce.number().positive().safe(),
    type: z.object({ 
      select_type: z.string().min(2).max(40),
      other_type: z.string().max(40).optional()
    })
    .refine((type) => {
      if (type.select_type == "outros" && type.other_type == "" || undefined) {
        return false;
      } 
      return true;
    }, "Especifique um tipo de veículo.")
    .transform((type) => {
      if (type.select_type === "outros") {
        return type.other_type;
      } else return type.select_type;
    })
  }),
  routes: z.array(
    z.object({
      origin: z.string().min(2).max(255),
      destination: z.string().min(2).max(255),
      highways: z.string().min(2).max(255)
    }).required()
  ).nonempty(),
  certificates: z.array(z.object({
    cert_type: z.enum(["civ", "cipp", "antt"]),
    number: z.string().min(6).max(10).or(z.literal('')),
    expires_at: z.coerce
    .date()
    .refine((date) => date !== undefined, "Insira uma data válida.").or(z.literal('')),

  })),
  wastes: z.array(
    z.object({
      name: z.string().min(2).max(255),
      classification: z.enum([
        "Classe 1 - Explosivos",
        "Classe 2 - Gases",
        "Classe 3 - Líquidos inflamáveis",
        "Classe 4 - Sólidos inflamáveis",
        "Classe 5 - Substâncias oxidantes",
        "Classe 6 - Substâncias tóxicas",
        "Classe 7 - Substâncias radioativas",
        "Classe 8 - Substâncias corrosivas",
        "Classe 9 - Substâncias diversas",
        "Classe 10 - Resíduos perigosos",
        "Produtos não perigosos",
      ]),
      packaging: z.string().min(2).max(255),
    }).required(),
  ).nonempty(),
  final_destination: z.object({
    name: z.string().min(5).max(120),
    cpf_cnpj: CPF_CNPJ_ZOD_FIELD,
    phone: z.string().min(14).max(15).transform((value) => value.replace(/[^0-9]/g, "")),
    address: ADDRESS_ZOD_OBJECT,
  }),
  checkboxes: CHECKBOX_ZOD_ARRAY, 
});