import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className='flex flex-col items-center justify-center py-20'>
      <h1 className='text-3xl font-bold'>Home</h1>

      <pre className='mt-5 bg-black text-white py-4 px-6 rounded-xl'>
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
