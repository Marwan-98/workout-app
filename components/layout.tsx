import { useRouter } from "next/router";
import Link from "next/link";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import {
  XMarkIcon,
  Bars3BottomLeftIcon,
  BoltIcon,
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { User } from "../redux/slices/userSlice";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "/home", icon: HomeIcon },
  { name: "Browse Workouts", href: "/browseWorkouts", icon: BoltIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Progress", href: "/progress", icon: ChartBarIcon },
];

const userNavigation = [
  // { name: "Your Profile", href: "#" },
  // { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Layout({
  children,
  element,
}: {
  children: React.ReactNode;
  element: string;
}) {
  const user = useAppSelector((state) => state.user.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_DATABASE_NAME!,
    process.env.NEXT_PUBLIC_DATABASE_ANON_KEY!
  );

  const auth = async () => {
    const session = supabase.auth.session();
    return session;
  };

  useEffect(() => {
    auth().then(async (res) => {
      if (res) {
        if (!user) {
          const { user, error } = await supabase.auth.api.getUser(
            res.access_token
          );
          if (user) {
            axios
              .get("/api/user", {
                headers: {
                  mail: user.email!,
                },
              })
              .then((res) => dispatch(getUser(res.data)));
          }
        }
      } else {
        router.push("/signIn");
      }
    });
  }, []);

  return user ? (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="./assets/logo-4.png"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.name === element
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.name === element
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="../../../assets/logo-4.png"
              alt="Your Company"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={classNames(
                      item.name === element
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group rounded-md py-2 px-2 flex items-center text-sm font-medium cursor-pointer"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.name === element
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64">
        <div className="mx-auto flex max-w-5xl flex-col  md:px-8 xl:px-0">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-end px-4 md:px-0">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <span className="text-base mx-4">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link href={item.href}>
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                {item.name}
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 y">{children}</main>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Layout;
