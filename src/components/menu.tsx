"use client";
import React from "react";
import { ModeToggle } from "./mode-toggle";

type Props = {};

export default function Menu({}: Props) {
  return (
    <header className='flex items-center justify-between w-full mx-auto max-w-4xl mt-10 p-4'>
      <h1 className='text-2xl font-bold'>Maroc Operator</h1>
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
      <ModeToggle />
    </header>
  );
}
