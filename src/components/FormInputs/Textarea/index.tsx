import { Badge } from '@/components/ui/badge';
import { ErrorMessage } from '@hookform/error-message';
import type { ReactNode } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

export interface TextareaProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		placeholder?: string;
		maxLength?: number;
		counter?: boolean;
		currentValueTextarea?: number;
	};
	className?: string;
}

export function Textarea<T extends FieldValues>({
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
				className={`textarea textarea-bordered text-base ${
					!error && 'mb-4'
				} min-h-10 w-full rounded-none px-2 transition focus:outline focus:outline-[2.5px] focus:outline-sage-300 focus:outline-offset-0 disabled:border-gray-400 disabled:border-solid disabled:border-opacity-40 disabled:text-gray-400 dark:focus:outline-white ${data.counter && '!-mb-1'}`}
				{...register(data.id)}
				rows={3}
				placeholder={data.placeholder}
				maxLength={data.maxLength}
			/>
			<div
				className={`flex ${data.counter && 'flex-row-reverse'} justify-between`}
			>
				{data.counter && (
					<Badge className='bg-accent p-1.5 px-2.5 transition hover:bg-sage-400 dark:bg-black dark:text-white dark:hover:bg-neutral-950'>{`${data.currentValueTextarea ?? 0} / 2048`}</Badge>
				)}

				<ErrorMessage
					errors={errors}
					name={data.id}
					render={({ message }) => (
						<div className='-mt-0.5 mb-4 text-error text-xs'>{message}</div>
					)}
				/>
			</div>
		</div>
	);
}
