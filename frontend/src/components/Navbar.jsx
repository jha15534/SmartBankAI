import { Link, useLocation } from "react-router-dom";

function Navbar({ openProfile }) {

    const location = useLocation();

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return (

        <nav className="flex justify-between items-center px-12 py-5 bg-slate-900 text-white shadow-lg">

            <Link
                to="/"
                className="text-3xl font-bold text-cyan-400"
            >
                SmartBank AI
            </Link>

            <div className="flex items-center gap-8 text-lg">

                {/* Landing Page */}

                {location.pathname === "/" && (

                    <>

                        <Link
                            to="/"
                            className="hover:text-cyan-400 transition"
                        >
                            Home
                        </Link>

                        {

                            !isLoggedIn ? (

                                <>

                                    <Link
                                        to="/login"
                                        className="hover:text-cyan-400 transition"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="hover:text-cyan-400 transition"
                                    >
                                        Signup
                                    </Link>

                                </>

                            ) : (

                                <Link
                                    to="/dashboard"
                                    className="hover:text-cyan-400 transition"
                                >
                                    Dashboard
                                </Link>

                            )

                        }

                    </>

                )}

                {/* Dashboard */}

                {location.pathname === "/dashboard" && (

                    <>

                        <Link
                            to="/"
                            className="hover:text-cyan-400 transition"
                        >
                            Home
                        </Link>

                        <button
                            onClick={() => {

                                console.log("Profile Clicked");

                                openProfile();

                            }}
                            className="hover:text-cyan-400 transition"
                        >
                            Profile
                        </button>

                    </>

                )}

            </div>

        </nav>

    );

}

export default Navbar;