import { Routes, Route } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/home/Home";

import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";
import MemoryBookPage from "./pages/Memories/MemoryBookPage";

function App() {
    const { loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/memories" element={<MemoryBookPage/>} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;