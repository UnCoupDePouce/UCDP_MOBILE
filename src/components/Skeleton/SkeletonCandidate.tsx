export default function SkeletonCandidate() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="skeleton h-32 w-full rounded-md"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
