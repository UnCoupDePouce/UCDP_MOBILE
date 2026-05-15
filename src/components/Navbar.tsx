import { NavLink } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { type UserRole } from "../types/user.ts";
import { useUnreadMessages } from "../providers/UnreadMessageProvider.tsx";
import { menuItems } from "../data/data.ts";

export function NavBar() {
  const { unreadCount } = useUnreadMessages();
  const userStatus = localStorage.getItem("status") as UserRole | null;

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return userStatus && item.roles.includes(userStatus);
  });

  return (
    <div className="fixed bottom-0 md:bottom-0 left-0 w-full md:w-20 md:h-screen md:px-0 z-40 transition-all duration-300 bg-[#F2F0EB]">
      <nav className="relative flex md:flex-col items-center justify-around md:justify-start md:gap-8 border-t border-gray-500 h-20 md:h-full p-1.5 md:py-10 shadow-2xl">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex-1 md:flex-none flex flex-col items-center justify-center transition-all duration-300 relative group w-full"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`hidden md:block absolute left-0 w-1 h-6 bg-black rounded-r-full transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                />
                <div className="h-7 flex items-center justify-center relative">
                  {item.to === "/message" && unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full" />
                  )}
                  <IonIcon
                    name={
                      (isActive
                        ? item.icon
                        : `${item.icon}-outline`) as unknown as "home"
                    }
                    className={`transition-all duration-300 ${isActive
                        ? "text-black "
                        : "text-gray-400  group-hover:text-black hover:translate-y-0.5 transition-all"
                      }`}
                    style={{
                      fontSize: item.name === "Créer" ? "28px" : "24px",
                    }}
                  />
                </div>

                <span
                  className={`text-[9px] font-black uppercase tracking-widest mt-1 transition-all duration-300 md:hidden ${isActive ? "text-black  opacity-100" : "opacity-0 h-0"
                    }`}
                >
                  {isActive ? item.name : ""}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
