"use client";

import { TrackingContext } from "@/components/AreaUsuario/TrackingContext";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function Layout(props: {
  children: ReactNode;
  dados: ReactNode;
}) {
  const searchParams = useSearchParams();
  const tracking_id = searchParams.get("tracking_id") ?? "";
  const cpf_cnpj = searchParams?.get("cpf_cnpj") ?? "";
  const service = searchParams?.get("service") ?? "";

  return (
    <TrackingContext.Provider value={{ tracking_id, cpf_cnpj, service }}>
      {props.children}
      {!(tracking_id === "" || cpf_cnpj === "" || service === "") &&
        props.dados}
    </TrackingContext.Provider>
  );
}
