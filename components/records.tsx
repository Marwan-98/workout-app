/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { name: "squats", stat: "255", color: "red-600" },
  { name: "Bicep Curl", stat: "55", color: "black" },
  { name: "Bench Press", stat: "150", color: "blue-600" },
  { name: "Overhead Press", stat: "90", color: "green-600" },
];

const Records = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        🏆 Personal Records
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className={`overflow-hidden rounded-lg bg-${item.color} px-4 py-5 shadow sm:p-6`}
          >
            <dt className="truncate text-sm font-medium text-white">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Records;
