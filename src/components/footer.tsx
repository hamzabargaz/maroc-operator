import React from "react";
import { Text } from "./ui/text";
import Link from "next-intl/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className=' w-full mx-auto max-w-4xl flex gap-4 items-center p-4'>
      <Link href='/privacy'>
        <Text value='privacyPolicy' />
      </Link>
      <Link href='/terms'>
        <Text value='termsOfService' />
      </Link>
    </footer>
  );
}
