"use client";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "@/assets/icons";
import Image from "next/image";
import LangSwitch from "./lang-switch";
import Link from "next-intl/link";

type Props = {};

export default function Menu({}: Props) {
  return (
    <header className='flex items-center justify-between w-full mx-auto max-w-4xl mt-10 p-4'>
      <Link href='/'>
        <div className='w-64 h-20'>
          <Logo className='object-cover w-full h-full' />
        </div>
      </Link>
      <nav className='flex items-center justify-between'>
        {/* <a href='#' className='mx-2 text-lg font-semibold'>
          Home
        </a>
        <a href='#' className='mx-2 text-lg font-semibold'>
          About
        </a>
        <a href='#' className='mx-2 text-lg font-semibold'>
          Contact
        </a> */}
      </nav>
      <div className='flex gap-x-2'>
        <ModeToggle />
        <LangSwitch />
      </div>
    </header>
  );
}
