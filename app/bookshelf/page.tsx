import React from "react";
import { books } from "./data";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-5 gap-4 ">
        {books.map((book) => {
          return (
            <Link href={book.link} key={book.id} target="_blank">
              <Image
                src={book.image}
                alt={book.name}
                width={600}
                height={600}
                className="object-cover h-full w-full rounded-lg shadow-lg"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
