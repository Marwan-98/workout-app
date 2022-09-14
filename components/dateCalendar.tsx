/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const DateCalendar = () => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));
  let firstDateCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDateCurrentMonth),
    end: endOfWeek(endOfMonth(firstDateCurrentMonth)),
  });

  const nextMonth = () => {
    let firstDateNextMonth = add(firstDateCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDateNextMonth, "MMMM-yyyy"));
  };

  const prevMonth = () => {
    let firstDateNextMonth = sub(firstDateCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDateNextMonth, "MMMM-yyyy"));
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={prevMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold">
            {format(firstDateCurrentMonth, "MMMM")}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={nextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              onClick={() => setSelectedDay(day)}
              key={day.toString()}
              type="button"
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                isSameMonth(day, today) ? "bg-white" : "bg-gray-50",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) &&
                  isSameMonth(day, firstDateCurrentMonth) &&
                  !isToday(day) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isSameMonth(day, firstDateCurrentMonth) &&
                  !isToday(day) &&
                  "text-gray-400",
                isToday(day) && !isEqual(day, selectedDay) && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 0 && colStartClasses[getDay(day)],
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg"
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  isEqual(day, selectedDay) && isToday(day) && "bg-[#DC2626]",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900"
                )}
              >
                {format(day, "d")}
              </time>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default DateCalendar;
