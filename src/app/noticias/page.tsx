import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import SearchResults from "@/components/SearchResults";
import SearchResultsError from "@/components/SearchResults/SearchResultsError";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Noticias() {
  return (
    <FormContainer className="grow">
      <Header className="min-h-[auto]">
        <Header.Title>Notícias</Header.Title>
      </Header>
      <Separator className="mb-0 h-12 bg-sage-200" />
      <Suspense>
        <ErrorBoundary FallbackComponent={SearchResultsError}>
          <SearchResults />
        </ErrorBoundary>
      </Suspense>
    </FormContainer>
  );
}
