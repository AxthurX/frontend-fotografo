import axios from 'axios';
import { NextResponse, type NextRequest } from 'next/server';
import path from 'node:path';

export async function GET(
	_request: NextRequest,
	{
		params
	}: { params: { service: string }}) {
	
	
		const { service } = params;
	const query = new URL(_request.url).searchParams;
	const filename = query.get('filename');
	const created_at = query.get('created_at')
	if(!filename || !created_at)
			return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });

	const extension = path.extname(filename).slice(1) as 'pdf' | 'zip';

	const contentTypes = {
		pdf: 'application/pdf',
		zip: 'application/zip',
	};

	const contentType = contentTypes[extension] || 'application/octet-stream';

	console.time('download');
	try {
		const response = await axios.get(
			`${process.env[`BACKEND_${service.toUpperCase()}_URL`]}/${service}/download?created_at=${created_at}&filename=${filename}`,
			{ adapter: 'fetch', responseType: 'arraybuffer' },
		);
		console.log(response);
		console.timeEnd('download');

		const contentDisposition =
			extension === 'pdf'
				? `inline; filename="${filename}"`
				: `attachment; filename="${filename}"`;

		return new NextResponse(response.data, {
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': contentDisposition,
			},
		});
	} catch (error) {
		if(error.response.data){
			const erro = JSON.parse(Buffer.from(error.response.data).toString('utf-8'));
			return NextResponse.json({ error: erro.err }, { status: 500 });
		}
		else
			return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });

	}
}
