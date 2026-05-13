import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import { type FC, type HTMLProps, forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		Card.displayName;

		return (
			<div
				ref={ref}
				className={cn(
					'card card-compact h-76 w-60 transform rounded-lg border border-white bg-white shadow-lg transition-transform hover:scale-105',
					className,
				)}
				{...props}
			/>
		);
	},
);

const CardImage: FC<ImageProps> = (props) => {
	return (
		<div className={cn('relative overflow-hidden', props.className)}>
			<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
			<Image
				src={props.src || '/placeholder.svg'}
				alt={props.alt}
				height={props.height}
				width={props.width}
				className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
			/>
		</div>
	);
};

const CardBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		CardBody.displayName;

		return (
			<div
				ref={ref}
				className={cn('card-body !py-2.5 h-32', className)}
				{...props}
			/>
		);
	},
);

const CardDescription = forwardRef<
	HTMLHeadingElement,
	HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
	CardDescription.displayName;

	return (
		<div
			ref={ref}
			className={cn(
				'line-clamp-4 overflow-hidden overflow-ellipsis text-secondary',
				className,
			)}
			{...props}
		/>
	);
});

const CardTitle = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		CardTitle.displayName;

		return (
			<span
				ref={ref}
				className={cn(
					'card-title !leading-5 justify-center text-lg',
					className,
				)}
				{...props}
			/>
		);
	},
);

const CardGroup = Object.assign(Card, {
	Image: CardImage,
	Body: Object.assign(CardBody, {
		Title: CardTitle,
		Description: CardDescription,
	}),
});

export { CardGroup as CardV2 };
