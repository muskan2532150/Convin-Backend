import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          BookCar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
