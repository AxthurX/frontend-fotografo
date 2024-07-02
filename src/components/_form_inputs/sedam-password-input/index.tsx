import { ErrorMessage } from '@hookform/error-message';
import { Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState } from 'react';
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';

export interface PasswordInputProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		errors: FieldErrors;
		register: UseFormRegister<T>;
	};
	className?: string;
}

export function SedamPasswordInput<T extends FieldValues>({
	data,
	className,
}: PasswordInputProps<T>) {
	const [showPassword, setShowPassword] = useState(false);
	const idParts = data.id.split('.');
	let error = data.errors;
	for (const part of idParts) {
		error = error?.[part] as FieldErrors;
	}

	return (
		<div className={className}>
			<label htmlFor={data.id} className='label my-1 py-0'>
				Senha
			</label>
			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					id={data.id}
					className={`input input-bordered ${
						!error && 'mb-4'
					} h-10 w-full rounded-none px-2 pr-8 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400`}
					{...data.register(data.id)}
				/>
				<button
					onClick={() => setShowPassword(!showPassword)}
					type='button'
					className='absolute inset-y-0 right-0 flex h-10 items-center duration-500 animate-in fade-in hover:bg-sage-300'
				>
					{showPassword ? (
						<EyeOff className='h-10 w-10 p-2 duration-500 animate-in fade-in hover:text-beige-50' />
					) : (
						<Eye className='h-10 w-10 p-2 duration-500 animate-in fade-in hover:text-beige-50' />
					)}
				</button>
			</div>
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
