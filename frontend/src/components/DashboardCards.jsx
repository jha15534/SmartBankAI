function DashboardCards({
    user,
    showBalance,
    setShowBalance,
    setShowMPINBox,
    fraudResult
}) {

    const riskColor =
        fraudResult?.status === "High Risk"
            ? "text-red-400"
            : fraudResult?.status === "Medium Risk"
            ? "text-yellow-400"
            : "text-green-400";

    return (

        <div className="grid md:grid-cols-4 gap-8 mt-12">

            {/* Account */}

            <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">

                <h3 className="text-gray-400">

                    Account Number

                </h3>

                <h2 className="text-3xl font-bold mt-4">

                    {user.account_number}

                </h2>

            </div>

            {/* Balance */}

            <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">

                <h3 className="text-gray-400">

                    Current Balance

                </h3>

                <h2 className="text-4xl text-green-400 mt-4">

                    {

                        showBalance

                            ?

                            `₹ ${user.balance}`

                            :

                            "₹ ********"

                    }

                </h2>

                {

                    !showBalance ?

                        (

                            <button

                                onClick={() => setShowMPINBox(true)}

                                className="mt-5 bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-lg"

                            >

                                Show Balance

                            </button>

                        )

                        :

                        (

                            <button

                                onClick={() => setShowBalance(false)}

                                className="mt-5 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg"

                            >

                                Hide Balance

                            </button>

                        )

                }

            </div>

            {/* Status */}

            <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">

                <h3 className="text-gray-400">

                    Account Status

                </h3>

                <h2 className="text-green-400 text-2xl mt-4">

                    ● Active

                </h2>

            </div>

            {/* AI */}

            <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">

                <h3 className="text-gray-400">

                    AI Fraud Detection

                </h3>

                <h2 className={`text-2xl font-bold mt-4 ${riskColor}`}>

                    {

                        fraudResult

                            ?

                            fraudResult.status

                            :

                            "Safe"

                    }

                </h2>

                <p className="text-gray-400 mt-3">

                    Risk Score :

                    {

                        fraudResult

                            ?

                            `${fraudResult.risk_score}%`

                            :

                            "0%"

                    }

                </p>

            </div>

        </div>

    );

}

export default DashboardCards;