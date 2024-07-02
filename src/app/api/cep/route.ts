import axios from "axios";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cep = request.nextUrl.search;

    try {
        if (!cep) {
            return NextResponse.json({ erro: "CEP não fornecido na consulta." }, { status: 400 });
        }

        const cleanedCep = cep.replace(/\D/g, "");

        if (cleanedCep.length !== 8) {
            return NextResponse.json({ erro: "CEP deve conter 8 dígitos numéricos." }, { status: 400 });
        }

        // const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);

        // if (response.data.erro) {
        //     return NextResponse.json({ erro: "CEP não encontrado." }, { status: 404 });
        // }

        // const resultado = {
        //     cep: response.data.cep,
        //     logradouro: response.data.logradouro,
        //     bairro: response.data.bairro,
        //     localidade: response.data.localidade,
        //     uf: response.data.uf,
        // };

        // return NextResponse.json(resultado, { status: 200 });

        const getCep = async (cep: string) => {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (response.data.erro) {
                return response.data;
            }

            const resultado = {
                cep: response.data.cep,
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                localidade: response.data.localidade,
                uf: response.data.uf,
            };
            return resultado;
        };

        const cachedResponse = unstable_cache(async (cep) => getCep(cep), [cleanedCep], { revalidate: 86400 });

        const getCachedResponse = async (cep: string) => {
            const cachedResponseStore = await cachedResponse(cep);
            if (Object.hasOwn(cachedResponseStore, "erro")) {
                return NextResponse.json({ "erro": "CEP não encontrado."}, { status: 404 });
            } else return NextResponse.json(cachedResponseStore, { status: 200 });
        };
        return getCachedResponse(cleanedCep);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
    }
}
