'use client';

import { services } from '@/lib/forms/area-usuario/listOfServices';
import { formTrackingSchema } from '@/lib/forms/area-usuario/schema';
import { ICombinedSchema, IFormTracking } from '@/lib/forms/combinedInterfaces';
import { zodErrorMap } from '@/lib/forms/zodErrorMap';
import { DYNAMIC_CPF_CNPJ_MASKITO_MASK } from '@/lib/maskito/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { SedamMaskedInput } from '../_form_inputs/sedam-masked-input';
import { PROTOCOLO_MASKITO_MASK } from '../_form_inputs/sedam-masked-input/masks';
import { useEffect } from 'react';
import { formatCpfCnpj } from '@/lib/utils';
import { SedamSelect } from '../_form_inputs/sedam-select';

interface IFiles {
	files: FileList;
}

export interface ISelectedFiles {
	selected_files?: IFiles[];
}

export default function AreaUsuario() {
	const router = useRouter();

	const search_params = useSearchParams();
	const tracking_id_param = search_params.get('tracking_id');
	const cpf_cnpj_param = search_params.get('cpf_cnpj');
	const service_param = search_params.get('service');

	const methods = useForm<ICombinedSchema>({
		resolver: zodResolver(formTrackingSchema, { errorMap: zodErrorMap }),
	});

	useEffect(() => {
		if (tracking_id_param) {
			methods.resetField('tracking.tracking_id');
			methods.setValue('tracking.tracking_id', tracking_id_param);
		} else {
			methods.resetField('tracking.tracking_id');
			methods.setValue('tracking.tracking_id', '');
		}

		if (cpf_cnpj_param) {
			methods.resetField('tracking.cpf_cnpj');
			methods.setValue('tracking.cpf_cnpj', formatCpfCnpj(cpf_cnpj_param));
		} else {
			methods.resetField('tracking.cpf_cnpj');
			methods.setValue('tracking.cpf_cnpj', '');
		}

		if (service_param) {
			methods.resetField('tracking.select');
			methods.register('tracking.select');
			methods.unregister('tracking.select');
			methods.setValue('tracking.select', service_param);
		} else {
			methods.resetField('tracking.select');
			methods.register('tracking.select');
			methods.unregister('tracking.select');
			methods.setValue('tracking.select', '');
		}
	}, [service_param, cpf_cnpj_param, tracking_id_param, methods]);



	const onSubmit = (data: IFormTracking) => {
		const url_search_params = new URLSearchParams(window.location.search);
		url_search_params.set('tracking_id', data.tracking.tracking_id || '');
		url_search_params.set('cpf_cnpj', data.tracking.cpf_cnpj || '');
		url_search_params.set('service', data.tracking.select || '');
		router.push(`/area-usuario?${url_search_params}`);
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'>
				<div className='container mb-6 grid grid-cols-12 gap-3'>
					<div className='col-span-6 max-sm:col-span-full'>
						<SedamSelect
							data={{
								id: 'tracking.select',
								label: 'Serviço',
								options: services,
							}}
						/>
					</div>
					<div className='col-span-3 max-sm:col-span-full'>
						<SedamMaskedInput
							data={{
								label: 'CPF / CNPJ',
								id: 'tracking.cpf_cnpj',
								upperCase: false,
								mask: DYNAMIC_CPF_CNPJ_MASKITO_MASK,
							}}
							rules={{
								maxLength: 18,
							}}
						/>
					</div>
					<div className='col-span-3 max-sm:col-span-full'>
						<SedamMaskedInput
							data={{
								label: 'Protocolo',
								id: 'tracking.tracking_id',
								upperCase: true,
								mask: PROTOCOLO_MASKITO_MASK,
							}}
							rules={{
								maxLength: 20,
							}}
						/>
					</div>
					<div className='col-span-full inline-flex gap-2 sm:mt-4'>
						<button type='submit' className='btn btn-primary ml-auto flex'>
							Procurar
						</button>
						<button
							type='button'
							className='btn btn-error flex'
							onClick={() => methods.reset()}
						>
							Limpar
						</button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
