/* This example requires Tailwind CSS v2.0+ */
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/slices/userSlice";

export default function Example() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get("/api/streak", {
        headers: {
          id: user!.id,
        },
      })
      .then((res) => dispatch(getUser(res.data)));
  }, []);

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Good Morning, {user?.firstName}
              </h3>
              <p className="text-sm text-gray-500">
                🔥 {user?.streak} Day Streak
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <Link href={"/browseWorkouts"}>
            <button
              type="button"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span>Browse Workouts</span>
            </button>
          </Link>
          <button
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>Start Today's Workout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
