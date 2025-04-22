import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Button from "../Button";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-20 py-5">
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src="./LogoHolidazeShort.svg"
            alt="Holidaze Logo (mobile)"
            width={22}
            height={28}
            className="block sm:hidden"
          />
          <Image
            src="/LogoHolidaze.svg"
            alt="Holidaze logo (desktop)"
            width={144}
            height={40}
            className="hidden sm:block"
          />
        </Link>
      </div>
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <FaBars className="size-7 text-brand-blue" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-11">
            <DropdownMenuItem>
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Log in</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <button className="block sm:hidden">
          <FaBars className="size-7 text-brand-blue" />
        </button> */}
        <div className="hidden sm:flex gap-5 items-center">
          <Link href="/register">
            <button className="text-brand-blue">Register</button>
          </Link>
          <Button>Log In</Button>
        </div>
      </div>
    </header>
  );
}
