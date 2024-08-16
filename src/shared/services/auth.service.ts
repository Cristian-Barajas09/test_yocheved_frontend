import { API_CONSTANTS } from "@/shared/constants/api.constants";

const { API_URL, API_VERSION } = API_CONSTANTS;

export async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/${API_VERSION}/oauth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return true;
  }

  return false;
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/${API_VERSION}/oauth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  localStorage.removeItem("token");
}

export async function isAuthenticated(): Promise<boolean> {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const response = await fetch(`${API_URL}/${API_VERSION}/oauth/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
}

export async function getToken(): Promise<string> {
  return localStorage.getItem("token") as string;
}
