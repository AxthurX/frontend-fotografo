import { ErrorMessage } from '@hookform/error-message';
import { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import { upperCase } from 'lodash';
import { ReactNode } from 'react';
import {
	Controller,
	FieldErrors,
	FieldValues,
	Path,
	PathValue,
	useFormContext,
} from 'react-hook-form';

export interface MaskedInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label?: string | ReactNode;
		mask: MaskitoOptions;
		upperCase?: boolean;
	};
	rules?: {
		maxLength?: number;
		disabled?: true;
	};
	className?: string;
}

export function SedamMaskedInput<T extends FieldValues>({
	data,
	rules,
	className,
}: MaskedInputProps<T>) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const idParts = data.id.split('.');
	let error = errors;
	for (const part of idParts) {
		error = error?.[part] as FieldErrors;
	}
	const maskito = useMaskito({ options: data.mask });

	return (
		<div className={className}>
			{data.label && (
				<label htmlFor={data.id} className='label my-1 py-0'>
					{data.label}
				</label>
			)}
			<Controller
				name={data.id}
				control={control}
				defaultValue={'' as PathValue<T, Path<T>>}
				render={({ field }) => (
					<input
						{...field}
						disabled={rules?.disabled}
						ref={(ref) => {
							field.ref(ref);
							maskito(ref);
						}}
						value={!upperCase ? field.value : field.value.toUpperCase()}
						onInput={field.onChange}
						id={data.id}
						maxLength={rules?.maxLength}
						className={`input input-bordered ${
							!error && 'mb-4'
						} h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400`}
					/>
				)}
			/>
			<ErrorMessage
				errors={errors}
				name={data.id}
				render={({ message }) => (
					<div className='mb-4 mt-1 text-xs text-error'>{message}</div>
				)}
			/>
		</div>
	);
}
