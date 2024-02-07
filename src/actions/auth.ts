"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveToken(token: string) {
  if (!token) return;

  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  redirect("/");
}

export async function validateToken(token?: string) {
  // TODO: fetch the user data from the server
  return true;
}
