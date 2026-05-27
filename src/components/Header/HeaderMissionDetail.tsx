import { ArrowBigLeftDash } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderMissionDetailProps {
  loading: boolean;
  name?: string;
}

export default function HeaderMissionDetail({
  name,
  loading,
}: HeaderMissionDetailProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-10 w-full border-b-gray-400 border-b-2 flex items-center justify-between p-4 bg-base-100">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ArrowBigLeftDash size={24} />
      </button>
      {!loading ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">par {name}</p>
      ) : (
        <div className="skeleton h-3 w-1/2 rounded-md" />
      )}
    </div>
  );
}
