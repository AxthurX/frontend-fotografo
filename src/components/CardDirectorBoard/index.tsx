import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface QuemCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  imageAlt?: string;
  pageUrl?: string;
}

function CardDirectorBoard(props: QuemCardProps) {
  const hasImage = !!props.imageUrl;
  return (
    <>
      {props.pageUrl ? (
        <div className="card card-compact mt-5 h-96 w-64 transform justify-center rounded-lg border border-sage-300 bg-beige-50 shadow-xl">
          <Link href={props.pageUrl} className="h-full w-full">
            {hasImage ? (
              <figure>
                <Image
                  src={encodeURI(props.imageUrl || "")}
                  alt={props.imageAlt || ""}
                  width={288}
                  height={300}
                  className="h-60 w-full max-w-xs rounded-t-lg object-cover"
                />
              </figure>
            ) : (
              <div className="mx-auto flex h-60 items-center justify-center">
                <UserRound
                  size={180}
                  className="animate-ping-custom h-32 w-32 rounded-lg opacity-50"
                />
              </div>
            )}

            <div className="card-body">
              <h2 className="card-title justify-center text-center text-base">
                {props.name}
              </h2>
              <div className="text-center text-coffee-900">{props.role}</div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="card card-compact mt-5 h-96 w-64 transform justify-center rounded-lg border border-sage-300 bg-beige-50 shadow-xl">
          {hasImage ? (
            <figure>
              <Image
                src={encodeURI(props.imageUrl || "")}
                alt={props.imageAlt || ""}
                width={288}
                height={300}
                className="h-60 w-full max-w-xs rounded-t-lg object-cover"
              />
            </figure>
          ) : (
            <div className="mx-auto flex h-60 items-center justify-center">
              <UserRound
                size={180}
                className="animate-ping-custom h-32 w-32 rounded-lg opacity-50"
              />
            </div>
          )}

          <div className="card-body">
            <h2 className="card-title justify-center text-center text-base">
              {props.name}
            </h2>
            <div className="text-center text-secondary">{props.role}</div>
          </div>
        </div>
      )}
    </>
  );
}
export default CardDirectorBoard;
