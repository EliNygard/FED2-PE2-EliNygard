"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
  bio: z.string(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      avatar: {
        url: "https://images.unsplash.com/vector-1738925817850-4cfd13a45924?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "dfg",
      },
    },
  });

  const { registerUser, isLoading, isVenueManager, setIsVenueManager } = useRegister();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password, bio, avatar } = values;
    const user = await registerUser({ name, email, password, bio, avatar, venueManager: isVenueManager });

    console.log(user, "User registered successfully");
    // open login dialog
    //reset form
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

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...form.register("name")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <span>{form.formState.errors.email.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <span>{form.formState.errors.password.message}</span>
        )}

        <label htmlFor="bio">Bio</label>
        <textarea id="bio" {...form.register("bio")}></textarea>

        <label htmlFor="avatarUrl">Profile Image</label>
        <input type="text" id="avatarUrl" {...form.register("avatar.url")} />

        <label htmlFor="avatarAlt">Avatar Alt</label>
        <input type="text" id="avatarAlt" {...form.register("avatar.alt")} />

        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </>
  );
}
