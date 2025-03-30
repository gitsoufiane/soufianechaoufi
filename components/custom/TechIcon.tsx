"use client";

import Image from "next/image";
import { TechItem } from "@/app/tech-stack/tech"; // Adjust path as needed

interface TechIconProps {
  item: TechItem;
  iconPath: string | null;
}

export function TechIcon({ item, iconPath }: TechIconProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      {iconPath ? (
        <Image
          src={iconPath}
          alt={`${item.name} icon`}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          unoptimized
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
          <span className="text-xs font-medium">{item.name.charAt(0)}</span>
        </div>
      )}
      <span className="text-muted-foreground text-xs">{item.name}</span>
    </div>
  );
}
