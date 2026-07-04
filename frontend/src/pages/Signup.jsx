import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        account_number: "",
        security_question: "",
        security_answer: "",
        mpin: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        try {

            const response = await API.post("/signup", formData);

            alert(response.data.message);

            setFormData({
                name: "",
                email: "",
                phone: "",
                dob: "",
                address: "",
                account_number: "",
                security_question: "",
                security_answer: "",
                mpin: ""
            });

            navigate("/login");

        }

        catch (error) {

            if (error.response) {

                alert(error.response.data.detail || "Registration Failed");

            }

            else {

                alert("Server Error");

            }

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-6">

            <div className="w-full max-w-xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10">

                <h1 className="text-5xl font-bold text-center text-cyan-400">

                    SmartBank AI

                </h1>

                <p className="text-center text-gray-300 mt-3">

                    Create Your Secure Banking Account

                </p>

                <div className="mt-10 space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="text"
                        name="account_number"
                        placeholder="Account Number"
                        value={formData.account_number}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="text"
                        name="security_question"
                        placeholder="Security Question"
                        value={formData.security_question}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        type="text"
                        name="security_answer"
                        placeholder="Security Answer"
                        value={formData.security_answer}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <input 
                        type="password"
                        name="mpin"
                        placeholder="Create 4 Digit MPIN"
                        value={formData.mpin}
                        onChange={(e) => {
                            if (e.target.value.length <= 4) {

                                setFormData({
                                    ...formData,
                                    mpin: e.target.value.replace(/\D/g, "")
                                });
                            }
                        }}
                         className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    

                    <button

                        type="button"

                        onClick={handleSubmit}

                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg transition duration-300"

                    >

                        Create Account

                    </button>

                </div>

                <div className="mt-8 text-center text-gray-300">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-cyan-400 ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Signup;