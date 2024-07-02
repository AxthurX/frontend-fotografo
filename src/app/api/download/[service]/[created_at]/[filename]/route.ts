import axios from 'axios';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'node:path';

export async function GET(
	_request: NextRequest,
	{
		params,
	}: { params: { service: string; created_at: string; filename: string } },
) {
	const { service, created_at, filename } = params;
	console.log(params);
	const extension = path.extname(filename).slice(1) as 'pdf' | 'zip';

	const contentTypes = {
		pdf: 'application/pdf',
		zip: 'application/zip',
	};

	const contentType = contentTypes[extension] || 'application/octet-stream';

	try {
		const response = await axios.get(
			`${process.env[`BACKEND_${service.toUpperCase()}_URL`]}/${service}/download/${created_at}/${filename}`,
			{ adapter: 'fetch', responseType: 'arraybuffer' },
		);
		console.log(response);

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
		console.error(error);
		return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
	}
}
