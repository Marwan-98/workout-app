import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://pqkkxvioahfuamuylvhp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxa2t4dmlvYWhmdWFtdXlsdmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMxNTM2MjAsImV4cCI6MTk3ODcyOTYyMH0.1XSn463Ud_GgSSxeVw2YE4buC4RVLQFzRnUC60XIOX0"
);

async function signInWithEmail(email: string, password: string) {
  try {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

export default function SignIn() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signInWithEmail(values.email, values.password).then(() => {
        router.push("/home");
      });
    },
  });
  return (
    <div className="h-screen bg-white">
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="./assets/logo-4.png"
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1B2131]">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link href="/signUp">
                  <span className="font-medium text-[#1B2131] hover:text-[#1C2141] cursor-pointer">
                    Create a new account
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://www.kantar.com/-/media/project/kantar/global/articles/images/2020/man-tying-nike-shoes.jpg?h=600&w=900&hash=8465333CD1B0011AFF5209E947489CA4"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
