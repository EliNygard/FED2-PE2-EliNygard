"use client";

import { Input } from "@/components/ui/input";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  avatar: z.object({
    url: z.string().regex(/^https:\/\/\S+$/, {
      message: "Profile image must be a valid URL address",
    }),
    alt: z.string(),
  }),
});

export default function EditProfilePage() {
  const router = useRouter()
  const username = useAuthStore((store) => store.user?.name);
  // const { getProfileData } = useGetSingleProfile();
  const { updateProfile, isLoading, isError } = useUpdateProfile();
  console.log(username);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      avatar: {
        url: "",
        alt: `Profile image of ${username}`,
      },
    },
  });

  // if (!username) {
  //   console.error("Username is undefined. Cannot fetch profile data");
  //   return <p>Please log in to edit your profile.</p>;
  // }

  // const profileData = getProfileData(username);
  // console.log(profileData);

  async function onSubmit(values: z.infer<typeof UpdateProfileSchema>) {
    const { avatar } = values;

    try {
      const payload = await updateProfile({ avatar });
      console.log(payload);

      form.reset({
        avatar: { url: "", alt: "" },
      });
      router.push(`/profile/${username}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-80 flex flex-col gap-8"
    >
      <h2>Update Profile</h2>

      <div className="flex flex-col gap-4">
        <label htmlFor="avatarUrl">
          <h3>Update your profile image</h3>
        </label>
        <p className="text-sm">The image must be a valid url link</p>
        <Input
          type="text"
          id="avatarUrl"
          placeholder="Image link"
          // value={profileData}
          {...form.register("avatar.url")}
        />
        {form.formState.errors.avatar?.url && (
          <span className="text-alert-red text-sm" aria-live="polite">
            {form.formState.errors.avatar.url.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? "Updating..." : "Update profile"}{" "}
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
