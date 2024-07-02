import { ErrorMessage } from '@hookform/error-message';
import { ReactNode } from 'react';
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';

export interface FileInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		errors: FieldErrors;
		register: UseFormRegister<T>;
	};
	className?: string;
}

export function SedamFileInput<T extends FieldValues>({
	data,
	className,
}: FileInputProps<T>) {
	const idParts = data.id.split('.');
	let error = data.errors;
	for (const part of idParts) {
		error = error?.[part] as FieldErrors;
	}

	return (
		<div className={className}>
			<label htmlFor={data.id} className='label my-1 py-0'>
				{data.label}
			</label>
			<input
				type='file'
				id={data.id}
				className={`file-input file-input-bordered ${
					!error && 'mb-4'
				} h-10 w-full rounded-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400`}
				{...data.register(data.id)}
			/>
			<ErrorMessage
				errors={data.errors}
				name={data.id}
				render={({ message }) => (
					<div className='mb-4 mt-1 text-xs text-error'>{message}</div>
				)}
			/>
		</div>
	);
}
