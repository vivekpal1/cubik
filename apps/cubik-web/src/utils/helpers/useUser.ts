import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const getUser = () => {
  return getCookie("publicKey") as string;
};

const getUserServer = () => {
  return cookies().get("publicKey") as string | undefined;
};
