export default function Loading({ type }: { type: string }) {
  switch (type) {
    case "record":
      return (
        <div
          className={`overflow-hidden rounded-lg bg-slate-600 animate-pulse h-24 px-4 py-5 shadow sm:p-6`}
        ></div>
      );
    case "image":
      return (
        <div className="h-96 rounded-lg sm:aspect-w-2 bg-slate-600 animate-pulse sm:aspect-h-3 cursor-pointer mb-2">
          <div className="h-full w-full rounded object-cover object-center bg-slate-600 animate-pulse" />
          <div className="font-semibold h-10 mt-2 bg-slate-600 animate-pulse"></div>
        </div>
      );
    case "exercise":
      return (
        <div className="flex justify-around mb-20">
          <div className="flex-initial w-3/5 px-10">
            <div className="w-full bg-slate-600 animate-pulse">
              <div className="w-full h-full bg-slate-600 animate-pulse rounded-lg"></div>
            </div>
          </div>
          <div className="flex-initial w-2/5">
            <div className="h-10 mb-4 bg-slate-600 animate-pulse"></div>
            <div className="h-5 mb-4 bg-slate-600 animate-pulse"></div>
            <div className="h-20 bg-slate-600 animate-pulse"></div>
          </div>
        </div>
      );
    case "chart":
      return <div className="h-64 w-full bg-slate-600 animate-pulse"></div>;
    default:
      return <></>;
  }
}
