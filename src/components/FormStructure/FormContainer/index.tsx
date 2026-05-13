import { cn } from '@/lib/utils';
import { type HTMLProps, forwardRef } from 'react';

const FormContainer = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		FormContainer.displayName;

		return (
			<div
				ref={ref}
				className={cn(
					'container divide-y bg-stone-50/50 p-0 max-sm:border-0 xl:border xl:border-t-0',
					className,
				)}
				{...props}
			/>
		);
	},
);

export default FormContainer;
