import { ErrorMessage } from '@hookform/error-message';
import { ReactNode } from 'react';
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';

interface PasswordInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		errors: FieldErrors;
		register: UseFormRegister<T>;
	};
	className?: string;
}

export function SedamPassword2Input<T extends FieldValues>({
	data,
	className,
}: PasswordInputProps<T>) {
	const idParts = data.id.split('.');
	let error = data.errors;
	let rootError = data.errors;
	for (let i = 0; i < idParts.length; i++) {
		if (i === idParts.length - 1) {
			rootError = error as FieldErrors;
		}
		error = error?.[idParts[i]] as FieldErrors;
	}

	const lastDotIndex = data.id.lastIndexOf('.');
	const rootId = `${data.id.substring(0, lastDotIndex)}.root`;

	return (
		<div className={className}>
			<label htmlFor={data.id} className='label my-1 py-0'>
				Confirme a senha
			</label>
			<input
				type='password'
				id={data.id}
				className={`input input-bordered ${
					!error && !rootError && 'mb-4'
				} h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400`}
				{...data.register(data.id)}
			/>
			<ErrorMessage
				errors={data.errors}
				name={data.id}
				render={({ message }) => (
					<div
						className={`${!rootError.root && 'mb-4'} mt-1 text-xs text-error`}
					>
						{message}
					</div>
				)}
			/>
			<ErrorMessage
				errors={data.errors}
				name={rootId}
				render={({ message }) => (
					<div className='mb-4 mt-1 text-xs text-error'>{message}</div>
				)}
			/>
		</div>
	);
}
