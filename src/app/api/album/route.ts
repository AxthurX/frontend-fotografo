import axios, { AxiosError } from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	console.log(request)
	const id = searchParams.get('id');
	try {
		if (id !== null) {
			const response = await axios.get('');
			return NextResponse.json(response.data);
		}
	} catch (error: AxiosError | unknown) {
		console.log(error);
		if (error instanceof AxiosError) {
			return NextResponse.json(
				{ message: error.response?.data.message },
				{ status: error.response?.status || 400 },
			);
		} else {
			return NextResponse.json(
				{ message: 'Ocorreu um erro desconhecido.' },
				{ status: 500 },
			);
		}
	}
}
