import { type IField, applicantFieldsArray } from '@/lib/forms/fields';
import {
	PISC_ART_LABEL,
	PISC_CITY_HALL_CERTIFICATE_LABEL,
	PISC_NEWSPAPER_PUBLICATION_CERTIFICATE_LABEL,
	PISC_LICENSES_ISSUED_LABEL,
	PISC_OUTORGA_LABEL,
	PISC_PERSONAL_DOCUMENTS_LABEL,
	PISC_PREPARATION_SCHEDULE_LABEL,
	PISC_PROPORTIONAL_FEE_PAYMENT_LABEL,
	PISC_SITE_PLAN_LABEL,
	PISC_CAR_RECORD_LABEL,
	PISC_AREA_LABEL,
	PISC_NUMBER_OUTORGA_LABEL,
	PISC_OBSERVATIONS_LABEL,
	LATITUDE_LABEL,
	LONGITUDE_LABEL,
	PISC_LICENSE_TYPE_LABEL,
} from '../labels';

const piscApplicantFieldsArray = structuredClone(applicantFieldsArray);

export const piscPrevious: IField[] = [
	{
		fieldId: 'license_type',
		label: PISC_LICENSE_TYPE_LABEL,
		minLength: 2,
		fieldType: 'radio',
		options: [
			{ label: 'Licença Prévia', value: 'Licença Prévia' },
			{ label: 'Licença de Instalação', value: 'Licença de Instalação' },
			{ label: 'Licença de Operação', value: 'Licença de Operação' },
		],
		className: 'grid grid-cols-2 md:grid-flow-col justify-items-center',
	},
];

export const piscActivity: IField[] = [
	{
		fieldId: 'pisc_activity.area',
		label: PISC_AREA_LABEL,
		minLength: 2,
		fieldType: 'text',
	},
	{
		fieldId: 'pisc_activity.coordinates.latitude',
		label: LATITUDE_LABEL,
		fieldType: 'masked',
		minLength: 13,
		maxLength: 13,
	},
	{
		fieldId: 'pisc_activity.coordinates.longitude',
		label: LONGITUDE_LABEL,
		fieldType: 'masked',
		minLength: 13,
		maxLength: 13,
	},
	{
		fieldId: 'pisc_activity.number_outorga',
		label: PISC_NUMBER_OUTORGA_LABEL,
		minLength: 2,
		fieldType: 'text',
	},
	{
		fieldId: 'pisc_activity.car_record',
		label: PISC_CAR_RECORD_LABEL,
		minLength: 2,
		maxLength: 50,
		fieldType: 'masked',
	},
	{
		fieldId: 'pisc_activity.observations',
		label: PISC_OBSERVATIONS_LABEL,
		minLength: 2,
		fieldType: 'text',
	},
];

export const piscFiles: IField[] = [
	{
		fieldId: 'pisc_files.proportional_fee_payment',
		label: PISC_PROPORTIONAL_FEE_PAYMENT_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.personal_documents',
		label: PISC_PERSONAL_DOCUMENTS_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.newspaper_publication',
		label: PISC_NEWSPAPER_PUBLICATION_CERTIFICATE_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.city_hall_certificate',
		label: PISC_CITY_HALL_CERTIFICATE_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.preparation_schedule',
		label: PISC_PREPARATION_SCHEDULE_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.site_plan',
		label: PISC_SITE_PLAN_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.technical_responsibility_note',
		label: PISC_ART_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.outorga',
		label: PISC_OUTORGA_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'pisc_files.licenses_issued',
		label: PISC_LICENSES_ISSUED_LABEL,
		fieldType: 'file',
	},
];

export { piscApplicantFieldsArray, applicantFieldsArray };
