interface IRenderInfo {
    file: string;
    optional: boolean;
}
interface IDataSelectFiles {
    value: string;
    renderInfo: IRenderInfo[];
}
const dataSelectFiles: IDataSelectFiles[] = [
    {
        value: "Ajuste administrativo",
        renderInfo: [
            { file: "justification", optional: false },
            { file: "report", optional: true },
            { file: "photographic_register", optional: false },
            { file: "spread_sheet", optional: false }
        ]
    },
    {
        value: "Cancelamento de DOF",
        renderInfo: [
            { file: "justification", optional: false },
            { file: "dof_file", optional: false },
            { file: "invoice", optional: true },
            { file: "photographic_register", optional: false },
            { file: "inform_products", optional: true }
        ]
    },
    {
        value: "Homologação de AUTEX",
        renderInfo: []
    },
    {
        value: "Homologação de pátio",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "operating_license", optional: false },
            { file: "art", optional: true }
        ]
    },
    {
        value: "Liberação de oferta",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "seller_operating_license", optional: false },
            { file: "buyer_operating_license", optional: false },
            { file: "justification", optional: false },
            { file: "transport_viability", optional: false },
            { file: "access_route", optional: false },
            { file: "offer", optional: false },
            { file: "photographic_register", optional: false },
            { file: "cpf_rg", optional: false }
        ]
    },
    {
        value: "Liberação/desbloqueio de pátio",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "operating_license", optional: false },
            { file: "regularity_the_activity", optional: false }
        ]
    },
    {
        value: "Liberação de veículo",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "vehicle_registration_licensing", optional: false },
            { file: "federal_technical_registers", optional: false },
            { file: "cpf_rg", optional: false },
            { file: "cnpj", optional: true },
            { file: "release_document_of_vehicle", optional: false }
        ]
    },
    {
        value: "Cancelamento de veículo",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "vehicle_registration_licensing", optional: false },
            { file: "cpf_rg", optional: false }
        ]
    },
    {
        value: "Prorrogação de DOF",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "dof_file", optional: false },
            { file: "justification", optional: false },
            { file: "photographic_register", optional: false },
            { file: "spread_sheet", optional: false }
        ]
    },
    {
        value: "Suspensão de DOF",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "dof_file", optional: false },
            { file: "justification", optional: false },
            { file: "photographic_register", optional: false },
            { file: "spread_sheet", optional: false }
        ]
    },
    {
        value: "Reativação de DOF",
        renderInfo: [
            { file: "requirement", optional: false },
            { file: "dof_file", optional: false },
            { file: "justification", optional: false },
            { file: "photographic_register", optional: false },
            { file: "spread_sheet", optional: false }
        ]
    },
];
export default dataSelectFiles;