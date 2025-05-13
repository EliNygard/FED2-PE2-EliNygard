import LoginButton from "@/ui/LoginButton";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="max-w-4xl m-auto page-padding flex flex-col gap-5">
      <h1>Log in to your Holidaze profile</h1>
      <p>Find and book your next stay at one of our venues.</p>

      <ul className="flex gap-5 items-center m-auto ">
        <li>
          <LoginButton />
        </li>
        <li>
          <p>OR</p>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </section>
  );
}
