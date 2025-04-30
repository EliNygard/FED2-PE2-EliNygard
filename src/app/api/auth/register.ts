import { IRegisterUser } from "@/interface";

export async function register({
  name,
  email,
  password,
  bio,
  avatar,
  venueManager,
}: IRegisterUser) {
  const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, bio, avatar, venueManager }),
  });

  const json = await response.json();
  // console.log(json);

  if (!response.ok) {
    console.error(json.errors[0].message);
    throw new Error(json.errors[0].message || "Registration failed. Please try again");
  }

  const { data } = json;

  return data;
}
