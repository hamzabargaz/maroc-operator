"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {};

const schema = yup.object().shape({
  phoneNumber: yup.string(),
  results: yup.object().shape({
    carrier: yup.string(),
    line_type: yup.string(),
    location: yup.string(),
  }),
});

export default function Form({}: Props) {
  const formProps = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      results: {
        carrier: "",
        line_type: "",
        location: "",
      },
    },
  });
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = formProps;

  const onSubmit = async (data: any) => {
    console.log("data.phoneNumber ", data.phoneNumber);
    if (!data.phoneNumber) {
      return setError("phoneNumber", {
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

      return setValue("results", json.body);
    } catch (err: any) {
      setError("phoneNumber", {
        type: "manual",
        message: err.message,
      });
    }
  };

  const { onChange } = register("phoneNumber");

  const results = watch("results");

  return (
    <form className='flex flex-col mt-10' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start'>
        <div className=' flex flex-col'>
          <input
            {...register("phoneNumber")}
            onChange={(e) => {
              const { value } = e.target;
              const validateNumber = (n: any) => n >= 0;
              if (validateNumber(value)) {
                onChange(e);
              }
            }}
            type='number'
            placeholder='Enter your phone number'
            className='p-2 rounded-xl text-black'
          />
          {
            <span className='text-red-500 mt-2'>
              {errors?.phoneNumber?.message}{" "}
            </span>
          }
        </div>
        <button type='submit' className='ml-3 p-2 bg-white text-black'>
          Find
        </button>
      </div>
      <div className='text-white mt-10'>
        <div> carrier: {results?.carrier} </div>
        <div> line type : {results?.line_type} </div>
        <div> location : {results?.location} </div>
      </div>
    </form>
  );
}
