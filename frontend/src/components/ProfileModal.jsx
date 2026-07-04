function ProfileModal({

    showProfile,
    setShowProfile,

    profileData,

    user,

    setShowEditProfile,

    setShowChangeMPIN,

    logout

}) {

    if (!showProfile) return null;

    return (

        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            onClick={() => setShowProfile(false)}
        >

            <div
                className="bg-slate-900 w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl p-10 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >

                <button

                    onClick={() => setShowProfile(false)}

                    className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-white"

                >

                    ✕

                </button>

                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">

                    👤 My Profile

                </h2>

                <div className="grid grid-cols-2 gap-5">

                    <Card title="Full Name" value={profileData.name} />

                    <Card title="Email" value={profileData.email} />

                    <Card title="Phone" value={profileData.phone} />

                    <Card title="Account Number" value={user.account_number} />

                    <Card title="Address" value={profileData.address} />

                    <Card title="Date of Birth" value={profileData.dob} />

                </div>

                <div className="grid gap-4 mt-8">

                    <button

                        onClick={() => {

                            setShowProfile(false);

                            setShowEditProfile(true);

                        }}

                        className="bg-cyan-500 hover:bg-cyan-400 py-3 rounded-xl"

                    >

                        Edit Profile

                    </button>

                    <button

                        onClick={() => {

                            setShowProfile(false);

                            setShowChangeMPIN(true);

                        }}

                        className="bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"

                    >

                        Change MPIN

                    </button>

                    <button

                        onClick={logout}

                        className="bg-red-500 hover:bg-red-400 py-3 rounded-xl"

                    >

                        Logout

                    </button>

                    <button

                        onClick={() => setShowProfile(false)}

                        className="bg-slate-700 hover:bg-slate-600 py-3 rounded-xl"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div className="bg-slate-800 rounded-xl p-5">

            <p className="text-gray-400">

                {title}

            </p>

            <p className="mt-2 text-white">

                {value}

            </p>

        </div>

    );

}

export default ProfileModal;