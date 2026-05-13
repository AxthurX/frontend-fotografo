import { ErrorMessage } from '@hookform/error-message';
import type { ReactNode } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

export interface FileInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
	};
	rules?: {
		accept?: HTMLInputElement['accept'];
	};
	className?: string;
}

export default function FileInput<T extends FieldValues>({
	data,
	rules,
	className,
}: FileInputProps<T>) {
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
				type='file'
				accept={rules?.accept}
				id={data.id}
				className={`file-input file-input-bordered ${
					!error && 'mb-4'
				} h-10 w-full rounded-none focus:outline focus:outline-[3px] focus:outline-sage-300 focus:outline-offset-0 disabled:border-gray-400 disabled:border-solid disabled:border-opacity-40 disabled:text-gray-400`}
				{...register(data.id)}
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
