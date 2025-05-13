"use client";

import { Input } from "@/components/ui/input";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import ButtonSpinner from "@/ui/ButtonSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  avatar: z.object({
    url: z.string().regex(/^https:\/\/\S+$/, {
      message: "Profile image must be a valid URL address",
    }),
    alt: z.string(),
  }),
});

/**
 * Page component for displaying the update profile form.
 *
 * - Renders a form where the user can update their profile image
 * - Shows a loading state on the button while fetching.
 * - Updates the profile image
 * - Redirects to profile page on success
 * - Displays a message if error
 */

export default function EditProfilePage() {
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.name);
  const currentUserPicture = useAuthStore((state) => state.user?.avatar.url);

  const { updateProfile, isLoading, isError } = useUpdateProfile();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      avatar: {
        url: currentUserPicture,
        alt: `Profile image of ${username}`,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateProfileSchema>) {
    const { avatar } = values;

    try {
      const payload = await updateProfile({ avatar });
      console.log(payload);

      form.reset({
        avatar: { url: "", alt: "" },
      });
      router.push(`/profile/${username}`);
      toast.success("Your profile is updated");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl flex flex-col gap-8"
    >
      <h2>Update Profile</h2>

      <div className="flex flex-col gap-4">
        <label htmlFor="avatarUrl">
          <h3>Update your profile image</h3>
        </label>

        <div className="grid min-[400px]:grid-cols-[auto_1fr] gap-2 items-center">
          <div className="relative rounded-full h-12 w-12 overflow-hidden">
            <Image
              src={currentUserPicture || "/default-user.png"}
              alt={username || "User"}
              fill
              sizes="33vw"
              className="w-full object-cover rounded-full"
            />
          </div>

          <Input
            type="text"
            id="avatarUrl"
            placeholder="Image link"
            defaultValue={currentUserPicture}
            {...form.register("avatar.url")}
          />
        </div>
        <p className="text-sm">The image must be a valid url link</p>
        {form.formState.errors.avatar?.url && (
          <span className="text-alert-red text-sm" aria-live="polite">
            {form.formState.errors.avatar.url.message}
          </span>
        )}
      </div>
      
      <Button className="max-w-80" type="submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? <ButtonSpinner /> : "Update profile"}{" "}
      </Button>

      {isError && (
        <div
          className="text-alert-red text-[14px] mt-4"
          role="alert"
        >{`${isError}. Please try again.`}</div>
      )}
    </form>
  );
}
