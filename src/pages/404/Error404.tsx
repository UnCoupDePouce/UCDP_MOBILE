import { Link } from "react-router";

export default function Error404() {
  return (
    <div
      className="px-8"
      style={{
        minHeight: "calc(100vh - 150px)",
        height: "calc(100vh - 300px)",
      }}
    >
      <div className="border-black/20 dark:border-white/20 border-dashed border rounded-xl overflow-hidden relative h-full bg-white dark:bg-gray-950">
        <svg
          fill="none"
          className="opacity-50 absolute inset-0 h-full w-full stroke-black/10 dark:stroke-white/10"
        >
          <defs>
            <pattern
              id="pattern-bg"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-bg)" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
              404
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
              Page introuvable
            </h1>

            <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl">
              Désolé, la page que vous recherchez n'existe pas ou a été
              déplacée.
            </p>

            <div className="mt-10 flex items-center justify-center">
              <Link
                to={"/"}
                className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
