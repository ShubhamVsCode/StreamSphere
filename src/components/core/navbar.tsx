"use client";

import ThemeMode from "@/components/core/theme-mode";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const links = [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await axios("http://localhost:3001/api/validate", {
        withCredentials: true,
      });
    },
  });

  return (
    <nav className='flex justify-between items-center py-5 px-20 border-b'>
      <Link href='/' className='text-xl font-semibold'>
        <span>Stream Sphere</span>
      </Link>
      <div className='flex gap-5 items-center'>
        {links.map(({ href, label }) => (
          <Link href={href} key={`${href}${label}`}>
            <span className='px-2 py-1'>{label}</span>
          </Link>
        ))}
        <ThemeMode />
      </div>
    </nav>
  );
};

export default Navbar;
