import { Outlet } from "react-router";
import { NavBar } from "../components/Navbar";
import { useMain } from "../useMain";

export default function Layout() {
    const { isExcluded } = useMain();
    return (
        <main className="min-h-screen">
            {!isExcluded && <NavBar />}
            <div className="max-w-7xl h-full lg:pl-32">
                <Outlet />
            </div>
        </main>
    )
}