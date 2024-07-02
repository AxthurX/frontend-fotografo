import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";

interface CardForPageCoordenadoriasProps {
  title: string;
  description: string;
  contact_phone: string;
  contact_email: string;
  imageUrl?: string;
  imageAlt?: string;
  contact_whatsapp?: string;
}

function CardForPageCoordenadorias(props: CardForPageCoordenadoriasProps) {
  const hasImage = !!props.imageUrl;

  return (
    <div className="flex justify-center rounded-lg border border-sage-300 bg-beige-50 shadow-xl max-md:w-72 max-md:flex-col">
      {hasImage ? (
        <figure>
          <Image
            src={encodeURI(props.imageUrl || "")}
            alt={props.imageAlt || ""}
            width={288}
            height={288}
            className="size-72 object-cover max-md:rounded-t-lg md:rounded-l-lg"
          />
        </figure>
      ) : (
        <div className="flex size-72 items-center justify-center">
          <UserRound className="animate-ping-custom h-32 w-32 opacity-50" />
        </div>
      )}
      <div className="m-8 flex flex-col justify-between text-center text-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold max-md:text-xl">
          {props.title}
        </h2>
        <h3 className="mb-6 text-xl">{props.description}</h3>
        <div>
          {props.contact_phone != "" ? <h3>Telefone: {props.contact_phone}</h3> : ""}
          {props.contact_email != "" ? <h3>Email: {props.contact_email}</h3> : ""}
          {
            typeof props.contact_whatsapp == "string" &&
              props.contact_whatsapp != "" ?
              <div className="flex justify-center gap-1 sm:gap-2">
                <Link className=" text-[#158832] inline-flex items-center   hover:text-[#25D366] transition-colors duration-300 ease-in-out" href={"https://wa.me/55" + props.contact_whatsapp.replace(/[^\d]/g, "")}>
                  <span className="inline-flex items-center max-sm:hidden">
                    WhatsApp: 
                  </span>
                  <span className="inline-flex items-center">
                  <FaWhatsapp className="mx-0.5 max-md:hidden" /> {props.contact_whatsapp} <FaWhatsapp className="mx-1 md:hidden" />
                  </span>
                </Link>
              </div>
              : ""}
        </div>
      </div>
    </div>
  );
}
export default CardForPageCoordenadorias;
