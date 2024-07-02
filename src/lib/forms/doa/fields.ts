import {
  IField,
  applicantFieldsArray,
  technicianFieldsArray,
} from "@/lib/forms/fields";
import {
  CAR_RECORD_LABEL,
  DOA_ADDUCTION_TYPE_LABEL,
  DOA_AVERAGE_DEPTH_LABEL,
  DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_DAY_LABEL,
  DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_MONTH_LABEL,
  DOA_CAPTURE_DAILY_COLLECTION_FLOW_LABEL,
  DOA_CAPTURE_FOUNTAIN_LABEL,
  DOA_CAPTURE_MAXIMUM_CAPTURE_FLOW_LABEL,
  DOA_CAPTURE_PERIOD_USE_DAYS_PER_MONTH_LABEL,
  DOA_CAPTURE_PERIOD_USE_MONTH_PER_YEAR_LABEL,
  DOA_CAPTURE_SYSTEM_LABEL,
  DOA_CAPTURE_TOTAL_FLOW_PER_MONTH_LABEL,
  DOA_CAPTURE_TOTAL_FLOW_PER_YEAR_LABEL,
  DOA_DESCRIPTY_ACTIVITY,
  DOA_DOMESTIC_USE_NUMBER_OF_PEOPLE_LABEL,
  DOA_DOMESTIC_USE_PER_CAPITA_CONSUMPTION_LABEL,
  DOA_DOMESTIC_USE_TOTAL_DOMESTIC_CONSUMPTION_LABEL,
  DOA_DRAINAGE_NAME_LABEL,
  DOA_DYNAMIC_WATER_LEVEL_LABEL,
  DOA_ESTIMATED_VOLUME_LABEL,
  DOA_EXPLORED_AQUIFER_LABEL,
  DOA_HYDROGRAPHIC_BASIN_LABEL,
  DOA_HYDROGRAPHIC_SUBBASIN_LABEL,
  DOA_IDARON_NUMBER_LABEL,
  DOA_INTERFERENCE_TYPE_LABEL,
  DOA_IRRIGATION_DATA_IRRIGATED_AREA_SIZE,
  DOA_IRRIGATION_DATA_IRRIGATION_CROP,
  DOA_IRRIGATION_DATA_IRRIGATION_METHOD,
  DOA_IRRIGATION_DATA_NUMBER_SPECIMENS,
  DOA_IRRIGATION_DATA_SPACING_PER_PLANT,
  DOA_IRRIGATION_DATA_TOTAL_CULTIVAR_COMSUPTION,
  DOA_LAND_QUOTA_LABEL,
  DOA_LAUNCH_DAILY_LAUNCH_FLOW_LABEL,
  DOA_LAUNCH_LAUNCH_TIME_HOURS_PER_DAY_LABEL,
  DOA_LAUNCH_LAUNCH_TIME_HOURS_PER_MONTH_LABEL,
  DOA_LAUNCH_MAXIMUM_LAUNCH_FLOW_LABEL,
  DOA_LAUNCH_PERIOD_USE_DAYS_PER_MONTH_LABEL,
  DOA_LAUNCH_PERIOD_USE_MONTH_PER_YEAR_LABEL,
  DOA_LAUNCH_TOTAL_LAUNCH_PER_MONTH_LABEL,
  DOA_LAUNCH_TOTAL_LAUNCH_PER_YEAR_LABEL,
  DOA_LITHOLOGICAL_DESCRIPTION_LABEL,
  DOA_NUMBER_OF_CAPTURE_POINTS_lABEL,
  DOA_OCCURRENCE_POINT_LABEL,
  DOA_PASTURE_IRRIGATION_LABEL,
  DOA_PISCICULTURE_DATA_CULTIVATED_SPECIES,
  DOA_PISCICULTURE_DATA_DAILY_VOLUME_REQUIRED_RENEWAL,
  DOA_PISCICULTURE_DATA_MEDIUM_DEPTH,
  DOA_PISCICULTURE_DATA_NUMBER_DAYS_WATER_RENEWAL,
  DOA_PISCICULTURE_DATA_OTHER_TYPE,
  DOA_PISCICULTURE_DATA_RATE_DAILY_WATER_RENEWAL,
  DOA_PISCICULTURE_DATA_TOTAL_VOLUME_STORED,
  DOA_PISCICULTURE_DATA_TYPE_AREA_CULTURE,
  DOA_PISCICULTURE_DATA_WATER_MIRROR_AREA,
  DOA_PISCICULTURE_DATA_YEARLY_VOLUME_REQUIRED_RENEWAL,
  DOA_STATIC_WATER_LEVEL_LABEL,
  DOA_TOTAL_WATER_BLADE_LABEL,
  DOA_TYPE_ACTIVITY,
  DOA_WATER_BODY_FLOW,
  DOA_WATER_COURSE_LABEL,
  DOA_WELL_DEPTH_LABEL,
  FANTASY_NAME_LABEL,
  LATITUDE_LABEL,
  LEGAL_REPRESENTATIVE_LABEL,
  LONGITUDE_LABEL,
  STATE_REGISTRATION_LABEL,
} from "../labels";

const doaApplicantFieldsArray = structuredClone(applicantFieldsArray);
doaApplicantFieldsArray.splice(1, 0, {
  fieldId: "applicant.fantasy_name",
  label: FANTASY_NAME_LABEL,
  fieldType: "text",
  maxLength: 120,
});
doaApplicantFieldsArray.splice(2, 0, {
  fieldId: "applicant.legal_representative",
  label: LEGAL_REPRESENTATIVE_LABEL,
  fieldType: "text",
  maxLength: 120,
});
doaApplicantFieldsArray.splice(4, 0, {
  fieldId: "applicant.state_registration",
  label: STATE_REGISTRATION_LABEL,
  fieldType: "text",
  maxLength: 14,
});

const otherActivityFieldsArray: IField[] = [
  {
    fieldId: "other_activity.activity_description",
    label: DOA_DESCRIPTY_ACTIVITY,
    inputType: "text",
    fieldType: "text",
    maxLength: 255,
  },
];

const pastureDataFieldsArray: IField[] = [
  {
    fieldId: "animal_data.pasture_data.pasture_irrigation",
    label: DOA_PASTURE_IRRIGATION_LABEL,
    fieldType: "radio",
  },
];

const wateringDataFieldsArray: IField[] = [
  {
    fieldId: "animal_data.watering_data.drainage_name",
    label: DOA_DRAINAGE_NAME_LABEL,
    fieldType: "text",
    maxLength: 200,
  },
  {
    fieldId: "animal_data.watering_data.hydrographic_basin",
    label: DOA_HYDROGRAPHIC_BASIN_LABEL,
    fieldType: "text",
    maxLength: 200,
  },
  {
    fieldId: "animal_data.watering_data.hydrographic_sub_basin",
    label: DOA_HYDROGRAPHIC_SUBBASIN_LABEL,
    fieldType: "text",
    maxLength: 200,
  },
  {
    fieldId: "animal_data.watering_data.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
  },
  {
    fieldId: "animal_data.watering_data.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
  },
];

const dimensionExcavatedTankFieldArray: IField[] = [
  {
    fieldId:
      "animal_data.watering_data.dimension_excavated_tank.total_water_blade",
    label: DOA_TOTAL_WATER_BLADE_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "animal_data.watering_data.dimension_excavated_tank.medium_depth",
    label: DOA_AVERAGE_DEPTH_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId:
      "animal_data.watering_data.dimension_excavated_tank.estimated_volume",
    label: DOA_ESTIMATED_VOLUME_LABEL,
    fieldType: "text",
    inputType: "number",
    disabled: true,
  },
];

const pickupPointFieldsArrayPart1: IField[] = [
  {
    fieldId: "pickup_point.capture_system",
    label: DOA_CAPTURE_SYSTEM_LABEL,
    fieldType: "radio",
    options: [
      { label: "Implantado", value: "Implantado" },
      { label: "Não Implantado", value: "Não Implantado" },
    ],
  },

  {
    fieldId: "pickup_point.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
  },
  {
    fieldId: "pickup_point.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
  },
];

export const pickupPointFieldsArray: IField[] = [
  {
    fieldId: "pickup_point.coordinates.latitude",
    label: LATITUDE_LABEL,
    fieldType: "masked",
  },
  {
    fieldId: "pickup_point.coordinates.longitude",
    label: LONGITUDE_LABEL,
    fieldType: "masked",
  },
  {
    fieldId: "pickup_point.number_capture_point",
    label: DOA_NUMBER_OF_CAPTURE_POINTS_lABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pickup_point.land_quota",
    label: DOA_LAND_QUOTA_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pickup_point.water_course",
    label: DOA_WATER_COURSE_LABEL,
    fieldType: "text",
  },
  {
    fieldId: "pickup_point.hydrographic_basin",
    label: DOA_HYDROGRAPHIC_BASIN_LABEL,
    fieldType: "text",
  },
  {
    fieldId: "pickup_point.hydrographic_sub_basin",
    label: DOA_HYDROGRAPHIC_SUBBASIN_LABEL,
    fieldType: "text",
  },
  {
    fieldId: "pickup_point.water_body_flow",
    label: DOA_WATER_BODY_FLOW,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pickup_point.capture_system",
    label: DOA_CAPTURE_SYSTEM_LABEL,
    fieldType: "radio",
    options: [
      { label: "Implantado", value: "Implantado" },
      { label: "Não Implantado", value: "Não Implantado" },
    ],
  },
  {
    fieldId: "pickup_point.adduction_type",
    label: DOA_ADDUCTION_TYPE_LABEL,
    fieldType: "radio",
    options: [
      { label: "Gravidade", value: "Gravidade" },
      { label: "Bombeamento", value: "Bombeamento" },
    ],
  },
  {
    fieldId: "pickup_point.funding_source",
    label: DOA_CAPTURE_FOUNTAIN_LABEL,
    fieldType: "radio",
    options: [
      { label: "Superficial", value: "Superficial" },
      { label: "Subterrânea", value: "Subterrânea" },
      // { label: "Poço cacimba/amazônico", value: "pocoCacimba" },
    ],
  },
  {
    fieldId: "pickup_point.interference_type",
    fieldType: "radio",
    label: DOA_INTERFERENCE_TYPE_LABEL,
    options: [
      {
        label: "Derivação",
        value: "Derivação",
      },
      {
        label: "Captação",
        value: "Captação",
      },
    ],
  },
  {
    fieldId: "pickup_point.occurrence_point",
    fieldType: "radio",
    label: DOA_OCCURRENCE_POINT_LABEL,
    options: [
      {
        label: "Rio / Igarapé",
        value: "Rio / Igarapé",
      },
      {
        label: "Lago",
        value: "Lago",
      },
      {
        label: "Barragem (corpo hídrico obstruído)",
        value: "Barragem (corpo hídrico obstruído)",
      },
      {
        label: "Tanque Escavado",
        value: "Tanque Escavado",
      },
    ],
  },
];

const infoAmazonWellFieldsArray: IField[] = [
  {
    fieldId: "pickup_point.amazon_well.depth_well",
    label: DOA_WELL_DEPTH_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pickup_point.amazon_well.aquifer_exploited",
    label: DOA_EXPLORED_AQUIFER_LABEL,
    fieldType: "text",
  },
  {
    fieldId: "pickup_point.amazon_well.lithological_description",
    label: DOA_LITHOLOGICAL_DESCRIPTION_LABEL,
    fieldType: "text",
  },
  {
    fieldId: "pickup_point.amazon_well.static_level",
    label: DOA_STATIC_WATER_LEVEL_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pickup_point.amazon_well.dynamic_level",
    label: DOA_DYNAMIC_WATER_LEVEL_LABEL,
    fieldType: "text",
    inputType: "number",
  },
];

export const pastureIrrigationFieldArray: IField[] = [
  {
    fieldId: "animal_data.pasture_data.pasture_irrigation",
    label: "Há irrigação de pastagem",
    fieldType: "radio",
  },
];

export const domesticUseFieldsArray: IField[] = [
  {
    fieldId: "domestic_use.number_peoples",
    fieldType: "text",
    inputType: "number",
    label: DOA_DOMESTIC_USE_NUMBER_OF_PEOPLE_LABEL,
  },
  {
    fieldId: "domestic_use.per_capita_consumption",
    fieldType: "text",
    inputType: "number",
    label: DOA_DOMESTIC_USE_PER_CAPITA_CONSUMPTION_LABEL,
    placeholder: "Litros por cabeça por dia",
  },
  {
    fieldId: "domestic_use.total_consumption_domestic",
    fieldType: "text",
    label: DOA_DOMESTIC_USE_TOTAL_DOMESTIC_CONSUMPTION_LABEL,
    disabled: true,
  },
];

export const irrigationDataFieldsArray: IField[] = [
  {
    fieldId: "irrigation_data.irrigated_crop",
    fieldType: "text",
    label: DOA_IRRIGATION_DATA_IRRIGATION_CROP,
    placeholder: "Ex: gramíneas (pasto)",
  },
  {
    fieldId: "irrigation_data.irrigation_method",
    fieldType: "text",
    label: DOA_IRRIGATION_DATA_IRRIGATION_METHOD,
  },
  {
    fieldId: "irrigation_data.irrigated_area_size",
    fieldType: "text",
    inputType: "number",
    label: DOA_IRRIGATION_DATA_IRRIGATED_AREA_SIZE,
  },
  {
    fieldId: "irrigation_data.number_specimens",
    fieldType: "text",
    inputType: "number",
    label: DOA_IRRIGATION_DATA_NUMBER_SPECIMENS,
  },
  {
    fieldId: "irrigation_data.spacing_per_plant",
    fieldType: "text",
    inputType: "number",
    label: DOA_IRRIGATION_DATA_SPACING_PER_PLANT,
  },
  {
    fieldId: "irrigation_data.total_cultivar_comsuption",
    fieldType: "text",
    inputType: "number",
    label: DOA_IRRIGATION_DATA_TOTAL_CULTIVAR_COMSUPTION,
  },
];

export const piscicultureDataFieldsArray: IField[] = [
  {
    fieldId: "pisciculture.pisciculture_data.type_area_culture",
    fieldType: "select",
    label: DOA_PISCICULTURE_DATA_TYPE_AREA_CULTURE,
    options: [
      { label: "Tanque escavado lateral", value: "Tanque escavado lateral" },
      { label: "Tanque escavado no solo", value: "Tanque escavado no solo" },
      { label: "Outros", value: "Outros" },
    ],
  },
  {
    fieldId: "pisciculture.pisciculture_data.cultivated_species",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_CULTIVATED_SPECIES,
  },
  {
    fieldId: "pisciculture.pisciculture_data.water_mirror_area",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_WATER_MIRROR_AREA,
    inputType: "number",
  },
  {
    fieldId: "pisciculture.pisciculture_data.medium_depth",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_MEDIUM_DEPTH,
    inputType: "number",
  },
  {
    fieldId: "pisciculture.pisciculture_data.total_volume_stored",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_TOTAL_VOLUME_STORED,
    disabled: true,
  },
  {
    fieldId: "pisciculture.pisciculture_data.rate_daily_water_renewal",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_RATE_DAILY_WATER_RENEWAL,
    inputType: "number",
  },
  {
    fieldId: "pisciculture.pisciculture_data.daily_volume_required_renewal",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_DAILY_VOLUME_REQUIRED_RENEWAL,
    disabled: true,
  },
  {
    fieldId: "pisciculture.pisciculture_data.number_days_water_renewal",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_NUMBER_DAYS_WATER_RENEWAL,
    inputType: "number",
  },
  {
    fieldId: "pisciculture.pisciculture_data.yearly_volume_required_renewal",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_YEARLY_VOLUME_REQUIRED_RENEWAL,
    disabled: true,
  },
  {
    fieldId: "pisciculture.pisciculture_data.other_type",
    fieldType: "text",
    label: DOA_PISCICULTURE_DATA_OTHER_TYPE,
  },
];

export const propertyDataFieldArray: IField[] = [
  {
    fieldId: "property_data.car_record",
    fieldType: "masked",
    inputType: "text",
    label: CAR_RECORD_LABEL,
    placeholder: "RO-XXXXXXX-XXXX.XXXX.XXXX.XXXX.XXXX.XXXX.XXXX.XXXX",
  },
  {
    fieldId: "property_data.idaron_number",
    fieldType: "text",
    label: DOA_IDARON_NUMBER_LABEL,
  },
  {
    fieldId: "property_data.coordinates.latitude",
    fieldType: "masked",
    label: LATITUDE_LABEL,
  },
  {
    fieldId: "property_data.coordinates.longitude",
    fieldType: "masked",
    label: LONGITUDE_LABEL,
  },
];

export const captureAllUsesFieldArray: IField[] = [
  {
    fieldId: "capture_for_all_uses.daily_collection_flow",
    label: DOA_CAPTURE_DAILY_COLLECTION_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "capture_for_all_uses.capture_time_hours_per_day",
    label: DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_DAY_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "capture_for_all_uses.period_use_days_per_month",
    label: DOA_CAPTURE_PERIOD_USE_DAYS_PER_MONTH_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "capture_for_all_uses.period_use_month_per_year",
    label: DOA_CAPTURE_PERIOD_USE_MONTH_PER_YEAR_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "capture_for_all_uses.capture_time_hours_per_month",
    label: DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_MONTH_LABEL,
    fieldType: "text",

    disabled: true,
  },
  {
    fieldId: "capture_for_all_uses.maximum_capture_flow",
    label: DOA_CAPTURE_MAXIMUM_CAPTURE_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "capture_for_all_uses.total_flow_per_month",
    label: DOA_CAPTURE_TOTAL_FLOW_PER_MONTH_LABEL,
    fieldType: "text",

    disabled: true,
  },
  {
    fieldId: "capture_for_all_uses.total_flow_per_year",
    label: DOA_CAPTURE_TOTAL_FLOW_PER_YEAR_LABEL,
    fieldType: "text",

    disabled: true,
  },
];
export const captureTankMaintenanceFieldArray: IField[] = [
  {
    fieldId: "pisciculture.capture_tank_maintenance.daily_collection_flow",
    label: DOA_CAPTURE_DAILY_COLLECTION_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.capture_time_hours_per_day",
    label: DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_DAY_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.period_use_days_per_month",
    label: DOA_CAPTURE_PERIOD_USE_DAYS_PER_MONTH_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.period_use_month_per_year",
    label: DOA_CAPTURE_PERIOD_USE_MONTH_PER_YEAR_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId:
      "pisciculture.capture_tank_maintenance.capture_time_hours_per_month",
    label: DOA_CAPTURE_CAPTURE_TIME_HOURS_PER_MONTH_LABEL,
    fieldType: "text",
    disabled: true,
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.maximum_capture_flow",
    label: DOA_CAPTURE_MAXIMUM_CAPTURE_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.total_flow_per_month",
    label: DOA_CAPTURE_TOTAL_FLOW_PER_MONTH_LABEL,
    fieldType: "text",
    disabled: true,
  },
  {
    fieldId: "pisciculture.capture_tank_maintenance.total_flow_per_year",
    label: DOA_CAPTURE_TOTAL_FLOW_PER_YEAR_LABEL,
    fieldType: "text",
    disabled: true,
  },
];
export const launchTankMaintenanceFieldArray: IField[] = [
  {
    fieldId: "pisciculture.launch_tank_maintenance.daily_launch_flow",
    label: DOA_LAUNCH_DAILY_LAUNCH_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.launch_time_hours_per_day",
    label: DOA_LAUNCH_LAUNCH_TIME_HOURS_PER_DAY_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.period_use_days_per_month",
    label: DOA_LAUNCH_PERIOD_USE_DAYS_PER_MONTH_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.period_use_month_per_year",
    label: DOA_LAUNCH_PERIOD_USE_MONTH_PER_YEAR_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.launch_time_hours_per_month",
    label: DOA_LAUNCH_LAUNCH_TIME_HOURS_PER_MONTH_LABEL,
    fieldType: "text",

    disabled: true,
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.maximum_launch_flow",
    label: DOA_LAUNCH_MAXIMUM_LAUNCH_FLOW_LABEL,
    fieldType: "text",
    inputType: "number",
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.total_launch_per_month",
    label: DOA_LAUNCH_TOTAL_LAUNCH_PER_MONTH_LABEL,
    fieldType: "text",

    disabled: true,
  },
  {
    fieldId: "pisciculture.launch_tank_maintenance.total_launch_per_year",
    label: DOA_LAUNCH_TOTAL_LAUNCH_PER_YEAR_LABEL,
    fieldType: "text",

    disabled: true,
  },
];

export const verifyActiveFieldArray: IField[] = [
  {
    fieldId: "animal_data.active",
    label: DOA_TYPE_ACTIVITY.ANIMAL_DATA,
    fieldType: "radio",
  },
  {
    fieldId: "domestic_use.active",
    label: DOA_TYPE_ACTIVITY.DOMESTIC_USE,
    fieldType: "radio",
  },
  {
    fieldId: "pisciculture.active",
    label: DOA_TYPE_ACTIVITY.PISCICULTURE,
    fieldType: "radio",
  },

  {
    fieldId: "irrigation_data.active",
    label: DOA_TYPE_ACTIVITY.IRRIGATION,
    fieldType: "radio",
  },
  {
    fieldId: "other_activity.active",
    label: DOA_TYPE_ACTIVITY.OTHER,
    fieldType: "radio",
  },
];

export {
  dimensionExcavatedTankFieldArray,
  doaApplicantFieldsArray,
  infoAmazonWellFieldsArray,
  otherActivityFieldsArray,
  pastureDataFieldsArray,
  pickupPointFieldsArrayPart1,
  technicianFieldsArray,
  wateringDataFieldsArray,
};
