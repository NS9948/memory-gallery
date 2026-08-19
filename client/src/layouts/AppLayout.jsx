import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;