"use server";

import { cookies } from "next/headers";

export async function setCookieAlertCookie() {  
    cookies().set("cookie_alert_accepted", "true", { maxAge: 2592000 });
  }