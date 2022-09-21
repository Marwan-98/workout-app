/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { format, isSameDay, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DateCalendar from "../components/dateCalendar";
import Layout from "../components/layout";
import { useAppSelector } from "../redux/hooks";
import { getUserExercises, userExercise } from "../redux/slices/exerciseSlice";
import { groupBy } from "lodash";

const Calendar = () => {
  // new Date("2022-9-20 17:57:55")
  const dispatch = useDispatch();
  const userExercises = useAppSelector((state) => state.exercise.userExercise);
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));
  
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      console.log(user.id);
      axios
        .get("/api/exercises", { headers: { id: user.id } })
        .then(({ data }: { data: Array<userExercise> }) => {
          const exercises = groupBy(data, (exercise) => exercise.createdAt);
          dispatch(getUserExercises(exercises));
        });
    }
  }, []);
  return (
    <>
      <Layout element={"Calendar"}>
        <div className="py-6">
          <div className="px-4 sm:px-6 md:px-0"></div>
          <div className="px-4 sm:px-6 md:px-0">
            {/* Replace with your content */}
            <div className="py-4">
              <h3 className="text-3xl font-extrabold">Workout History</h3>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <div className="py-4 columns-2 ">
                  <div>
                    <h4 className="font-bold">Workout</h4>
                    <p>Cardio Day</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Date</h4>
                    <p>January 14, 2021</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col justify-start">

                    {Object.keys(userExercises).map((key, idx) => {
                      if (isSameDay(selectedDay, new Date(key))) {
                        return (
                          <div
                            key={idx}
                            className="flex flex-col my-5 grow md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg"
                          >
                            <img
                              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                              src="https://images.unsplash.com/photo-1506704563811-e81bcede0640?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
                              alt=""
                            />
                            <div className="p-6 flex flex-col justify-start">
                              <h5 className="text-gray-900 text-xl font-medium mb-2">
                                {userExercises[key][idx].exercise.name}
                              </h5>
                              <ul className="text-gray-700 text-base mb-4">
                                {userExercises[key].map((log) => {
                                  return (
                                    <li key={idx}>
                                      {log.reps} reps - {log.weight} KG
                                    </li>
                                  );
                                })}
                              </ul>
                              <a href="#">View Exercise</a>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="w-80 justify-self-end">
                <DateCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  today={today}
                />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Calendar;
