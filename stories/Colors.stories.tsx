import type { Meta, StoryObj } from "@storybook/react";
import { Colors } from "./Colors";

const meta = {
  title: "Design System/Colors",
  component: Colors,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    palettes: [
      {
        title: "Primary",
        colors: [
          { name: "primary", rgb: "rgb(0, 129, 137)" },
          { name: "on-primary", rgb: "rgb(255, 255, 255)" },
          { name: "primary-mid", rgb: "rgb(153, 205, 208)" },
          { name: "primary-light", rgb: "rgb(204, 236, 238)" },
          { name: "primary-lightest", rgb: "rgb(230, 246, 247)" },
        ],
      },
      {
        title: "Secondary",
        colors: [
          { name: "secondary", rgb: "rgb(0, 61, 55)" },
          { name: "on-secondary", rgb: "rgb(255, 255, 255)" },
        ],
      },
      {
        title: "Background",
        colors: [
          { name: "background", rgb: "rgb(245, 241, 238)" },
          { name: "on-background", rgb: "rgb(51, 51, 51)" },
        ],
      },
      {
        title: "Surface",
        colors: [
          { name: "surface", rgb: "rgb(255, 255, 255)" },
          { name: "on-surface", rgb: "rgb(51, 51, 51)" },
        ],
      },
      {
        title: "Grays",
        colors: [
          { name: "gray", rgb: "rgb(51, 51, 51)" },
          { name: "on-gray", rgb: "rgb(255, 255, 255)" },
          { name: "gray-cool", rgb: "rgb(110, 120, 128)" },
          { name: "on-gray-cool", rgb: "rgb(255, 255, 255)" },
        ],
      },
      {
        title: "Neutrals",
        colors: [
          { name: "neutral", rgb: "rgb(227, 222, 217)" },
          { name: "neutral-mid", rgb: "rgb(235, 232, 228)" },
          { name: "neutral-light", rgb: "rgb(241, 239, 236)" },
          { name: "neutral-lightest", rgb: "rgb(251, 249, 246)" },
        ],
      },
      {
        title: "Success",
        colors: [
          { name: "success", rgb: "rgb(1, 131, 79)" },
          { name: "on-success", rgb: "rgb(255, 255, 255)" },
          { name: "success-mid", rgb: "rgb(139, 201, 176)" },
          { name: "success-light", rgb: "rgb(182, 221, 205)" },
          { name: "success-lightest", rgb: "rgb(225, 241, 235)" },
        ],
      },
      {
        title: "Warning",
        colors: [
          { name: "warning", rgb: "rgb(247, 155, 0)" },
          { name: "on-warning", rgb: "rgb(51, 51, 51)" },
          { name: "warning-mid", rgb: "rgb(255, 204, 130)" },
          { name: "warning-light", rgb: "rgb(253, 235, 204)" },
          { name: "warning-lightest", rgb: "rgb(254, 245, 230)" },
        ],
      },
      {
        title: "Destructive",
        colors: [
          { name: "destructive", rgb: "rgb(176, 0, 32)" },
          { name: "on-destructive", rgb: "rgb(255, 255, 255)" },
          { name: "destructive-mid", rgb: "rgb(227, 172, 165)" },
          { name: "destructive-light", rgb: "rgb(237, 203, 198)" },
          { name: "destructive-lightest", rgb: "rgb(248, 234, 232)" },
        ],
      },
      {
        title: "Info",
        colors: [
          { name: "info", rgb: "rgb(24, 115, 204)" },
          { name: "on-info", rgb: "rgb(255, 255, 255)" },
          { name: "info-mid", rgb: "rgb(151, 192, 232)" },
          { name: "info-light", rgb: "rgb(190, 215, 241)" },
          { name: "info-lightest", rgb: "rgb(228, 239, 249)" },
        ],
      },
      {
        title: "Accents",
        colors: [
          { name: "blue", rgb: "rgb(154, 187, 218)" },
          { name: "blue-light", rgb: "rgb(214, 229, 240)" },
          { name: "green", rgb: "rgb(138, 203, 170)" },
          { name: "green-light", rgb: "rgb(197, 234, 219)" },
          { name: "turquoise", rgb: "rgb(136, 201, 204)" },
          { name: "turquoise-light", rgb: "rgb(197, 232, 234)" },
          { name: "orange", rgb: "rgb(255, 192, 153)" },
          { name: "orange-light", rgb: "rgb(255, 224, 204)" },
          { name: "red", rgb: "rgb(255, 170, 158)" },
          { name: "red-light", rgb: "rgb(255, 214, 214)" },
          { name: "pink", rgb: "rgb(226, 164, 199)" },
          { name: "pink-light", rgb: "rgb(245, 214, 230)" },
          { name: "purple", rgb: "rgb(190, 165, 209)" },
          { name: "purple-light", rgb: "rgb(224, 213, 232)" },
          { name: "brown", rgb: "rgb(196, 169, 146)" },
          { name: "brown-light", rgb: "rgb(229, 215, 204)" },
          { name: "yellow", rgb: "rgb(232, 203, 123)" },
          { name: "yellow-light", rgb: "rgb(248, 237, 201)" },
        ],
      },
    ],
  },
};
