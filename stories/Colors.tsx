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
        <p className="text-gray-600">
          The Apploi color palette is influenced by the Material Design color
          system.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border bg-blue-50 p-4">
        <h2 className="font-semibold text-gray-900">Key concepts:</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            We use a limited number of colors to keep the UI consistent and easy
            to maintain.
          </li>
          <li>
            We always use semantic color names, never hard-coded hex/rgb values.
          </li>
          <li>
            <strong>&quot;On&quot; colors:</strong> Each color has a corresponding
            &quot;on&quot; color that is used for text and icons on top of that
            color. This is to ensure that text is always legible and accessible.
          </li>
          <li>
            For interactive states, we use overlays of our theme colors at
            varying opacity levels.
          </li>
        </ul>
      </div>

      <div className="space-y-8">
        {palettes.map((palette) => (
          <ColorPaletteSection key={palette.title} {...palette} />
        ))}
      </div>
    </div>
  );
}
