import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [accountNumber, setAccountNumber] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [showQuestion, setShowQuestion] = useState(false);

    const fetchQuestion = async () => {

        if (accountNumber === "") {

            alert("Please Enter Account Number");
            return;

        }

        try {

            const response = await API.post("/login/account", {
                account_number: accountNumber
            });

            if (response.data.security_question) {

                setSecurityQuestion(response.data.security_question);
                setShowQuestion(true);

            } else {

                alert(response.data.message);

            }

        }

        catch (error) {

            alert("Account Not Found");

        }

    };

    const login = async () => {

        try {

            const response = await API.post("/login/verify", {

                account_number: accountNumber,
                security_answer: securityAnswer

            });

            if (response.data.message === "Login Successful") {

                localStorage.setItem("account_number", accountNumber);
                localStorage.setItem("isLoggedIn", "true");

                navigate("/dashboard");

            }

            else {

                alert(response.data.message);

            }

        }

        catch (error) {

            alert("Login Failed");

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-6">

            <div className="w-full max-w-lg bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10">

                <h1 className="text-5xl font-bold text-center text-cyan-400">

                    SmartBank AI

                </h1>

                <p className="text-center text-gray-300 mt-3">

                    Secure Digital Banking Login

                </p>

                <div className="mt-10">

                    <input

                        type="text"

                        placeholder="Account Number"

                        value={accountNumber}

                        onChange={(e) => setAccountNumber(e.target.value)}

                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"

                    />

                    <button

                        onClick={fetchQuestion}

                        className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg transition duration-300"

                    >

                        Continue

                    </button>

                </div>

                {

                    showQuestion && (

                        <div className="mt-8">

                            <label className="text-cyan-300 font-semibold">

                                Security Question

                            </label>

                            <div className="mt-2 p-4 rounded-xl bg-slate-700 border border-slate-600 text-white">

                                {securityQuestion}

                            </div>

                            <input

                                type="text"

                                placeholder="Security Answer"

                                value={securityAnswer}

                                onChange={(e) => setSecurityAnswer(e.target.value)}

                                className="w-full mt-5 p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"

                            />

                            <button

                                onClick={login}

                                className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold text-lg transition duration-300"

                            >

                                Login

                            </button>

                        </div>

                    )

                }

                <div className="mt-8 text-center text-gray-300">

                    Don't have an account?

                    <Link

                        to="/signup"

                        className="ml-2 text-cyan-400 hover:underline"

                    >

                        Create Account

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;