import { config } from '@/lib/axios/axios';
import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.json();

		if (formData == undefined || formData == null)
			return NextResponse.json(
				{ message: 'Formulário incompleto ou vazio.' },
				{ status: 400 },
			);

		const apiresp = await axios.post(
			`${process.env.BACKEND_DEAF_URL}/deaf/requirement`,
			formData,
			config(request),
		);

		return NextResponse.json({ message: apiresp.data.message , tracking_id:apiresp.data.tracking_id, hash:apiresp.data.hash}, { status: 201 });
	} catch (err) {
		console.error(err);
		if (err instanceof AxiosError)
			return NextResponse.json(
				{ message: err.response?.data.message },
				{ status: err.response?.status || 400 },
			);
		else return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
	}
}
