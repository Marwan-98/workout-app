import axios from "axios";
import { useEffect } from "react";
import BrowserWorkout from "../components/BrowserWorkout";

import Layout from "../components/layout";

const BrowsWorkout = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/workouts")
      .then((res) => console.log(res));
    return () => {};
  }, []);

  return (
    <>
      <Layout element={"Browse Workouts"}>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl text-center font-semibold text-gray-900">
              Browse our carefully curated workouts
            </h1>
            <p className="text-center text-gray-300">
              Thoughtfully designed workouts meant to push you to the absolute
              limits
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <BrowserWorkout />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BrowsWorkout;
