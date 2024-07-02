import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const title = searchParams.get("title");
    const tags = searchParams.get("tags");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");
    const order = searchParams.get("order");
    const order_field = searchParams.get("order_field");

    try {
        if (id !== null) {
            const response = await axios.get(`${process.env.BLOG_SERVICE_IP}/blog/post?id=${id}`);
            return NextResponse.json(response.data);
        } else {
            const response = await axios.get(`${process.env.BLOG_SERVICE_IP}/blog?title=${title}&tags=${tags}&start_date=${start_date}&end_date=${end_date}&offset=${offset}&limit=${limit}&order=${order}&order_field=${order_field}`);
            return NextResponse.json(response.data);
        }
    } catch (error: AxiosError | unknown) {
        console.log(error);
        if (error instanceof AxiosError) {
            return NextResponse.json({ message: error.response?.data.message }, { status: error.response?.status || 400 });
        } else {
            return NextResponse.json({ message: "Ocorreu um erro desconhecido." }, { status: 500 });
        }
    }
}
