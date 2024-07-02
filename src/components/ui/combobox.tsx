"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { activities } from "@/lib/forms/dla/activities";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <label htmlFor="select" className="label my-1 py-0">
        Combobox
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id="select" asChild>
          <Button
            variant="daisy"
            size="daisy"
            role="combobox"
            aria-expanded={open}
            aria-label="Abrir menu de seleção"
            className="w-full justify-between"
          >
            <span className="grow truncate text-start text-base font-normal">
              {value
                ? activities.find(
                    (framework) => framework.value.toString() === value,
                  )?.label
                : ""}
            </span>
            <ChevronDown className="ml-2 h-4 min-h-[16px] w-4 min-w-[16px] shrink-0 text-coffee-900 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 sm:w-[356px] md:w-[786px]">
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="..." />
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup className="max-h-80 overflow-y-scroll">
              {activities.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-base"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-coffee-900",
                      value === framework.value.toString()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <span className="max-sm:w-[310px] md:w-[740px]">
                    {framework.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
