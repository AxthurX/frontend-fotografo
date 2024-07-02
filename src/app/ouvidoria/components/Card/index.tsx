import { cn } from "@/lib/utils";
import Image from "next/image";

interface CombinedCardProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
  imageClassName?: string;
  notAnimation?: boolean;
  highlight?:string;
}

export default function Card(props: CombinedCardProps) {
  return (
    <div
      className={cn(
        `h-76 card card-compact w-64 transform rounded-lg border border-sage-200 bg-beige-50 shadow-lg transition-transform ${
          props.notAnimation == true
            ? ""
            : "hover:scale-105 hover:border-solid hover:border-sage-400 hover:shadow-2xl"
        }`,
        props.className,
      )}
    >
      <Image
        src={encodeURI(props.url)}
        alt={props.title}
        height={props.imageHeight || 176}
        width={props.imageWidth || 256}
        className={cn(
          "h-44 w-full rounded-t-lg bg-white object-cover",
          props.imageClassName,
        )}
      />
      
      <div className="card-body h-32 !py-2.5">
        <h2 className="card-title justify-center text-xl !leading-5 border-y-2 py-2 border-primary border-opacity-75">
          {props.title}
        </h2>
        
        {props.highlight && (
          <div className="line-clamp-4 overflow-hidden overflow-ellipsis text-coffee-950 text-center font-medium text-base">
            {props.highlight}
          </div>
        )}
        {props.description && (
          <div className="line-clamp-4 overflow-hidden overflow-ellipsis text-coffee-950 text-center">
            {props.description}
          </div>
        )}
      </div>
    </div>
  );
}
