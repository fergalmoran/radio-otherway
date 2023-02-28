"use client";
import React from "react";
import Link from "next/link";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import Image from "next/image";
import { LogIn, LogOut, PlusSquare, Menu, User } from "react-feather";
import { ThemeSelector } from "../widgets/ui/themes";

const Navbar = () => {
  const { profile, loading, logOut } = useAuthUserContext();
  const NavMenu = profile ? (
    <React.Fragment>
      <Link
        href="/profile"
        id="profile"
        className="gap-1 normal-case btn-ghost btn"
      >
        <User
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        Profile
      </Link>
      <button
        tabIndex={0}
        className="gap-1 normal-case btn-ghost btn"
        onClick={() => logOut()}
      >
        <LogOut
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        <span className="hidden md:inline">Logout</span>
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link
        href="/signup"
        id="signup"
        className="gap-1 normal-case btn-ghost btn"
      >
        <PlusSquare size={20} className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6" />
        Register
      </Link>
      <Link
        href="/login"
        id="login"
        className="gap-1 normal-case btn-ghost btn"
      >
        <LogIn
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        Login
      </Link>
    </React.Fragment>
  );

  return (
    <nav className="w-full navbar bg-primary text-base-200 shadow-lg">
      <Link href="/">
        <Image src="/logo.png" alt="Otherway" width={42} height={42} />
      </Link>
      <div className="flex-col hidden ml-auto text-sm text-center font-body md:flex md:flex-row">
        {!loading && NavMenu}
        <ThemeSelector />
      </div>

      <div className="ml-auto lg:hidden">
        <div className="dropdown-end dropdown" data-cy="dropdown">
          <div tabIndex={0} className="m-1 cursor-pointer">
            <Menu />
          </div>
          <div className="w-24 mt-3 space-y-3 text-center dropdown-content menu">
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
