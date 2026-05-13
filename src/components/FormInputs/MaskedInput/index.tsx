import { ErrorMessage } from '@hookform/error-message';
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import type { ReactNode } from 'react';
import {
	Controller,
	type FieldErrors,
	type FieldValues,
	type Path,
	type PathValue,
	useFormContext,
} from 'react-hook-form';

export interface MaskedInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		mask: MaskitoOptions;
	};
	rules?: {
		readOnly?: true;
		maxLength?: number;
		disabled?: true;
	};
	upperCase?: true;
	className?: string;
	onChange?: () => void;
}

export function MaskedInput<T extends FieldValues>({
	data,
	rules,
	upperCase,
	className,
	onChange,
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
			<label htmlFor={data.id} className='label my-1 py-0'>
				{data.label}
			</label>
			<Controller
				name={data.id}
				control={control}
				defaultValue={'' as PathValue<T, Path<T>>}
				render={({ field }) => (
					<input
						{...field}
						{...rules}
						ref={(ref) => {
							field.ref(ref);
							maskito(ref);
						}}
						onInput={(e) => {
							field.onChange(e);
							if (onChange) onChange();
						}}
						id={data.id}
						className={`input input-bordered ${
							!error && 'mb-4'
						} h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-sage-300 focus:outline-offset-0 disabled:border-gray-400 disabled:border-solid disabled:border-opacity-40 disabled:text-gray-400 ${upperCase ? 'uppercase' : ''}`}
					/>
				)}
			/>
			<ErrorMessage
				errors={errors}
				name={data.id}
				render={({ message }) => (
					<div className='mt-1 mb-4 text-error text-xs'>{message}</div>
				)}
			/>
		</div>
	);
}
