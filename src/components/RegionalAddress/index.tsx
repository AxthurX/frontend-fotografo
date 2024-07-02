"use client";

import { toast } from "@/components/ui/use-toast";
import { IAddresses } from "@/lib/enderecos-regionais/addresses";

export default function RegionalAddressContactInfo({
  address,
}: {
  address: IAddresses;
}) {
  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        title: "Sucesso",
        description: "Texto copiado com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
      });
    }
  };

  return (
    <p>
      <span className="font-bold">Contatos:</span>
      <span
        role="button"
        tabIndex={0}
        className="tooltip tooltip-top tooltip-info cursor-pointer underline"
        data-tip="Clique para copiar"
        onClick={() => handleCopy(address.telefone)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCopy(address.telefone);
          }
        }}
        onMouseDown={(e) => {
          if (e.button === 0) {
            handleCopy(address.telefone);
          }
        }}
      >
        {address.telefone}
      </span>{" "}
      / <span className="font-bold">Email:</span>{" "}
      <span
        role="button"
        tabIndex={0}
        className="tooltip tooltip-top tooltip-info cursor-pointer underline"
        data-tip="Clique para copiar"
        onClick={() => handleCopy(address.email)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCopy(address.email);
          }
        }}
        onMouseDown={(e) => {
          if (e.button === 0) {
            handleCopy(address.email);
          }
        }}
      >
        {address.email}
      </span>
    </p>
  );
}
