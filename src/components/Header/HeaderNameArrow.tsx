import { ArrowBigLeftDash } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderProps {
  name?: string;
}

export default function HeaderNameArrow({ name }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-10 w-full border-b-gray-400 border-b-2 flex items-center justify-between p-4 bg-base-100">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ArrowBigLeftDash size={24} />
      </button>

      <h1 className="text-2xl font-black uppercase tracking-tighter">{name}</h1>
    </header>
  );
}
