const ExerciseInfo = ({
  name,
  recsets,
  recreps,
  description,
}: {
  name: string;
  recsets: number;
  recreps: number;
  description: string;
}) => {
  return (
    <div className="flex-initial w-2/5">
      <h3 className="text-4xl mb-4">{name}</h3>
      <p className="mb-4">{`${recsets} Sets x ${recreps} Reps`}</p>
      <p>{description}</p>
    </div>
  );
};

export default ExerciseInfo;
