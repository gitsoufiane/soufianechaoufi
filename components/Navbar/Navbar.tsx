"use client";
import cx from "classnames";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { menuList } from "./constant";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-semibold">
              S.C
            </Link>
          </div>
          <div className="hidden space-x-6 md:flex">
            {/* Desktop Menu Links */}
            {menuList.map((item) => (
              <Link
                href={item.href}
                className={cx({
                  "font-bold underline decoration-orange-400 underline-offset-4":
                    isActive(item.href),
                })}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={12} /> : <Menu size={12} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-2 border-b-2 p-4 md:hidden">
          {menuList.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cx("", {
                "font-bold underline decoration-orange-400 underline-offset-4":
                  isActive(item.href),
              })}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
