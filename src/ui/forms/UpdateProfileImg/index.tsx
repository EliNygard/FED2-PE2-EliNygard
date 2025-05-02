import { Input } from "@/components/ui/input";

export default function UpdateProfileImg() {
  return (
    <form>
      <h2>Update Profile</h2>

      <label htmlFor="avatarUrl">Update profile image</label>
      <p className="">The image must be a valid url link</p>
      <Input
      type="text"
      id="avatarUrl"
      placeholder="Image link"
      {...field}
      />
    </form>
  )
}