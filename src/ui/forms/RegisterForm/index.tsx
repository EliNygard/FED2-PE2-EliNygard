"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRegister } from "@/hooks/useRegister";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import ButtonSpinner from "@/ui/ButtonSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import { z } from "zod";
import { StyledRegisterForm } from "./index.styles";

/**
 * @schema RegisterFormSchema
 * @description Zod schema for validating a user registration form.
 */
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
    url: z.string().regex(/^https:\/\/\S+$/, {
      message: "Profile image must be a valid URL address",
    }),
    alt: z.string(),
  }),
});

/**
 * RegisterForm component.
 *
 * Renders a register form with the fields: name, email, password, confirm password, bio and profile image.
 * The form handles validation and submission.
 * The form fields are reset on successful register.
 *
 * @component
 */

export function RegisterForm() {
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.name);
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      avatar: {
        url: "https://images.unsplash.com/vector-1738925817850-4cfd13a45924?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: `Profile image of ${username}`,
      },
    },
  });

  const {
    handleRegister,
    isLoading,
    isError,
    isVenueManager,
    setIsVenueManager,
  } = useRegister();

  const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  /**
   * Submit handler invoked when the form is submitted and passes validation.
   *
   * @param values - The validated form values.
   */
  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    const {
      name,
      email,
      passwordPair: { password },
      bio,
      avatar,
    } = values;

    try {
      await delay(9000);

      const user = await handleRegister({
        name,
        email,
        password,
        bio,
        avatar,
        venueManager: isVenueManager,
      });

      console.log(user);

      router.push(`/profile/${name}`);

      form.reset({
        name: "",
        email: "",
        passwordPair: { password: "", confirmPassword: "" },
        bio: "",
        avatar: { url: "", alt: "" },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl">
          {isVenueManager ? "Register as a Venue Manager" : "Register Account"}
        </h1>
        <p className="">
          {isVenueManager
            ? "Register as a Venue Manager to host your own venue. With our comprehensive platform, you can seamlessly manage bookings, promote your space, and transform your passion for hospitality into a  thriving business."
            : "Register an account to explore and book your next unforgettable stay at one of our venues."}
        </p>

        {isVenueManager ? (
          <button
            className="text-left text-sm"
            type="button"
            onClick={() => setIsVenueManager(false)}
          >
            <div className="flex flex-col gap-1">
              <span>Prefer to explore and book a stay?</span>
              <div className="flex flex-row items-start gap-1.5">
                <span className="pt-0.5">
                  <FaChevronRight />
                </span>
                <span>Register as a Customer to unlock your next getaway</span>
              </div>
            </div>
          </button>
        ) : (
          <button
            className="text-left text-sm"
            type="button"
            onClick={() => setIsVenueManager(true)}
          >
            <div className="flex flex-col gap-1">
              <span>Interested in hosting your own venue?</span>
              <div className="flex flex-row items-start gap-1.5">
                <span className="pt-0.5">
                  <FaChevronRight />
                </span>
                <span>Register as a Venue Manager</span>
              </div>
            </div>
          </button>
        )}
      </div>

      <StyledRegisterForm>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation failed", errors);
          })}
        >
          <h2>Register</h2>

          <div className="input-wrapper">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span aria-live="polite">
                  {form.formState.errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <span aria-live="polite">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...form.register("passwordPair.password")}
              />
              {form.formState.errors.passwordPair?.password && (
                <span aria-live="polite">
                  {form.formState.errors.passwordPair.password.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                {...form.register("passwordPair.confirmPassword")}
              />
              {form.formState.errors.passwordPair?.confirmPassword && (
                <span aria-live="polite">
                  {form.formState.errors.passwordPair.confirmPassword.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="bio">Your profile bio (optional)</label>
              <Textarea id="bio" placeholder="Bio" {...form.register("bio")} />
              {form.formState.errors.bio && (
                <span aria-live="polite">
                  {form.formState.errors.bio.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="avatarUrl">Your profile image (optional)</label>
              <p className="image-link">The image must be a valid url link</p>
              <Input
                type="text"
                id="avatarUrl"
                placeholder="Image link"
                {...form.register("avatar.url")}
              />
              {form.formState.errors.avatar?.url && (
                <span aria-live="polite">
                  {form.formState.errors.avatar.url.message}
                </span>
              )}
            </div>

            <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
              {isLoading ? <ButtonSpinner /> : "Register"}
            </Button>

            {isError && (
              <p
                className="error-message"
                role="alert"
              >{`${isError}. Please try again.`}</p>
            )}
          </div>
        </form>
      </StyledRegisterForm>
    </>
  );
}
