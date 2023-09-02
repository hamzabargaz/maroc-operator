"use client";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  className?: string;
  value: string;
  as?: keyof JSX.IntrinsicElements;
};

const Text = ({ value, className, as = "span" }: Props) => {
  const t = useTranslations("Index");
  const Variant = as;

  return <Variant className={className}>{t(value)}</Variant>;
};

export { Text };
