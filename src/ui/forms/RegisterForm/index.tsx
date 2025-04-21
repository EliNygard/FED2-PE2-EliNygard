"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long" })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(/^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/i, {
      message: "The email must be a stud.noroff.no address",
    })
    .trim(),
  passwordPair: z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters long" })
        .regex(/[a-zA-Z]/, {
          message: "Password must contain at least one letter.",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number.",
        })
        .trim(),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match. Please try again",
      path: ["confirmPassword"],
    }),
  bio: z.string(),
  avatar: z.object({
    url: z
      .string()
      .regex(/^https:\/\/\S+$/, {
        message: "Profile image must be a valid URL address",
      }),
    alt: z.string(),
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      avatar: {
        url: "https://images.unsplash.com/vector-1738925817850-4cfd13a45924?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: ""
      },
    },
  });

  const { registerUser, isLoading, isError, isVenueManager, setIsVenueManager } =
    useRegister();

    const delay = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    
    const {
      name,
      email,
      passwordPair: { password },
      bio,
      avatar,
    } = values;

    try {
      await delay(3000)
      
      const user = await registerUser({
        name,
        email,
        password,
        bio,
        avatar,
        venueManager: isVenueManager,
      });
      
      console.log(user);

      // store user
         

      form.reset({
        name: "",
        email: "",
        passwordPair: { password: "", confirmPassword: "" },
        bio: "",
        avatar: { url: "", alt: "" },
      });
    } catch (error) {
      console.error(error);
    } finally {
      // open login dialog
    }
  }

  return (
    <>
      {isVenueManager ? (
        <div>
          <h1>Register as a Venue Manager</h1>
          <p>
            Register as a Venue Manager to host your own venue.With our
            comprehensive platform, you can seamlessly manage bookings, promote
            your space, and transform your passion for hospitality into a
            thriving business.
          </p>

          <button type="button" onClick={() => setIsVenueManager(false)}>
            <span>Prefer to explore and book a stay?</span>
            <span>Register as a Customer to unlock your next getaway</span>
          </button>
        </div>
      ) : (
        <div>
          <h1>Register Account</h1>
          <p>
            Register an account to explore and book your next unforgettable stay
            at one of our venues.
          </p>
          <button type="button" onClick={() => setIsVenueManager(true)}>
            <span>Interested in hosting your own venue?</span>
            <span>Register as a Venue Manager</span>
          </button>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log('Validation failed', errors);
      })}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <span aria-live="polite">{form.formState.errors.name.message}</span>
        )}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <span aria-live="polite">{form.formState.errors.email.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...form.register("passwordPair.password")}
        />
        {form.formState.errors.passwordPair?.password && (
          <span aria-live="polite">{form.formState.errors.passwordPair.password.message}</span>
        )}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...form.register("passwordPair.confirmPassword")}
        />
        {form.formState.errors.passwordPair?.confirmPassword && (
          <span aria-live="polite">
            {form.formState.errors.passwordPair.confirmPassword.message}
          </span>
        )}

        <label htmlFor="bio">Bio</label>
        <textarea id="bio" {...form.register("bio")}></textarea>
        {form.formState.errors.bio && (
          <span aria-live="polite">{form.formState.errors.bio.message}</span>
        )}

        <label htmlFor="avatarUrl">Profile Image</label>
        <input type="text" id="avatarUrl" {...form.register("avatar.url")} />
        {form.formState.errors.avatar?.url && (
          <span aria-live="polite">{form.formState.errors.avatar.url.message}</span>
        )}

        <button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Registering" : "Register"}
        </button>

        {isError && (
          <div role="alert">{`${isError}. Please try again.`}</div>
        )}
      </form>
    </>
  );
}
