import axios, { AxiosError } from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const name = searchParams.get('name');

	try {
		if (name !== null) {
			const response = await axios.get('');
			return NextResponse.json(response.data);
		}
	} catch (error: AxiosError | unknown) {
		console.error(error);

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
