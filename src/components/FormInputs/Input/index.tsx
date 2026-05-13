import { ErrorMessage } from '@hookform/error-message';
import type { ReactNode } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

export interface TextInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		type?: HTMLInputElement['type'];
	};
	rules?: {
		readOnly?: true;
		maxLength?: number;
		disabled?: true;
	};
	className?: string;
}

export function Input<T extends FieldValues>({
	data,
	rules,
	className,
}: TextInputProps<T>) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const idParts = data.id.split('.');
	let error = errors;
	for (const part of idParts) {
		error = error?.[part] as FieldErrors;
	}

	return (
		<div className={className}>
			<label htmlFor={data.id} className='label my-1 py-0'>
				{data.label}
			</label>
			<input
				type={data.type ?? 'text'}
				id={data.id}
				className={`input input-bordered ${
					!error && 'mb-4'
				} h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-sage-300 focus:outline-offset-0 disabled:border-gray-400 disabled:border-solid disabled:border-opacity-40 disabled:text-gray-400`}
				{...register(data.id)}
				{...rules}
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
