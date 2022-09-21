import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { getRecords } from "../redux/slices/recordsSlice";

const stats = [
  { name: "squats", stat: "255", color: "bg-red-600" },
  { name: "Bicep Curl", stat: "55", color: "bg-black" },
  { name: "Bench Press", stat: "150", color: "bg-blue-600" },
  { name: "Overhead Press", stat: "90", color: "bg-green-600" },
  { name: "squats", stat: "255", color: "bg-red-600" },
];

const Records = () => {
  const user = useAppSelector((state) => state.user.user);
  const records = useAppSelector((state) => state.record);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/log", {
        headers: {
          id: user!.id,
        },
      })
      .then((res) => dispatch(getRecords(res.data)));
    return () => {};
  }, []);
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        🏆 Personal Records
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {records.map((record, index) => (
          <div
            key={Math.random()}
            className={`overflow-hidden rounded-lg ${stats[index].color} px-4 py-5 shadow sm:p-6`}
          >
            <dt className="truncate text-sm font-medium text-white">
              {record.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {record.weight}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Records;
