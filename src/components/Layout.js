import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <div className="app-shell   ">
            <NavBar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;