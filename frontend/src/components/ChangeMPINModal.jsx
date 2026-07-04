function ChangeMPINModal({

    showChangeMPIN,

    setShowChangeMPIN,

    setShowProfile,

    currentMPIN,

    setCurrentMPIN,

    newMPIN,

    setNewMPIN,

    confirmMPIN,

    setConfirmMPIN,

    updateMPIN

}) {

    if (!showChangeMPIN) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-900 w-[500px] rounded-3xl p-8 shadow-2xl">

                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">

                    Change MPIN

                </h2>

                <input
                    type="password"
                    placeholder="Current MPIN"
                    maxLength={4}
                    value={currentMPIN}
                    onChange={(e)=>setCurrentMPIN(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-800 mb-4"
                />

                <input
                    type="password"
                    placeholder="New MPIN"
                    maxLength={4}
                    value={newMPIN}
                    onChange={(e)=>setNewMPIN(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-800 mb-4"
                />

                <input
                    type="password"
                    placeholder="Confirm MPIN"
                    maxLength={4}
                    value={confirmMPIN}
                    onChange={(e)=>setConfirmMPIN(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-800"
                />

                <div className="grid gap-4 mt-8">

                    <button

                        onClick={updateMPIN}

                        className="bg-cyan-500 hover:bg-cyan-400 py-3 rounded-xl"

                    >

                        Update MPIN

                    </button>

                    <button

                        onClick={() => {

                            setShowChangeMPIN(false);

                            setCurrentMPIN("");

                            setNewMPIN("");

                            setConfirmMPIN("");

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

export default ChangeMPINModal;