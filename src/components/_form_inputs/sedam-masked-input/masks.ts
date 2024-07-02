import { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

export const CPF_CNPJ_DYNAMIC_MASKITO_MASK: MaskitoOptions = {
	mask: (elementState) => {
		if (elementState.value.length <= 14) {
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
	},
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

export const RG_MASKITO_MASK: MaskitoOptions = {
	mask: /^(\d|-|,|\.)+$/,
};

export const ZIPCODE_MASKITO_MASK: MaskitoOptions = {
	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export const NUMBER_MASKITO_MASK: MaskitoOptions = {
	mask: /^\d+$/,
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

export const TOKEN_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		'-',
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
	],
};

export const PROTOCOLO_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
		/[a-zA-Z\d]/,
	],
};
