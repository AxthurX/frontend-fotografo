const MUNICIPIOS = [
  "Guajara Mirim",
  "Ji-Paraná",
  "Rolim de Moura",
  "Cacoal",
  "Pimenta Bueno",
  "Vilhena",
  "Alto Alegres dos Parecis",
  "Ariquemes",
  "Machadinho do Oeste",
  "Vale do Anari",
  "Urupá",
  "Theobroma",
  "Monte Negro",
  "Jaru",
  "Compo Novo de Rondônia",
  "Buritis",
  "Alvorada do Oeste",
  "Alto Alegre dos Parecis",
  "Nova Mamore",
  "Nova Brasilândia do Oeste",
];

const ConsultaBox: React.FC = () => {
  return (
    <div className="my-4 rounded-md bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">
        Consulta Processual SISDAM / CODEA
      </h1>
      <div className="flex flex-col">
        <label
          htmlFor="municipioDropdown"
          className="mb-2 text-sm font-semibold"
        >
          Selecione o Município:
        </label>
        <select
          id="municipioDropdown"
          className="rounded-md border border-gray-300 p-2"
        >
          <option value="">Escolha um município</option>
          {MUNICIPIOS.map((municipio) => (
            <option key={municipio} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
      </div>
      {/* Adicione aqui a lógica para exibir os resultados da consulta */}
    </div>
  );
};

export default ConsultaBox;
