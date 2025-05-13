import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  margin: "0 auto",
};

export default function ButtonSpinner() {
  return (
      <ClipLoader
        color="#004B7E"
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}
