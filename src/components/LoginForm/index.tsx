'use client';

import { onErrorLogin } from '@/lib/utils';
import { zodErrorMap } from '@/lib/zodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
	type ILoginSchema,
	LOGIN_ZOD_OBJECT,
} from '../../app/(unauthorized)/entrar/lib/interface';
import { Input } from '../FormInputs/Input';
import { PasswordInput } from '../FormInputs/PasswordInput';

const LoginForm = () => {
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

			const response = await axios.post('/admin/api/admin/login', form_data, {
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
		<FormProvider {...methods}>
			<form className='mb-6 px-5' onSubmit={methods.handleSubmit(onSubmit)}>
				<Input data={{ id: 'login', label: 'Login' }} />
				<PasswordInput
					data={{
						id: 'senha',
						label: 'Senha',
						errors: methods.formState.errors,
						register: methods.register,
					}}
				/>
				<div className='mb-4 flex justify-center'>
					<button
						className='btn btn-primary w-full bg-opacity-85 text-base text-beige-50'
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
					</button>
				</div>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
