

import Checkbox from "@/components/FormInputs/Checkbox";
import Combobox from "@/components/FormInputs/Combobox";
import FieldArrayMaskedTextInput from "@/components/FormInputs/FieldArrayMaskedTextInput";
import FileInput from "@/components/FormInputs/FileInput";
import MaskedTextInput from "@/components/FormInputs/MaskedTextInput";
import Radio from "@/components/FormInputs/Radio";
import Select from "@/components/FormInputs/Select";
import TextInput from "@/components/FormInputs/TextInput";
import {
  IAtiCertificate,
  IAtiCheckbox,
  IAtiDriver,
  IAtiRoute,
  IAtiWaste,
} from "@/lib/forms/ati/interfaces";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { IUsePurposeArray } from "@/lib/forms/doa/interfaces";
import { IField, IFieldArrayField } from "@/lib/forms/fields.d";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { MaskitoOptions } from "@maskito/core";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IAsfHighways } from "./asf/interfaces";
import { IDeafWood } from "./deaf/interfaces";

export const renderField = (
  field: IField,
  register: UseFormRegister<ICombinedSchema>,
  errors: FieldErrors<ICombinedSchema>,
  className?: string,
  disabled?: boolean,
  readonly?: boolean,
) => {
  let fieldToRender;
  switch (field.fieldType) {
    case "text":
      fieldToRender = (
        <TextInput
          fieldId={field.fieldId}
          label={field.label}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          inputType={field.inputType}
          register={register}
          disabled={field.disabled || disabled}
          readonly={readonly}
        />
      );
      break;
    case "radio":
      fieldToRender = (
        <Radio
          fieldId={field.fieldId}
          label={field.label}
          register={register}
          options={field.options}
          className={field.className}
        />
      );
      break;
    case "select":
      fieldToRender = (
        <Select
          fieldId={field.fieldId}
          label={field.label}
          register={register}
          options={field.options}
        />
      );
      break;
    case "checkbox":
      fieldToRender = (
        <Checkbox
          fieldId={field.fieldId}
          label={field.label}
          register={register}
        />
      );
      break;
    case "file":
      fieldToRender = (
        <FileInput
          fieldId={field.fieldId}
          label={field.label}
          register={register}
        />
      );
      break;
    default:
      fieldToRender = (
        <>
          <label className="label">{field.label}</label>
          <div
            role="alert"
            className="min-h-12 w-full rounded-lg border border-red-600 bg-red-300 p-4 leading-4 text-gray-700"
          >
            Erro ao gerar &quot;{field.fieldId}&quot;. Talvez o fieldType esteja
            errado?
          </div>
        </>
      );
  }

  return (
    <div className={cn("mb-2", className)}>
      {fieldToRender}
      {renderError(field, errors)}
    </div>
  );
};

export const renderMaskedField = (
  field: IField,
  maskitoOptions: { options: MaskitoOptions },
  control: Control<ICombinedSchema>,
  errors: FieldErrors<ICombinedSchema>,
  className?: string,
  disabled?: boolean,
) => {
  let fieldToRender;
  if (field.fieldType === "masked") {
    fieldToRender = (
      <MaskedTextInput
        fieldId={field.fieldId}
        label={field.label}
        placeholder={field.placeholder}
        minLength={field.minLength}
        maxLength={field.maxLength}
        control={control}
        maskitoOptions={maskitoOptions}
        disabled={disabled}
      />
    );
  } else {
    fieldToRender = (
      <>
        <label className="label">{field.label}</label>
        <div
          role="alert"
          className="min-h-12 w-full rounded-lg border border-red-600 bg-red-300 p-4 leading-4 text-gray-700"
        >
          Erro ao gerar &quot;{field.fieldId}&quot;. Talvez o fieldType esteja
          errado?
        </div>
      </>
    );
  }

  if (fieldToRender) {
    return (
      <div className={cn("mb-2", className)}>
        {fieldToRender}
        {renderError(field, errors)}
      </div>
    );
  }
};

export const renderComboboxField = (
  field: IField,
  control: Control<ICombinedSchema>,
  errors: FieldErrors<ICombinedSchema>,
  setValue: UseFormSetValue<ICombinedSchema>,
  className?: string,
  externalValue?: string | number,
  disabled?: boolean
) => {
  let fieldToRender;
  if (field.fieldType === "combobox") {
    fieldToRender = (
      <Combobox
        fieldId={field.fieldId}
        label={field.label}
        options={field.options}
        control={control}
        setRhfValue={setValue}
        className={field.className}
        externalValue={externalValue}
        disabled={disabled}
      />
    );
  } else {
    fieldToRender = (
      <>
        <label className="label">{field.label}</label>
        <div
          role="alert"
          className="min-h-12 w-full rounded-lg border border-red-600 bg-red-300 p-4 leading-4 text-gray-700"
        >
          Erro ao gerar &quot;{field.fieldId}&quot;. Talvez o fieldType esteja
          errado?
        </div>
      </>
    );
  }

  if (fieldToRender) {
    return (
      <div className={cn("mb-2", className)}>
        {fieldToRender}
        {renderError(field, errors)}
      </div>
    );
  }
};

export const renderError = (
  field: IField,
  errors: FieldErrors<ICombinedSchema>,
) => {
  return (
    <ErrorMessage
      errors={errors}
      name={field.fieldId}
      render={({ message }) => (
        <span className="label-text-alt block text-error">{message}</span>
      )}
    />
  );
};

export const renderFieldArrayField = (
  fieldId:
    | `drivers.${number}.${keyof IAtiDriver}`
    | `data_forest.data.${number}.${keyof IDeafWood}`
    | `routes.${number}.${keyof IAtiRoute}`
    | `certificates.${number}.${keyof IAtiCertificate}`
    | `wastes.${number}.${keyof IAtiWaste}`
    | `checkboxes.${number}.${keyof IAtiCheckbox}`
    | `use_purpose.${number}.${keyof IUsePurposeArray}`
    | `activity.location.streets.${number}.${keyof IAsfHighways}`,
  field: IFieldArrayField,
  register: UseFormRegister<ICombinedSchema>,
  errors: FieldErrors<ICombinedSchema>,
  className?: string,
  readonly?: boolean,
) => {
  let fieldToRender;
  switch (field.fieldType) {
    case "text":
      fieldToRender = (
        <TextInput
          fieldId={fieldId}
          label={field.label}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          inputType={field.inputType}
          register={register}
          readonly={readonly}
        />
      );
      break;
    case "radio":
      fieldToRender = (
        <Radio
          fieldId={fieldId}
          label={field.label}
          register={register}
          options={field.options}
          className={field.className}
        />
      );
      break;
    case "select":
      fieldToRender = (
        <Select
          fieldId={fieldId}
          label={field.label}
          register={register}
          options={field.options}
          className={field.className}
        />
      );
      break;
    case "checkbox":
      fieldToRender = (
        <Checkbox fieldId={fieldId} label={field.label} register={register} className={field.className} />
      );
      break;
    case "file":
      fieldToRender = (
        <FileInput fieldId={fieldId} label={field.label} register={register} className={field.className} />
      );
      break;
  }

  if (fieldToRender) {
    return (
      <div className={cn("mb-2", className)}>
        {fieldToRender}
        {renderFieldArrayError(fieldId, errors)}
      </div>
    );
  }
};

export const renderFieldArrayMaskedField = (
  fieldId:
    | `data_forest.data.${number}.${keyof IDeafWood}`
    | `drivers.${number}.${keyof IAtiDriver}`
    | `routes.${number}.${keyof IAtiRoute}`
    | `certificates.${number}.${keyof IAtiCertificate}`
    | `wastes.${number}.${keyof IAtiWaste}`
    | `checkboxes.${number}.${keyof IAtiCheckbox}`
    | `use_purpose.${number}.${keyof IUsePurposeArray}`
    | `activity.location.streets.${number}.${keyof IAsfHighways}`,
  field: IFieldArrayField,
  control: Control<ICombinedSchema>,
  maskitoOptions: { options: MaskitoOptions },
  errors: FieldErrors<ICombinedSchema>,
  className?: string,
  label?: string,
  readonly?: boolean
) => {
  if (field.fieldType === "masked") {
    return (
      <div className={cn("mb-2", className)}>
        <FieldArrayMaskedTextInput
          fieldId={fieldId}
          label={label ? label : field.label}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          control={control}
          maskitoOptions={maskitoOptions}
          readonly={readonly}
        />
        {renderFieldArrayError(fieldId, errors)}
      </div>
    );
  }
};

export const renderFieldArrayComboboxField = (
  fieldId:
    | `data_forest.${number}.${keyof IDeafWood}`
    | `drivers.${number}.${keyof IAtiDriver}`
    | `routes.${number}.${keyof IAtiRoute}`
    | `certificates.${number}.${keyof IAtiCertificate}`
    | `wastes.${number}.${keyof IAtiWaste}`
    | `checkboxes.${number}.${keyof IAtiCheckbox}`
    | `use_purpose.${number}.${keyof IUsePurposeArray}`
    | `activity.location.streets.${number}.${keyof IAsfHighways}`,
  field: IFieldArrayField,
  control: Control<ICombinedSchema>,
  errors: FieldErrors<ICombinedSchema>,
  setValue: UseFormSetValue<ICombinedSchema>,
  className?: string,
  externalValue?: string | number,
) => {
  let fieldToRender;
  if (field.fieldType === "combobox") {
    fieldToRender = (
      <Combobox
        fieldId={fieldId}
        label={field.label}
        options={field.options}
        control={control}
        setRhfValue={setValue}
        className={field.className}
        externalValue={externalValue}
      />
    );
  } else {
    fieldToRender = (
      <>
        <label className="label">{field.label}</label>
        <div
          role="alert"
          className="min-h-12 w-full rounded-lg border border-red-600 bg-red-300 p-4 leading-4 text-gray-700"
        >
          Erro ao gerar &quot;{fieldId}&quot;. Talvez o fieldType esteja errado?
        </div>
      </>
    );
  }

  if (fieldToRender) {
    return (
      <div className={cn("mb-2", className)}>
        {fieldToRender}
        {renderFieldArrayError(fieldId, errors)}
      </div>
    );
  }
};

export const renderFieldArrayError = (
  fieldId:
    | `data_forest.${number}.${keyof IDeafWood}`
    | `drivers.${number}.${keyof IAtiDriver}`
    | `routes.${number}.${keyof IAtiRoute}`
    | `certificates.${number}.${keyof IAtiCertificate}`
    | `wastes.${number}.${keyof IAtiWaste}`
    | `checkboxes.${number}.${keyof IAtiCheckbox}`
    | `use_purpose.${number}.${keyof IUsePurposeArray}`
    | `activity.location.streets.${number}.${keyof IAsfHighways}`,
  errors: FieldErrors<ICombinedSchema>,
) => {
  return (
    <ErrorMessage
      errors={errors}
      name={fieldId}
      render={({ message }) => (
        <span className="label-text-alt block text-error">
          {message ? message : fieldId}
        </span>
      )}
    />
  );
};