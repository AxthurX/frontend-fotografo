interface IContact {
  name: string;
  numberPhone?: string;
  email: string;
  link?: string; // Adicionando a propriedade link para redirecionamento
}

const contacts: IContact[] = [
  {
    name: "Gabinete",
    numberPhone: "(69) 3212-9605",
    email: "gab@sedam.ro.gov.br",
    link: "/gabinete"
  },
  {
    name: "Assessoria de Comunicação - ASCOM",
    email: "ascom@sedam.ro.gov.br",
    link: "/ascom"
  },
  {
    name: "Ouvidoria Ambiental",
    numberPhone: "(69) 3212-9648 / (69) 98482-8690 / 0800 666 1150",
    email: "ouvidoria@sedam.ro.gov.br",
    link: "/ouvidoria"
  },
  {
    name: "Divisão de Protocolo",
    numberPhone: "(69) 3212-9623",
    email: "protocolo@sedam.ro.gov.br"
  },
  {
    name: "Coordenadoria de Auto de Infração - COAI",
    numberPhone: "(69) 3212-9637",
    email: "dai@sedam.ro.gov.br",
    link: "/coai"
  },
  {
    name: "Coordenadoria de Descentralização Ambiental - CODEA",
    numberPhone: "(69) 99200-6397",
    email: "asdea@sedam.ro.gov.br",
    link: "/codea"
  },
  {
    name: "Coordenadoria de Geociências - COGEO",
    numberPhone: "(69) 98482-8380 / (69) 3212-9610",
    email: "cogeo@sedam.ro.gov.br",
    link: "/cogeo"
  },
  {
    name: "Coordenadoria de Monitoramento e Regularização Ambiental Rural - COMRAR",
    numberPhone: "(69) 3212-9665 / CAR: (69) 98482-8401 / PRA: (69) 98482-8404",
    email: "comrar@sedam.ro.gov.br",
    link: "/comrar"
  },
  {
    name: "Coordenadoria de Patrimônio, Administração e Finanças - COPAF",
    numberPhone: "(69) 3212-9618 / (69) 98482-8383 / (69) 98482-8502 / (69) 98482-8683",
    email: "copaf.ro@sedam.ro.gov.br",
    link: "/copaf"
  },
  {
    name: "Coordenadoria de Educação Ambiental - CEAM",
    email: "ceam@sedam.ro.gov.br",
    link: "/ceam"
  },
  {
    name: "Coordenadoria de Recursos Hídricos - COREH",
    numberPhone: "(69) 3212-9617 / (69) 98482-8512 / (69) 98482-8691",
    email: "coreh@sedam.ro.gov.br / sedamrecursoshidricos@gmail.com",
    link: "/coreh"
  },
  {
    name: "Coordenadoria de Monitoramento e Licenciamento Ambiental - COLMAM",
    numberPhone: "(69) 3212-9611 / (69) 98482-8599",
    email: "colmam@sedam.ro.gov.br",
    link: "/colmam"
  },
  {
    name: "Coordenadoria de Tecnologia da Informação - CTI",
    numberPhone: "(69) 3212-9640",
    email: "cti@sedam.ro.gov.br",
    link: "/cti"
  },
  {
    name: "Coordenadoria de Proteção Ambiental - COPAM",
    numberPhone: "(69) 3212-9613 / (69) 98482-8708",
    email: "copam@sedam.ro.gov.br",
    link: "/copam"
  },
  {
    name: "Coordenadoria de Desenvolvimento Florestal - CODEF",
    numberPhone: "(69) 3212-9612 / (69) 99308-4770",
    email: "codef@sedam.ro.gov.br",
    link: "codef"
  },
  {
    name: "Coordenadoria de Unidades de Conservação - CUC",
    numberPhone: "(69) 3212-9616 / (69) 98482-8727",
    email: "cuc@sedam.ro.gov.br",
    link: "/cuc"
  },
  {
    name: "Coordenadoria de Recursos Humanos - CGRH",
    numberPhone: "(69) 3212-9630 / (69) 98482-8729",
    email: "cgrh@sedam.ro.gov.br",
    link: "/cgrh"
  },
  {
    name: "GOT (Grupo Operacional Transitório)",
    numberPhone: "(69) 3212-9618",
    email: "gotpdseai@gmail.com",
  },
  {
    name: "Diretoria de Governança Climática e Políticas Públicas - DGOVCLIMA",
    email: "govclima@sedam.ro.gov.br",
    link: "/dgovclima"
  },
  {
    name: "Coordenadoria de Planejamento e Orçamento - CPO",
    numberPhone: "(69) 3212-9625 / (69) 98482-8561",
    email: "cpo@sedam.ro.gov.br",
    link: "/cpo"
  },
];

export default contacts;
