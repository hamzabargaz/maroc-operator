import React from "react";
import Image from "next/image";
import { isEmpty } from "ramda";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Location } from "@/assets/icons";
import { IAMlogo, INWIlogo, ORANGElogo } from "@/assets/images";

export default function Result({ results }: any) {
  const t = useTranslations("Index");
  const carrierLogo: any = {
    IAM: IAMlogo,
    INW: INWIlogo,
    ORA: ORANGElogo,
  };

  const phone = results?.phone?.replace("0", "+212 ");

  return (
    <div className='flex flex-col items-center justify-center w-full border rounded-lg p-4 mt-10'>
      <div className='grid grid-col-1 md:grid-cols-3 content-center gap-4'>
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
            <div style={{ direction: "ltr" }} className='text-xl'>
              {phone}
            </div>
            <div className='capitalize font-light'>
              {`${t(results?.code)} | ${t(results?.line_type)}`}
            </div>
          </div>
        </Skeleton>
        {results?.location && (
          <>
            <Separator className='col-span-3 my-3' />

            <div
              style={{ direction: "ltr" }}
              className='flex items-center w-full col-span-3 pb-4'
            >
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
}
