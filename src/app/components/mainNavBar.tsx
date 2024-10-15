import React from "react";
import NavBarClient from "./navBarClient";
import { createClient } from "@/utils/supabase/server";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { logout } from "../[locale]/logout/actions";

const MainNavBar = async ({ lang }: { lang: string }) => {
  const supabase = createClient();
  const { data: user, error: userFetchError } = await supabase.auth.getUser();
  let { data: order, error: orderFetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();
  let { data: order_items, error: orderItemsFetchingError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order?.id);
  return (
    <div>
      <NavBarClient lang={lang}>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user?.user ? (
            // <Link
            //   href={`../${lang}/login`}
            //   className="text-sm font-medium text-gray-700 hover:text-gray-800"
            // >
            //   Log Out
            // </Link>
            <form action={logout}>
              <button
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                type="submit"
              >
                Log Out
              </button>
            </form>
          ) : (
            <>
              <Link
                href={`/${lang}/login`}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Sign in
              </Link>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <Link
                href={`/${lang}/signup`}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Create account
              </Link>
            </>
          )}
        </div>
        {/* Locale */}
        <div className="hidden lg:ml-8 lg:flex">
          <a
            href="#"
            className="text-gray-700 hover:text-gray-800 flex items-center"
          >
            <span className="ml-3 block text-sm font-medium">EN</span>
            <span className="sr-only">change locale</span>
          </a>
        </div>
        {/* Search */}
        <div className="flex lg:ml-6">
          <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-6 h-6" aria-hidden="true" />
          </a>
        </div>

        {/* Cart */}
        <div className="ml-4 flow-root lg:ml-6">
          <Link
            href={`/${lang}/cart`}
            className="group -m-2 p-2 flex items-center"
          >
            <ShoppingBagIcon
              className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
              {order_items?.length}
            </span>
            <span className="sr-only">items in cart, view bag</span>
          </Link>
        </div>
      </NavBarClient>
    </div>
  );
};

export default MainNavBar;
