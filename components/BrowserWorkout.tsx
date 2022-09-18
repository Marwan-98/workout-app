/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const BrowserWorkout = () => {
  const images = [
    "./assets/photo1.jpg",
    "./assets/photo2.jpg",
    "./assets/photo3.jpg",
    "./assets/yoga.jpg",
  ];
  return (
    <div className="py-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
      {images.map((image, idx) => (
        <Link href={"/workout/1"}>
          <div
            key={idx}
            className="aspect-w-1 aspect-h-1 w-full rounded-lg sm:aspect-w-2 sm:aspect-h-3 cursor-pointer mb-2"
          >
            <img
              src={image}
              alt=""
              className="h-full w-full rounded object-cover object-center group-hover:opacity-75"
            />
            <p className="font-semibold mt-2">Chest</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrowserWorkout;
