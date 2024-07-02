"use client";

import CombinedCard from "@/components/CardCoord";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";

interface IButton {
    title: string;
    href: string;
    description: string;
    image: string;
}

const buttonsData = [
    {
        title: "CONSEPA",
        href: "/conselhos/consepa",
        description: "Conselho Estadual de Política Ambiental",
        image:
            "/ext-files/website-icons/conselhos/iconCONSEPA.svg",
    },
    {
        title: "CECAM",
        href: "/conselhos/cecam",
        description: "Conselho Estadual de Compensação Ambiental",
        image:
            "/ext-files/website-icons/conselhos/iconCECAM.svg",
    },
    {
        title: "CONSEPAF",
        href: "/conselhos/consepaf",
        description: "Conselho Estadual de Política Agrícola para Florestas Plantadas",
        image:
            "/ext-files/website-icons/conselhos/iconCONSEPAF.svg",
    },
    {
        title: "CRH",
        href: "/conselhos/crh",
        description: "Conselho Estadual de Recursos Hídricos",
        image:
            "/ext-files/website-icons/conselhos/iconCRH.svg",
    },
];

buttonsData.sort((a, b) => a.title.localeCompare(b.title));

const CardComponent = ({ button }: { button: IButton }) => {
    return (
        <div className="mt-2 duration-500 animate-in fade-in">
            <Link href={button.href}>
                <CombinedCard
                    classNameIcon="h-32 w-auto mt-4 text-"
                    title={button.title}
                    image={button.image}
                    description={button.description}
                />
            </Link>
        </div>
    );
};

export default function Conselhos() {
    return (
        <>
            <FormContainer className="grow pb-8">
                <Header className="min-h-[auto]">
                    <Header.Title>Conselhos</Header.Title>
                </Header>
                <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
                <div className="container my-4 grid grid-cols-1 justify-items-center gap-y-4 text-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {buttonsData.map((button) => (
                        <CardComponent key={button.description} button={button} />
                    ))}
                </div>
            </FormContainer>
        </>
    );
}
