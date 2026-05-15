import { NavLink, useLocation } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { mainRoutes } from "../../data/data.ts";

interface HeaderProps {
  title: string;
  showButton: string;
  className?: string;
}

export function Header({ title, showButton, className }: HeaderProps) {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  const prevPath = showButton;

  const showBackButton =
    showButton !== undefined && !mainRoutes.includes(location.pathname);

  console.log("Path de retour :", prevPath);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-100 w-full transition-all duration-300
            ${
              isSticky
                ? "bg-white border-gray-100 pt-8 pb-4"
                : "border-transparent pb-6 pt-8"
            } ${className ?? ""}`}
    >
      <div className="flex items-center gap-4 h-10">
        {showBackButton && (
          <NavLink
            to={prevPath}
            className="size-10 border rounded-full flex items-center justify-center active:scale-90 transition-all text-black shrink-0 shadow-sm"
          >
            <IonIcon name={"chevron-back" as never} className="text-xl" />
          </NavLink>
        )}

        <h1 className="text-[#1A1A1A] font-black text-4xl uppercase leading-[0.85] tracking-tighter">
          {title}
        </h1>
      </div>
      <hr className="h-px mt-8 bg-black/30 border-0" />
    </header>
  );
}
