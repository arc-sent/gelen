import { Outlet } from "react-router-dom";
import { Header } from "./screens/General/Header";
import { Footer } from "./screens/General/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
