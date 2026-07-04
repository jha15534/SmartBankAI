function TransactionTable({ transactions }) {

    return (

        <div className="mt-16">

            <h2 className="text-4xl font-bold mb-8">

                Transaction History

            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="p-5">ID</th>
                            <th className="p-5">Type</th>
                            <th className="p-5">Amount</th>
                            <th className="p-5">Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            Array.isArray(transactions) &&

                            transactions.map((t) => (

                                <tr
                                    key={t.transaction_id}
                                    className="bg-slate-900 text-center border-b border-slate-700 hover:bg-slate-800 transition"
                                >

                                    <td className="p-5">

                                        {t.transaction_id}

                                    </td>

                                    <td className="p-5">

                                        {

                                            t.type === "Sent" ?

                                                <span className="text-red-400 font-semibold">

                                                    Sent

                                                </span>

                                                :

                                                t.type === "Received" ?

                                                    <span className="text-green-400 font-semibold">

                                                        Received

                                                    </span>

                                                    :

                                                    t.type === "Deposit" ?

                                                        <span className="text-green-400 font-semibold">

                                                            Deposit

                                                        </span>

                                                        :

                                                        <span className="text-red-400 font-semibold">

                                                            Withdraw

                                                        </span>

                                        }

                                    </td>

                                    <td className="p-5">

                                        ₹ {t.amount}

                                    </td>

                                    <td className="p-5">

                                        {

                                            new Date(t.date).toLocaleString(

                                                "en-IN",

                                                {

                                                    dateStyle: "medium",

                                                    timeStyle: "short"

                                                }

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TransactionTable;