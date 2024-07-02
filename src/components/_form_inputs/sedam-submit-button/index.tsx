import { ReactNode } from 'react';

export function SedamSubmitButton({
	label,
	isSubmitting,
}: {
	label?: string | Element | ReactNode;
	isSubmitting?: boolean;
}) {
	return (
		<section className='col-span-full flex w-full justify-end'>
			<button
				type='submit'
				className='btn btn-primary bg-opacity-85 text-base text-beige-50'
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<div className='flex items-center gap-0.5'>
						<span className='loading loading-spinner loading-xs ml-0.5'> </span>
					</div>
				) : label ? (
					`${label}`
				) : (
					'Cadastrar'
				)}
			</button>
		</section>
	);
}
