import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { getRecords } from "../../redux/slices/recordsSlice";
import Loading from "../loading";

const stats = [
  { color: "bg-red-600" },
  { color: "bg-black" },
  { color: "bg-blue-600" },
  { color: "bg-green-600" },
  { color: "bg-red-600" },
];

const Records = () => {
  const user = useAppSelector((state) => state.user.user);
  const records = useAppSelector((state) => state.record.records);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/log", {
        headers: {
          id: user!.id,
        },
      })
      .then((res) => dispatch(getRecords(res.data)));
  }, []);
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        🏆 Personal Records
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {!records ? (
          <Loading type={"record"} />
        ) : (
          records.map((record, index) => (
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
          ))
        )}
      </dl>
    </div>
  );
};

export default Records;
