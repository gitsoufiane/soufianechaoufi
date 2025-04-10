"use client";

import Image from "next/image";
import { TechItem } from "@/app/tech-stack/tech"; // Adjust path as needed

interface TechIconProps {
  item: TechItem;
  iconUrl?: string; // Changed from iconPath to iconUrl
}

export function TechIcon({ item, iconUrl }: TechIconProps) {
  // Use iconUrl from props or item.iconUrl if available
  const iconSrc = iconUrl || item.iconUrl;
  
  return (
    <div className="flex h-full w-full items-center justify-center">
      {iconSrc ? (
        <Image
          src={iconSrc}
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
    </div>
  );
}
