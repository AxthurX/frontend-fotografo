'use client';

import { Input } from '@/components/FormInputs/Input';
import { PasswordInput } from '@/components/FormInputs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { onErrorLogin } from '@/lib/utils';
import { zodErrorMap } from '@/lib/zodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type ILoginSchema, LOGIN_ZOD_OBJECT } from './lib/interface';

export default function Login() {
	const methods = useForm<ILoginSchema>({
		resolver: zodResolver(LOGIN_ZOD_OBJECT, { errorMap: zodErrorMap }),
	});

	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: ILoginSchema) => {
		try {
			const form_data = {
				email: data.email,
				senha: data.senha,
			};

			const response = await axios.post('/api/login', form_data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.statusText == 'OK') {
				router.push('/home');
			}
		} catch (error) {
			onErrorLogin(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-red-900 to-gray-800'>
				<div className='w-[360px] rounded-xl bg-gray-100 pt-8 pb-4 shadow shadow-white'>
					<FormProvider {...methods}>
						<form
							className='mb-6 px-6'
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<Input data={{ id: 'email', label: 'Email' }} />
							<PasswordInput
								data={{
									id: 'senha',
									label: 'Senha',
									errors: methods.formState.errors,
									register: methods.register,
								}}
							/>
							<div className='mt-2 mb-4 flex flex-col justify-center gap-2'>
								<Button
									className='btn-md w-full bg-red-900 bg-opacity-95 text-base text-beige-50 transition hover:bg-red-900 hover:opacity-90'
									type='submit'
									disabled={loading}
								>
									{loading ? (
										<div className='flex items-center gap-0.5'>
											<span className='loading loading-spinner loading-xs ml-0.5' />
										</div>
									) : (
										'Entrar'
									)}
								</Button>
								<Button
									className='btn-md w-full bg-red-950 bg-opacity-95 text-base text-beige-50 transition hover:bg-red-950 hover:opacity-90'
									type='submit'
									disabled={loading}
								>
									{loading ? (
										<div className='flex items-center gap-0.5'>
											<span className='loading loading-spinner loading-xs ml-0.5' />
										</div>
									) : (
										'Criar conta'
									)}
								</Button>
							</div>
						</form>
					</FormProvider>
					<div className='flex-end text-center'>
						<Link
							href='/esqueceu-senha'
							prefetch={false}
							className='text-black hover:text-royalblue-800 hover:underline'
						>
							Esqueceu sua senha?
						</Link>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
}
