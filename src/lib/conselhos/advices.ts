interface IConselhos {
    slug: string;
    title: string,
    description: string,
    responsavel?:string
}

export const conselhos: IConselhos[] = [
    {
        slug: "cecam",
        title: "CECAM",
        description: "Conselho Estadual de Compensação Ambiental",
    },
    {
        slug: "consepa",
        title: "CONSEPA",
        description: "Conselho Estadual de Política Ambiental",
        responsavel: "codea"
    },
    {
        slug: "consepaf",
        title: "CONSEPAF",
        description: "Conselho Estadual de Política Agrícola para Florestas Plantadas",
    },
    {
        slug: "crh",
        title: "CRH",
        description: "Conselho Estadual de Recursos Hídricos",
    },
] 