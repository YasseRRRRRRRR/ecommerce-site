import StripeStuff from "./components/stripeStuff";
import { createClient } from "@/utils/supabase/server";

import Testing from "./components/testing";
// import Products from "./components/Products";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { logout } from "./logout/actions";
import { X, Star, Check, ArrowRight } from "lucide-react";
import CascadingAvalanch from "../components/cascadingAvalanch";
import MaxWidthWrapper from "../components/maxWidthWrapper";

// temp data
const trendingProducts = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "/man-transports-unicycle-street-aunicycle-electric-close-up-198572181-964340926.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "/man-transports-unicycle-street-aunicycle-electric-close-up-198572181-964340926.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "/man-transports-unicycle-street-aunicycle-electric-close-up-198572181-964340926.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "/man-transports-unicycle-street-aunicycle-electric-close-up-198572181-964340926.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  // More products...
];
export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  let { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user.user?.id);

  // this feels hacked toghe
  let user_order = 0;
  if (orders) {
    user_order = orders[0].id;
  }
  let { data: order_items } = await supabase
    .from("order_items")
    .select()
    .eq("order_id", user_order);

  // .eq("", orders?[0].id);
  // if (error || !data?.user) {
  //   redirect(`/${locale}/login`);
  // }

  return (
    // logginning in testing
    // <div className="flex flex-col justify-center h-screen items-center">
    //   {user?.user ? <>logged in as {user?.user?.email}</> : <>fuckeri</>}
    //   <br />
    //   <Testing thing={orders} />

    //   <div>
    //     {orders?.map((order, i) =>
    //       order ? (
    //         <ul key={i} className="flex flex-col">
    //           {" "}
    //           <li>
    //             order n0{i + 1}: {order.id}
    //           </li>
    //         </ul>
    //       ) : (
    //         <>policy is fucked</>
    //       )
    //     )}
    //     {order_items?.map((order, i) =>
    //       order ? (
    //         <ul key={i} className="flex flex-col">
    //           {" "}
    //           <li>
    //             product n0{i + 1}: {order.price}€
    //           </li>
    //         </ul>
    //       ) : (
    //         <>policy is fucked</>
    //       )
    //     )}
    //   </div>

    //   {/* <LoginLink>Sign in</LoginLink> */}
    //   {/* <RegisterLink>Sign up</RegisterLink> */}
    //   <Link href={`${locale}/login`}>Login</Link>
    //   <Link href={`${locale}/products`}>Products</Link>
    //   <form action={logout}>
    //     <button type="submit">logout</button>
    //   </form>
    // </div>
    <div className="bg-slate-50 my-8">
      {/* hero section */}
      <section>
        {/* <div className="pb-24 pt-10 lg:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:ob-52"> */}
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:ob-52">
          <div className="col-span-1 p-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                <Image
                  width={200}
                  height={200}
                  src="/cat.jpg"
                  alt="the cutest illustration of cat on a unicycle afore a red background"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-6xl">
                Unleash your inner{" "}
                <span className="bg-red-600 px-2 text-white">adventurer</span>{" "}
                on one wheel
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Have you ever looked to yourself and thought <br />
                <span className="italic font-semibold">
                  --Huh, you know what would really make me feel really good
                  right now... a unicycle--
                </span>{" "}
                <br />
                No, well that doesn&apos;t matter, here in one-wheel-odyssy
                <span>&trade;</span> we believe in overconsumption, and
                indulging your darkest impulses.
              </p>
              <span className="mt-6 text-base">
                Yes, You simply need it, and must have, go on, let us rest on
                your shelf and collect dust.
              </span>
              <div className="mt-8 flex justify-center gap-2">
                <Link
                  href="/configure/collections"
                  className="inline-block text-center bg-red-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-red-700"
                >
                  Shop Collection
                  {/* not sure if i should leave it or take it away */}
                  {/* <ArrowRight /> */}
                </Link>
              </div>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <X className="h-5 w-5 shrink-0 text-red-600" />
                    Low-quality, cheap material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <X className="h-5 w-5 shrink-0 text-red-600" />4 year
                    garantee (maybe)
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <X className="h-5 w-5 shrink-0 text-red-600" />
                    human legs not supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5 ">
                <div className="flex -space-x-4">
                  <img
                    src="/users/user-1.png"
                    alt="unhappy customer's face"
                    className="inline-block object-cover object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-3.jpg"
                    alt="unhappy customer's face"
                    className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-2.jpg"
                    alt="unhappy customer's face"
                    className="inline-block object-cover object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-4.jpg"
                    alt="unhappy customer's face"
                    className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start ">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-red-600 fill-red-600" />
                    <Star className="h-4 w-4 text-red-600 fill-red-600" />
                    <Star className="h-4 w-4 text-red-600 fill-red-600" />
                    <Star className="h-4 w-4 text-red-600 fill-red-600" />
                    <Star className="h-4 w-4 text-red-600 fill-red-600" />
                  </div>
                  <p>
                    <span className="font-semibold">3.250</span> unhappy
                    customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full h-[800px] lg:col-span-1 w-full hidden lg:flex items-start justify-around px-4 sm:px-16 md:px-0  lg:mx-0 l ">
            <CascadingAvalanch />
          </div>
        </MaxWidthWrapper>
        {/* </div> */}
      </section>
      <section aria-labelledby="trending-heading" className="bg-white">
        <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8">
          <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
            <h2
              id="trending-heading"
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              Trending products
            </h2>
            <a
              href="#"
              className="hidden sm:block text-sm font-semibold text-red-600 hover:text-red-500"
            >
              See More<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-8 relative">
            <div className="relative w-full overflow-x-auto">
              <ul
                role="list"
                className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
              >
                {trendingProducts.map((product) => (
                  <li
                    key={product.id}
                    className="w-64 inline-flex flex-col text-center lg:w-auto"
                  >
                    <div className="group relative">
                      <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-gray-500">{product.color}</p>
                        <h3 className="mt-1 font-semibold text-gray-900">
                          <a href={product.href}>
                            <span className="absolute inset-0" />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-gray-900">{product.price}</p>
                      </div>
                    </div>

                    <h4 className="sr-only">Available colors</h4>
                    <ul
                      role="list"
                      className="mt-auto pt-6 flex items-center justify-center space-x-3"
                    >
                      {product.availableColors.map((color) => (
                        <li
                          key={color.name}
                          className="w-4 h-4 rounded-full border border-black border-opacity-10"
                          style={{ backgroundColor: color.colorBg }}
                        >
                          <span className="sr-only">{color.name}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 px-4 sm:hidden">
            <a
              href="#"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              See everything<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>
      {/* testimonials*/}
      <section className="bg-slate-100 py-24">
        {/* <div className="flex flex-col items-center gap-16 sm:gap-32"> */}
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What are people saying?
            </h2>
            <Image
              width={200}
              height={200}
              src="/circus.png"
              alt="illustration of a man juggling somesort of bowling pins while on unicycle afore a red background, very on theme if I do say so myself"
              className="order-0 lg:order-2 h-auto"
            />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &quot;Personally I didn&apos;t see the point of owning a
                  unicycle, the whole bipedle thing for a start is not really my
                  thing but I have to say, it has really made me{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    instantly much more interesting
                  </span>
                  , and got me out of the adoption agency in minutes, would
                  highly recommend&quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-3.jpg"
                  alt="unhappy customer's face, now much larger with a rounded edges"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Elmer</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-red-600" />
                    <p className="text-sm">Verified good boy</p>
                  </div>
                </div>
              </div>
            </div>
            {/* second review */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &quot;What, What are you talking about, I would never make
                  such a frivoulous purchase, w.what, who even are you{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    how did you even get here,
                  </span>{" "}
                  what are you doing in my house&quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-2.jpg"
                  alt="unhappy customer's face, now much larger with a rounded edges"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">lillith</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-red-600" />
                    <p className="text-sm">Prefers the name Lilly</p>
                  </div>
                </div>
              </div>
            </div>
            {/* third review */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
                <Star className="h-5 w-5 text-red-600 fill-red-600 " />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &quot;Renting a unicycle from One-Wheel Odyssey was an amazing
                  experience. The staff was friendly and helpful, and the
                  unicycle was in great condition.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    I had a blast
                  </span>{" "}
                  exploring the city on one wheel!&quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-1.png"
                  alt="unhappy customer's face, now much larger with a rounded edges"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Joshua</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-red-600" />
                    <p className="text-sm">Unverified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </MaxWidthWrapper>
      </section>
      {/* not reviews just some products gotta change that component name ASAP */}
      <section className="bg-slate-100 py-24">{/* <Reviews /> */}</section>
    </div>
  );
}
