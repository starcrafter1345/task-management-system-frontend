import type { userRegisterValues, userLoginValues, User } from "@/types/Auth.ts";
import { apiClient } from "@/lib/apiClient.ts";

export async function loginUser(credentials: userLoginValues) {
  const r = await apiClient.post<User>(`/auth/login`, credentials);

  return r.data;
}

export async function registerUser(credentials: userRegisterValues) {
  const r = await apiClient.post<User>("/auth/register", credentials);

  return r.data;
}

export async function verifyUser() {
  const r = await apiClient.get<User>("/auth/verify");

  return r;
}
