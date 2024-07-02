import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import RegionalAddressContactInfo from "@/components/RegionalAddress";
import addresses from "@/lib/enderecos-regionais/addresses";
import Link from "next/link";

export default function EnderecosRegionais() {
  return (
    <FormContainer>
      <Header className="min-h-[auto]">
        <Header.Title>Endereços Regionais</Header.Title>
      </Header>
      <Separator className="h-12 bg-sage-200" />
      <div className="relative mx-auto mb-4 max-w-[640px]">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="collapse collapse-arrow mb-2 rounded-lg bg-beige-50 shadow shadow-sage-200"
          >
            <input
              type="checkbox"
              name={`acordeao-de-${address.municipio}`}
              className="h-auto w-auto"
            />
            <h2 className="text-md collapse-title font-bold md:text-xl">
              Escritório Regional de {address.municipio}
            </h2>
            <div className="collapse-content">
              <p>
                <span className="font-bold">Gerente:</span> {address.gerente}
              </p>
              <p>
                <span className="font-bold">Endereço:</span> {address.endereco}
              </p>
              <RegionalAddressContactInfo address={address} />
              {/* {address.instagram && (
                <p>
                  <span className="font-bold">Instagram:</span>{" "}
                  <Link
                    className="text-md underline"
                    target="_blank"
                    prefetch={false}
                    href={address.instagram}
                  >
                    {address.instagram}
                  </Link>
                </p>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </FormContainer>
  );
}
