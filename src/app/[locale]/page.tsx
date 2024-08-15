import StripeStuff from "./components/stripeStuff";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const amount = 10.99;

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      I request <span className="text-red-500">$ {amount}</span>
      {/* <button
        className="mt-4 px-6 py-2 border-2 border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 ease-in duration-150 rounded-md"
        onClick={handleCheckout}
      >
        Checkout
      </button> */}
      <StripeStuff amount={amount} locale={locale} />
    </div>
  );
}
