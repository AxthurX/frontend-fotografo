"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";

export default function Validacao() {
    const searchParams = useSearchParams();
    const cpf_cnpj = searchParams?.get("cpf_cnpj");
    const tracking_id = searchParams?.get("tracking_id");
    const service = searchParams?.get("service");

    const [showSuccess, setShowSuccess] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
    {
        /*
            Código de Exibição:
                0 - Exibe o skeleton
                1 - Solicitação verificada mas não aprovada.
                2 - Solicitação verificada e aprovada
                3 - Solicitação não encontrada
                4 - Não foi possível realizar a verificação
                5 - Dados insuficientes
                6 - Solicitação verificada e autodeclarada
        */
    }

    const formatarCpfCnpj = (cpf_cnpj: string | null | undefined) => {
        if (typeof cpf_cnpj === "string") {
            const isCPF = cpf_cnpj.length === 11;
            const regex = isCPF
                ? /(\d{3})(\d{3})(\d{3})(\d{2})/
                : /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
            const formatado = cpf_cnpj.replace(
                regex,
                isCPF ? "$1.$2.$3-$4" : "$1.$2.$3/$4-$5",
            );
            return formatado;
        }
    };

    const findRequirement = useCallback( async () => {
        try {
            const response = await axios.get("/api/tracking", {
                params: {
                    cpf_cnpj: cpf_cnpj,
                    tracking_id: tracking_id,
                    service: service,
                },
            });
            console.log(response.data.data.requirement.approved_at);
            // const date = new Date(response.data.data.requirement.approved_at);// Verificar prazo de validade
            const status = response.data.data.requirement.status;
            if (status === 3) {
                setShowSuccess(2);
            } else if (status === 6) {
                setShowSuccess(6);
            } else {
                setShowSuccess(1);
            }
        } catch (error) {
            setShowSuccess(3);
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    setShowSuccess(3);
                    return;
                }
            }
            setShowSuccess(4);

        }
    },[cpf_cnpj, service, tracking_id]);

    useEffect(() => {
        cpf_cnpj && service && tracking_id ? findRequirement() : setShowSuccess(5);
    }, [cpf_cnpj, findRequirement, service, tracking_id]);

    return (
        <>
            <div className="container my-8 items-center justify-center">
                <div className="rounded-xl border border-sage-300 bg-slate-50 p-2 ">
                    <div className="my-6 flex justify-center text-center">
                        <span className="text-5xl font-extrabold max-md:text-4xl max-sm:text-2xl ">
                            Dados da solicitação
                        </span>
                    </div>
                    <hr className=" mb-8 border-slate-300" />

                    <div className="container mb-6">
                        {showSuccess === 1 ? (
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-2 flex items-center max-md:col-span-full">
                                    <FaBan className="mx-auto mb-6 text-7xl text-error" />
                                </div>

                                <div className="col-span-10 flex items-center max-md:col-span-full">
                                    <span className="max-sm:text-md  text-2xl max-lg:text-xl max-md:text-lg">
                                        Este requerimento de protocolo
                                        <span className="font-semibold">{" " + tracking_id}</span>,
                                        CPF / CNPJ
                                        <span className="font-semibold">
                                            {" " + formatarCpfCnpj(cpf_cnpj) + " "}
                                        </span>
                                        foi emitido pelo sistema da Secretaria de Desenvolvimento
                                        Ambiental - SEDAM e possui a sua veracidade confirmada, no
                                        entanto
                                        <span className="font-semibold text-error">
                                            {" "}
                                            a solicitação não se encontra aprovada,{" "}
                                        </span>
                                        verifique a sua situação na página da{" "}
                                        <Link
                                            href={"/area-usuario"}
                                            className="link-hover link link-primary font-semibold"
                                        >
                                            Área do Usuário
                                        </Link>
                                        .
                                    </span>
                                    {/* Exemplo: Este requerimento de protocolo **********, CPF / CNPJ ********** foi emitido pelo sistema da Secretaria de Desenvolvimento Ambiental - SEDAM e possui a sua veracidade confirmada. */}
                                </div>
                            </div>
                        ) : showSuccess === 2 ? (
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-2 flex items-center max-md:col-span-full">
                                    <FaCheck className="mx-auto mb-6 text-7xl text-primary" />
                                </div>
                                <div className="col-span-10 mt-3 flex max-md:col-span-full">
                                    <span className="max-sm:text-md text-2xl max-lg:text-xl max-md:text-lg">
                                        Este requerimento de protocolo
                                        <span className="font-semibold">{" " + tracking_id}</span>,
                                        CPF / CNPJ
                                        <span className="font-semibold">
                                            {" " + formatarCpfCnpj(cpf_cnpj) + " "}
                                        </span>
                                        foi emitido pelo sistema da Secretaria de Desenvolvimento
                                        Ambiental - SEDAM, possui a sua veracidade confirmada e
                                        <span className="font-semibold text-primary">
                                            {" "} se encontra aprovado.
                                        </span>
                                    </span>
                                    {/* Exemplo: Este requerimento de protocolo **********, CPF / CNPJ ********** foi emitido pelo sistema da Secretaria de Desenvolvimento Ambiental - SEDAM e possui a sua veracidade confirmada. */}
                                </div>
                            </div>
                        ) : showSuccess === 3 ? (
                            <>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-2 flex items-center max-md:col-span-full">
                                        <FaBan className="mx-auto mb-6 text-7xl text-error" />
                                    </div>

                                    <div className="col-span-10 flex items-center max-md:col-span-full">
                                        <span className="max-sm:text-md  text-2xl max-lg:text-xl max-md:text-lg">
                                            Este requerimento de protocolo
                                            <span className="font-semibold">{" " + tracking_id}</span>
                                            , CPF / CNPJ
                                            <span className="font-semibold">
                                                {" " + formatarCpfCnpj(cpf_cnpj) + " "}
                                            </span>
                                            <span className="font-semibold text-error">
                                                {" "}
                                                não foi encontrado,{" "}
                                            </span>
                                            na base de dados do sistema da Secretaria de
                                            Desenvolvimento Ambiental - SEDAM,
                                            <span className="font-semibold text-error">
                                                {" "}
                                                ou seja não possui a sua veracidade confirmada,{" "}
                                            </span>
                                            verifique a sua situação na página da{" "}
                                            <Link
                                                href={"/area-usuario"}
                                                className="link-hover link link-primary font-semibold"
                                            >
                                                Área do Usuário
                                            </Link>
                                            .
                                        </span>                                    </div>
                                </div>
                            </>
                        ) : showSuccess === 4 ? (
                            <>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-2 flex items-center max-md:col-span-full">
                                        <FaBan className="mx-auto mb-6 text-7xl text-error" />
                                    </div>

                                    <div className="col-span-10 flex items-center max-md:col-span-full">
                                        <span className="max-sm:text-md  text-2xl max-lg:text-xl max-md:text-lg">
                                            Ops!
                                            Foi detectado um problema técnico em nossos
                                            servidores e
                                            <span className="font-semibold text-error">
                                                {" "}
                                                não será possível realizar a verificação informada,{" "}
                                            </span>
                                            <br />
                                            Verifique a sua situação na página da{" "}
                                            <Link
                                                href={"/area-usuario"}
                                                className="link-hover link link-primary font-semibold"
                                            >
                                                Área do Usuário
                                            </Link>
                                            .
                                        </span>
                                    </div>
                                </div>
                            </>

                        ) : showSuccess == 5 ? (
                            <>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-2 flex items-center max-md:col-span-full">
                                        <FaBan className="mx-auto mb-6 text-7xl text-error" />
                                    </div>

                                    <div className="col-span-10 flex items-center max-md:col-span-full">
                                        <span className="max-sm:text-md  text-2xl max-lg:text-xl max-md:text-lg">
                                            Ops!
                                            
                                            <span className="font-semibold text-error">
                                                {" "}
                                                Não foram informados dados suficientes para realizarmos a busca do requerimento.{" "}
                                            </span>
                                            <br />
                                            Verifique a sua situação na página da{" "}
                                            <Link
                                                href={"/area-usuario"}
                                                className="link-hover link link-primary font-semibold"
                                            >
                                                Área do Usuário
                                            </Link>
                                            .
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : showSuccess == 6 ? (
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-2 flex items-center max-md:col-span-full">
                                    <FaCheck className="mx-auto mb-6 text-7xl text-primary" />
                                </div>
                                <div className="col-span-10 mt-3 flex max-md:col-span-full">
                                    <span className="max-sm:text-md text-2xl max-lg:text-xl max-md:text-lg">
                                        Este requerimento de protocolo
                                        <span className="font-semibold">{" " + tracking_id}</span>,
                                        CPF / CNPJ
                                        <span className="font-semibold">
                                            {" " + formatarCpfCnpj(cpf_cnpj) + " "}
                                        </span>
                                        foi emitido pelo sistema da Secretaria de Desenvolvimento
                                        Ambiental - SEDAM, possui a sua veracidade confirmada e
                                        <span className="font-semibold text-primary">
                                            {" "} é um requerimento autodeclarado.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto w-full min-h-[280px] skeleton flex justify-center">
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}