import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center mt-7">
      <ClipLoader
        color="#004B7E"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
