import React from "react";
import { FaGithub, FaLinkedinIn, FaX, FaInstagram, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

export default function page() {
  return (
    <div className="py-16 h-screen">
      <div className="flex justify-evenly mt-10  items-center h-full">
        <Link href="mailto:soufiane.chaoufi@gmail.com">
          <FaEnvelope className="w-8 h-8" />
        </Link>
        <Link href={"https://github.com/gitsoufiane"}>
          <FaGithub className="w-8 h-8" />
        </Link>
        <Link href={"https://www.linkedin.com/in/soufianechaoufi/"}>
          <FaLinkedinIn className="w-8 h-8" />
        </Link>
        <Link href={""}>
          <FaX className="w-8 h-8" />
        </Link>
        <Link href={"https://www.instagram.com/sfn880612"}>
          <FaInstagram className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
}
