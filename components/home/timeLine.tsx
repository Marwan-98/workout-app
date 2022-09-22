/* This example requires Tailwind CSS v2.0+ */
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Jumping Jacks",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: "https://images.unsplash.com/photo-1506704563811-e81bcede0640?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Air Squat",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: "https://images.unsplash.com/photo-1567598508481-65985588e295?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Bicep Curl",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: "https://images.unsplash.com/photo-1598268030450-7a476f602bf6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=815&q=80",
    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Advanced to interview by",
    target: "Bench Press",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    iconBackground: "bg-blue-500",
  },
  {
    id: 5,
    content: "Completed interview with",
    target: "Over Head Press",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    iconBackground: "bg-green-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TimeLine = () => {
  return (
    <div className="flow-root">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Today's Workout (Leg's Day)
      </h3>
      <ul role="list" className="mt-10 -mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`${event.icon}`}
                      alt=""
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div className="min-w-full">
                    <p className="font-medium text-gray-900">{event.target}</p>
                    <span className="text-sm text-gray-500">
                      3 Sets x 20 Reps
                    </span>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                          >
                            Weight (KG)
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                          >
                            Reps
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs text-center font-bold text-right text-gray-500 uppercase "
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                            1
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                            <div>
                              <label className="sr-only">Weight</label>
                              <input
                                type="text"
                                name="weight"
                                id="weight"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="20"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                            <div>
                              <label className="sr-only">Reps</label>
                              <input
                                type="text"
                                name="reps"
                                id="reps"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="20"
                              />
                            </div>
                          </td>
                          <td className="py-3 pl-4">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                              />
                              <label htmlFor="checkbox" className="sr-only">
                                Checkbox
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
