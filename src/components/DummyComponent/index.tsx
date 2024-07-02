import BackButton from "../BackButton";
import FormContainer from "../FormStructure/FormContainer";

export default function DummyComponents() {
  const formatCreatedAt = {
    year: "numeric" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };
  //Este componente existe para comportar os estilos de certos elementos do conteudo dos posts
  return (
    <>
      <details className="bg-lime-800 p-2">
        <summary className="text-calpolygreen-50">Este e o sumario </summary>
        <p className="m-1 -ml-1 -mr-1  rounded-sm bg-white p-2">
          aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa
        </p>
      </details>
      <div className="clear-both my-3 border-l-4 border-l-secondary pl-3 max-[1110px]:w-[calc(100%-2rem)]">
        <p className="font-extrabold">Fonte</p>
        <p>
          <span className="font-semibold">Texto: </span>Nome do Autor
        </p>
        <p>
          <span className="font-semibold">Foto: </span>
          Fotos
        </p>
        <p>Secom - Governo de Rondônia</p>
      </div>
      <details className="border-[2px] border-green-950 border-opacity-40" open>
        <summary className="mb-[1px] bg-[rgba(63,98,18,0.8)] p-[10px] text-start text-slate-100">
          Titulo
        </summary>
        <div className="grid grid-cols-3 gap-1 md:mb-3">
          <div className="overflow-wrap m-2 break-words  rounded-sm bg-[rgba(63,98,18,0.8)]  p-3 text-white hover:cursor-pointer"></div>
        </div>
      </details>
      <details className="border-[2px] border-green-950 border-opacity-40" open>
        <summary className="mb-[1px] bg-[rgba(63,98,18,0.8)] p-[10px] text-start text-slate-100">
          Titulo
        </summary>
        <p className="ml-[5px] max-md:mb-3 md:ml-3 md:mr-3 md:p-4 md:pl-0 md:pr-0">
          <div className="float-right mb-3 ml-3 mr-3 mt-1 flex w-1/3 items-center justify-between pl-3 pr-3 pt-3 text-blue-800 max-md:py-3"></div>
        </p>
      </details>
      <div className="blog-btn float-left w-2/5 border-b-0 bg-calpolygreen-800 p-3 md:w-2/5">
        1
      </div>
      <div className="w-full bg-calpolygreen-800 p-6">2</div>
      <div className="btn w-full bg-calpolygreen-800 p-12 text-center text-2xl text-white ">
        2
      </div>
      <div className="flex w-full items-center  justify-center rounded-md bg-calpolygreen-800 p-12 text-center text-2xl text-white transition-colors duration-300 ease-in-out hover:bg-opacity-65">
        3
      </div>
      <FormContainer className="relative flex grow flex-col">
        <BackButton className="lg:top-5" />
        <div className="flex grow flex-col items-center justify-center">
          <>
            <section className="-mt-[1px] flex min-h-[112px] w-full flex-col items-center justify-center bg-calpolygreen-900 px-4 py-4 text-beige-50 lg:pl-24 xl:pl-0">
              <h1 className="max-w-[1110px] text-xl font-bold lg:text-4xl">
                dummy title
              </h1>
            </section>
            <section className="flex w-full grow flex-col">
              <div className="border-b border-sage-200">
                <div className="mx-auto max-w-[1110px]">
                  <h2 className="p-2 text-2xl text-coffee-900">
                    {new Date()
                      .toLocaleDateString("pt-BR", formatCreatedAt)
                      .replace(",", ", às") + "h."}
                  </h2>
                </div>
              </div>
              <div
                className="mx-auto mb-8 max-w-[1110px] hyphens-auto max-[1110px]:mx-4 md:w-2/5"
                lang="pt-BR"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id
                sem non ante pretium dictum a id ligula. Fusce posuere magna vel
                venenatis accumsan. Sed et eros dignissim, tincidunt mauris nec,
                porta mauris. Quisque malesuada suscipit aliquam. Pellentesque
                mattis eros a tortor fermentum suscipit. Etiam vel hendrerit
                libero, ac accumsan arcu. Etiam id luctus neque, vitae convallis
                massa. Etiam vel mi nec eros blandit ultricies. Morbi et
                pharetra massa, in ultricies mauris. Donec eget ornare metus, et
                rutrum nisl. Nullam eget est ut sapien vehicula molestie vitae
                et tortor. Curabitur accumsan mattis ligula, eu iaculis lectus
                cursus non. Ut sit amet posuere mauris, nec faucibus eros. Sed
                posuere orci condimentum, finibus ex nec, imperdiet elit.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Cras congue enim vitae sem mollis
                feugiat. Nam at odio pretium, lacinia sapien at, malesuada quam.
                Nullam ornare arcu quis erat suscipit varius. Quisque id rhoncus
                velit, quis hendrerit magna. Pellentesque vitae erat quis augue
                feugiat vulputate. Quisque ut sem viverra, imperdiet nulla
                vitae, maximus quam. Praesent quam nibh, interdum vel eros ut,
                laoreet porttitor dolor. Integer accumsan dui vitae venenatis
                fringilla. Maecenas pellentesque lorem eget nisl dapibus, at
                mollis felis fringilla. Sed fermentum enim vel commodo feugiat.
                Curabitur leo nisi, tristique eget convallis ac, mollis ut nisi.
                Phasellus efficitur tellus varius, tempor quam id, mattis
                tellus. Maecenas elementum, risus vitae volutpat venenatis,
                dolor ex ornare sem, a imperdiet ligula tortor eget nulla.
                <figure className="relative float-right my-3 ml-3 aspect-auto h-auto w-full bg-gray-600">
                  <figcaption className="break-words border border-l-8 border-t-0 border-coffee-300 border-l-secondary bg-coffee-300 bg-opacity-20 p-3 text-lg">
                    Textão textão textão textão textão textão textão textão
                    textão textão textão textão textão textão textão textão
                    textão textão textão textão textão textão textão
                  </figcaption>
                </figure>
                <p className="mb-3 text-center text-coffee-500">
                  Esta publicação foi transferida de uma página anterior. O
                  conteúdo pode apresentar pequenas inconsistências visuais.
                </p>
                Nunc non mauris vel odio tempor eleifend. Praesent scelerisque
                maximus purus, vel tristique libero accumsan nec. Sed tempus
                lectus sit amet iaculis sagittis. Donec condimentum odio eget
                mauris sagittis congue. Nullam congue fringilla augue eget
                posuere. Donec viverra felis quis diam laoreet, eget commodo
                lorem elementum. Integer sed varius lacus, vel molestie ex.
                Nullam nec vehicula leo, vulputate egestas nisi. Praesent
                porttitor facilisis odio, et sodales leo molestie sit amet.
                Etiam pharetra purus nisi. Mauris congue turpis risus, a porta
                nunc pellentesque vel. Aliquam cursus vel leo quis faucibus.
                Suspendisse arcu leo, semper a nibh non, gravida fringilla sem.
                Aliquam ultricies pharetra mi quis fermentum. Nam molestie
                aliquam orci, at laoreet diam. Nunc magna eros, sagittis eu
                commodo ultricies, tincidunt eget neque. Fusce ultricies
                faucibus dignissim. Donec a velit orci. In porta velit risus, ut
                tempor felis bibendum vel. Proin dui purus, lacinia eget justo
                in, luctus vehicula enim. Vestibulum consequat et elit et
                varius. In hac habitasse platea dictumst. Donec in ligula non
                eros consequat consectetur. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Phasellus nisi tortor, sagittis nec pretium nec,
                pellentesque quis purus. Vestibulum pulvinar dolor eu dui
                tincidunt ultricies. Vivamus maximus, eros vel tincidunt
                ultrices, mi mi blandit tortor, ut molestie ante nulla nec
                turpis. Nullam nec dui id odio tempus commodo sed sed ligula.
                Curabitur hendrerit commodo arcu, nec condimentum nibh efficitur
                ac. Vestibulum euismod purus in augue interdum fringilla. Mauris
                metus risus, facilisis et nibh sit amet, imperdiet dapibus orci.
                Nulla facilisi. Cras aliquam, dolor ac varius tincidunt, ante
                nisi gravida massa, sit amet facilisis lacus orci quis risus.
                Praesent nec enim vel tortor ultrices blandit. Duis a
                condimentum justo. Duis fermentum fringilla mi at viverra.
                Pellentesque volutpat leo sapien, quis hendrerit justo iaculis
                nec. Suspendisse sed risus eu lacus elementum vulputate
                hendrerit id erat. Integer bibendum tortor vitae ipsum luctus,
                sed faucibus nibh finibus. Quisque egestas arcu vel pellentesque
                maximus. Etiam mollis bibendum blandit. Fusce vel tortor ac
                lorem auctor luctus. Cras vel aliquet odio, sit amet imperdiet
                justo. Pellentesque porttitor nunc sit amet diam blandit
                convallis sed ac eros. Vestibulum vestibulum rutrum sodales.
                Fusce id est non est eleifend accumsan at eget nulla. Aliquam
                volutpat, purus non interdum lobortis, diam sapien euismod
                ligula, et pretium orci turpis sit amet eros. Donec ornare
                elementum metus quis tincidunt. Integer facilisis suscipit
                risus, nec vehicula nulla aliquam id. Ut pretium a lacus a
                facilisis. Nullam consectetur, nisl nec iaculis gravida, libero
                urna congue elit, ac auctor turpis enim in urna. Cras vehicula
                ac sapien ut molestie. Suspendisse potenti. Mauris imperdiet
                nisi quis vulputate vulputate. Sed nec semper turpis. Quisque ac
                aliquam diam. Cras facilisis enim urna, at fermentum odio
                porttitor in. Donec justo nibh, vehicula at ullamcorper non,
                placerat ut mauris. Quisque turpis magna, fermentum et justo
                non, interdum pharetra neque. Sed et egestas tellus. Morbi sit
                amet fringilla velit. Nam aliquam nisi ligula, nec semper lacus
                pulvinar porta. Integer blandit, augue in viverra vulputate,
                mauris quam lacinia nulla, ac porta risus risus vitae velit.
                Phasellus tempus pellentesque purus eu fringilla. Ut eleifend
                ornare tellus nec maximus. Donec augue est, venenatis quis nunc
                sed, pellentesque fringilla ligula. Donec viverra eu est non
                malesuada. In interdum dictum ante, eu mattis metus. Etiam
                congue tempor rhoncus. Nulla sed egestas ex. Mauris sem orci,
                varius nec vestibulum vitae, iaculis id erat. Etiam elementum
                leo sed justo hendrerit molestie. Etiam vehicula aliquam
                bibendum. Vivamus faucibus leo eros, quis posuere felis congue
                non. Sed mi orci, faucibus eu massa at, maximus ullamcorper
                orci. Morbi eu lectus arcu. Sed sed lorem in tortor tincidunt
                posuere at id orci. Nulla facilisi. Duis tincidunt auctor sapien
                quis condimentum. Sed quis nisi maximus, convallis neque vel,
                interdum enim. Maecenas interdum leo a mauris tempus hendrerit.
                Proin luctus quis arcu eu volutpat. Aenean condimentum volutpat
                molestie. Ut ut suscipit justo. Quisque feugiat nulla quis diam
                luctus, sit amet euismod neque interdum. Integer dolor justo,
                accumsan sed porttitor nec, hendrerit ac purus. Suspendisse
                vestibulum suscipit nisi, eu tempus sem egestas vel. Phasellus
                commodo augue mi, vitae lobortis justo ultrices eu. Vestibulum
                blandit, nunc quis blandit sollicitudin, ipsum libero vestibulum
                enim, non vulputate ex dui eget nisi. Pellentesque ac nunc
                mauris. Vivamus placerat ullamcorper fermentum. Etiam
                ullamcorper lobortis lacus, lacinia viverra eros luctus sit
                amet. Duis turpis mauris, ornare maximus urna quis, pellentesque
                tincidunt lectus. Nullam sed scelerisque magna, ut iaculis
                mauris. Duis in augue vitae nisi euismod fermentum. Sed
                pellentesque ipsum nisi, id pulvinar risus feugiat non. Etiam
                efficitur tincidunt urna sed sollicitudin. Pellentesque dapibus
                porta condimentum. Integer semper magna sit amet nisl sagittis
                consectetur. Ut fermentum congue enim, eu lobortis justo commodo
                ac. Phasellus at consequat justo. Phasellus nisi arcu, lacinia
                bibendum vulputate et, feugiat sit amet velit. Curabitur vitae
                diam nunc. Nunc ultrices porttitor odio, quis feugiat nisl.
                Integer finibus velit dui, eget eleifend diam imperdiet et.
                Etiam dapibus erat leo, ut semper dui dapibus eu. Etiam nisl
                velit, gravida eu purus et, cursus bibendum tellus. Etiam congue
                dui aliquam dolor congue, non auctor odio lobortis. Phasellus
                non viverra ante. Cras sed arcu nunc. Curabitur vitae lectus
                malesuada, placerat odio non, porttitor mauris. Duis sed
                dignissim magna, nec ullamcorper felis. Nullam dolor sem,
                interdum id accumsan at, fermentum non ex. Donec finibus
                tristique placerat. Mauris vitae sapien finibus diam elementum
                hendrerit. Mauris egestas id odio sed accumsan. Quisque
                pellentesque nibh ac accumsan auctor.
                <blockquote className="mt-8">
                  Texto: 21
                  <br />
                  Fotos: Savage
                </blockquote>
              </div>
            </section>
            <section className="-mb-[1px] w-full bg-calpolygreen-900 py-4 text-lg font-semibold text-beige-50 lg:px-36">
              Tags:{" "}
              <span className="font-normal text-beige-50 underline">
                dummy tags
              </span>
            </section>
          </>
        </div>
      </FormContainer>
    </>
  );
}
