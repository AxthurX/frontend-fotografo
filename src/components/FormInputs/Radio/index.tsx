import { cn } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import type { ReactNode } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

export interface RadioButtonProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		options: { value: string; label: string }[];
	};
	rules?: {
		disabled?: true;
	};
	className?: string;
	onChange?: () => void;
}

export function Radio<T extends FieldValues>({
	data,
	rules,
	className,
	onChange,
}: RadioButtonProps<T>) {
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
		<>
			<fieldset className={cn('flex flex-row flex-wrap gap-2', className)}>
				<legend className='label py-0 font-semibold max-sm:mb-2'>
					{data.label}
				</legend>
				{data.options.map((option) => (
					<div
						className={'flex items-center gap-0.5 max-sm:gap-1 md:py-1'}
						key={`${data.id}-${option.value}`}
					>
						<input
							type='radio'
							id={`${data.id}-${option.value}`}
							value={option.value}
							className={
								'radio-primary radio border-beige-200 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-sage-300 focus:outline-offset-0 disabled:bg-gray-300 disabled:opacity-75 max-lg:mr-2 dark:focus:outline-white'
							}
							{...register(data.id)}
							onChange={(e) => {
								register(data.id).onChange(e);
								if (onChange) onChange();
							}}
							{...rules}
						/>
						<label
							htmlFor={`${data.id}-${option.value}`}
							className='label font-normal text-base'
						>
							{option.label}
						</label>
					</div>
				))}
			</fieldset>
			<ErrorMessage
				errors={errors}
				name={data.id}
				render={({ message }) => (
					<div className='-mt-4 col-span-full mb-4 text-error text-xs'>
						{message}
					</div>
				)}
			/>
		</>
	);
}
