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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { isEmpty } from "ramda";

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
  const formProps = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      results: {},
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data.phoneNumber ", data.phoneNumber);
    if (!data.phoneNumber) {
      return formProps.setError("phoneNumber", {
        type: "manual",
        message: "please Phone number is required",
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
      formProps.setError("phoneNumber", {
        type: "manual",
        message: err.message,
      });
    }
  };

  const results = formProps.watch("results");
  const errorsPhoneNumber = formProps.formState.errors?.phoneNumber?.message;
  console.log("results ", results);
  return (
    <Form {...formProps}>
      <form
        className='flex flex-1 flex-col mt-20 w-full justify-center items-center'
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
                    placeholder='Enter phone number'
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
                {/* <FormDescription className='text-red-500'>
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='h-12 w-full' type='submit'>
            Submit
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
  const carrierLogo: any = {
    IAM: IAMlogo,
    INW: INWIlogo,
    ORA: ORANGElogo,
  };

  const phone = results?.phone?.replace("0", "+212 ");

  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
      <div className='flex items-center w-1/2 gap-4'>
        <div className='w-1/3 grayscale'>
          <AspectRatio
            className='mr-4 w-32 h-32 rounded-full border flex items-center justify-center p-4'
            ratio={16 / 16}
          >
            <Image
              src={carrierLogo[results?.code]}
              alt='Image'
              className='rounded-md object-cover'
            />
          </AspectRatio>
        </div>
        <div className='flex flex-col text-xl whitespace-nowrap flex-1 w-2/3 pl-10 gap-y-2'>
          <div className='text-xl'> {phone} </div>
          <div className='capitalize'>{`${results?.carrier} | ${results?.line_type}`}</div>
          {results?.location && (
            <div className='flex items-center'>
              <div>
                <Location className='w-6 h-6 mr-4' />
              </div>
              <div>{results?.location}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
