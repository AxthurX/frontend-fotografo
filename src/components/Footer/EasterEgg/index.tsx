'use client';

import { SubmitButton } from '@/components/FormInputs/SubmitButton';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const starSchema = z.object({
	stars: z.number().int().min(1).max(5),
});

const EasterEgg = (props: { version: string }) => {
	const { handleSubmit, setValue, reset } = useForm<{ stars: number }>({
		resolver: zodResolver(starSchema),
	});

	const [click, setClick] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [hoveredStars, setHoveredStars] = useState(0);
	const [selectedStars, setSelectedStars] = useState(0);

	const handleOpenClick = () => {
		setClick(click + 1);
		if (click >= 9) {
			setIsOpen(true);
			setClick(0);
		}
	};
	const handleCloseClick = () => {
		setIsOpen(!isOpen);
	};

	const handleStarHover = (star: number) => {
		setHoveredStars(star);
	};

	const handleMouseLeave = () => {
		setHoveredStars(0);
	};

	const handleClick = (star: number) => {
		setSelectedStars(star);
		setValue('stars', star);
	};
	const onSubmit = (data: { stars: number }) => {
		console.log(data);
		reset({ stars: 0 });
		setHoveredStars(0);
		setSelectedStars(0);
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<button className='font-bold' type='button' onClick={handleOpenClick}>
					Versão: {props.version}
				</button>
				<DialogContent
					className={
						'scroll-dialog max-h-[90%] items-center overflow-auto border-2 border-calpolygreen-700 text-black sm:max-w-[700px]'
					}
				>
					<DialogHeader>
						<DialogTitle className='pb-2'>Parabéns!!</DialogTitle>
					</DialogHeader>

					<div className='mt-3 flex items-center gap-2 align-middle text-xl'>
						<CheckCheckIcon size={60} />
						<span className=''>
							Este site foi desenvolvido pela GERDES - Gerência de
							Desenvolvimento.
						</span>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='flex w-full flex-col justify-center text-center'>
							<span className='label mx-auto my-1 py-0 text-xl'>
								Deixe sua nota:
							</span>
							<div>
								{[...Array(5)].map((_, index) => {
									const starValue = index + 1;
									return (
										<button
											type='button'
											key={starValue}
											onMouseEnter={() => handleStarHover(starValue)}
											onMouseLeave={handleMouseLeave}
											onClick={() => handleClick(starValue)}
											className={`cursor-pointer text-3xl ${
												starValue <= (hoveredStars || selectedStars)
													? 'text-yellow-500'
													: 'text-gray-700'
											}`}
										>
											{starValue <= (hoveredStars || selectedStars) ? '★' : '☆'}
										</button>
									);
								})}
							</div>
						</div>
						<DialogFooter>
							<DialogClose>
								<SubmitButton.Wrapper>
									<button
										type='submit'
										className='btn btn-ghost  text-lg font-semibold'
									>
										Enviar
									</button>
									<button
										type='button'
										id=''
										onClick={() => handleCloseClick()}
										className='btn btn-ghost text-lg font-semibold'
									>
										Fechar
									</button>
								</SubmitButton.Wrapper>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
export default EasterEgg;
