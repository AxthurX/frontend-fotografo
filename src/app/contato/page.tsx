import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import contacts from "@/lib/contatos/contacts";

export default function Contato() {
  return (
    <FormContainer>
      <Header className="min-h-[auto]">
        <Header.Title>Contato</Header.Title>
      </Header>
      <Separator className="mb-10 h-12 bg-sage-200" />
      <Header.Body>
        <div className="grid grid-cols-8">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold text-coffee-900">SEDAM</h1>
            <hr className="mr-3 border-2 border-b-coffee-800" />
          </div>
          <div className="col-span-4 flex flex-col gap-y-3 max-sm:col-span-full">
            <div className="pb-3">
              <h2 className="mt-3 text-2xl font-semibold text-coffee-900">
                Secretaria de Estado do Desenvolvimento Ambiental
              </h2>
            </div>
            <p>Av. Farquar , 2986 – Bairro Pedrinhas</p>
            <p>Edifício Rio Cautário (Curvo 2 – 2° andar)</p>
            <p>Porto Velho, RO</p>
            <p>CEP 76801-470</p>
            <p>Horário de Atendimento: 7h30 às 13h30, de segunda a sexta</p>
          </div>
          <div className="col-span-4 max-lg:col-span-full">
            <iframe
              title="Localização da SEDAM no Google Maps"
              className="my-4 max-h-[320px] max-w-[480px] border border-sage-300 max-sm:max-w-[300px] max-sm:pr-4"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15773.546530733202!2d-63.911279!3d-8.749644!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92325cd55b145959%3A0xd6d16f73e7f9530b!2sAv.+Farquar%2C+2986+-+Pedrinhas%2C+Porto+Velho+-+RO%2C+76801-470%2C+Brasil!5e0!3m2!1spt-BR!2sus!4v1551249814061"
              width="480"
              height="280"
            />
          </div>
        </div>
        <div>
          {contacts.map((contact, index) => (
            <div key={index} className="py-5">
              <h2 className="text-xl font-semibold">
                {contact.link ? (
                  <a href={contact.link}>{contact.name}</a>
                ) : (
                  contact.name
                )}
              </h2>
              <p className="font-bold">{contact.numberPhone}</p>
              <p>{contact.email}</p>
            </div>
          ))}
        </div>
      </Header.Body>
    </FormContainer>
  );
}
