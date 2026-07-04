function SendMoneyCard({

    receiverAccount,
    setReceiverAccount,

    amount,
    setAmount,

    sendMPIN,
    setSendMPIN,

    checkFraud

}) {

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-12 shadow-lg">

            <h2 className="text-3xl text-cyan-400 font-bold">

                Send Money

            </h2>

            <input

                type="text"

                placeholder="Recipient Account Number"

                value={receiverAccount}

                onChange={(e)=>setReceiverAccount(e.target.value)}

                className="mt-8 w-full md:w-96 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4"

            />

            <input

                type="number"

                placeholder="Amount"

                value={amount}

                onChange={(e)=>setAmount(e.target.value)}

                className="mt-5 w-full md:w-96 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4"

            />

            <input

                type="password"

                maxLength={4}

                placeholder="Enter MPIN"

                value={sendMPIN}

                onChange={(e)=>setSendMPIN(e.target.value)}

                className="mt-5 w-full md:w-96 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4"

            />

            <button

                onClick={checkFraud}

                className="mt-8 bg-cyan-500 hover:bg-cyan-400 px-10 py-4 rounded-xl"

            >

                🤖 AI Verify & Send

            </button>

        </div>

    );

}

export default SendMoneyCard;