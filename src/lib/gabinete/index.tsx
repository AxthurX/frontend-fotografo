interface ISecretarios {
  url?: string;
  alt?: string;
  title: string;
  description: string;
  acronyimID?: string;
  cargo?: string;
  link?: string;
}

const secretarios: Array<ISecretarios> = [
  {
    url: "/ext-files/website-icons/coordenadorias/diretores/MarcoAntonio.jpeg",
    alt: "Foto do Secretário de Estado do Desenvolvimento Ambiental, Marco Antonio Ribeiro de Menezes Lagos",
    title: "Secretário de Estado do Desenvolvimento Ambiental",
    description: "Marco Antonio Ribeiro de Menezes Lagos",
  },
  {
    url: "/ext-files/website-icons/coordenadorias/diretores/Gilmar.jpeg",
    alt: "Foto do Secretário-adjunto, Gilmar Oliveira de Souza",
    title: "Secretário-adjunto",
    description: "Gilmar Oliveira de Souza",
  },
  {
    url: "/ext-files/website-icons/coordenadorias/diretores/Hueriqui.jpeg",
    alt: "Foto do Secretário Executivo, Hueriqui Charles Lopes Pereira",
    title: "Secretário Executivo",
    description: "Hueriqui Charles Lopes Pereira",
  },
];
export const diretoriaExecutiva: Array<ISecretarios> = [
  {
    url: "/ext-files/website-icons/coordenadorias/diretores/Diretora.jpeg",
    description: "Ana Gabriela Rover Freitas da Cunha",
    alt:"Foto do Diretor Executivo, Ana Gabriela Rover Freitas da Cunha",
    title: "Diretora Executiva",
  },
  
];

export default secretarios;
