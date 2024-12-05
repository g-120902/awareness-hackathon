'use client';

import { Bars4Icon, XMarkIcon } from "@heroicons/react/16/solid";

// Define the types for the props
interface MenuButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

function MenuButton({ isMenuOpen, onToggle }: MenuButtonProps) {
  return (
    <button
      className="text-ivory focus:outline-none"
      onClick={onToggle}
    >
      <div className="relative w-8 h-8">
        {/* Hamburger Icon */}
        <Bars4Icon
          className={`w-8 h-8 text-ivory absolute top-0 left-0 transform transition-transform duration-300 ${
            isMenuOpen ? "scale-0" : "scale-100"
          }`}
        />

        {/* Close Icon */}
        <XMarkIcon
          className={`w-8 h-8 text-ivory absolute top-0 left-0 transform transition-transform duration-300 mt-1 ${
            isMenuOpen ? "scale-100" : "scale-0"
          }`}
        />
      </div>
    </button>
  );
}

export default MenuButton;
