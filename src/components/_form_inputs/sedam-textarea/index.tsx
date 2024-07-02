import { ErrorMessage } from '@hookform/error-message';
import { ReactNode } from 'react';
import {
	FieldErrors,
	FieldValues,
	Path,
	useFormContext,
} from 'react-hook-form';

export interface TextareaProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
	};
	className?: string;
}

export function SedamTextarea<T extends FieldValues>({
	data,
	className,
}: TextareaProps<T>) {
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
			<textarea
				id={data.id}
				className={`textarea text-base textarea-bordered ${
					!error && 'mb-4'
				} min-h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400`}
				{...register(data.id)}
				rows={3}
			/>
			<ErrorMessage
				errors={errors}
				name={data.id}
				render={({ message }) => (
					<div className='mb-4 -mt-0.5 text-xs text-error'>{message}</div>
				)}
			/>
		</div>
	);
}
