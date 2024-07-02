import { cookies } from "next/headers";
import { OkButton } from "./OkButton";

export const CookieNotice = () => {
  const cookieStore = cookies();
  const cookieAlertCookie = cookieStore.get("cookie_alert_accepted");

  return (
    !cookieAlertCookie && (
      <div className={"fixed bottom-0 right-0 z-[9999] mx-2 my-3"}>
        <div
          id="alert-5"
          className="flex h-1/6 w-auto items-center rounded-lg  bg-calpolygreen-900  p-4 dark:bg-gray-800 "
          role="alert"
        >
          <svg
            className="h-4 w-4 flex-shrink-0  text-[white] text-opacity-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium text-[white] text-opacity-90">
            <span className="font-medium">
              Esse site utiliza cookies. Ao continuar, você concorda com a
              utilização dos mesmos.
            </span>
          </div>
          <OkButton />
        </div>
      </div>
    )
  );
};
