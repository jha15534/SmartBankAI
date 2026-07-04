import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Profile() {

    const accountNumber = localStorage.getItem("account_number");

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: ""
    });

    const fetchProfile = async () => {

        try {

            const response = await API.get(`/profile/${accountNumber}`);

            setProfile(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const updateProfile = async () => {

        try {

            const response = await API.put(
                `/profile/${accountNumber}`,
                profile
            );

            alert(response.data.message);

        } catch (error) {

            alert("Update Failed");

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">

                <div className="bg-slate-900 p-10 rounded-2xl w-[550px]">

                    <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
                        My Profile
                    </h1>

                    <div className="space-y-5">

                        <input
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-3 rounded-lg bg-slate-800"
                        />

                        <input
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 rounded-lg bg-slate-800"
                        />

                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full p-3 rounded-lg bg-slate-800"
                        />

                        <input
                            type="date"
                            name="dob"
                            value={profile.dob}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-slate-800"
                        />

                        <input
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full p-3 rounded-lg bg-slate-800"
                        />

                        <button

                            onClick={updateProfile}

                            className="w-full bg-cyan-500 hover:bg-cyan-400 py-3 rounded-lg text-lg font-semibold"

                        >

                            Update Profile

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Profile;