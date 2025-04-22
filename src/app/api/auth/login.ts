import { ILogin } from "@/interface";

export async function login({ email, password }: ILogin) {
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/login?_holidaze=true",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    console.error(json.errors[0].message);
    throw new Error(json.errors[0].message || "Login failed. Please try again");
  }

  const { data } = json;
  return data;
}
