import { cn } from "@/lib/utils";

export interface ColorSwatch {
  name: string;
  rgb: string;
}

export interface ColorPalette {
  title: string;
  colors: ColorSwatch[];
}

export interface ColorsProps {
  palettes: ColorPalette[];
}

function ColorSwatchItem({ name, rgb }: ColorSwatch) {
  const isOnColor = name.startsWith("on-");

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-16 shrink-0 rounded-lg border shadow-sm"
        style={{ backgroundColor: rgb }}
      />
      <div className="flex flex-col">
        <span className={cn("font-mono text-sm font-medium", isOnColor && "")}>
          {name}
        </span>
        <span className="font-mono text-xs text-gray-500">{rgb}</span>
      </div>
    </div>
  );
}

function ColorPaletteSection({ title, colors }: ColorPalette) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <ColorSwatchItem key={color.name} {...color} />
        ))}
      </div>
    </div>
  );
}

export function Colors({ palettes }: ColorsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Colors</h1>
      </div>

      <div className="space-y-8">
        {palettes.map((palette) => (
          <ColorPaletteSection key={palette.title} {...palette} />
        ))}
      </div>
    </div>
  );
}
