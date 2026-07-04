function SendConfirmationModal({

show,

setShow,

receiverName,

receiverAccount,

amount,

fraudResult,

sendMoney

}){

if(!show) return null;

const color=

fraudResult?.status==="High Risk"

?

"text-red-400"

:

fraudResult?.status==="Medium Risk"

?

"text-yellow-400"

:

"text-green-400";

return(

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

<div className="bg-slate-900 rounded-3xl w-[500px] p-8">

<h2 className="text-3xl font-bold text-cyan-400 text-center">

Confirm Transfer

</h2>

<div className="space-y-4 mt-8">

<p>

Receiver

</p>

<h2 className="text-2xl">

{receiverName}

</h2>

<p>

Account

</p>

<h3>

{receiverAccount}

</h3>

<p>

Amount

</p>

<h2 className="text-green-400 text-3xl">

₹ {amount}

</h2>

<p>

AI Status

</p>

<h2 className={`text-2xl ${color}`}>

{fraudResult?.status}

</h2>

<p>

Risk Score

</p>

<h2>

{fraudResult?.risk_score}%

</h2>

</div>

<div className="grid gap-4 mt-8">

<button

onClick={sendMoney}

className="bg-green-500 hover:bg-green-400 py-3 rounded-xl"

>

Confirm Transfer

</button>

<button

onClick={()=>setShow(false)}

className="bg-red-500 hover:bg-red-400 py-3 rounded-xl"

>

Cancel

</button>

</div>

</div>

</div>

);

}

export default SendConfirmationModal;