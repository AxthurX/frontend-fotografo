'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';

export default function Register() {
	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleNext = () => {
		if (step < 6) {
			setStep(step + 1);
			if (step === 1) {
				setEmail('');
				setPhone('');
				setPassword('');
				setConfirmEmail('');
				setConfirmPassword('');
			}
		}
	};

	const handlePrev = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center rounded-lg bg-gradient-to-b from-red-900 to-gray-800'>
			<div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
				<div className='mb-4 flex items-center justify-between'>
					{step != 1 && (
						<Button variant='ghost' size='icon' onClick={handlePrev}>
							<LuArrowLeft className='h-6 w-6' />
						</Button>
					)}
				</div>
				{step === 1 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							Olá, qual seu nome?
						</h2>
						<Input
							type='text'
							placeholder='Seu nome'
							className='mb-4'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</>
				)}
				{step === 2 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							Olá {name}, Qual seu número de telefone?
						</h2>
						<Input
							type='tel'
							placeholder='Seu telefone'
							className='mb-4'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</>
				)}
				{step === 3 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							Olá {name}, Qual seu melhor email?
						</h2>
						<Input
							type='email'
							placeholder='Seu email'
							className='mb-4'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</>
				)}
				{step === 4 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							{name}, Seu email está correto?
						</h2>
						<Input
							type='email'
							placeholder='Seu email'
							className='mb-4'
							value={email}
							onChange={(e) => setConfirmEmail(e.target.value)}
						/>
					</>
				)}
				{step === 5 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							Agora, precisamos que você cadastre uma senha.
						</h2>
						<Input
							type='password'
							placeholder='Sua senha'
							className='mb-4'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</>
				)}
				{step === 6 && (
					<>
						<h2 className='mb-10 text-center font-semibold text-xl'>
							Você poderia repetir sua senha, {name}
						</h2>
						<Input
							type='password'
							placeholder='Confirme sua senha'
							className='mb-4'
							value={password}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</>
				)}
				<div className='mb-6 flex items-center justify-between pt-16'>
					<Progress value={(step / 6) * 100} className='h-2 w-full' />
					<span className='ml-2 text-sm'>
						{step}/{6}
					</span>
				</div>
				<Button
					className='btn-md w-full bg-red-900 bg-opacity-95 text-base text-beige-50 transition hover:bg-red-950 hover:opacity-90'
					onClick={handleNext}
				>
					Avançar
				</Button>
			</div>
			<p className='mt-4 text-center text-base text-white'>
				Já tem conta?{' '}
				<Link
					href='/entrar'
					className='font-bold text-gray-600 hover:underline'
				>
					Faça o login aqui.
				</Link>
			</p>
		</div>
	);
}
