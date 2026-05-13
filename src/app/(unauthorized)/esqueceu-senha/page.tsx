import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

export default function ResetPassword() {
	return (
		<>
			<div className='flex min-h-screen items-center justify-center bg-red-300 bg-opacity-35'>
				<div className='w-[360px] flex-col justify-center rounded-xl bg-beige-100 shadow-xl'>
					<div className='flex min-h-[100px] flex-col items-center justify-center rounded-t-lg border-2 border-calpolygreen-700 bg-calpolygreen-800 pt-4 text-center font-semibold text-2xl text-beige-50'>
						<Image
							src={''}
							width={242}
							height={88}
							alt='Logo'
							className='mb-4'
						/>
						<span className='h-full w-full bg-calpolygreen-900 p-4'>
							Recuperar Senha
						</span>
					</div>
					{/* <ForgotPassword params={{ token: '' }} /> */}
				</div>
			</div>
			<Toaster />
		</>
	);
}
