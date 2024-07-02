import { MaskitoMask, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

/**
 * Para referência de uso, consulte os componentes MaskedTextInput
 * e FieldArrayMaskedTextInput.
 *
 */

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

export const DYNAMIC_CPF_CNPJ_MASKITO_MASK: MaskitoOptions = {
	mask: maskCpfCnpj,
};

export const CAP_CM_MASKITO_MASK: MaskitoOptions = {
  mask: /^\d{1,4}$/
};

export const HEIGHT_M_MASKITO_MASK: MaskitoOptions = {
  mask: /^\d{1,3}$/
};

export const VOLUME_MASKITO_MASK: MaskitoOptions = {
  mask: /^\d{1,7}$/
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

export const CEP_MASKITO_MASK: MaskitoOptions = {
	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export const NUMBER_MASKITO_MASK: MaskitoOptions = {
	mask: /^\d+$/,
};
export const ONLY_NUMBER_MASKITO_MASK: MaskitoOptions = {
	mask: /^\d+$/,
};

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

export const CARGO_MASKITO_MASK: MaskitoOptions = maskitoNumberOptionsGenerator(
	{
		decimalSeparator: ',',
		precision: 3,
		min: 0,
		max: 999.999,
	},
);

export const RG_MASKITO_MASK: MaskitoOptions = {
	mask: /^(\d|-|,|\.)+$/,
};

export const LICENSE_PLATE_MASK: MaskitoOptions = {
	mask: [/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, /\d/, /[a-zA-Z\d]/, /\d/, /\d/],
};

export const BARCODE_MASKITO_MASK: MaskitoOptions = {
	mask: [
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		' ',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		' ',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		' ',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
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

export const COORDINATE_GEOGRAPHIC_MASK: MaskitoOptions = {
	mask: [
		'-',
		/\d/,
		/\d/,
		'°',
		/\d/,
		/\d/,
		"'",
		/\d/,
		/\d/,
		',',
		/\d/,
		/\d/,
		/\d/,
		'"',
	],
};
//51° 29' 46" N
export const RONDONIA_LATITUDE_MASK: MaskitoOptions = {
	mask: [/\d/, /\d/, '°', ' ', /\d/, /\d/, "'", ' ', /\d/, /\d/, '"', ' ', 'S'],
};

export const RONDONIA_LONGITUDE_MASK: MaskitoOptions = {
	mask: [/\d/, /\d/, '°', ' ', /\d/, /\d/, "'", ' ', /\d/, /\d/, '"', ' ', 'O'],
};
//definir padrões e máscaras para LAT e LON
//criar máscara para código de barras ou número da declaração de órgãos públicos

export const CPF_CNPJ_MASKITO_OPTIONS = {
	options: DYNAMIC_CPF_CNPJ_MASKITO_MASK,
};
export const CNPJ_MASKITO_OPTIONS = { options: CNPJ_MASKITO_MASK };
export const CEP_MASKITO_OPTIONS = { options: CEP_MASKITO_MASK };
export const NUMBER_MASKITO_OPTIONS = { options: NUMBER_MASKITO_MASK };
export const ONLY_NUMBER_MASKITO_OPTIONS = {
	options: ONLY_NUMBER_MASKITO_MASK,
};
export const PHONE_MASKITO_OPTIONS = { options: PHONE_MASKITO_MASK };
export const CARGO_MASKITO_OPTIONS = { options: CARGO_MASKITO_MASK };
export const RG_MASKITO_OPTIONS = { options: RG_MASKITO_MASK };
export const LICENSE_PLATE_MASKITO_OPTIONS = { options: LICENSE_PLATE_MASK };
export const BARCODE_MASKITO_OPTIONS = { options: BARCODE_MASKITO_MASK };
export const CAR_RECORD_MASKITO_OPTIONS = { options: CAR_RECORD_NUMBER_MASK };
export const COORDINATE_GEOGRAPHIC_MASKITO_OPTIONS = {
	options: COORDINATE_GEOGRAPHIC_MASK,
};
export const RONDONIA_LATITUDE_MASKITO_OPTIONS = {
	options: RONDONIA_LATITUDE_MASK,
};
export const RONDONIA_LONGITUDE_MASKITO_OPTIONS = {
	options: RONDONIA_LONGITUDE_MASK,
};
