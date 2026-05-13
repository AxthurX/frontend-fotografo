import type { MaskitoMask, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

const maskCpfCnpj: MaskitoMask = (elementState) => {
	//deixando somente os números para comparar a length
	const cpf_cnpj = elementState.value.replace(/\D/g, '');

	if (cpf_cnpj.length <= 11) {
		return [
			/\d/,
			/\d/,
			/\d/,
			'.',
			/\d/,
			/\d/,
			/\d/,
			'.',
			/\d/,
			/\d/,
			/\d/,
			'-',
			/\d/,
			/\d/,
		];
	} else {
		return [
			/\d/,
			/\d/,
			'.',
			/\d/,
			/\d/,
			/\d/,
			'.',
			/\d/,
			/\d/,
			/\d/,
			'/',
			/\d/,
			/\d/,
			/\d/,
			/\d/,
			'-',
			/\d/,
			/\d/,
		];
	}
};

export const CPF_CNPJ_DYNAMIC_MASKITO_MASK: MaskitoOptions = {
	mask: maskCpfCnpj,
};

export const CPF_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		/\d/,
	],
};

export const CNPJ_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'/',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		/\d/,
	],
};

export const RG_MASKITO_MASK: MaskitoOptions = {
	mask: /^(\d|-|,|\.)+$/,
};

export const ZIPCODE_MASKITO_MASK: MaskitoOptions = {
	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export const NUMBER_MASKITO_MASK: MaskitoOptions = {
	mask: /^\d+$/,
};

export const DAYS_IN_A_YEAR_MASK = maskitoNumberOptionsGenerator({
	min: 0,
	max: 365,
});

export const PHONE_MASKITO_MASK: MaskitoOptions = {
	mask: (elementState) => {
		if (elementState.value.length <= 14) {
			return [
				'(',
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			];
		} else {
			return [
				'(',
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			];
		}
	},
};

export const TOKEN_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
		'-',
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
		/[a-zA-Z0-9]/,
	],
};

export const CAR_RECORD_NUMBER_MASK: MaskitoOptions = {
	mask: [
		'R',
		'O',
		'-',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'.',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
	],
};

export const DECIMAL_COORDINATE_MASK: MaskitoOptions = {
	mask: ['-', /\d/, /\d/, ',', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
};

export const DECIMAL_LATITUDE_MASK = maskitoNumberOptionsGenerator({
	prefix: '-',
	precision: 7,
	minusSign: '-',
	decimalSeparator: ',',
	min: -90,
	max: 0,
});

export const DECIMAL_LONGITUDE_MASK = maskitoNumberOptionsGenerator({
	prefix: '-',
	precision: 7,
	minusSign: '-',
	decimalSeparator: ',',
	min: -180,
	max: 0,
});

export const METERS_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const SQUARE_METERS_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m²',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const CUBIC_METERS_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m³',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const LITERS_PER_DAY_MASK = maskitoNumberOptionsGenerator({
	postfix: ' L/dia',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
	max: 86400,
});

export const CUBIC_METERS_PER_DAY_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m³/dia',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
	max: 86.4,
});

export const CUBIC_METERS_PER_DAY_NO_MAX_VALUE_MASK =
	maskitoNumberOptionsGenerator({
		postfix: ' m³/dia',
		precision: 3,
		decimalSeparator: ',',
		thousandSeparator: '',
		min: 0,
	});

export const CUBIC_METERS_PER_HOUR_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m³/h',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
	max: 3.6,
});

export const CUBIC_METERS_PER_SECOND_MASK = maskitoNumberOptionsGenerator({
	postfix: ' m³/s',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const LITERS_PER_SECOND_MASK = maskitoNumberOptionsGenerator({
	postfix: ' L/s',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const PERCENTAGE_MASK = maskitoNumberOptionsGenerator({
	postfix: '%',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
	max: 100,
});

export const HECTARE_MASK = maskitoNumberOptionsGenerator({
	postfix: ' ha',
	precision: 3,
	decimalSeparator: ',',
	thousandSeparator: '',
	min: 0,
});

export const MAX_NUMBER_MASK = (value: string) => {
	let maxValue: number;
	const normalizedValue = value.normalize('NFC');
	switch (normalizedValue) {
		case 'hours':
			maxValue = 24;
			break;
		case 'Fevereiro':
			maxValue = 28;
			break;
		case 'Janeiro':
		case 'Março':
		case 'Maio':
		case 'Julho':
		case 'Agosto':
		case 'Outubro':
		case 'Dezembro':
			maxValue = 31;
			break;
		case 'Abril':
		case 'Junho':
		case 'Setembro':
		case 'Novembro':
			maxValue = 30;
			break;
		default:
			maxValue = 2147683487;
			break;
	}

	return maskitoNumberOptionsGenerator({
		postfix: '',
		precision: 3,
		decimalSeparator: ',',
		thousandSeparator: '',
		min: 0,
		max: maxValue,
	});
};

export const SEI_PROCESS_MASK: MaskitoOptions = {
	mask: [
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'/',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		/\d/,
	],
};

export const TERM_ID_MASK: MaskitoOptions = {
	mask: /^(\d|,)+$/,
};

export const MULTIPLE_OF_0_DOT_0001_MASKITO_MASK: MaskitoOptions =
	maskitoNumberOptionsGenerator({
		thousandSeparator: '',
		decimalSeparator: ',',
		precision: 4,
		min: 0,
		max: 999999.9999,
	});

export const MONEY_MASKITO_MASK: MaskitoOptions = maskitoNumberOptionsGenerator(
	{
		thousandSeparator: '',
		decimalSeparator: ',',
		precision: 2,
		min: 0,
		max: 999999999999.99,
	},
);

export const GEOGRAPHICAL_COORDINATE_MASK: MaskitoOptions = {
	mask: [
		/\d/,
		/\d/,
		'°',
		' ',
		/\d/,
		/\d/,
		"'",
		' ',
		/\d/,
		/\d/,
		'"',
		' ',
		'S',
		' ',
		/\d/,
		/\d/,
		'°',
		' ',
		/\d/,
		/\d/,
		"'",
		' ',
		/\d/,
		/\d/,
		'"',
		' ',
		'O',
	],
};

export const PROTOCOLO_MASKITO_MASK: MaskitoOptions = {
	mask: /^[a-zA-Z\d]+$/,
};
