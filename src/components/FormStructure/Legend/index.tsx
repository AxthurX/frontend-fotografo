import { cn } from '@/lib/utils';
import { type HTMLProps, forwardRef } from 'react';

const Legend = forwardRef<HTMLLegendElement, HTMLProps<HTMLLegendElement>>(
	({ className, ...props }, ref) => {
		Legend.displayName;

		return (
			<legend
				ref={ref}
				className={cn(
					'mb-6 flex min-h-12 w-full items-center justify-center border-red-200 border-x-0 border-y bg-beige-50 text-center font-semibold text-lg',
					className,
				)}
				{...props}
			/>
		);
	},
);

export default Legend;
