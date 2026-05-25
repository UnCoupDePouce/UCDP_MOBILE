import {Bell} from "lucide-react";

export default function HomeHeader() {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Bonjour
            </span>

            <div className="flex items-center gap-2">
                <button
                    className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition">
                    <Bell size={18}/>
                </button>
            </div>
        </div>
    );
}