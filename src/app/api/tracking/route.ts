import { config } from "@/lib/axios/axios";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const tracking_id = request.nextUrl.searchParams.get("tracking_id");
    const cpf_cnpj = request.nextUrl.searchParams.get("cpf_cnpj");
    const service = request.nextUrl.searchParams.get("service");
    try {

        if (service !== null) {
            const response = await axios.get(`${process.env[`BACKEND_${service.toUpperCase()}_URL`]}/${service}/requirement?tracking_id=${tracking_id}&cpf_cnpj=${cpf_cnpj}&resumed=true`,config(request));
            return NextResponse.json({
                message: response?.data.message,
                data: response.data,
            }, { status: 200 });
        } else {
            console.log("Tipo de formulário não encontrado");
            return NextResponse.json({
                message: "Tipo de formulário não encontrado",
            }, { status: 404 });
        }
    } catch (error: AxiosError | unknown) {
        console.log(error);
        if (error instanceof AxiosError) {
            return NextResponse.json({ err: error.response?.data.message }, { status: error.response?.status || 400 });
        } else {
            return NextResponse.json({ err: "Ocorreu um erro desconhecido." }, { status: 500 });
        }
    }
}
