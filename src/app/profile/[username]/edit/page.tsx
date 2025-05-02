'use client'

import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod'

const UpdateProfileSchema = z.object({
  avatar: z.object({
    url: z.string().regex(/^https:\/\/\S+$/, {
      message: "Profile image must be a valid URL address",
    }),
    alt: z.string(),
  })
})

export default function EditProfilePage() {
  const username = useAuthStore((store) => store.user?.name)
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      avatar: {
        url: "https://images.unsplash.com/vector-1738925817850-4cfd13a45924?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: `Profile image of ${username}`,
      },
    }
  })


  return (
    <form>
      <h2>Update Profile</h2>

      <label htmlFor="avatarUrl">Update profile image</label>
      <p className="">The image must be a valid url link</p>
      <Input
      type="text"
      id="avatarUrl"
      placeholder="Image link"
      {...form.register('avatar.url')}
      />
      {form.formState.errors.avatar?.url && (
        <span aria-live="polite">
          {form.formState.errors.avatar.url.message}
        </span>
      )}
      <Button>Update profile</Button>
    </form>
  );
}
