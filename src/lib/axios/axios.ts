import axios from "axios";
import { NextRequest } from "next/server";

export const serverAxiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_DLA_URL}`,
  withCredentials: true
});

export const userAxiosInstance = axios.create({
  withCredentials: true
});


function getIP(request: NextRequest) {
  let ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Desconhecido";
  }
  return ip;
}


export const config = (request: NextRequest) => {
  return {
    headers: {
      Cookie: request.headers.get("cookie"),
      userDevice: request.headers.get("user-agent") || "",
      userIP: getIP(request)
    }
  };
};
