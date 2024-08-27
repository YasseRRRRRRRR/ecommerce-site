// Import the Supabase client
import Link from "next/link";
// import supabase from "../../../utils/supabaseClient";
import Image from "next/image";
import supabase from "@/utils/supabaseClient";
// import supabase from "@/utils/supabaseClient";

// const fetchProducts = async () => {
//   let { data } = await supabase.from("Products").select("*");
//   return data;
// };

const Products = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  let { data: Products, error } = await supabase.from("products").select("*");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {/* Customers also purchased */}
          Here Lieth the eventual filters and stuff{" "}
        </h2>

        <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Products?.map((product) => (
            <li key={product.id}>
              <Link
                href={`/${locale}/products/${product.id}`}
                className="group relative"
              >
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    width={280}
                    height={380}
                    alt="image"
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product_images/${product.image}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {" "}
                      € {product.price}
                    </p>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900">
                    € {product.price}
                  </p> */}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
    // this would be ideally the main product page
  );
};

export default Products;
