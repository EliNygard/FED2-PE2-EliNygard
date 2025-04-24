import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary-background pt-40 mt-6">
      <nav className="px-6 lg:px-10 2xl:px-20">
        <ul>
          <li >
            <p className="flex flex-row items-center gap-1.5">
              <span>
                <FaRegCopyright />
              </span>
              2025 Holidaze
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
