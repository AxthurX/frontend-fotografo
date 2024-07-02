
import { z } from "zod";
import { ADDRESS_ZOD_OBJECT, APPLICANT_ZOD_OBJECT, CAR_RECORD_NUMBER_ZOD_FIELD, CIVIL_STATUS_ZOD_ENUM_FIELD, PDF_FILE_CUSTOM_ZOD_FIELD, RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT, TECHNICIAN_ZOD_OBJECT, ZIP_FILE_CUSTOM_ZOD_FIELD } from "../combinedInterfaces";

export const lpcaSchema = z.object({
    applicant: APPLICANT_ZOD_OBJECT.extend({
        nationality: z.string().max(30).optional(),
        applicant_data: z.object({
            civil_status: CIVIL_STATUS_ZOD_ENUM_FIELD,
            job: z.string().max(255).optional(),
            document: z.string().max(15).optional(),
            state_registration: z.string().min(9).max(14).or(z.literal("")),
        }),
    }),
    property: z.object({
        car_record: CAR_RECORD_NUMBER_ZOD_FIELD,
        address: ADDRESS_ZOD_OBJECT,
        coordinates: RONDONIA_GEOGRAPHICAL_COORDINATES_ZOD_OBJECT
    }),
    technician: TECHNICIAN_ZOD_OBJECT.extend({
        nationality: z.string().min(3).max(30),
        civil_status: CIVIL_STATUS_ZOD_ENUM_FIELD,
        job: z.string().min(3).max(255),
    }),
    lpcaFiles: z.object({
        cleaning_declaration: PDF_FILE_CUSTOM_ZOD_FIELD,
        professional_report: PDF_FILE_CUSTOM_ZOD_FIELD,
        technical_responsibility_note: PDF_FILE_CUSTOM_ZOD_FIELD,
        property_map_and_car: PDF_FILE_CUSTOM_ZOD_FIELD,
        shapefile_folder: ZIP_FILE_CUSTOM_ZOD_FIELD,
        previous_native_vegetation_suppression_authorizations: PDF_FILE_CUSTOM_ZOD_FIELD,
        environmental_agency_declaration: PDF_FILE_CUSTOM_ZOD_FIELD
    })
});