import { ICombinedApplicant, ICombinedTechnician, IGeographicCoordinates } from "../combinedInterfaces";

interface IOtherActivity {
    active: "Sim" | "Não"
    activity_description?: string;
}



export interface IUsePurposeArray {
    select_animal: string,
    breed: string,
    number_heads: number,
    per_capita_consumption: number,
    total_consumption: string

}

interface IWateringData {
    dehydration_occur: string,
    drainage_name?: string,
    hydrographic_basin?: string,
    hydrographic_sub_basin?: string,
    coordinates: IGeographicCoordinates,
    dimension_excavated_tank?: IDimensionExcavatedTank
}

interface IAmazonWell {
    depth_well: number,
    aquifer_exploited: string,
    lithological_description: string,
    static_level: number,
    dynamic_level: number,
}

interface IPickupPoint {
    number_capture_point: number,
    coordinates: IGeographicCoordinates,
    land_quota: string,
    water_course: string,
    hydrographic_basin: string,
    hydrographic_sub_basin: string,
    water_body_flow: number,
    capture_system: string,
    adduction_type: string,
    funding_source: string,
    amazon_well: IAmazonWell,
    interference_type: string
    occurrence_point: string //Antigo funding_source_optional
}



interface IDomesticUse {
    active: "Sim" | "Não",
    number_peoples: number,
    per_capita_consumption: number,
    total_consumption_domestic: string,
}

interface IDimensionExcavatedTank {
    dehydration_occur_optional?: string,
    total_water_blade?: number;
    medium_depth?: number;
    estimated_volume?: number;
}

interface IIrrigationData {
    active: "Sim" | "Não",
    irrigated_crop: string,
    irrigation_method: string,
    irrigated_area_size: string,
    number_specimens: number,
    spacing_per_plant: number,
    total_cultivar_comsuption: string,
}

interface IPiscicultureData {
    type_area_culture: string,
    other_type?: string,
    cultivated_species: string,
    water_mirror_area: number,
    medium_depth: number,
    total_volume_stored: number,
    rate_daily_water_renewal: number,
    daily_volume_required_renewal: number,
    number_days_water_renewal: number,
    yearly_volume_required_renewal: number,
}

interface IPisciculture {

    active: "Sim" | "Não",

    //Dados do piscicultura
    pisciculture_data: IPiscicultureData,

    //Dados de captação e lançamento para manutenção de tanques
    capture_tank_maintenance: ICaptureTankMaintenance,
    launch_tank_maintenance: ILaunchTankMaintenance,
}

interface IPropertyData {
    idaron_number: string,
    car_record: string,
    coordinates: IGeographicCoordinates;
}

interface ICaptureForAllUses {
    daily_collection_flow: number,
    capture_time_hours_per_day: number,
    period_use_days_per_month: number,
    period_use_month_per_year: number,
    capture_time_hours_per_month: number,
    maximum_capture_flow: number,
    total_flow_per_month: number,
    total_flow_per_year: number,
}

interface ICaptureTankMaintenance {
    daily_collection_flow: number,
    capture_time_hours_per_day: number,
    period_use_days_per_month: number,
    period_use_month_per_year: number,
    capture_time_hours_per_month: number,
    maximum_capture_flow: number,
    total_flow_per_month: number,
    total_flow_per_year: number,
}

interface ICaptureTankMaintenance {
    daily_collection_flow: number,
    capture_time_hours_per_day: number,
    period_use_days_per_month: number,
    period_use_month_per_year: number,
    capture_time_hours_per_month: number,
    maximum_capture_flow: number,
    total_flow_per_month: number,
    total_flow_per_year: number,
}

interface ILaunchTankMaintenance {
    daily_launch_flow: number,
    launch_time_hours_per_day: number,
    period_use_days_per_month: number,
    period_use_month_per_year: number,
    launch_time_hours_per_month: number,
    maximum_launch_flow: number,
    total_launch_per_month: number,
    total_launch_per_year: number,
}

interface IAnimalData {
    active: "Sim" | "Não",
    use_purpose?: IUsePurposeArray[],
    pasture_data: {
        pasture_which_months?: string[],
        pasture_irrigation?: string,
    }
    watering_data: IWateringData,
}


export interface IOutorgaSchema {

    //Requerente
    applicant: ICombinedApplicant,

    //Técnico
    technician: ICombinedTechnician,

    //Informações do imóvel
    property_data: IPropertyData,

    //Ponto de captação
    pickup_point: IPickupPoint,

    //Outras atividades
    other_activity: IOtherActivity,

    //Criação Animal
    animal_data: IAnimalData,

    //Consumo Humano
    domestic_use: IDomesticUse,

    //Irrigação
    irrigation_data: IIrrigationData,

    //Dados de piscicultura
    pisciculture: IPisciculture,

    //Dados de captação para todos os usos e enchimentos de tanques
    capture_for_all_uses: ICaptureForAllUses,

    //Outros
    process_formalized: {
        radio_process_in_sedam: string,
        process_in_sedam_protocol?: string,
        checkbox_closing_process?: boolean,
    }

    embargoed_area: string

}
