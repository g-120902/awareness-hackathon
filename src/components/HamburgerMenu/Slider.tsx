'use client';

import { ReactNode } from "react";

// Define the types for the props
interface SliderProps {
  isMenuOpen: boolean;
  children: ReactNode;
}

function Slider({ isMenuOpen, children }: SliderProps) {
  return (
    <div
      className={`z-50 fixed left-0 top-10 h-full w-44 bg-pale-blue shadow-lg transform transition-transform duration-300 text-blue-hover py-12 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {children}
    </div>
  );
}

export default Slider;
