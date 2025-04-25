import Button from "@/ui/Button";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="m-auto max-w-3xl">
      <form className="w-full flex justify-between flex-row border border-brand-blue p-1 rounded-md h-12">
        <div className="w-full">
          <label htmlFor="searchInput" className="sr-only">
            Search for a venue
          </label>

          <input
            type="text"
            id="searchInput"
            placeholder="Where do you want to go?"
            autoComplete="off"
            className="p-2 w-full"
          />
        </div>
        <Button className="flex justify-center items-center max-w-12">
          <FaSearch />
        </Button>
      </form>
    </div>
  );
}
