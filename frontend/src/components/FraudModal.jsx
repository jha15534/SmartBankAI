function FraudModal({

    showFraudModal,

    setShowFraudModal,

    fraudResult,

    sendMoney

}) {

    if (!showFraudModal) return null;

    const statusColor =

        fraudResult?.status === "High Risk"

            ? "text-red-400"

            : fraudResult?.status === "Medium Risk"

            ? "text-yellow-400"

            : "text-green-400";

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-900 w-[520px] rounded-3xl p-8 shadow-2xl">

                <h2 className="text-3xl font-bold text-cyan-400 text-center">

                    🤖 AI Fraud Detection

                </h2>

                <div className="mt-8 space-y-4">

                    <div>

                        <p className="text-gray-400">

                            Risk Score

                        </p>

                        <h2 className="text-4xl font-bold text-yellow-400">

                            {fraudResult?.risk_score}%

                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-400">

                            Status

                        </p>

                        <h2 className={`text-2xl font-bold ${statusColor}`}>

                            {fraudResult?.status}

                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-400 mb-2">

                            AI Reasons

                        </p>

                        {

                            fraudResult?.reasons?.length ?

                            (

                                <ul className="list-disc ml-6 space-y-2">

                                    {

                                        fraudResult.reasons.map((reason,index)=>(

                                            <li key={index}>

                                                {reason}

                                            </li>

                                        ))

                                    }

                                </ul>

                            )

                            :

                            (

                                <p className="text-green-400">

                                    No suspicious activity detected.

                                </p>

                            )

                        }

                    </div>

                    {

                        fraudResult?.status==="High Risk" &&

                        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4">

                            ⚠ High Risk Transaction

                        </div>

                    }

                    {

                        fraudResult?.status==="Medium Risk" &&

                        <div className="bg-yellow-500/20 border border-yellow-500 rounded-xl p-4">

                            ⚠ Medium Risk Transaction

                        </div>

                    }

                    {

                        fraudResult?.status==="Safe" &&

                        <div className="bg-green-500/20 border border-green-500 rounded-xl p-4">

                            ✅ Transaction Looks Safe

                        </div>

                    }

                </div>

                <div className="grid gap-4 mt-8">

                    <button

                        onClick={() => {

                            setShowFraudModal(false);

                            sendMoney();

                        }}

                        className="bg-green-500 hover:bg-green-400 py-3 rounded-xl"

                    >

                        Continue Transaction

                    </button>

                    <button

                        onClick={() => setShowFraudModal(false)}

                        className="bg-red-500 hover:bg-red-400 py-3 rounded-xl"

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default FraudModal;