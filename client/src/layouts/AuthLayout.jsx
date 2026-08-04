import { Outlet } from "react-router-dom";
import signUp_bg from "../assets/bgs/signUp_bg.jpeg";
import logo from "../assets/logo.png";

const AuthLayout = () => {
    return (
        <main className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-2">

            <section className="relative min-h-[35vh] lg:min-h-screen">
                <img
                    src={signUp_bg}
                    alt=""
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-cinematic/60"></div>

                <div className="absolute inset-0 flex flex-col justify-between px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12">

                    <img
                        src={logo}
                        alt="Memory Gallery"
                        className="h-auto w-40 object-contain sm:w-48 lg:w-60"
                    />

                    <div className="max-w-xl">
                        <h2 className="font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl">
                            Every story deserves a place to live.
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                            Keep the moments that made you, you — together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex min-h-[65vh] px-6 py-12 lg:min-h-screen lg:px-12">
                <Outlet />
            </section>

        </main>
    );
};

export default AuthLayout;