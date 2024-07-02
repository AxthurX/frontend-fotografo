import { ISelectOption } from "@/components/FormInputs/Select";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { ReactNode, RefCallback } from "react";
import { FieldErrors, Path, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { XOR } from "ts-xor";
export interface IField {
  fieldId: Path<ICombinedSchema>;
  label: string | ReactNode;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  step?: string | number;
  inputType?: "text" | "email" | "date" | "number" | "tel";
  fieldType: "text" | "select" | "radio" | "checkbox" | "file" | "masked" | "combobox";
  options?: ISelectOption[];
  className?: string;
  disabled?: boolean;
}

export interface IFieldArrayField {
  label: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  step?: string | number;
  inputType?: "text" | "email" | "date" | "number" | "tel";
  fieldType: "text" | "select" | "radio" | "checkbox" | "file" | "masked" | "combobox";
  options?: ISelectOption[];
  className?: string;
}

export interface IMaskedField extends IField {
  maskitoRef: RefCallback<HTMLElement>;
  setValue: UseFormSetValue<ICombinedSchema>;
}
export interface FieldGeneratorProps {
  fieldsArray: Array<XOR<IField, IMaskedField>>;
  register: UseFormRegister<ICombinedSchema>;
  errors: FieldErrors<ICombinedSchema>;
  maskitoRef?: RefCallback<HTMLElement>;
  setValue?: UseFormSetValue<ICombinedSchema>;
}