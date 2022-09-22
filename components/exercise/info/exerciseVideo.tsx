const ExerciseVideo = ({ videoURL }: { videoURL: string }) => {
  return (
    <div className="flex-initial w-3/5 px-10">
      <div className="w-full aspect-video">
        <iframe
          src={videoURL}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default ExerciseVideo;
