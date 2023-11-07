"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogoGithub, IoSunnyOutline, IoMoon } from "react-icons/io5";
import { useTheme } from "next-themes";
import { clsx } from "clsx";

const links = [
  { name: "Articles", href: "/articles" },
  { name: "Projects", href: "/projects" },
  { name: "BookShelf", href: "/bookshelf" },
  { name: "TechStack", href: "/techstack" },
  { name: "Contact Me", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-end items-center">
      <ul className="flex items-center gap-6 font-semibold">
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className={clsx(
                "p-2 border-b-2 border-secondaryGreen border-opacity-0 hover:border-opacity-100 hover:text-secondaryGreen duration-200 cursor-pointer"
              )}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}

        <Link href={"https://github.com/gitsoufiane"} target="_blank">
          <IoLogoGithub className=" w-7 h-7  hover:text-secondaryGreen  cursor-pointer" />
        </Link>
        {theme === "dark" ? (
          <IoSunnyOutline
            className=" w-7 h-7 hover:text-secondaryGreen  cursor-pointer"
            onClick={() => setTheme("light")}
          />
        ) : (
          <IoMoon
            className=" w-7 h-7 hover:text-secondaryGreen  cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        )}
      </ul>
    </nav>
  );
};
