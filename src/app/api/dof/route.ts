import { config } from '@/lib/axios/axios';
import axios, { AxiosError } from 'axios';
// import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.json();
		console.log(formData);
		if (formData == undefined || formData == null)
			return NextResponse.json(
				{ err: 'Formulário incompleto ou vazio.' },
				{ status: 400 },
			);

		const apiresp = await axios.post(
			`${process.env.BACKEND_DOF_URL}/dof/requirement`,
			formData,
			config(request),
		);

		return NextResponse.json(
			{
				message: apiresp.data.message,
				tracking_id: apiresp.data.tracking_id,
				hash: apiresp.data.hash,
			},
			{ status: 201 },
		);
	} catch (err) {
		console.log(err);
		if (err instanceof AxiosError) {
			return NextResponse.json(
				{ message: err.response?.data.message },
				{ status: err.response?.status || 400 },
			);
		} else return NextResponse.json({ err: 'Erro interno' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		// Obtenha a consulta da requisição (query) do cliente.
		const tracking_id = request.nextUrl.searchParams.get('tracking_id');
		const cpf_cnpj = request.nextUrl.searchParams.get('cpf_cnpj');

		// Construa a URL da API com base nos parâmetros de consulta.
		const apiUrl = `${process.env.BACKEND_DOF_URL}/dof/requirement?tracking_id=${tracking_id}&cpf_cnpj=${cpf_cnpj}`;

		// Realize uma requisição GET para a URL construída.
		const response = await axios.get(apiUrl, config(request));

		// Verifique se a requisição foi bem-sucedida (status 200) antes de prosseguir.
		if (response.status === 200) {
			// Retorne os dados obtidos como resposta para o front-end.
			return NextResponse.json(response.data, { status: 200 });
		} else {
			// Trate outros códigos de status de acordo com as necessidades da sua aplicação.
			return NextResponse.json(
				{ err: 'Erro na requisição para a API.' },
				{ status: 500 },
			);
		}
	} catch (err) {
		console.error(err);
		return NextResponse.json({ err: 'Erro interno' }, { status: 500 });
	}
}
