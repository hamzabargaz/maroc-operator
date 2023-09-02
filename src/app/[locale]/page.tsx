import Form from "./form";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between mx-auto px-10'>
      <div className='flex flex-col w-full mt-32 items-center justify-center text-center'>
        <Text
          as='h1'
          value='findWhichPhoneOperator'
          className='text-4xl font-bold mb-8'
        />
        <Text
          as='h2'
          value='discoverMobileOperator'
          className='text-2xl font-extralight text-slate-600 dark:text-slate-300'
        />
        <Form />
      </div>
    </main>
  );
}
