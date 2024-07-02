import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";

export default function Produtos() {
  return (
    <FormContainer>
      <Header className="min-h-[auto]">
        <Header.Title>Produtos</Header.Title>
      </Header>
      <Separator className="mb-0 h-12 bg-sage-200" />
      <Header.Body>
        <div className="my-10">
          <h2 className="text-lg font-semibold lg:text-2xl">
            Plano Estadual de Resíduos Sólidos – PERS
          </h2>
          <ul className="ml-5 list-[disc]">
            <li className="font-semibold">
              Produto 1 – Projeto de divulgação social e mobilização
            </li>
            <ol className="ml-10 list-[number]">
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-1.1-Relatório-das-Oficinas-municípios-de-Vilhena-Ji-Paraná-e-Porto-Velho.pdf"
                >
                  Subproduto 1.1 – Oficinas de apresentação das proposições e
                  validação do Plano Estadual De Resíduos Sólidos realizadas nos
                  municípios de Ji-Paraná e Vilhena
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-1.2-Seminário-Estadual-de-Divulgação-do-PERS-compactado.pdf"
                >
                  Subproduto 1.2 – Seminário Estadual de divulgação do PERS
                  realizado no município de Porto Velho
                </Link>
              </li>
            </ol>

            <li className="font-semibold">
              Produto 2 – Estudo de regionalização e proposição de arranjos
              intermunicipais
            </li>
            <ol className="ml-10 list-[number]">
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-2.1_Áreas-para-destinação-de-resíduos.pdf"
                >
                  Subproduto 2.1 – Áreas potencialmente favoráveis para a
                  destinação ambientalmente adequada de resíduos sólidos
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-2.2-Critérios-de-agregação-de-municípios-para-a-identificação-dos-arranjos.pdf"
                >
                  Subproduto 2.2 – Critérios de agregação de municípios para a
                  identificação dos arranjos
                </Link>
              </li>
            </ol>

            <li className="font-semibold">
              Produto 3 – Estudos de prospecção e escolha do cenário de
              referência
            </li>
            <ol className="ml-10 list-[number]">
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-3.1-Prospecção-e-Cenário-de-Referência.pdf"
                >
                  Subproduto 3.1 – Elaboração dos estudos de prospecção,
                  programas, projetos e ações para a gestão dos resíduos sólidos
                </Link>
              </li>
            </ol>

            <li className="font-semibold">
              Produto 4 – Elaboração das diretrizes e estratégias para a
              implementação do PERS/RO e Documentos Consolidado
            </li>
            <ol className="ml-10 list-[number]">
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.1-Diretrizes-para-o-planejamento.pdf"
                >
                  Subproduto 4.1 – Diretrizes para o planejamento e demais
                  atividades de gestão de resíduos sólidos de regiões
                  metropolitanas, aglomerações urbanas e microrregiões
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.2_Proposição-de-Normas-e-Diretrizes-para-a-disposição.pdf"
                >
                  Subproduto 4.2 – Proposição de normas e diretrizes para a
                  disposição final ambientalmente adequada de rejeitos
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.3_Proposição-de-medidas-para-recuperação-de-áreas-degradadas.pdf"
                >
                  Subproduto 4.3 – Proposição de medidas a serem aplicadas em
                  áreas degradadas, objeto de recuperação em razão da disposição
                  inadequada de resíduos sólidos ou rejeitos
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.4_-Metas-para-a-Gestão-de-Resíduos-Sólidos.pdf"
                >
                  Subproduto 4.4 – Metas para a gestão dos resíduos sólidos
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.5-Programas-Projetos-e-Ações-para-a-gestão-dos-resíduos-sólidos_Rev.-Final_Comitê.pdf"
                >
                  Subproduto 4.5 – Programas, Projetos e Ações para a Gestão de
                  Resíduos Sólidos
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.6-Investimentos-necessários-e-fontes-de-financiamento.pdf"
                >
                  Subproduto 4.6 – Investimentos necessários e fontes do
                  financiamento
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.7-Sistemática-de-acompanhamento-e-controle_VFinal_Comitê.pdf"
                >
                  Subproduto 4.7 – Sistemática de acompanhamento, controle e
                  avaliação da implementação do PERS/RO
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.8_Produto-Consolidado-do-PERS-2.pdf"
                >
                  Subproduto 4.8 – Relatório Final do Plano Estadual de Resíduos
                  Sólidos de Rondônia
                </Link>
              </li>
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/PERS/Subproduto-4.11-Relatório-da-Participação-Pública-de-validação-do-PERS-em-Porto-Velho.pdf"
                >
                  Subproduto 4.11 – Participação pública no processo de
                  divulgação do Plano Estadual de Resíduos Sólidos de Rondônia,
                  realizado no município de Porto Velho
                </Link>
              </li>
            </ol>

            <li className="my-3 ml-10">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/"
              >
                Relatório Final{" "}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mt-10 text-lg font-semibold lg:text-2xl">
            Plano Estadual de Recursos Hídricos – PERH
          </h2>
          <ol className="ml-10 list-[number]">
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RESUMO-EXECUTIVO-1.pdf"
              >
                Resumo executivo
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-ETAPA-01.pdf
"
              >
                Relatório etapa 01 – Diagnóstico das Disponibilidades Hídricas
                no Estado de Rondônia e Diagnóstico das Demandas e
                Variabilidades Hídricas
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-ETAPA-02.pdf
"
              >
                Relatório etapa 02 – Diagnóstico da Dinâmica Social e dos
                Processos de Mobilização e Comunicação ; e Cenários Alternativos
                das Demandas Hídricas
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-ETAPA-03.pdf
"
              >
                Relatório etapa 03 -Participação Pública no Processo de
                Construção do Diagnóstico, Prognóstico e Cenários dos Recursos
                Hídricos de Rondônia
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-ETAPA-04.pdf
"
              >
                Relatório etapa 04 – Diretrizes, Programas e Metas Subproduto e
                Agregação das Ações e Intervenções Recomendadas
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-ETAPA-05.pdf
"
              >
                Relatório etapa 05 – Participação Pública no Processo de
                Construção das Diretrizes, Programas e Metas
              </Link>
            </li>
            <li className="my-2">
              <Link
                target="_blank"
                prefetch={false}
                className="link-hover link text-coffee-900"
                href="/ext-files/produtos-sedam/PERH/RELATORIO-FINAL.pdf"
              >
                Relatório final
              </Link>
            </li>
          </ol>
        </div>

        <div className="text-justify">
          <h2 className="mt-10 text-lg font-semibold lg:text-2xl">
            Programa Nacional de Monitoramento da Biodiversidade – Programa
            Monitora
          </h2>
          <p className="mt-4 indent-6">
            O Programa Monitora, formalizado em 2017, através da INSTRUÇÃO
            NORMATIVA Nº 3/2017, é fruto de um longo e complexo processo de
            construção. Iniciado em 2010, o processo envolveu centenas de
            instituições, incluindo pesquisadores, gestores de áreas protegidas,
            usuários e beneficiários das unidades de conservação, dentre outros.
            Trata-se de um programa institucional continuado, de longa duração,
            voltado ao monitoramento do estado da biodiversidade e serviços
            ecossistêmicos associados, como subsídio à avaliação da efetividade
            de conservação do sistema de unidades de conservação, à adaptação às
            mudanças climáticas e ao uso e manejo nas unidades de conservação
            geridas pelo Governo Federal e Estadual da federação, bem como às
            estratégias de conservação das espécies ameaçadas de extinção em
            todo o território nacional.
          </p>
          <p className="mt-4 indent-6">
            Tem entre seus pressupostos a adequação à desafiadora diversidade de
            contextos ambientais, socioeconômicos e de gestão das UCs nos vários
            biomas, com a maior simplicidade e articulação possível entre
            iniciativas e abordagens, a boa gestão de dados, a elaboração de
            produtos que informem os instrumentos de gestão em várias escalas e
            a participação social. Considerando os compromissos assumidos pelo
            Brasil junto à Convenção sobre Diversidade Biológica – CDB, e a
            Decisão X/2, da 10ª Conferência das Partes (COP-10) da CDB, que
            trata do Plano Estratégico de Biodiversidade 2011-2020 e das Metas
            de Aichi de Biodiversidade e a Resolução CONABIO nº 06, de 3 de
            setembro de 2013, que dispõe sobre as Metas Nacionais de
            Biodiversidade 2011-2020, especialmente as metas 11, 17 e 19; com
            esses pressupostos espera-se recepcionar as várias abordagens
            apresentadas na seção acima – descentralização e adequação local,
            resguardando-se a possibilidade de comparar sítios; qualidade
            científica com participação social e agilidade na elaboração de
            análises; elaboração de produtos para vários públicos e clientes e
            em todas as escalas espaciais e temporais.
          </p>
          <p className="mt-4">
            Conforme a instrução normativa nº 3 de 2017, são objetivos do
            Programa Monitora:
          </p>
          <ol className="ml-10 list-decimal">
            <li className="my-2">
              Gerar informação qualificada para apoio à gestão das unidades de
              conservação;
            </li>
            <li className="my-2">
              Estabelecer critérios ecológicos para avaliação da efetividade das
              UC’s federais;
            </li>
          </ol>
          <p className="mt-4">
            III. Fornecer subsídios para avaliação do estado de conservação da
            fauna e flora brasileiras e para implementação das estratégias de
            conservação de espécies ameaçadas de extinção e controle das
            exóticas invasoras;
          </p>
          <ol className="ml-10 list-decimal">
            <li className="my-2">
              Subsidiar, avaliar e acompanhar{" "}
              <span className="italic">“in situ”</span> projeções de alteração
              na distribuição e locais de ocorrência das espécies em resposta às
              mudanças climáticas e demais vetores de pressão e ameaça.
            </li>
          </ol>

          <p className="mt-4">
            De acordo com o instrumento legal que instituiu o Programa Monitora,
            este é desenvolvido através das seguintes diretrizes:
          </p>

          <ol className="ml-10 list-[upper-roman]">
            <li className="my-2">
              reorientação gradual das iniciativas de monitoramento da
              biodiversidade em operação no Instituto Chico Mendes, a partir de
              um referencial técnico e organizacional comum, com diretrizes e
              princípios claros, de modo a privilegiar a geração de informações
              para a gestão das unidades de conservação e a conservação da
              biodiversidade;
            </li>
            <li className="my-2">
              promoção ativa da articulação entre ações conduzidas nas unidades
              de conservação e aquelas promovidas pelos Centros Nacionais de
              Pesquisa e Conservação do ICMBio, visando complementaridade e
              apoio mútuo, de forma ordenada;
            </li>
            <li className="my-2">
              formulação, promoção e aprimoramento de programa continuado de
              capacitação e de apoio à formação dos diversos agentes envolvidos
              nas iniciativas institucionais de monitoramento da biodiversidade
              e nas análises dos resultados;
            </li>
            <li className="my-2">
              produção de informações acessíveis e adequadas para promover a
              participação dos agentes sociais locais e para qualificar os
              processos decisórios relacionados ao uso dos recursos naturais;
            </li>
            <li className="my-2">
              integração e acoplagem dos bancos de dados e de informações sobre
              a biodiversidade em plataformas regidas por políticas que
              favoreçam e estimulem o acesso livre e o intercâmbio
              informacional;
            </li>
            <li className="my-2">
              geração de subsídios técnicos que informem adequadamente aos
              processos gerenciais voltados à conservação da biodiversidade,
              dando suporte às decisões de manejo e à construção e
              aperfeiçoamento de instrumentos de gestão, tais como os acordos de
              gestão, planos de manejo, planos de ação para espécies ameaçadas,
              planos de negócios de cadeias produtivas, termos de compromisso,
              projetos de manejo, entre outros;
            </li>
            <li className="my-2">
              integração, quando pertinente, entre alvos, indicadores e/ou
              protocolos previstos em Planos de Ação Nacionais para Conservação
              de Espécies Ameaçadas de Extinção (PANs) e os programas de
              monitoramento da biodiversidade implantados nas UCs;
            </li>
            <li className="my-2">
              estímulo e reconhecimento da importância do monitoramento
              participativo nas várias etapas do Programa, tais como
              planejamento, coleta e análise de dados, interpretação de
              resultados e compartilhamento dos aprendizados; e
            </li>
            <li className="my-2">
              fortalecimento do protagonismo das comunidades locais na gestão e
              no uso sustentável dos recursos naturais, de forma integrada à
              gestão das UCs.
            </li>
          </ol>

          <div className="mt-6">
            <p className="indent-6">
              O Estado de Rondônia através da Secretaria de Estado do
              Desenvolvimento Ambiental – Sedam, por meio da Coordenadoria de
              Unidades de Conservação – CUC, possui hoje sob a sua
              responsabilidade institucional, a gestão de 38 (trinta e oito)
              Unidades de Conservação, que representam em termos de área
              aproximadamente 18% da área superficial do Estado de Rondônia.
              Destas trinta e oito, oito são atendidas e subsidiadas pelo
              Programa de Áreas Protegidas da Amazônia – Programa ARPA. Este
              possui como um dos seus componentes o “Monitoramento Ambiental”
              (componente 4.4) com vistas a apoiar a estruturação e a
              coordenação da implantação do Programa Monitora, que, por sua vez,
              está inserido no Marco Referencial “Monitoramento da
              Biodiversidade” das UCs.
            </p>
            <p className="mt-4 indent-6">
              O Programa Monitora foi implantado em Rondônia no ano de 2017, a
              partir do Curso de capacitação nos Alvos Globais– Subprograma
              Terrestre – Componente Florestal -Módulo Básico, ministrado por
              consultores do ICMBio e realizado na sede do Parque Estadual
              Corumbiara – RO. Após o curso de capacitação, iniciaram-se as
              atividades de implantação das Estações Amostrais (áreas de
              amostragem) nas oito unidades de conservação estaduais atendidas
              pelo programa ARPA, sendo estas, Resex Rio Cautário, Resex Rio
              Preto Jacundá, Resex Rio Pacaás Novos, ESEC de Samuel, ESEC Serra
              dos Três Irmãos, Parque Estadual Serra dos Reis, Parque Estadual
              Guajará-Mirim e Parque Estadual Corumbiara.
            </p>
          </div>

          <div>
            <h3 className="mt-3 text-xl font-semibold lg:text-xl">
              Unidades dentro do Programa Monitora
            </h3>
            <ol className="ml-10 list-decimal">
              <li className="my-2">Resex Rio Cautário</li>
              <li className="my-2">Resex Rio Pacaás Novos</li>
              <li className="my-2">Resex Rio Preto Jacundá</li>
              <li className="my-2">Esec Samuel</li>
              <li className="my-2">Esec Serra dos Três Irmãos</li>
              <li className="my-2">Parque Guajará</li>
              <li className="my-2">Parque Serra dos Reis</li>
              <li className="my-2">Corumbiara</li>
            </ol>
          </div>

          <div className="mt-3">
            <h3 className="text-xl font-semibold lg:text-xl">Pesquisa</h3>
            <ol className="ml-10 list-decimal">
              <li className="my-2">
                <Link
                  target="_blank"
                  prefetch={false}
                  className="link-hover link text-coffee-900"
                  href="/ext-files/produtos-sedam/Monitora/Relatório-Geral-do-Monitoramento-da-Biodiversidade-VERSÃO-06.08.2020.pdf"
                >
                  Relatório Geral do Monitoramento de Biodiversidade ano 2019 –
                  Versão prévia
                </Link>
              </li>
            </ol>
          </div>
        </div>

        <h2 className="mt-10 text-lg font-semibold lg:text-2xl">
          Materiais de Educação Ambiental
        </h2>
        <ol className="ml-10 list-[number] ">
          <li className="my-2">
            <Link
              target="_blank"
              prefetch={false}
              className="link-hover link text-coffee-900"
              href="/ext-files/produtos-sedam/Livro/Qual-a-cor-do-Rio_nov22.pdf"
            >
              Livro – Qual a cor do Rio?
            </Link>
          </li>
        </ol>
        <h2 className="mt-10 text-lg font-semibold lg:text-2xl">
          Diretrizes – Áreas contaminadas por lixões em Rondônia
        </h2>
        <ol className="ml-10 list-[number]">
          <li className="my-2">
            <Link
              target="_blank"
              prefetch={false}
              className="link-hover link text-coffee-900"
              href="/ext-files/produtos-sedam/NotaTecnica/Nota_Tecnica_Lixoes_.pdf
"
            >
              Nota Técnica Lixões
            </Link>
          </li>
        </ol>
      </Header.Body>
    </FormContainer>
  );
}
