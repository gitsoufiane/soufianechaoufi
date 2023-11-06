"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogoGithub, IoSunnyOutline, IoMoon } from "react-icons/io5";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flex justify-between items-center">
      <Link className="text-3xl font-bold" href="/">
        Soufiane chaoufi
      </Link>
      <ul className="flex items-center gap-6 font-semibold">
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/projects">Project</Link>
        </li>
        <li>
          <Link href="/contact">Contact Me</Link>
        </li>
        <IoLogoGithub className=" w-6 h-6" />
        {theme === "dark" ? (
          <IoSunnyOutline className=" w-6 h-6" onClick={() => setTheme("light")} />
        ) : (
          <IoMoon className=" w-6 h-6" onClick={() => setTheme("dark")} />
        )}
      </ul>
    </nav>
  );
};
