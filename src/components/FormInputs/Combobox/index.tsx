
"use client";

import { ISelectOption } from "@/components/FormInputs/Select";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  UseFormSetValue,
} from "react-hook-form";

type ComboboxProps = {
  fieldId: Path<ICombinedSchema>;
  label?: string | ReactNode;
  placeholder?: string;
  value?: string;
  options: ISelectOption[];
  control: Control<ICombinedSchema>;
  errors?: FieldErrors<ICombinedSchema>;
  setRhfValue: UseFormSetValue<ICombinedSchema>;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  externalValue?: string | number;
};

export function Combobox({
  fieldId,
  label,
  options,
  control,
  errors,
  disabled,
  required,
  setRhfValue,
  className,
  externalValue,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(externalValue ?? "");

  const selectOptions = structuredClone(options);

  const optionLabelFinder = (options: ISelectOption[]) => {
    const matchingOption = options.find((option) => option.value == value);
    if (matchingOption) return matchingOption.label;
    else return "";
  };

  useEffect(() => {
    if (externalValue) {
      setValue(externalValue);
      setRhfValue(fieldId, externalValue, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [externalValue, fieldId, setRhfValue]);

  return (
    <>
      <label htmlFor={fieldId} className="label my-1 py-0">
        {label}
      </label>
      <Controller
        name={fieldId}
        control={control}
        defaultValue=""
        rules={required ? { required: required } : {}}
        render={() => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger id={fieldId} asChild>
              <Button
                variant="daisy"
                size="daisy"
                role="combobox"
                disabled={disabled}
                aria-expanded={open}
                aria-label="Abrir menu de seleção"
                className="w-full justify-between"
              >
                <span className="grow truncate text-start text-base font-normal">
                  {value ? optionLabelFinder(options) : ""}
                </span>
                <ChevronDown className="ml-2 h-4 min-h-[16px] w-4 min-w-[16px] shrink-0 text-coffee-900 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto p-0", className)}>
              <Command
                filter={(value, search) => {
                  if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                  return 0;
                }}
              >
                <CommandInput placeholder="..." />
                <CommandList>
                  <CommandEmpty>Sem resultados.</CommandEmpty>
                  <CommandGroup>
                    {selectOptions &&
                      selectOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value.toString()}
                          onSelect={() => {
                            setValue(option.value.toString());
                            setRhfValue(fieldId, option.value.toString(), {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            });
                            setOpen(false);
                          }}
                          className="text-base"
                        >
                          <span className={cn("w-auto")}>{option.label}</span>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={fieldId}
          render={({ message }) => (
            <span className="my-1 text-xs text-error">{message}</span>
          )}
        />
      )}
    </>
  );
}

export default Combobox;
