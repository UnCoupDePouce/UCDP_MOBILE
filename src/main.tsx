import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";
import {UnreadMessagesProvider} from "./provider/UnreadMessageProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <UnreadMessagesProvider>
            <AppRouter/>
        </UnreadMessagesProvider>
    </BrowserRouter>,
);
