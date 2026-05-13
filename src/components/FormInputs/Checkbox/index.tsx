import { cn } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import type { ReactNode } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

export interface CheckboxProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
	};
	rules?: {
		disabled?: true;
		checked?: true;
	};
	className?: string;
	onChange?: () => void;
}

export function Checkbox<T extends FieldValues>({
	data,
	rules,
	className,
	onChange,
}: CheckboxProps<T>) {
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
		<div
			className={cn(
				`flex flex-row-reverse justify-end ${!error && 'mb-4'}`,
				className,
			)}
		>
			<label htmlFor={data.id} className='text-base'>
				{data.label}
			</label>
			<input
				type='checkbox'
				id={data.id}
				checked={rules?.checked}
				className='checkbox-primary checkbox mr-2 border-beige-200 bg-beige-50 focus:outline focus:outline-[3px] focus:outline-sage-300 focus:outline-offset-0 dark:rounded-lg dark:border-white dark:focus:border-none dark:focus:outline-white'
				{...register(data.id)}
				onChange={(e) => {
					register(data.id).onChange(e);
					if (onChange) onChange();
				}}
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
