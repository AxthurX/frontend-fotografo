import { IOutorgaSchema, IUsePurposeArray } from "./interfaces";

interface IBuildFormDataProps {
  data: IOutorgaSchema;
  concatActivities: string;
  classification?: string[];
  breed?: string[];
  amount_animals?: number[];
  per_capita_consumption?: number[];
  total_consumption?: number[];
}
interface IVerifyPurposeUse {
  classification?: string[];
  breed?: string[];
  amount_animals?: number[];
  per_capita_consumption?: number[];
  total_consumption?: number[];
  newIsBreak: boolean;
}

export function verifyEmptyFields(values: object) {
  const objValues = Object.values(values).flat(Infinity);
  console.log(objValues);
  const emptyField = objValues.some(
    (field) => field === undefined || field === null || field === "",
  );
  return emptyField;
}

export function verifyActivity(activities: (string | null)[]) {
  const cleanActivities: string[] = [];
  activities.map((activity) => {
    if (activity != (null && undefined && "")) {
      cleanActivities.push(activity);
    }
  });
  const valuesConcatenated = cleanActivities.join(" - ");
  return valuesConcatenated;
}

export function verifyPurposeUse(
  value: IUsePurposeArray[] | undefined,
): IVerifyPurposeUse {
  let newIsBreak: boolean = false;

  if (Array.isArray(value) && value.length === 1 && Array.isArray(value[0])) {
    value = value[0];
  }

  const classification: string[] = [];
  const breed: string[] = [];
  const amount_animals: number[] = [];
  const per_capita_consumption: number[] = [];
  const total_consumption: number[] = [];

  if (
    value &&
    (value[0]?.select_animal ||
      value[0]?.per_capita_consumption ||
      value[0]?.number_heads ||
      value[0]?.breed)
  ) {
    value &&
      value.forEach((item) => {
        if (
          item.select_animal !== null &&
          item.select_animal !== undefined &&
          item.select_animal !== "" &&
          item.breed !== null &&
          item.breed !== undefined &&
          item.breed !== "" &&
          item.number_heads !== null &&
          item.number_heads !== undefined &&
          item.number_heads !== 0 &&
          item.per_capita_consumption !== null &&
          item.per_capita_consumption !== undefined &&
          item.per_capita_consumption !== 0
        ) {
          classification.push(item.select_animal);
          breed.push(
            item.breed.charAt(0).toUpperCase() +
              item?.breed.slice(1).toLowerCase(),
          );
          amount_animals.push(item.number_heads);
          per_capita_consumption.push(item.per_capita_consumption);
          total_consumption.push(
            Number(item.number_heads) * Number(item.per_capita_consumption),
          );
        } else {
          newIsBreak = true;
          return { newIsBreak };
        }
      });
  }
  return {
    classification,
    breed,
    amount_animals,
    per_capita_consumption,
    total_consumption,
    newIsBreak,
  };
}

export function buildFormData({
  data,
  concatActivities,
  classification,
  breed,
  amount_animals,
  per_capita_consumption,
  total_consumption,
}: IBuildFormDataProps) {
  const legal_representative = data.applicant.legal_representative;
  delete data.applicant.legal_representative;
  

  const formData = {
    requirement: {
      applicant: data.applicant,
      responsable_technician:
        data.technician?.verifyTechnician == "Sim" ? data.technician : null,
      property_data: data.property_data,

      activity: {
        name: concatActivities,

        activity_animal:
          data.animal_data?.active == "Sim"
            ? {
                animal: {
                  classification: classification,
                  breed: breed,
                  amount: amount_animals,
                  per_capita_consumption: per_capita_consumption,
                  total_consumption: total_consumption,
                },
                pasture_data: data.animal_data.pasture_data,

                desiccation: {
                  location: data.animal_data.watering_data.dehydration_occur,
                  drainage_name: data.animal_data.watering_data.drainage_name,
                  hydrographic_basic:
                    data.animal_data.watering_data.hydrographic_basin,
                  subhydrographic_basic:
                    data.animal_data.watering_data?.hydrographic_sub_basin,
                  latitude:
                    data.animal_data.watering_data.coordinates?.latitude,
                  longitude:
                    data.animal_data.watering_data.coordinates?.longitude,
                  tank_desiccation:
                    data.animal_data.watering_data?.dehydration_occur ==
                    "Tanque escavado"
                      ? {
                          medium_depth:
                            data.animal_data.watering_data
                              .dimension_excavated_tank?.medium_depth,
                          estimated_accumulated_volume:
                            data.animal_data.watering_data
                              .dimension_excavated_tank?.estimated_volume,
                          total_water_blade_dimension:
                            data.animal_data.watering_data
                              .dimension_excavated_tank?.total_water_blade,
                        }
                      : null,
                },
              }
            : null,

        domestic_use:
          data.domestic_use?.active == "Sim" ? data.domestic_use : null,

        pisciculture:
          data.pisciculture?.active == "Sim"
            ? {
                type_area_culture:
                  data.pisciculture.pisciculture_data.type_area_culture,
                other_type: data.pisciculture.pisciculture_data.other_type,
                cultivated_species:
                  data.pisciculture.pisciculture_data.cultivated_species,
                water_mirror_area:
                  data.pisciculture.pisciculture_data.water_mirror_area,
                medium_depth: data.pisciculture.pisciculture_data.medium_depth,
                total_volume_stored:
                  data.pisciculture.pisciculture_data.total_volume_stored,
                rate_daily_water_renewal:
                  data.pisciculture.pisciculture_data.rate_daily_water_renewal,
                daily_volume_required_renewal:
                  data.pisciculture.pisciculture_data
                    .daily_volume_required_renewal,
                number_days_water_renewal:
                  data.pisciculture.pisciculture_data.number_days_water_renewal,
                yearly_volume_required_renewal:
                  data.pisciculture.pisciculture_data
                    .yearly_volume_required_renewal,
                capture_tank_maintenance:
                  data.pisciculture.capture_tank_maintenance,
                launch_tank_maintenance: {
                  daily_collection_flow:
                    data.pisciculture.launch_tank_maintenance.daily_launch_flow,
                  capture_time_hours_per_day:
                    data.pisciculture.launch_tank_maintenance
                      .launch_time_hours_per_day,
                  period_use_days_per_month:
                    data.pisciculture.launch_tank_maintenance
                      .period_use_days_per_month,
                  period_use_month_per_year:
                    data.pisciculture.launch_tank_maintenance
                      .period_use_month_per_year,
                  capture_time_hours_per_month:
                    data.pisciculture.launch_tank_maintenance
                      .launch_time_hours_per_month,
                  maximum_capture_flow:
                    data.pisciculture.launch_tank_maintenance
                      .maximum_launch_flow,
                  total_flow_per_month:
                    data.pisciculture.launch_tank_maintenance
                      .total_launch_per_month,
                  total_flow_per_year:
                    data.pisciculture.launch_tank_maintenance
                      .total_launch_per_year,
                },
              }
            : null,

        irrigation_data:
          data.irrigation_data?.active == "Sim" ? data.irrigation_data : null,

        other_activity:
          data.other_activity?.active == "Sim" ? data.other_activity : null,
      },
      capture_point: {
        interference_type: data.pickup_point?.interference_type,
        system_capture: data.pickup_point.capture_system,
        adduction_type: data.pickup_point.adduction_type,
        font_type: data.pickup_point.funding_source,
        latitude_capture_point: data.pickup_point.coordinates.latitude,
        longitude_capture_point: data.pickup_point.coordinates.longitude,

        capture_point_data: {
          number_capture_point: data.pickup_point.number_capture_point,
          land_quota: data.pickup_point.land_quota,
          water_couse: data.pickup_point.water_course,
          hydrographic_basin: data.pickup_point.hydrographic_basin,
          hydrographic_sub_basin: data.pickup_point.hydrographic_sub_basin,
          water_body_flow: data.pickup_point.water_body_flow,
          occurrence_point: data.pickup_point.occurrence_point,
        },

        pit_amazon:
          data.pickup_point.funding_source == "Subterrânea"
            ? {
                pit_depth: data.pickup_point.amazon_well?.depth_well,
                exploited_aquifer:
                  data.pickup_point.amazon_well?.aquifer_exploited,
                lithological_description:
                  data.pickup_point.amazon_well?.lithological_description,
                static_level: data.pickup_point.amazon_well?.static_level,
                dynamic_level: data.pickup_point.amazon_well?.dynamic_level,
              }
            : null,
      },
      capture_data: data.capture_for_all_uses,

      waive_process: data.process_formalized,
      legal_representative: legal_representative,
    },
  };
  console.log(formData);
  return formData;
}
