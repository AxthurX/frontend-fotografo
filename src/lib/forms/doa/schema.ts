import {
  APPLICANT_ZOD_OBJECT,
  CPF_ZOD_FIELD,
  PERSONAL_DATA_ZOD_OBJECT,
  RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
} from "@/lib/forms/combinedInterfaces";
import { geoRondoniaPolygon } from "@/lib/geo/geoRondoniaPolygon";
import { sexagesimalToDecimal } from "geolib";
import isPointInPolygon from "geolib/es/isPointInPolygon";
import { z } from "zod";

const RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT_OPTIONAL = z
  .object({
    latitude: z.string().length(13),
    longitude: z.string().length(13),
  })
  .transform((object) => {
    const localizedLongitude = object.longitude.replace(/O/, "W");
    return {
      latitude: object.latitude,
      longitude: localizedLongitude,
    };
  })
  .superRefine(async (object, context) => {
    const refinement = await new Promise<boolean>((resolve) =>
      resolve(isPointInPolygon(object, geoRondoniaPolygon)),
    );
    if (!refinement)
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Coordenadas não pertencem ao estado de Rondônia.",
      });
  })
  .transform(async (object) => {
    return {
      latitude: await new Promise<number>((resolve) =>
        resolve(sexagesimalToDecimal(object.latitude)),
      ),
      longitude: await new Promise<number>((resolve) =>
        resolve(sexagesimalToDecimal(object.longitude)),
      ),
    };
  });

const DIMENSION_EXCAVATED_TANK_ZOD_OBJECT = z.discriminatedUnion(
  "dehydration_occur_optional",
  [
    z.object({
      dehydration_occur_optional: z.literal("Rio, igarapé, lago"),
      total_water_blade: z.coerce.number().nonnegative().gt(1),
      medium_depth: z.coerce.number().nonnegative().gt(1),
      estimated_volume: z.coerce.number().nonnegative().gt(1),
    }),
  ],
);

const WATERING_DATA_ZOD_OBJECT = z.discriminatedUnion("dehydration_occur", [
  z.object({
    dehydration_occur: z.literal("Não ocorre"),
  }),
  z.object({
    dehydration_occur: z.literal("Tanque escavado"),
    drainage_name: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_basin: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_sub_basin: z.string().max(200).optional(),
    coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
    dimension_excavated_tank: DIMENSION_EXCAVATED_TANK_ZOD_OBJECT,
  }),
  z.object({
    dehydration_occur: z.literal("Rio / Igarapé"),
    drainage_name: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_basin: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_sub_basin: z.string().max(200).optional(),
    coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
  }),
  z.object({
    dehydration_occur: z.literal("Lago"),
    drainage_name: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_basin: z.string().max(200).min(1, "Este campo é obrigatório"),
    hydrographic_sub_basin: z.string().max(200).optional(),
    coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
  }),
]);

const AMAZON_WELL_ZOD_OBJECT = z.object({
  depth_well: z.coerce.number().optional(),
  aquifer_exploited: z.string().optional(),
  lithological_description: z.string().optional(),
  static_level: z.coerce.number().optional(),
  dynamic_level: z.coerce.number().optional(),
});

const DOMESTIC_USE_ZOD_OBJECT = z.object({
  active: z.literal("Sim"),
  number_peoples: z.coerce.number().min(1, "Este campo é obrigatório"),
  per_capita_consumption: z.coerce.number().min(1, "Este campo é obrigatório"),
  total_consumption_domestic: z.string().min(0.0001, "Este campo é obrigatório"),
});

const IRRIGATION_DATA_ZOD_OBJECT = z.object({
  active: z.literal("Sim"),
  irrigated_crop: z.string().min(1, "Este campo é obrigatorio"),
  irrigation_method: z.string().min(1, "Este campo é obrigatorio"),
  irrigated_area_size: z.coerce
    .number()
    .int()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatorio"),
  number_specimens: z.coerce.number().min(1, "Este campo é obrigatorio"),
  spacing_per_plant: z.coerce.number().min(1, "Este campo é obrigatorio"),
  total_cultivar_comsuption: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatorio"),
});

const PISCICULTURE_DATA_ZOD_OBJECT = z.object({
  type_area_culture: z.string().min(1, "Escolha uma opção").max(255),
  other_type: z.string().max(255).optional(),
  cultivated_species: z.string().min(1, "Este campo é obrigatorio").max(255),
  water_mirror_area: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatorio"),
  medium_depth: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatorio"),
  total_volume_stored: z.number().min(1, "Este campo é obrigatorio"),
  rate_daily_water_renewal: z.coerce
    .number()
    .nonnegative()
    .min(0, "Este campo é obrigatorio"),
  daily_volume_required_renewal: z.number().min(1, "Este campo é obrigatorio"),
  number_days_water_renewal: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatorio"),
  yearly_volume_required_renewal: z.number().min(1, "Este campo é obrigatorio"),
});
const PROPERTY_DATA_ZOD_OBJECT = z.object({
  coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT_OPTIONAL,
  idaron_number: z.string().max(30).optional().or(z.literal("")),
  car_record: z.string().optional(),
});

const PICKUP_POINT_ZOD_OBJECT = z.object({
  number_capture_point: z.coerce.number().gt(0).int().nonnegative(),
  coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT,
  land_quota: z.coerce.number().gt(0).int().nonnegative(),
  water_course: z.string().max(200).min(1, "Este campo é obrigatório"),
  hydrographic_basin: z.string().max(200).min(1, "Este campo é obrigatório"),
  hydrographic_sub_basin: z.string().max(200).optional(),
  water_body_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatório"),
  capture_system: z.string().min(1, "Este campo é obrigatório"),
  adduction_type: z.string().min(1, "Este campo é obrigatório"),
  funding_source: z.string().min(1, "Este campo é obrigatório"),
  amazon_well: AMAZON_WELL_ZOD_OBJECT.partial().optional(),
  interference_type: z.string().min(1, "Este campo é obrigatório"),
  occurrence_point: z.string().min(1, "Este campo é obrigatório"),
});

const CAPTURE_FOR_ALL_USES_ZOD_OBJECT = z.object({
  daily_collection_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.000001, "Este campo é obrigatorio"),
  capture_time_hours_per_day: z.coerce
    .number()
    .nonnegative()
    .lte(24, "Valor máximo de 24 horas.")
    .min(0.000001, "Este campo é obrigatorio"),
  period_use_days_per_month: z.coerce
    .number()
    .nonnegative()
    .min(0.000001, "Este campo é obrigatorio"),
  period_use_month_per_year: z.coerce
    .number()
    .nonnegative()
    .min(0.000001, "Este campo é obrigatorio"),
  capture_time_hours_per_month: z
    .number()
    .min(0.000001, "Este campo é obrigatorio"),
  maximum_capture_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.000001, "Este campo é obrigatorio"),
  total_flow_per_month: z.number().min(0.000001, "Este campo é obrigatorio"),
  total_flow_per_year: z.number().min(0.000001, "Este campo é obrigatorio"),
});

const CAPTURE_TANK_MAINTENANCE_ZOD_OBJECT = z.object({
  daily_collection_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.00001, "Este campo é obrigatorio"),
  capture_time_hours_per_day: z.coerce
    .number()
    .nonnegative()
    .lte(24, "Valor máximo de 24 horas.")
    .min(0.00001, "Este campo é obrigatorio"),
  period_use_days_per_month: z.coerce
    .number()
    .nonnegative()
    .min(0.00001, "Este campo é obrigatorio"),
  period_use_month_per_year: z.coerce
    .number()
    .nonnegative()
    .min(0.00001, "Este campo é obrigatorio"),
  capture_time_hours_per_month: z
    .number()
    .min(0.00001, "Este campo é obrigatorio"),
  maximum_capture_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.00001, "Este campo é obrigatorio"),
  total_flow_per_month: z.number().min(0.00001, "Este campo é obrigatorio"),
  total_flow_per_year: z.number().min(0.00001, "Este campo é obrigatorio"),
});

const LAUNCH_TANK_MAINTENANCE_ZOD_OBJECT = z.object({
  daily_launch_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatório"),
  launch_time_hours_per_day: z.coerce
    .number()
    .nonnegative()
    .lte(24, "Valor máximo de 24 horas.")
    .min(0.0001, "Este campo é obrigatório"),
  period_use_days_per_month: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatório"),
  period_use_month_per_year: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatório"),
  launch_time_hours_per_month: z
    .number()
    .min(0.0001, "Este campo é obrigatorio"),
  maximum_launch_flow: z.coerce
    .number()
    .nonnegative()
    .min(0.0001, "Este campo é obrigatório"),
  total_launch_per_month: z.number().min(0.0001, "Este campo é obrigatorio"),
  total_launch_per_year: z.number().min(0.0001, "Este campo é obrigatorio"),
});

const PISCICULTURE_ZOD_OBJECT = z.object({
  active: z.literal("Sim"),
  pisciculture_data: PISCICULTURE_DATA_ZOD_OBJECT,
  capture_tank_maintenance: CAPTURE_TANK_MAINTENANCE_ZOD_OBJECT,
  launch_tank_maintenance: LAUNCH_TANK_MAINTENANCE_ZOD_OBJECT,
});

const ANIMAL_DATA_ZOD_OBJECT = z.object({
  active: z.literal("Sim"),
  use_purpose: z.array(
    z.object({
      select_animal: z.string().min(1, "Este campo é obrigatório"),
      breed: z.string().max(200).min(1, "Este campo é obrigatório"),
      number_heads: z.coerce.number().int().gt(0).nonnegative(),
      per_capita_consumption: z.coerce.number().int().gt(0).nonnegative(),
      total_consumption: z.string().max(200).min(1, "Este campo é obrigatório"),
    }),
  ),
  pasture_data: z.object({
    pasture_which_months: z.array(z.string()),
    pasture_irrigation: z.literal("Sim").or(z.literal("Não")),
  }),
  watering_data: WATERING_DATA_ZOD_OBJECT,
});

const TECHNICIAN_ZOD_OBJECT = z.discriminatedUnion("verifyTechnician", [
  z.object({
    verifyTechnician: z.literal("Sim"),
    name: z.string().min(5).max(120),
    cpf: CPF_ZOD_FIELD,
    rg: z.string().min(6).max(15),
    council_license: z.object({
      cl_name: z.string().min(3).max(40),
      cl_number: z.string().min(3).max(20),
      cl_state: z.string().length(2),
    }),
    personal_data: PERSONAL_DATA_ZOD_OBJECT,
  }),
  z.object({
    verifyTechnician: z.literal("Não"),
  }),
]);
export const outorgaSchema = z.object({
  applicant: APPLICANT_ZOD_OBJECT.extend({
    legal_representative: z.string().min(5).max(120),
    state_registration: z.string().min(9).max(14).or(z.literal("")),
  }),

  technician: TECHNICIAN_ZOD_OBJECT,

  property_data: PROPERTY_DATA_ZOD_OBJECT,

  pickup_point: PICKUP_POINT_ZOD_OBJECT,

  other_activity: z.discriminatedUnion("active", [
    z.object({
      active: z.literal("Sim"),
      activity_description: z
        .string()
        .min(1, "Este campo é obrigatório")
        .max(200),
    }),
    z.object({ active: z.literal("Não") }),
  ]),

  animal_data: z.discriminatedUnion("active", [
    z.object({ active: z.literal("Não") }),
    ANIMAL_DATA_ZOD_OBJECT,
  ]),

  domestic_use: z.discriminatedUnion("active", [
    z.object({ active: z.literal("Não") }),
    DOMESTIC_USE_ZOD_OBJECT,
  ]),

  irrigation_data: z.discriminatedUnion("active", [
    z.object({ active: z.literal("Não") }),
    IRRIGATION_DATA_ZOD_OBJECT,
  ]),

  pisciculture: z.discriminatedUnion("active", [
    z.object({ active: z.literal("Não") }),
    PISCICULTURE_ZOD_OBJECT,
  ]),

  capture_for_all_uses: CAPTURE_FOR_ALL_USES_ZOD_OBJECT,

  process_formalized: z.discriminatedUnion("radio_process_in_sedam", [
    z.object({
      radio_process_in_sedam: z.literal("Sim"),
      process_in_sedam_protocol: z
        .string()
        .max(12)
        .min(1, "Este campo é obrigatório"),
      checkbox_closing_process: z.coerce.boolean(),
    }),

    z.object({
      radio_process_in_sedam: z.literal("Não"),
    }),
  ]),
});
