import { ReactNode } from 'react';

declare type ButtonProps = {
  color: "red" | "green" | "blue" | "yellow" | "indigo" | "black" | "white";
  children: ReactNode;
} & Partial<React.ComponentProps<"button">>;