"use client";

import { Input } from "@/components/ui/input";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const username = useAuthStore((store) => store.user?.name);
  // console.log(username);
  
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      avatar: {
        url: "",
        alt: `Profile image of ${username}`,
      },
    },
  });

   const { updateProfile, isLoading, isError } = useUpdateProfile();

  async function onSubmit(values: z.infer<typeof UpdateProfileSchema>) {
    const { avatar } = values;
    // console.log(avatar);
    

    try {

      console.log('Update with: ', avatar, username);
      

      const payload = await updateProfile({ avatar });
      console.log(payload);
      
      // do I need to store user? Update the store?

      form.reset({
        avatar: { url: "", alt: "" },
      });
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
          {...form.register("avatar.url")}
        />
        {form.formState.errors.avatar?.url && (
          <span className="text-alert-red text-sm" aria-live="polite">
            {form.formState.errors.avatar.url.message}
          </span>
        )}
      </div>
      <Button>Update profile</Button>
    </form>
  );
}
