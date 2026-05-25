import {ArrowBigLeftDash} from "lucide-react";
import {Link, useLocation} from "react-router";

interface HeaderMissionDetailProps {
    loading: boolean;
    name?: string
}

export default function HeaderChat({name, loading}: HeaderMissionDetailProps) {
    const location = useLocation();
    const previousPath = location.state?.from;

    console.log("Location actuelle :", location);

    return (
        <div
            className="fixed top-0 z-10 w-full border-b-gray-400 border-b-2 flex items-center justify-between p-4 bg-base-100 ">
            <Link
                to={previousPath}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <ArrowBigLeftDash size={24}/>
            </Link>
            {!loading ? (<p className="text-sm text-gray-600 dark:text-gray-400">{name}</p>) : (
                <div className="skeleton h-3 w-1/2 rounded-md"/>)}
        </div>
    );
}