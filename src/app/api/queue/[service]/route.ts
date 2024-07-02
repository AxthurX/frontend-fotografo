import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(
	request: Request,
	{ params }: { params: { service: string } },
) {
	const { service } = params;
	const body = await request.json();

	try {
		await axios.post(
			`${process.env[`BACKEND_${service.toUpperCase()}_URL`]}/${service}/queue`,
			body,
		);

		return NextResponse.json({ message: 'Adicionado a fila' }, { status: 200 });
	} catch (err) {
		//console.log(err);
		if (err instanceof AxiosError) {
			return NextResponse.json(
				{ message: err.response?.data.message },
				{ status: err.response?.status || 400 },
			);
		}
		return NextResponse.json({ err: 'Erro interno' }, { status: 500 });
	}
}
