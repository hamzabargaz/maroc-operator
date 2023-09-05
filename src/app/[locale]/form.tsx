"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isEmpty } from "ramda";
import { Text } from "@/components/ui/text";
import { useTranslations } from "next-intl";
import Result from "./result";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {};

const schema = yup.object().shape({
  phoneNumber: yup.string(),
  results: yup.object().shape({
    code: yup.string(),
    carrier: yup.string(),
    line_type: yup.string(),
    location: yup.string(),
  }),
});

export default function FormDetector({}: Props) {
  const t = useTranslations("Index");
  const router = useRouter();
  const formProps = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      results: {},
    },
  });

  const onSubmit = async (data: any) => {
    if (!data.phoneNumber) {
      return formProps.setError("phoneNumber", {
        type: "manual",
        message: t("pleasePhoneNumberRequired"),
      });
    }

    try {
      const res = await fetch("/api/detector", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }
      formProps.reset();
      router.push("/#results");
      return formProps.setValue("results", json.body);
    } catch (err: any) {
      return formProps.setError("phoneNumber", {
        type: "manual",
        message: t(err.message),
      });
    }
  };

  const results = formProps.watch("results");
  return (
    <Form {...formProps}>
      <form
        className='flex flex-col mt-20 max-w-4xl w-full justify-center items-center'
        onSubmit={formProps.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 w-full md:w-1/2 text-left gap-4'>
          <FormField
            control={formProps.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='col-span-2 h-12'>
                <FormControl>
                  <Input
                    className='h-full text-lg'
                    placeholder={t("enterPhoneNumber")}
                    type='number'
                    value={field.value}
                    onChange={(e) => {
                      if (results) {
                        formProps.setValue("results", {});
                      }
                      field.onChange(e);
                    }}
                    // {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='h-12 w-full' type='submit'>
            <Text value='detect' />
          </Button>
        </div>
        <div
          id='results'
          className='flex flex-col w-full md:w-1/2  mt-10 pb-10 items-start justify-center text-left'
        >
          {!isEmpty(results) && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ delay: 0.35, ease: "easeInOut", duration: 0.35 }}
            >
              <Result results={results} />
            </motion.div>
          )}
        </div>
      </form>
    </Form>
  );
}
