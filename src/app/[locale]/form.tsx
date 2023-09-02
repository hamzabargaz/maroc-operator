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
import { IAMlogo, INWIlogo, ORANGElogo } from "@/assets/images";
import { Location } from "@/assets/icons";
import Image from "next/image";
import { isEmpty } from "ramda";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useTranslations } from "next-intl";

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
        <div className='flex flex-col w-1/2 mt-10 items-start justify-center text-left'>
          {!isEmpty(results) && <Result results={results} />}
        </div>
      </form>
    </Form>
  );
}

const Result = ({ results }: any) => {
  const t = useTranslations("Index");
  const carrierLogo: any = {
    IAM: IAMlogo,
    INW: INWIlogo,
    ORA: ORANGElogo,
  };

  const phone = results?.phone?.replace("0", "+212 ");

  return (
    <div className='flex flex-col items-center justify-center w-full border rounded-lg p-4 mt-10'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='grayscale'>
          <div className='mr-4 w-32 h-32 rounded-full border flex items-center justify-center p-4'>
            <Skeleton
              className='object-cover w-32 h-32 rounded-full'
              cond={isEmpty(carrierLogo[results?.code])}
            >
              <Image
                src={carrierLogo[results?.code]}
                alt='Image'
                className='object-cover'
              />
            </Skeleton>
          </div>
        </div>
        <Skeleton
          count={3}
          className='mb-4 w-64 h-6'
          cond={isEmpty(results?.carrier)}
        >
          <div className='col-span-2 flex flex-col justify-center text-xl gap-y-2'>
            <div className='text-xl'>{phone}</div>
            <div className='capitalize font-light'>
              {`${t(results?.code)} | ${t(results?.line_type)}`}
            </div>
          </div>
        </Skeleton>
        {results?.location && (
          <>
            <Separator className='col-span-3 my-3' />

            <div className='flex items-center w-full col-span-3 pb-4'>
              <div>
                <Location className='w-6 h-6 mr-4 text-black dark:text-white' />
              </div>
              <div>{results?.location}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
