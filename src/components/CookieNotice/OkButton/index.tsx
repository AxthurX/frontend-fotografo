//SOU OBRIGADO A PASSAR O EVENTO SE NÃO A SERVER ACTION QUEBRA COMPLETAMENTE, POR ISSO O ESLINT TÁ DESABILITADO AQUI

"use client";

import { setCookieAlertCookie } from "./action";

export const OkButton = () => {
  return (
    <button
      type="button"
      className=" -my-1.5 ml-1.5 inline-flex h-8 w-8  items-center justify-center rounded-lg p-1.5 text-secondary text-opacity-90 hover:bg-opacity-40 hover:text-white hover:ring-2 hover:ring-calpolygreen-800 focus:ring-2 focus:ring-gray-400"
      data-dismiss-target="#alert-5"
      aria-label="Close"
      onClick={async (e) => {
        e.preventDefault();
        setCookieAlertCookie();
      }}
    >
      <span className="sr-only">Dispensar</span>
      <span className="text-[white]">OK</span>
    </button>
  );
};
