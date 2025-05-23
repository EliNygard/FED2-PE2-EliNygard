import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
    router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="m-auto max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between flex-row border border-brand-blue p-1 rounded-md h-12"
      >
        <div className="w-full">
          <label htmlFor="searchInput" className="sr-only">
            Search for a venue
          </label>

          <input
            className="p-2 w-full"
            type="text"
            id="searchInput"
            placeholder="Where do you want to go?"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <Button
          className="flex justify-center items-center max-w-12"
          type="submit"
        >
          <span className="sr-only">Search</span>
          <FaSearch aria-hidden="true" focusable="false" />
        </Button>
      </form>
    </div>
  );
}
