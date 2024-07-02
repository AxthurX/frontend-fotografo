import { activities } from '@/lib/forms/dla/activities';
import {
	type IField,
	applicantFieldsArray as originalApplicantFieldsArray,
} from '@/lib/forms/fields';
import { centralized } from '../centralized';
import {
	ARTICLE_299_CHECKBOX_LABEL,
	CAR_RECORD_FILE_LABEL,
	CAR_RECORD_LABEL,
	CEP_LABEL,
	CITY_LABEL,
	COLMAM_ACTIVITY_LOCATION_LABEL,
	COLMAM_ACTIVITY_TYPE_LABEL,
	COLMAM_CONSEPA_CRITERIA_CHECKBOX_LABEL,
	COLMAM_DETAILED_CRITERIA_CHECKBOX_LABEL,
	COMPLEMENT_LABEL,
	DARE_OR_DOP_LABEL,
	DISTRICT_LABEL,
	DLA_SURVEY_CONSEPA_01_2019_QUESTION_LABEL,
	DLA_SURVEY_ENTREPRENEURSHIP_STATUS_QUESTION_LABEL,
	DLA_SURVEY_PROTECTED_AREAS_INTERFERENCE_QUESTION_LABEL,
	EMBARGOED_AREA_QUESTION_LABEL,
	LATITUDE_LABEL,
	LONGITUDE_LABEL,
	PAYMENT_RECEIPT_AND_DARE_LABEL,
	SITE_PLAN_LABEL,
	STATE_LABEL,
	STREET_LABEL,
	STREET_NUMBER_LABEL,
} from '../labels';
import { ufList } from '../ufList';

const applicantFieldsArray = structuredClone(originalApplicantFieldsArray);
applicantFieldsArray.push({
	fieldId: 'applicant.personal_data.address.state',
	label: STATE_LABEL,
	fieldType: 'combobox',
	options: ufList,
	className: 'w-[78px]',
});

const activityFieldsArray: IField[] = [
	{
		fieldId: 'activity.activity_type_id',
		label: COLMAM_ACTIVITY_TYPE_LABEL,
		fieldType: 'combobox',
		options: activities,
		className: 'w-[90vw] max-sm:w-[85vw] max-w-[1372px]',
	},
	{
		fieldId: 'activity.address_type',
		label: COLMAM_ACTIVITY_LOCATION_LABEL,
		fieldType: 'radio',
		options: [
			{ label: 'Zona rural', value: 'Zona rural' },
			{ label: 'Zona urbana', value: 'Zona urbana' },
		],
		className: 'grid grid-cols-2 md:grid-flow-col lg:grid-cols-3',
	},
	{
		fieldId: 'activity.address.zipcode',
		label: CEP_LABEL,
		placeholder: '00000-000',
		fieldType: 'masked',
		minLength: 9,
		maxLength: 9,
	},
	{
		fieldId: 'activity.address.street',
		label: STREET_LABEL,
		fieldType: 'text',
		minLength: 5,
		maxLength: 80,
	},
	{
		fieldId: 'activity.address.number',
		label: STREET_NUMBER_LABEL,
		fieldType: 'masked',
		minLength: 1,
		maxLength: 5,
	},
	{
		fieldId: 'activity.address.complement',
		label: COMPLEMENT_LABEL,
		fieldType: 'text',
		maxLength: 255,
	},
	{
		fieldId: 'activity.address.district',
		label: DISTRICT_LABEL,
		fieldType: 'text',
		minLength: 4,
		maxLength: 50,
	},
	{
		fieldId: 'activity.address.city',
		label: CITY_LABEL,
		fieldType: 'combobox',
		options: centralized,
		className: 'w-[350px]',
	},
	{
		fieldId: 'activity.address.state',
		label: STATE_LABEL,
		fieldType: 'combobox',
		options: ufList.filter((item) => item.label == 'RO'),
		className: 'w-[78px]',
	},
	{
		fieldId: 'activity.coordinates.latitude',
		label: LATITUDE_LABEL,
		fieldType: 'masked',
		minLength: 13,
		maxLength: 13,
	},
	{
		fieldId: 'activity.coordinates.longitude',
		label: LONGITUDE_LABEL,
		fieldType: 'masked',
		minLength: 13,
		maxLength: 13,
	},
	{
		fieldId: 'activity.blocked',
		label: EMBARGOED_AREA_QUESTION_LABEL,
		fieldType: 'radio',
		options: [
			{ label: 'Sim', value: 1 },
			{ label: 'Não', value: 0 },
		],
		className: 'grid grid-cols-2 md:grid-flow-col lg:grid-cols-3',
	},
	{
		fieldId: 'activity.car_record',
		label: CAR_RECORD_LABEL,
		fieldType: 'masked',
	},
	{
		fieldId: 'activity.dare_or_dop',
		label: DARE_OR_DOP_LABEL,
		fieldType: 'masked',
		minLength: 55,
		maxLength: 55,
	},
	{
		fieldId: 'files_dare_payment_receipt',
		label: PAYMENT_RECEIPT_AND_DARE_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'files_site_plan',
		label: SITE_PLAN_LABEL,
		fieldType: 'file',
	},
	{
		fieldId: 'files_car_record_file',
		label: CAR_RECORD_FILE_LABEL,
		fieldType: 'file',
	},
];

const surveyFieldsArray: IField[] = [
	{
		fieldId: 'survey.entrepreneurship_status',
		label: DLA_SURVEY_ENTREPRENEURSHIP_STATUS_QUESTION_LABEL,
		fieldType: 'radio',
		options: [
			{ label: 'Não iniciado', value: 'Não iniciado' },
			{ label: 'Em instalação', value: 'Em instalação' },
			{ label: 'Instalado', value: 'Instalado' },
			{ label: 'Em funcionamento', value: 'Em funcionamento' },
		],
		className:
			'grid grid-cols-2 md:grid-flow-col md:grid-cols-4 lg:grid-cols-6',
	},
	{
		fieldId: 'survey.consepa_01_2019',
		label: DLA_SURVEY_CONSEPA_01_2019_QUESTION_LABEL,
		fieldType: 'radio',
		className:
			'grid grid-cols-2 md:grid md:grid-flow-col md:grid-cols-4 lg:grid-cols-6',
	},
	{
		fieldId: 'survey.protected_areas_interference',
		label: DLA_SURVEY_PROTECTED_AREAS_INTERFERENCE_QUESTION_LABEL,
		fieldType: 'radio',
		className:
			'grid grid-cols-2 md:grid md:grid-flow-col md:grid-cols-4 lg:grid-cols-6',
	},
];

const checkboxFieldsArray: IField[] = [
	{
		fieldId: 'survey.checkbox_1',
		label: COLMAM_CONSEPA_CRITERIA_CHECKBOX_LABEL,
		fieldType: 'checkbox',
	},
	{
		fieldId: 'survey.checkbox_2',
		label: COLMAM_DETAILED_CRITERIA_CHECKBOX_LABEL,
		fieldType: 'checkbox',
	},
	{
		fieldId: 'survey.checkbox_3',
		label: ARTICLE_299_CHECKBOX_LABEL,
		fieldType: 'checkbox',
	},
];
export const dlaFiles: IField[] = [
	activityFieldsArray[14],
	activityFieldsArray[15],
	activityFieldsArray[16],
];

export {
	activityFieldsArray,
	applicantFieldsArray,
	checkboxFieldsArray,
	surveyFieldsArray,
};
