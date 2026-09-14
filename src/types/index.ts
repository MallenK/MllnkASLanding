import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface StoryStep {
  tag: string;
  title: string;
  description: string;
}

export interface ProofPoint {
  label: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
