import axios from "axios";
import { useEffect } from "react";
import Layout from "../../components/layout";

const Exercise = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/exercise/1", {
        headers: {
          id: 2,
        },
      })
      .then((res) => console.log(res.data));
    return () => {};
  }, []);

  return (
    <Layout element="Browse Workouts">
      <div className="flex justify-around mb-20">
        <div className="flex-initial w-3/5 px-10">
          <div className="w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/wjsu6ceEkAQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
        <div className="flex-initial w-2/5">
          <h3 className="text-4xl mb-4">DeadLift</h3>
          <p className="mb-4">3 Sets x 20 Reps</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            totam illo inventore suscipit nostrum culpa fugit eius debitis,
            facere non qui vero sit quis, explicabo impedit exercitationem.
            Eaque, voluptatibus dolor dolorem eius quibusdam nemo officia optio
            ea distinctio deserunt tenetur odit cum dignissimos minima quo
            nostrum sit accusamus recusandae similique voluptas incidunt? Beatae
            eveniet.
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-5">Log Workout</h3>
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
    </Layout>
  );
};

export default Exercise;
