import { cn } from "@/lib/utils";
import Image from "next/image";

interface CombinedCardProps {
  title: string;
  image: string;
  description?: string;
  classNameIcon?: string;
  classNameCard?: string;
  imageHeight?: number;
  imageWidth?: number;
}

/**
 * Notas para o escritor desse componente:
 *
 * Removi o pacote classnames e usei a função cn que o pacote do shadcn-ui já usa. Inclusive, do jeito que tu tava fazendo ia
 * dar erro porque a função classNames não resolve conflito entre classes do tailwind. E se tu lembrar bem, a gente já tinha
 * falado sobre isso outro dia, em outro componente.
 *
 * Qual a chance dos fato do className ser passado em dois lugares diferentes bugar completamente o componente?
 *
 * E porque existem dois componentes que fazem essencialmente a mesma coisa? Entendi nada.
 */

export default function CombinedCard(props: CombinedCardProps) {
  return (
    <div
      className={cn(
        "card card-compact mt-5 h-80 w-72 transform rounded-lg border border-sage-300 bg-beige-50 shadow-xl transition-transform hover:scale-105 hover:border-sage-400 hover:bg-sage-250",
        props.classNameCard,
      )}
    >
      <figure>
        <Image
          src={encodeURI(props.image)}
          alt={props.title}
          height={props.imageHeight || 200}
          width={props.imageWidth || 200}
          className={cn(
            "rounded-t-lg bg-transparent object-cover",
            props.classNameIcon,
          )}
        />
      </figure>
      <div className="card-body">
        <h2 className="mb-1 mt-6 text-xl font-semibold text-[#412E25]">
          {props.title}
        </h2>
        {props.description && (
          <div className="overflow-hidden overflow-ellipsis  text-lg text-[#412E25]">
            {props.description}
          </div>
        )}
      </div>
    </div>
  );
}
