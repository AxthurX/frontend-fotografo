import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Legend from "@/components/FormStructure/Legend";
import Separator from "@/components/FormStructure/Separator";
import { ReactNode, Suspense } from "react";

export default function Layout(props: { children: ReactNode }) {
  return (
    <FormContainer className="grow">
      <Header className="min-h-[auto]">
        <Header.Title>Área do usuário</Header.Title>
      </Header>
      <Separator className="mb-0 h-12 bg-sage-200" />
      <Legend className="mb-12">Acompanhamento de solicitações</Legend>
      <Suspense>{props.children}</Suspense>
    </FormContainer>
  );
}
