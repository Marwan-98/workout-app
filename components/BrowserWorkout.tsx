/* eslint-disable @next/next/no-img-element */

const BrowserWorkout = () => {
  const images = [
    "./assets/photo1.jpg",
    "./assets/photo2.jpg",
    "./assets/photo3.jpg",
  ];
  return (
    <div className="py-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
      {images.map((image, idx) => (
        <div
          key={idx}
          className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3"
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      ))}
    </div>
  );
};

export default BrowserWorkout;
