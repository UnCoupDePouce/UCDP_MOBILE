import {createContext, useContext, useEffect} from "react";
import {useLocation} from "react-router";
import {NavigationStack, navStack} from "../data/navigationStack";

const NavigationContext = createContext<NavigationStack>(navStack);

export function NavigationProvider({children}: { children: React.ReactNode }) {
    const location = useLocation();

    useEffect(() => {
        navStack.push(location.pathname);
    }, [location]);

    return (
        <NavigationContext.Provider value={navStack}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigationStack() {
    return useContext(NavigationContext);
}
