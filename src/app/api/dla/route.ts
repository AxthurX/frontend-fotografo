import { config } from "@/lib/axios/axios";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

  try {
    const formData = await request.json();
    console.log(formData);
    if (formData == undefined || formData == null)
      return NextResponse.json({ err: "Formulário incompleto ou vazio." }, { status: 400 });

    const apiresp = await axios.post(
      `${process.env.BACKEND_DLA_URL}/dla/requirement`,
      formData,
      config(request));

      return NextResponse.json({ message: apiresp.data.message , tracking_id:apiresp.data.tracking_id, hash:apiresp.data.hash}, { status: 201 });

  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError)
      return NextResponse.json( {message:err.response?.data.message}, { status: err.response?.status || 400 });
    else
      return NextResponse.json({ err: "Erro interno" }, { status: 500 });
  }


}