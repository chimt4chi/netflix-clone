import React from "react";

interface NavbarItemsProp {
  label: string;
}

function NavbarItem({ label }: NavbarItemsProp) {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
}

export default NavbarItem;
