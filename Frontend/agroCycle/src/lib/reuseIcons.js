import { Wheat, Shell, Cherry, Sprout, Leaf, Recycle, Lightbulb } from "lucide-react";

export const REUSE_ICON_MAP = {
  wheat: Wheat,
  shell: Shell,
  cherry: Cherry,
  sprout: Sprout,
  leaf: Leaf,
  recycle: Recycle,
  lightbulb: Lightbulb,
};

export const REUSE_ICON_OPTIONS = [
  { key: "wheat", label: "Wheat", Icon: Wheat },
  { key: "shell", label: "Shell", Icon: Shell },
  { key: "cherry", label: "Cherry", Icon: Cherry },
  { key: "sprout", label: "Sprout", Icon: Sprout },
  { key: "leaf", label: "Leaf", Icon: Leaf },
  { key: "recycle", label: "Recycle", Icon: Recycle },
  { key: "lightbulb", label: "Lightbulb", Icon: Lightbulb },
];

export function getReuseIcon(key) {
  return REUSE_ICON_MAP[key] || Lightbulb;
}
