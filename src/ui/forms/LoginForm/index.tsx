"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";

const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser, isLoading, isError, isVenueManager } =
    useLogin();

  const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const { email, password } = values;

    
    try {
        await delay(4000);
        
        const user = await loginUser({
            email,
            password,
        });
        if (!user) return
      console.log(user);

      if (isVenueManager) {
          console.log('this is a venue manger');
        
    } else {
        console.log('this is a customer');
        
    }
    
    // store user

      form.reset({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      // redirect customer to home, manager to profile page
    }
  }
  return (
    <div>
      <h1>Log in to your account</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="loginEmail" {...form.register("email")} />
        {form.formState.errors.email && (
          <span aria-live="polite">{form.formState.errors.email.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="loginPassword"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <span aria-live="polite">
            {form.formState.errors.password?.message}
          </span>
        )}

        <button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        {isError && <div role="alert">{`${isError}. Please try again.`}</div>}
      </form>
    </div>
  );
}
