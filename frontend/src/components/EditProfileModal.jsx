function EditProfileModal({

    showEditProfile,

    setShowEditProfile,

    setShowProfile,

    profileData,

    setProfileData,

    updateProfile

}) {

    if (!showEditProfile) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-900 w-[650px] rounded-3xl p-10 shadow-2xl">

                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">

                    Edit Profile

                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={profileData.name}
                        onChange={(e)=>setProfileData({...profileData,name:e.target.value})}
                        className="w-full p-4 rounded-xl bg-slate-800"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={profileData.email}
                        onChange={(e)=>setProfileData({...profileData,email:e.target.value})}
                        className="w-full p-4 rounded-xl bg-slate-800"
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={(e)=>setProfileData({...profileData,phone:e.target.value})}
                        className="w-full p-4 rounded-xl bg-slate-800"
                    />

                    <input
                        type="date"
                        value={profileData.dob}
                        onChange={(e)=>setProfileData({...profileData,dob:e.target.value})}
                        className="w-full p-4 rounded-xl bg-slate-800"
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={profileData.address}
                        onChange={(e)=>setProfileData({...profileData,address:e.target.value})}
                        className="w-full p-4 rounded-xl bg-slate-800"
                    />

                </div>

                <div className="grid gap-4 mt-8">

                    <button
                        onClick={updateProfile}
                        className="bg-cyan-500 hover:bg-cyan-400 py-3 rounded-xl"
                    >

                        Save Changes

                    </button>

                    <button

                        onClick={()=>{

                            setShowEditProfile(false);
                            setShowProfile(true);

                        }}

                        className="bg-slate-700 hover:bg-slate-600 py-3 rounded-xl"

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;