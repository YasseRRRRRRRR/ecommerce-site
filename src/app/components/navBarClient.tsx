"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  Popover,
  Tab,
  Transition,
  TransitionChild,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  PopoverGroup,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navigation = {
  categories: [
    {
      id: "unicycles",
      name: "Unicycles",
      comming_soon: false,

      featured: [
        {
          name: "Manual",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt: "would ideally be a random Manual unicycle sold.",
        },
        {
          name: "Electric",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt: "would ideally be a random Manual unicycle sold.",
        },
      ],
      sections: [
        {
          id: "brand",
          name: "Brand",
          items: [
            { name: "Club", href: "/products" },
            { name: "Impact", href: "#" },
            { name: "Nimbus", href: "#" },
            { name: "Kris Holm", href: "#" },
            { name: "Trainer", href: "#" },
            { name: "Unicycle.com", href: "#" },
            { name: "Hoppley", href: "#" },
            { name: "Browse All", href: "#", isUnique: true },
          ],
        },

        {
          id: "type",
          name: "Type",
          items: [
            { name: "Beginner", href: "#" },
            { name: "Intermidiate", href: "#" },
            { name: "Free Style", href: "#" },
            { name: "Trials & Street", href: "#" },
            { name: " All-Terrain", href: "#" },
          ],
        },
        {
          id: "support",
          name: "Support",
          items: [
            { name: "F.A.Q", href: "#" },
            { name: "Buying Guide", href: "#" },
            { name: "Dealer Locator", href: "#" },
            { name: "Customer Service", href: "#" },
          ],
        },
      ],
    },
    {
      id: "parts",
      name: "Parts",
      comming_soon: true,
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// CHANGE BACK TO SYNCRONOUSE
const NavBarClient = ({ children, lang }: { children: any; lang: string }) => {
  const [open, setOpen] = useState(false);
  const [advert, setAdvert] = useState(true);

  return (
    <div className=" bg-white py-4">
      {/* change the menu icons thingys */}
      {/* Mobile menu */}
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-[101] lg:hidden"
          onClose={setOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <TabGroup as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-red-600 border-red-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <a
                              href={`/${lang}/${item.href}`}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={`/${lang}/${item.href}`}
                                  className="-m-2 p-2 block text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>

              {/* <div className="border-t border-gray-200 py-6 px-4">
                <a href="#" className="-m-2 p-2 flex items-center">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    CAD
                  </span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div> */}
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>

      <header className="fixed z-[100] top-0 inset-x-0  bg-white">
        {advert && (
          <>
            <p className="hidden relative sm:flex bg-red-600 h-10  items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
              Get free delivery on orders over €900 to the the Schengen Area
              <button
                className="absolute left-[98%]"
                onClick={() => setAdvert(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </p>
          </>
        )}
        <nav
          aria-label="Top"
          className=" max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* <Testing thing={order_items} /> */}

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">One Wheel Odyssy</span>
                  <Image width={50} height={20} src="/icon.ico" alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton
                              className={classNames(
                                open
                                  ? "border-red-600 text-red-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              {category.name}
                            </PopoverButton>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <PopoverPanel className="absolute top-full inset-x-0 text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  {category.comming_soon ? (
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16 h-80">
                                      comming_soon
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative text-base sm:text-sm"
                                          >
                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-center object-cover"
                                              />
                                            </div>
                                            <a
                                              href={`/${lang}/${item.href}`}
                                              className="mt-6 block font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute z-10 inset-0"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </a>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={`/${lang}/${item.href}`}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.isUnique ? (
                                                      <span className="underline">
                                                        {item.name}
                                                      </span>
                                                    ) : (
                                                      <>{item.name}</>
                                                    )}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </PopoverPanel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">{children}</div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default NavBarClient;
