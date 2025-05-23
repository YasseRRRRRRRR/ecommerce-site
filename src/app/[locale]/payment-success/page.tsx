import React from "react";

const Page = ({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) => {
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-red-200 to-red-700">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-red-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </main>
  );
};

export default Page;
