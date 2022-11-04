const TableHead = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          #
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Weight (KG)
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Reps
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
        ></th>
      </tr>
    </thead>
  );
};

export default TableHead;
