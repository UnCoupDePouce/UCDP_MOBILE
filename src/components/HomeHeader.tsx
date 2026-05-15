import { useFetch } from "../hooks/useFetch.ts";
import { userService } from "../api/services/userService.ts";
import IonIcon from "@reacticons/ionicons";
import { useNavigate } from "react-router";

export function HomeHeader() {
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");
  const { data: user } = useFetch(() => userService.getById(id || ""), [id]);
  const goToProfile = () => navigate("/user");

  return (
    <header className="flex flex-col gap-8">
      <div className="flex justify-end gap-2">
        <button className="size-10 bg-white rounded-full flex items-center justify-center shadow-sm active:translate-y-0.5 transition-all hover:cursor-pointer">
          <IonIcon name="notifications-outline" className="text-xl text-black" />
        </button>

        <button onClick={goToProfile} className="active:scale-95 hover:cursor-pointer active:translate-y-0.5 transition-all">
          <div className="size-10 bg-[#5D5FEF] flex items-center justify-center text-white font-black text-xs tracking-tighter">
            {user?.prenom?.charAt(0).toUpperCase()}
            {user?.nom?.charAt(0).toUpperCase()}
          </div>
        </button>
      </div>

      <div className="flex flex-col mb-6">
        <span className="mb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Bonjour
        </span>
        <h1 className="text-[#1A1A1A] font-black text-4xl uppercase leading-[0.85] tracking-tighter">
          {user?.prenom}, <br />
          {user?.role === "CLIENT" ? "QUE CRÉONS-NOUS" : "QUE RÉPARONS-NOUS"} <br />
            <span className="flex items-end gap-2">
              AUJOURD'HUI ?
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
            </span>
        </h1>
      </div>
    </header>
  );
}