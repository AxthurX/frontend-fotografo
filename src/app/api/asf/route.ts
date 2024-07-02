import { config } from "@/lib/axios/axios";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const form_data = await request.json();
    if (form_data == undefined || form_data == null)
      return NextResponse.json({ err: "Formulário incompleto ou vazio." }, { status: 400 });

    const api_resp = await axios.post(
      `${process.env.BACKEND_ASF_URL}/asf/requirement`,
      form_data,
      config(request));

    return NextResponse.json({ message: api_resp.data.message, tracking_id: api_resp.data.tracking_id, hash: api_resp.data.hash }, { status: 201 });
  } catch (err) {
    if (err instanceof AxiosError && err.response)
      return NextResponse.json({ err: err.response.data.err }, { status: err.response.status || 400 });
    else
      return NextResponse.json({ err: "Erro interno" }, { status: 500 });
  }
}