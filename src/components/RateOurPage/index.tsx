'use client';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '../FormInputs/SubmitButton';
import Fieldset from '../FormStructure/Fieldset';
import Separator from '../FormStructure/Separator';

export interface IRateSchema {
	name: string;
	email: string;
	title: string;
	message: string;
	stars: number;
}

const rateSchema = z.object({
	name: z.string().min(5).max(120),
	email: z.string().email().min(5).max(80),
	title: z.string().min(5).max(120),
	message: z.string().max(1000),
	stars: z.number().int().min(1).max(5),
});

const RateOurPage = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IRateSchema>({
		resolver: zodResolver(rateSchema, { errorMap: zodErrorMap }),
	});
	const [hoveredStars, setHoveredStars] = useState(0);
	const [selectedStars, setSelectedStars] = useState(0);

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
	const onSubmit = (data: IRateSchema) => {
		console.log(data);
	};

	return (
		<>
			<Separator id='separador' className=' h-12 bg-sage-200' />
			<div className='mb-8 h-20 bg-calpolygreen-900 '>
				<h3 className='flex h-full w-full items-center  justify-center text-center align-middle text-2xl text-beige-50'>
					Avalie nossa página
				</h3>
			</div>
			<Fieldset id='identificacaoDoRequerente' className='pb-4'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mx-8 mb-6 grid grid-cols-12 gap-3 px-2 md:gap-2 '>
						<div className='col-span-6 max-sm:col-span-full'>
							<label htmlFor={'name'} className='label my-1 py-0'>
								Nome
							</label>
							<input
								type={'text'}
								id={'name'}
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-600'
								}
								placeholder={'Insira seu nome'}
								{...register('name')}
							/>

							{errors && (
								<ErrorMessage
									errors={errors}
									name={'name'}
									render={({ message }) => (
										<span className='my-1 text-xs text-error'>{message}</span>
									)}
								/>
							)}
						</div>
						<div className='col-span-6 max-sm:col-span-full'>
							<label htmlFor={'email'} className='label my-1 py-0'>
								Email
							</label>
							<input
								type={'text'}
								id={'email'}
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-600'
								}
								placeholder={'Insira seu email'}
								{...register('email')}
							/>

							{errors && (
								<ErrorMessage
									errors={errors}
									name={'email'}
									render={({ message }) => (
										<span className='my-1 text-xs text-error'>{message}</span>
									)}
								/>
							)}
						</div>
						<div className='col-span-full max-sm:col-span-full'>
							<label htmlFor={'Titulo'} className='label my-1 py-0'>
								Titulo
							</label>
							<input
								type={'text'}
								id={'Titulo'}
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-600'
								}
								placeholder={'Insira seu Titulo'}
								{...register('title')}
							/>

							{errors && (
								<ErrorMessage
									errors={errors}
									name={'title'}
									render={({ message }) => (
										<span className='my-1 text-xs text-error'>{message}</span>
									)}
								/>
							)}
						</div>

						<div className='col-span-full max-sm:col-span-full'>
							<span className='label my-1 py-0'>Nota</span>
							{[...Array(5)].map((_, index) => {
								const starValue = index + 1;
								return (
									<button
										type='button'
										key={_}
										onMouseEnter={() => handleStarHover(starValue)}
										onMouseLeave={() => handleMouseLeave}
										onClick={() => handleClick(starValue)}
										className={`cursor-pointer text-3xl ${
											starValue <= (hoveredStars || selectedStars)
												? 'text-yellow-500'
												: 'text-gray-400'
										}`}
									>
										{starValue <= (hoveredStars || selectedStars) ? '★' : '☆'}
									</button>
								);
							})}
						</div>
						<div className='col-span-full max-sm:col-span-full'>
							<label htmlFor={'Titulo'} className='label my-1 py-0'>
								Avaliação
							</label>
							<textarea
								className='w-full rounded-none border border-beige-300 bg-beige-200 px-2 py-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400'
								rows={4}
								maxLength={1250}
								placeholder='Faça a sua avalização'
								{...register('message')}
							/>
						</div>
						<div className='col-span-full max-sm:col-span-full'>
							<SubmitButton.Wrapper>
								<SubmitButton>Enviar</SubmitButton>
							</SubmitButton.Wrapper>
						</div>
					</div>
				</form>
			</Fieldset>
		</>
	);
};
export default RateOurPage;
