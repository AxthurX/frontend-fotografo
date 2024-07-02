'use client';

import { ErrorMessage } from '@hookform/error-message';
import { Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import {
	Controller,
	type FieldErrors,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';
import Select, { type ClassNamesConfig, type GroupBase } from 'react-select';

export interface SelectProps<T extends FieldValues> {
	data: {
		id: Path<T>;
		label: string | ReactNode;
		options: { value: string; label: string }[];
	};
	rules?: {
		isClearable?: true;
		disabled?: boolean;
	};
	className?: string;
}

export function SedamSelect<T extends FieldValues>({
	data,
	rules,
	className,
}: SelectProps<T>) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const idParts = data.id.split('.');
	let error = errors;
	for (const part of idParts) {
		error = error?.[part] as FieldErrors;
	}
	const reactSelectCss: ClassNamesConfig<
		{
			value: string;
			label: string;
		},
		false,
		GroupBase<{
			value: string;
			label: string;
		}>
	> = {
		container: ({ isFocused, isDisabled }) => {
			return `${
				isFocused
					? 'outline outline-[3px] outline-offset-0 outline-sage-300'
					: ''
			} ${
				isDisabled &&
				'!pointer-events-auto border-solid border-gray-400 border-opacity-40'
			}`;
		},
		control: ({ isDisabled }) => {
			return `appearance-none bg-beige-200 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] !min-h-10 w-full rounded-none px-2 py-0 text-base focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 ${
				!error && 'mb-4'
			} ${
				isDisabled &&
				'!cursor-not-allowed border-solid border-gray-400 border-opacity-40 text-gray-400 !input-disabled text-opacity-40'
			}`;
		},
		menu: () => {
			return 'bg-base-100 text-base';
		},
		menuList: () => {
			return 'border border-sage-300 p-2';
		},
		option: ({ isFocused }) => {
			return `border p-1 ${
				isFocused
					? 'bg-sage-200 border-sage-300 bg-opacity-75'
					: 'border-transparent'
			}`;
		},
		placeholder: ({ isDisabled }) => {
			return `${isDisabled && 'text-opacity-40'} text-gray-500`;
		},
	};

	return (
		<div className={className}>
			<label htmlFor={data.id} className='label my-1 py-0'>
				{data.label}
			</label>
			<Controller
				name={data.id}
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						id={data.id}
						instanceId={data.id}
						classNames={reactSelectCss}
						options={data.options}
						placeholder='Selecione: '
						unstyled
						inputId={data.id}
						isClearable={rules?.isClearable}
						isDisabled={rules?.disabled}
						components={{
							ClearIndicator: ({ innerProps: { ref, ...restInnerProps } }) => (
								<div
									ref={ref}
									{...restInnerProps}
									className='mr-2 border p-1 hover:bg-red-200'
									style={{
										borderColor: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
									}}
								>
									<Trash2 className='size-4' />
								</div>
							),
							NoOptionsMessage: () => (
								<div className='p-2 text-center text-base'>
									Nenhum encontrado.
								</div>
							),
						}}
						onChange={(option) => {
							field.onChange(option ? option.value : undefined);
						}}
						value={data.options.find((option) => option.value === field.value)}
					/>
				)}
			/>
			<ErrorMessage
				errors={errors}
				name={data.id}
				render={({ message }) => (
					<div className='mb-4 mt-1 text-xs text-error'>{message}</div>
				)}
			/>
		</div>
	);
}
