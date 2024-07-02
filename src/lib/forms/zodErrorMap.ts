import { z, ZodIssueOptionalMessage } from "zod";

export function zodErrorMap(error: ZodIssueOptionalMessage, context: z.ErrorMapCtx): { message: string } {
  const field = error.path.join(" / ");

  if (field === undefined)
    return { message: "É necessário enviar todos os campos requeridos." };

  switch (error.code) {
	
  case z.ZodIssueCode.invalid_type: {
    if (error.received == "undefined" || error.received == "null")
      return { message: "Este campo é obrigatório." };
    else if (error.received != error.expected)
      return { message: `Este campo deveria ser ${error.expected}, mas é ${error.received}.` };
    break;
  }

  case z.ZodIssueCode.too_small: {
    if (error.type === "string") {
      const minType = (error.type === "string") ? (error.minimum === 1 ? "caractere" : "caracteres") : (error.minimum === 1 ? "dígito" : "dígitos");
      return { message: `Este campo deve ter no mínimo ${error.minimum} ${minType}.` };
    } else if (error.type === "number") {
      return { message: "Este campo deve ser maior que zero." };
    } else return { message: "Erro desconhecido." };
  }
  
  case z.ZodIssueCode.too_big: {
    const maxType = (error.type === "string") ? (error.maximum === 1 ? "caractere" : "caracteres") : (error.maximum === 1 ? "dígito" : "dígitos");
    return { message: `Este campo deve ter no máximo ${error.maximum} ${maxType}.` };
  }
  
  case z.ZodIssueCode.invalid_date: {
    return { message: "Insira uma data válida." };
  }

  case z.ZodIssueCode.invalid_string: {
    if (error.validation === "email") 
      return { message: "Este campo deve ser um email válido." };
    break;
  }

  case z.ZodIssueCode.invalid_literal: {
    return { message: "Obrigatório. "};
  } 

  case z.ZodIssueCode.invalid_enum_value: {
    return { message: "Este campo é obrigatório. "};
  } 

  case z.ZodIssueCode.invalid_union_discriminator: {
    return { message: "Obrigatório. "};
  } 

  }

  return { message: context.defaultError };
}