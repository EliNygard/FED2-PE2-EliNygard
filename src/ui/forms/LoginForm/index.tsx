"use client";

import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import Button from "@/ui/Button";
import ButtonSpinner from "@/ui/ButtonSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * @schema LoginFormSchema.
 *
 * @description Uses Zod to ensure both email and password are trimmed non-empty strings.
 */
const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
});

/**
 * LoginForm component.
 *
 * Renders a login form with email and password fields, handles validation,
 * submission, and redirects to the user's profile on successful login.
 * The form fields are reset on successful login.
 *
 * @component
 */
export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleLogin, isLoading, isError } = useLogin();

  /**
   * Submit handler invoked when the form is submitted and passes validation.
   *
   * @param values - The validated form values containing email and password.
   */
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const { email, password } = values;

    try {
      const user = await handleLogin({
        email,
        password,
      });
      if (!user) return;

      form.reset({
        email: "",
        password: "",
      });
      router.push(`/profile/${user.name}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <Input
            className=""
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <span className="text-alert-red text-[14px]" aria-live="polite">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Input
            className=""
            type="password"
            id="password"
            placeholder="Password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <span className="text-alert-red text-[14px]" aria-live="polite">
              {form.formState.errors.password?.message}
            </span>
          )}
        </div>

        <div className="mt-7">
          <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? <ButtonSpinner /> : "Log in"}{" "}
          </Button>

          {isError && (
            <div
              className="text-alert-red text-[14px] mt-4"
              role="alert"
            >{`${isError}. Please try again.`}</div>
          )}
        </div>
      </form>

      <div className="mt-4">
        <DialogClose asChild>
          <Link href="/register">
            Do you not have an account yet? Register here
          </Link>
        </DialogClose>
      </div>
    </div>
  );
}
