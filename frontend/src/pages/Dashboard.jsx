import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import SendMoneyCard from "../components/SendMoneyCard";
import TransactionTable from "../components/TransactionTable";
import ProfileModal from "../components/ProfileModal";
import EditProfileModal from "../components/EditProfileModal";
import ChangeMPINModal from "../components/ChangeMPINModal";
import FraudModal from "../components/FraudModal";
import DashboardCards from "../components/DashboardCards";
import ChatbotModal from "../ai/ChatbotModal";
import SendConfirmationModal from "../components/SendConfirmationModal";

function Dashboard() {

    const navigate = useNavigate();

    const accountNumber = localStorage.getItem("account_number");

    // Dashboard
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [receiverAccount, setReceiverAccount] = useState("");
    const [sendMPIN, setSendMPIN] = useState("");
    const [fraudResult, setFraudResult] = useState(null);
    const [showFraudModal, setShowFraudModal] = useState(false); 
    const [showChatbot, setShowChatbot] = useState(false);
    const [receiverName, setReceiverName] = useState("");
    const [searchingRecipient, setSearchingRecipient] = useState(false);
    const [showSendConfirm, setShowSendConfirm] = useState(false);

    // Balance
    const [showBalance, setShowBalance] = useState(false);
    const [showMPINBox, setShowMPINBox] = useState(false);
    const [mpin, setMpin] = useState("");
    // ================= LOAN PREDICTOR =================

    const [income, setIncome] = useState("");

    const [expenses, setExpenses] = useState("");

    const [loanAmount, setLoanAmount] = useState("");

    const [years, setYears] = useState("");

    const [loanResult, setLoanResult] = useState(null);

    const [predictingLoan, setPredictingLoan] = useState(false);

    // Profile
    const [showProfile, setShowProfile] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangeMPIN, setShowChangeMPIN] = useState(false);

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: ""
    });

    // Change MPIN
    const [currentMPIN, setCurrentMPIN] = useState("");
    const [newMPIN, setNewMPIN] = useState("");
    const [confirmMPIN, setConfirmMPIN] = useState("");

    //-------------------------------------

    const fetchDashboard = async () => {

        try {

            const response = await API.get(
                `/dashboard/${accountNumber}`
            );

            setUser(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    //-------------------------------------

    const fetchTransactions = async () => {

        try {

            const response = await API.get(
                `/transactions/${accountNumber}`
            );

            setTransactions(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    //-------------------------------------

    const fetchProfile = async () => {

        try {

            const response = await API.get(
                `/profile/${accountNumber}`
            );

            setProfileData(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    //-------------------------------------

    const verifyMPIN = async () => {

        if (mpin.length !== 4) {

            alert("Enter 4 Digit MPIN");

            return;

        }

        try {

            const response = await API.post(
                "/verify-mpin",
                {

                    account_number: accountNumber,
                    mpin: mpin

                }
            );

            if (response.data.message === "Verified") {

                setShowBalance(true);

                setShowMPINBox(false);

                setMpin("");

            }

            else {

                alert(response.data.message);

            }

        }

        catch (error) {

            alert("Verification Failed");

        }

    };
    //-------------------------------------
    const verifyRecipient = async (account) => {
         if (!account) {
             setReceiverName("");
             return;

         }
        try {
            setSearchingRecipient(true);
            const response = await API.get(
                `/verify-recipient/${account}`
            );
            setReceiverName(response.data.name);
        }
        catch {
            setReceiverName("");
        }
        finally {
            setSearchingRecipient(false);
        }
    };
    //-------------------------------------
    const checkFraud = async () => {
      try {
         const response = await API.post("/fraud-check", {
          sender_account: accountNumber,
          receiver_account: receiverAccount,
          amount: Number(amount)
         });
         setFraudResult(response.data);
         setShowFraudModal(false);
         setShowSendConfirm(true);

      }
      catch (error) {
        alert("Fraud Check Failed");
      }  
         
    };
    //-------------------------------------
    const sendMoney = async () => {
       if (!receiverAccount || !amount || !sendMPIN) {
        alert("Fill All Fields");
        return;
       }
       try {

        const response = await API.post("/send-money", {
           sender_account: accountNumber,
           receiver_account: receiverAccount,
           amount: Number(amount),
           mpin: sendMPIN
        });
        alert(response.data.message);
        setShowSendConfirm(false);
        setReceiverAccount("");
        setReceiverName("");
        setAmount("");
        setSendMPIN("");
        fetchDashboard();
        fetchTransactions();
       }
       catch (error) {
        alert(
           error.response?.data?.message || "Transfer Failed"
        );
       }

    };
    //-------------------------------------
    const updateMPIN = async () => {

        if (!currentMPIN || !newMPIN || !confirmMPIN) {
            alert("Fill All Fields");
            return;
        }
        if (newMPIN.length !== 4) {
            alert("MPIN must be 4 digits");
            return;
        }
        if (newMPIN !== confirmMPIN) {
             alert("New MPIN and Confirm MPIN do not match");
             return;
        }
        try {
             const response = await API.post("/change-mpin", {
                  account_number: accountNumber,
                  current_mpin: currentMPIN,
                  new_mpin: newMPIN
             });
             alert(response.data.message);
              setCurrentMPIN("");
              setNewMPIN("");
              setConfirmMPIN("");

              setShowChangeMPIN(false);

        }
        catch (error) {
             alert(
                error.response?.data?.message ||
                "Unable to Change MPIN"
             );
        }
    };

    //-------------------------------------
    const predictLoan = async () => {
        if (!income || !expenses || !loanAmount || !years) {
            alert("Please fill all fields");
            return;
        }
        try {
            setPredictingLoan(true);
            const response = await API.post("/loan-predict", {
                income: Number(income),

                expenses: Number(expenses),

                loan_amount: Number(loanAmount),

                years: Number(years)
            });
            setLoanResult(response.data);

        }
        catch (error) {
            alert("Loan Prediction Failed");
        
        }
         finally {
             setPredictingLoan(false);
         }

         
    };
    //-------------------------------------
    const downloadStatement = async () => {
         window.open(
            `http://127.0.0.1:8000/download-statement/${accountNumber}`,
             "_blank"

         );
    };
    //-------------------------------------

    const updateProfile = async () => {

        try {

            const response = await API.put(

                `/profile/${accountNumber}`,

                profileData

            );

            alert(response.data.message);

            fetchDashboard();

            setShowEditProfile(false);

            setShowProfile(true);

        }

        catch {

            alert("Profile Update Failed");

        }

    };

    //-------------------------------------

    const logout = () => {

        localStorage.removeItem("account_number");

        localStorage.removeItem("isLoggedIn");

        navigate("/");

    };

    //-------------------------------------

    useEffect(() => {

        fetchDashboard();

        fetchTransactions();

    }, []);

    return (
      <>
    <Navbar
        openProfile={() => {

            fetchProfile();

            setShowProfile(true);

        }}
    />

    <div className="min-h-screen bg-slate-950 text-white p-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-bold">
                Welcome, {user.name}

            </h1>
            <button 
                onClick={downloadStatement}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition px-6 py-3 rounded-xl font-bold shadow-lg"

            >
                📄 Download Statement

            </button>
        </div>

    
        <DashboardCards

           user={user}

           showBalance={showBalance}

           setShowBalance={setShowBalance}

           setShowMPINBox={setShowMPINBox}

            fraudResult={fraudResult}

        />

        {/* Transaction */}

        <SendMoneyCard

            receiverAccount={receiverAccount}

            setReceiverAccount={setReceiverAccount}

            amount={amount}

            setAmount={setAmount}

            sendMPIN={sendMPIN}

            setSendMPIN={setSendMPIN}

            checkFraud={checkFraud}

        />
        {/* ================= LOAN PREDICTOR ================= */}
        <div className="mt-10 bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-8">
                 <div>
                    <h2 className="text-3xl font-bold text-cyan-400">
                        💳 AI Loan Predictor
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Check your loan eligibility instantly using AI.
                    </p>
                 </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <input
                    type="number"

                    placeholder="Monthly Income"

                    value={income}

                    onChange={(e)=>setIncome(e.target.value)}

                    className="bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="number"
                    placeholder="Monthly Expenses"

                    value={expenses}

                    onChange={(e)=>setExpenses(e.target.value)}

                    className="bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"

                />
                <input
                    type="number"

                    placeholder="Loan Amount"

                    value={loanAmount}

                    onChange={(e)=>setLoanAmount(e.target.value)}

                    className="bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"

                />
                <input
                    type="number"

                    placeholder="Loan Duration (Years)"

                    value={years}

                    onChange={(e)=>setYears(e.target.value)}

                    className="bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                />
                
            </div>
            <button
                onClick={predictLoan}

                disabled={predictingLoan}

                className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition px-8 py-3 rounded-xl font-bold"
            >
                {
                    predictingLoan
                    ?
                    "Predicting..."
                    :
                    "Predict Loan"

                }

            </button>
            {
                loanResult && (
                    <div className="mt-8">
                        <div className="grid md:grid-cols-3 gap-5">
                            <div 
                                className={`rounded-2xl p-6 text-center shadow-lg ${
                                    loanResult.status === "Eligible"
                                        ? "bg-green-900 border border-green-500"
                                        : loanResult.status === "Maybe Eligible"
                                        ? "bg-yellow-900 border border-yellow-500"
                                        : "bg-red-900 border border-red-500"
                                }`}
                            >
                                <h3 className="text-xl font-bold">
                                    {loanResult.status === "Eligible"
                                        ? "Eligible"
                                        : loanResult.status === "Maybe Eligible"
                                        ? "Maybe Eligible"
                                        : "Not Eligible"
                                    }
                                </h3>
                                <p className="mt-3 text-gray-300">
                                    Loan Decision
                                </p>
                            </div>
                            <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-lg">
                                <h3 className="text-xl font-bold text-cyan-400">
                                    Score
                                </h3>
                                <p className="text-5xl font-bold mt-4">
                                    {loanResult.score}%
                                </p>
                            </div>
                            <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-lg">
                                <h3 className="text-xl font-bold text-green-400">
                                    EMI
                                </h3>
                                <p className="text-4xl font-bold mt-4">
                                    ₹ {loanResult.emi}
                                
                                </p>
                                <p className="text-gray-400 mt-2">
                                    Per Month
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">
                                🤖 AI Recommendation
                            </h3>
                            <p className="text-gray-300 leading-7">
                                {loanResult.recommendation}
                            </p>
                        </div>
                    </div>


        

                )

            
            }
        

        </div>
        {/* History */}

        <TransactionTable

            transactions={transactions}

        />
                {/* ================= MPIN MODAL ================= */}

        <ChangeMPINModal

            showChangeMPIN={showChangeMPIN}

            setShowChangeMPIN={setShowChangeMPIN}

            setShowProfile={setShowProfile}

            currentMPIN={currentMPIN}

            setCurrentMPIN={setCurrentMPIN}

            newMPIN={newMPIN}

            setNewMPIN={setNewMPIN}

            confirmMPIN={confirmMPIN}

            setConfirmMPIN={setConfirmMPIN}

            updateMPIN={updateMPIN}

        />
        {/* ================= PROFILE MODAL ================= */}

        <ProfileModal

            showProfile={showProfile}

            setShowProfile={setShowProfile}

            profileData={profileData}

            user={user}

            setShowEditProfile={setShowEditProfile}

            setShowChangeMPIN={setShowChangeMPIN}

            logout={logout}

        />
                {/* ================= EDIT PROFILE MODAL ================= */}

        <EditProfileModal

            showEditProfile={showEditProfile}

            setShowEditProfile={setShowEditProfile}

            setShowProfile={setShowProfile}

            profileData={profileData}

            setProfileData={setProfileData}

            updateProfile={updateProfile}

        />
        <FraudModal

            showFraudModal={showFraudModal}

            setShowFraudModal={setShowFraudModal}

            fraudResult={fraudResult}

            sendMoney={sendMoney}

        />
        <button

            onClick={() => setShowChatbot(true)}

            className="fixed bottom-8 right-8 bg-cyan-500 w-16 h-16 rounded-full text-3xl shadow-2xl hover:scale-110 transition"

        >

            🤖

        </button>
        {
            <SendConfirmationModal

                show={showSendConfirm}

                setShow={setShowSendConfirm}

                receiverName={receiverName}

                receiverAccount={receiverAccount}

                amount={amount}

                fraudResult={fraudResult}

                sendMoney={sendMoney}

             />
        }
        {
            showChatbot && (
                <ChatbotModal
                   user={user}
                   onClose={() => setShowChatbot(false)}
                />
            )
        }
        {
            showMPINBox && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                     <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">
                         <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
                             Verify MPIN
                         </h2>
                           <input
                                type="password"
                                maxLength={4}

                                placeholder="Enter MPIN"

                                value={mpin}

                                onChange={(e)=>setMpin(e.target.value.replace(/\D/g,""))}

                                className="w-full p-4 rounded-lg bg-slate-800 text-white"

                            />
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={verifyMPIN}
                                    className="flex-1 bg-green-500 hover:bg-green-400 py-3 rounded-lg"
                                
                                >
                                    Verify

                                </button>
                                <button
                                    onClick={()=>{
                                        setShowMPINBox(false);
                                         setMpin("");
                                    }}
                                    className="flex-1 bg-red-500 hover:bg-red-400 py-3 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>

                           
                    
                     </div>
                </div>
            )
        }

    </div>

</>

);

}

export default Dashboard;