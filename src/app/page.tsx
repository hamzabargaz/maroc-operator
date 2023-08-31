import Form from "./form";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center justify-center'>
        <h1> Find Your Phone Operator in Morocco </h1>
        <h2>Discover Mobile Operator Companies and Landline Zones </h2>
        <Form />
      </div>
    </main>
  );
}
