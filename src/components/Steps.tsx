export default function Steps() {
  return (
    <>
      <div className="flex flex-col items-center gap-3 w-screen mt-2 fixed z-10 bg-red-200 py-4 dark:bg-[#1d232a] bottom-0">
        <ul className="steps">
          <li className="step step-primary"></li>
          <li className="step step-primary"></li>
          <li className="step"></li>
        </ul>
      </div>
    </>
  );
}
