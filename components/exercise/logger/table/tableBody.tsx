import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { itemChange } from "../../../../utils/itemChange";
import { logSet } from "../../../../utils/logSet";

const TableBody = ({ exercise }: { exercise: string }) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  let findExercise = useAppSelector((state) => state.exercise.exercise);
  const tableData = useAppSelector((state) => state.tableData.tableData);

  return (
    findExercise && (
      <tbody className="divide-y divide-gray-200">
        {Array.from({
          length: findExercise.workoutLines[0].recsets,
        }).map((set, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
              {idx + 1}
            </td>
            <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
              <div>
                <label className="sr-only">Weight</label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={String(findExercise!.workoutLines[0].recweights)}
                  value={
                    tableData[idx]?.weightInputValue
                      ? String(tableData[idx].weightInputValue)
                      : ""
                  }
                  onChange={(e) => {
                    if (/^[0-9]*$/.test((e.target as HTMLInputElement).value)) {
                      itemChange(e, idx, "w", dispatch);
                    }
                  }}
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
                  placeholder={String(findExercise!.workoutLines[0].recsets)}
                  value={
                    tableData[idx]?.repInputValue
                      ? String(tableData[idx].repInputValue)
                      : ""
                  }
                  onChange={(e) => {
                    if (/^[0-9]*$/.test((e.target as HTMLInputElement).value)) {
                      itemChange(e, idx, "r", dispatch);
                    }
                  }}
                />
              </div>
            </td>

            <td className="py-3 pl-4">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                  onChange={(e) =>
                    logSet(
                      e,
                      idx,
                      +exercise!,
                      +tableData[idx].repInputValue,
                      +tableData[idx].weightInputValue,
                      findExercise!.workoutLines[0].id,
                      user!.id,
                      dispatch
                    )
                  }
                />
                <label htmlFor="checkbox" className="sr-only">
                  Checkbox
                </label>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    )
  );
};

export default TableBody;
