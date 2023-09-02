"use client";
import React from "react";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next-intl/client";
import { useLocale } from "next-intl";
import { Text } from "./ui/text";

type Props = {};

export default function LangSwitch({}: Props) {
  const router = useRouter();
  const locale = useLocale();

  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Languages className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Switch lang</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => router.push("/", { locale: "en" })}>
          <Text value='en' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/", { locale: "fr" })}>
          <Text value='fr' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/", { locale: "ar" })}>
          <Text value='ar' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
