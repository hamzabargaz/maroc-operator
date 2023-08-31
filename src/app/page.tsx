import Form from "./form";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between mx-auto px-10'>
      <div className='flex flex-col w-full mt-32 items-center justify-center text-center'>
        <h1 className='text-4xl font-bold mb-8'>
          Find Which Phone Operator in Morocco
        </h1>
        <h2 className='text-2xl font-extralight text-slate-600 dark:text-slate-300'>
          Discover Mobile Operator Companies and Landline Zones
        </h2>
        <Form />
      </div>
    </main>
  );
}
