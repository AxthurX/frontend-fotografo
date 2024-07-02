interface IDiretores {
  imageUrl: string;
  name: string;
  sector: string;
  pageUrl?: string;
  sectorAcronym?: string;
  role?: string;
}

const diretores: Array<IDiretores> = [
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/MarcoAntonio.jpeg",
    name: "Marco Antonio Ribeiro de Menezes Lagos",
    sector: "Secretário de Estado do Desenvolvimento Ambiental",
    pageUrl: "/gabinete",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Gilmar.jpeg",
    name: "Gilmar Oliveira de Souza",
    pageUrl: "/gabinete",
    sector: "Secretário-adjunto",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Hueriqui.jpeg",
    name: "Hueriqui Charles Lopes Pereira",
    pageUrl: "/gabinete",
    sector: "Secretário Executivo",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Diretora.jpeg",
    name: "Ana Gabriela Rover Freitas da Cunha",
    pageUrl: "/gabinete",
    sector: "Diretora Executiva",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/ChefeDeGabinete.jpeg",
    name: "Valdiney de Araújo Campos",
    pageUrl: "/gabinete",
    sector: "Chefe de Gabinete",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Renata.jpeg",
    name: "Renata dos Santos Luz Coutinho",
    sector: "Coordenadoria de Tecnologia da Informação",
    pageUrl: "/cti",
    sectorAcronym: "cti",
    role: "Coordenadora de Tecnologia da Informação",
  },
  {
    imageUrl: "",
    name: "Letícia Pereira de Andrade",
    sector: "Diretoria de Governança Climática",
    sectorAcronym: "dgovclima",
    pageUrl: "/dgovclima",
    role: "Diretora de Governança Climática",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Suelen.jpg",
    name: "Suélen Grego da Silva",
    sector: "Coordenadoria de Descentralização Ambiental",
    role: "Coordenadora de Descentralização Ambiental",
    pageUrl: "/codea",
    sectorAcronym: "codea",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Maria.jpeg",
    name: "Maria Lucia dos Santos Pereira",
    sector: "Coordenadoria de Controle Interno",
    role: "Coordenadora de Controle Interno",
    pageUrl: "/cci",
    sectorAcronym: "cci",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Marco.jpeg",
    name: "Marco Antônio Garcia De Souza",
    sector: "Coordenadoria de Patrimônio, Administração e Finanças",
    role: "Coordenador de Patrimônio, Administração e Finanças",
    pageUrl: "/copaf",
    sectorAcronym: "copaf",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/valmircopin.jpeg",
    name: "Waldemir Barabadá Coiryn",
    sector: "Coordenadoria de Povos Indígenas",
    role: "Coordenador de Povos Indígenas",
    pageUrl: "/copin",
    sectorAcronym: "copin",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/florentinoascom.jpeg",
    name: "Adenilson Florentino da Silva",
    sector: "Assessoria de Comunicação",
    role: "Chefe de Comunicação",
    pageUrl: "/ascom",
    sectorAcronym: "ascom",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/GeovaniMarxRosa.jpeg",
    name: "Geovani Marx Rosa",
    sector: "Coordenadoria de Monitoramento e Regularização Ambiental Rural",
    role: "Coordenador de Monitoramento e Regularização Ambiental Rural",
    pageUrl: "/comrar",
    sectorAcronym: "comrar",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/trindade.jpg",
    name: "Marcos De Souza Trindade",
    sector: "Coordenadoria de Proteção Ambiental",
    role: "Coordenador de Proteção Ambiental",
    pageUrl: "/copam",
    sectorAcronym: "copam",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Dany.jpg",
    name: "Daniely da Cunha Oliveira Sant’Anna",
    sector: "Coordenadoria de Recursos Hídricos",
    role: "Coordenadora de Recursos Hídricos",
    pageUrl: "/coreh",
    sectorAcronym: "coreh",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Diego.jpeg",
    name: "Diego Enrique Gonçalves Monteiro",
    sector: "Coordenadoria de Desenvolvimento Florestal",
    role: "Coordenador de Desenvolvimento Florestal",
    pageUrl: "/codef",
    sectorAcronym: "codef",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/Guilherme.jpeg",
    name: "Guilherme Vilela",
    sector: "Coordenadoria de Geociências",
    role: "Coordenador de Geociências",
    pageUrl: "/cogeo",
    sectorAcronym: "cogeo",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Rodrigo.jpeg",
    name: "Rodrigo Queiroz Papafanurakis",
    sector: "Coordenadoria de Licenciamento e Monitoramento Ambiental",
    role: "Coordenador de Licenciamento e Monitoramento Ambiental",
    pageUrl: "/colmam",
    sectorAcronym: "colmam",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Deigna.jpeg",
    name: "Deigna Laís Oliviak",
    sector: "Coordenadoria de Educação Ambiental",
    role: "Coordenadora de Educação Ambiental",
    pageUrl: "/ceam",
    sectorAcronym: "ceam",
  },
  {
    imageUrl:
      "/ext-files/website-icons/coordenadorias/diretores/AriValdir.jpeg",
    name: "Ari Valdir Lebkuchen Júnior",
    sector: "Coordenadoria de Floresta Plantada",
    role: "Coordenador de Floresta Plantada",
    pageUrl: "/cfp",
    sectorAcronym: "cfp",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Daniel.jpeg",
    name: "Daniel Santos de Souza",
    role: "Coordenador de Unidades de Conservação",
    sector: "Coordenadoria de Unidades de Conservação",
    pageUrl: "/cuc",
    sectorAcronym: "cuc",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Cleiton.jpeg",
    name: "Cleiton da Silva Amorim",
    role: "Coordenador de Planejamento e Orçamento",
    sector: "Coordenadoria de Planejamento e Orçamento",
    pageUrl: "/cpo",
    sectorAcronym: "cpo",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/janayna.jpeg",
    name: "Janayna Pupp",
    role: "Coordenador de Recursos Humanos",
    sector: "Coordenadoria de Recursos Humanos",
    pageUrl: "/cgrh",
    sectorAcronym: "cgrh",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/jeovane.jpeg",
    name: "Jeovane Souza Aguiar",
    role: "Coordenador de Autos de Infração",
    sector: "Coordenadoria de Autos de Infração",
    pageUrl: "/coai",
    sectorAcronym: "coai",
  },
  {
    imageUrl: "/ext-files/website-icons/coordenadorias/diretores/Tatiana.jpeg",
    name: "Tatiana Ribeiro de Matos",
    sector: "Ouvidoria",
    pageUrl: "/ouvidoria",
    sectorAcronym: "ouvidoria",
  },
];

export default diretores;
