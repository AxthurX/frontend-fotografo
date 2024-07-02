export const AsfCheckboxLabel = () => {
  return (
    <div className="col-span-12 md:col-span-24">
      <span className="flex flex-col">
        <p>
          De acordo com a Lei n°5.594 de 11/08/2023, declaro estar ciente de que a atividade de
          Pavimentação Asfáltica “Construção e/ou Pavimentação” é de interesse público, voltada a
          qualidade e segurança das vias e rodovias quando a área se enquadra nos seguintes termos:
        </p>
        <br />
        <ul className="list-inside [&>li]:ml-5">
          <li>a) Não necessidade de supressão de vegetação.</li>
          <li>b) Não pode intervir em áreas de preservação permanente.</li>
          <li>c) Não pode ter intervenções em corpos hídricos.</li>
          <li>d) Não pode interferir em unidades de conservação.</li>
          <li>e) Não pode ocorrer em terras indígenas.</li>
        </ul>
        <br />
      </span>
    </div>
  );
};