import SkeletonSearch from "../../components/Skeleton/SkeletonSearch.tsx";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";

export default function MissionSearchPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header name={"Recherche"} />
      <div className="flex flex-col px-4 py-8 my-20">
        <div className="flex flex-col gap-6 mb-8">
          <label className="input flex items-center gap-2 w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Rechercher" />
          </label>

          <select className="select w-full">
            <option value="default" disabled selected>
              Sélectionner un métier
            </option>
            <option value="ebeniste">Ébéniste</option>
            <option value="plombier">Plombier</option>
            <option value="electricien">Électricien</option>
          </select>
        </div>

        {loading ? (
          <>
            <SkeletonSearch />
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-32 w-full rounded-md bg-gray-200"></div>
                <p className="font-medium text-sm">Jean Dupont</p>
                <p className="text-xs text-gray-500">Plombier · Marseille</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-32 w-full rounded-md bg-gray-200"></div>
                <p className="font-medium text-sm">Sarah Martin</p>
                <p className="text-xs text-gray-500">Électricienne · Aix</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-32 w-full rounded-md bg-gray-200"></div>
                <p className="font-medium text-sm">Ali Ben</p>
                <p className="text-xs text-gray-500">Maçon · Toulon</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-32 w-full rounded-md bg-gray-200"></div>
                <p className="font-medium text-sm">Lucas Morel</p>
                <p className="text-xs text-gray-500">Peintre · Nice</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
