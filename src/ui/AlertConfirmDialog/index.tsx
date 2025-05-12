import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "../Button";

interface AlertConfirmDialogProps {
  isLoading: boolean;
  submitLabel: string;
  onConfirm: () => Promise<void> | void;
}

export default function AlertConfirmDialog({
  isLoading,
  submitLabel,
  onConfirm,
}: AlertConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button $variant="narrow" className="bg-brand-blue" >Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this venue?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The venue will be permanently deleted and guests can no longer book
            a stay.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="" disabled={isLoading} onClick={onConfirm}>
            {isLoading ? "Loading" : `${submitLabel}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
