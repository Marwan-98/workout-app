import DateCalendar from "../components/dateCalendar";
import Layout from "../components/layout";

const Calendar = () => {
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
                  <div className="flex justify-start">
                    <div className="flex flex-col grow md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                      <img
                        className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src="https://images.unsplash.com/photo-1506704563811-e81bcede0640?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
                        alt=""
                      />
                      <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                          Jumping Jacks
                        </h5>
                        <ul className="text-gray-700 text-base mb-4">
                          <li>10 reps - 20 KG</li>
                          <li>10 reps - 30 KG</li>
                          <li>10 reps - 30 KG</li>
                          <li>100 reps - 4 KG</li>
                        </ul>
                        <a href="#">View Exercise</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-80 justify-self-end">
                <DateCalendar />
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
