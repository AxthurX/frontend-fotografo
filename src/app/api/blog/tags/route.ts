import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    
    try {
        const response = await axios.get(`${process.env.BLOG_SERVICE_IP}/blog/tags`);
        return NextResponse.json(response.data);
    } catch (error: AxiosError | unknown) {
        console.log(error);
        if (error instanceof AxiosError) {
            return NextResponse.json({ err: error.response?.data.message }, { status: error.response?.status || 400 });
        } else {
            return NextResponse.json({ err: "Ocorreu um erro desconhecido." }, { status: 500 });
        }
    }
}
