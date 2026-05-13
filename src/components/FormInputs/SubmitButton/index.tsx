import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

export function SubmitButton({
	label,
	disabled,
	variant,
	className,
}: {
	label?: string | ReactNode;
	disabled?: boolean;
	variant?: 'default' | 'wide';
	className?: string;
}) {
	const buttonVariants = cva(
		'btn btn-primary bg-opacity-85 text-base text-beige-50',
		{
			variants: {
				variant: {
					default: '',
					wide: 'w-full',
				},
			},
			defaultVariants: {
				variant: 'default',
			},
		},
	);

	return (
		<section className='col-span-full flex w-full justify-end'>
			<button
				type='submit'
				className={cn(buttonVariants({ variant }), className)}
				disabled={disabled}
			>
				{disabled ? <Spinner /> : (label ?? 'Cadastrar')}
			</button>
		</section>
	);
}
