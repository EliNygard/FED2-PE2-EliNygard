import { useDeleteVenue } from "@/hooks/useDeleteVenue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AlertConfirmDialog from "../AlertConfirmDialog";

export default function DeleteVenueButton({ venueId }: { venueId: string }) {
  const { deleteVenue, isLoading, isError } = useDeleteVenue();
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.name);

  async function onConfirm() {
    await deleteVenue(venueId);
    toast.success("The venue was deleted");
    router.push(`/profile/${username}`);
  }

  return (
    <>
      <AlertConfirmDialog
        isLoading={isLoading}
        submitLabel="Delete"
        onConfirm={onConfirm}
      />
      {isError && <p>{isError}</p>}
    </>
  );
}
