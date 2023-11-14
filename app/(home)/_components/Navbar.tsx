import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 border-b shadow-md bg-white px-6 md:px-28 flex items-center z-30">
      <div className="md:max-w-screen-2xl w-full flex items-center justify-between py-10 mx-auto">
        <Logo color="dark" />
        <nav className="flex space-x-3 items-center">
          <div className="hidden md:flex space-x-3 items-center font-semibold ">
           
           <Link href="/" className="hover:text-sky-700 duration-300">Pricing</Link>
           <Link href="/" className="hover:text-sky-700 duration-300">Features</Link>
           <Link href="/" className="hover:text-sky-700 duration-300">Support</Link>
          </div>
          <div className="flex space-x-3 items-center">
            <Button
              variant="outline"
              size="lg"
              className="text-sm rounded-full">
              Login
            </Button>
            <Button size="lg" className="text-sm rounded-full">
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
