import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../api/api";

function ChatbotModal({ user, onClose }) {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const [chat, setChat] = useState([
        {
            sender: "AI",
            text: `# 👋 Hello ${user?.name || "User"}!

Welcome to **SmartBank AI**.

I'm your personal AI Banking Assistant.

Choose a quick option above or ask me any banking question.`
        }
    ]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [chat, loading]);

    const askQuestion = async (question) => {

        setChat((prev) => [

            ...prev,

            {

                sender: "You",

                text: question

            }

        ]);

        setLoading(true);

        try {

            const response = await API.post("/chat", {

                account_number: localStorage.getItem("account_number"),

                question: question

            });

            setChat((prev) => [

                ...prev,

                {

                    sender: "AI",

                    text: response.data.reply

                }

            ]);

        }

        catch (error) {

            setChat((prev) => [

                ...prev,

                {

                    sender: "AI",

                    text:
                        error.response?.data?.message ||
                        "Unable to contact SmartBank AI."

                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    const sendMessage = async () => {

        if (!message.trim()) return;

        const question = message;

        setMessage("");

        await askQuestion(question);

    };

    return (

        <div className="fixed bottom-6 right-6 w-[420px] h-[520px] bg-slate-900 border border-cyan-500 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50">

            {/* Header */}

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 pt-5 pb-4 flex justify-between items-start">

                <div>

                    <h2 className="font-bold text-xl leading-none">

                        🤖 SmartBank AI

                    </h2>

                    <p className="text-xs mt-2 text-cyan-100">

                        🟢 Online

                    </p>

                </div>

                <button

                    onClick={onClose}

                    className="text-3xl hover:rotate-90 transition"

                >

                    ✕

                </button>

            </div>

            {/* Quick Actions */}

            <div className="grid grid-cols-2 gap-2 p-3">

                <button

                    onClick={() => askQuestion("What is my balance?")}

                    className="bg-slate-800 hover:bg-cyan-600 transition py-2 rounded-xl"

                >

                    💰 Balance

                </button>

                <button

                    onClick={() => askQuestion("Show my recent transactions")}

                    className="bg-slate-800 hover:bg-cyan-600 transition py-2 rounded-xl"

                >

                    📄 Statement

                </button>

                <button

                    onClick={() => askQuestion("Can I get a loan?")}

                    className="bg-slate-800 hover:bg-cyan-600 transition py-2 rounded-xl"

                >

                    💳 Loan

                </button>

                <button

                    onClick={() => askQuestion("Give me fraud prevention tips")}

                    className="bg-slate-800 hover:bg-cyan-600 transition py-2 rounded-xl"

                >

                    🛡 Fraud

                </button>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
                                {

                    chat.map((c, i) => (

                        <div
                            key={i}
                            className={
                                c.sender === "AI"
                                    ? "flex justify-start"
                                    : "flex justify-end"
                            }
                        >

                            <div
                                className={
                                    c.sender === "AI"
                                        ? "max-w-[72%] bg-slate-800 border border-slate-700 rounded-3xl p-4 shadow-lg"
                                        : "max-w-[68%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-4 shadow-lg"
                                }
                            >

                                <div className="font-semibold text-sm mb-2">

                                    {c.sender === "AI"
                                        ? "🤖 SmartBank AI"
                                        : "👤 You"}

                                </div>

                                <div className="prose prose-invert prose-sm max-w-none break-words">

                                    <ReactMarkdown>

                                        {c.text}

                                    </ReactMarkdown>

                                </div>

                            </div>

                        </div>

                    ))

                }

                {

                    loading && (

                        <div className="flex justify-start">

                            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 shadow-lg max-w-[72%]">

                                <div className="font-semibold text-sm mb-2">

                                    🤖 SmartBank AI

                                </div>

                                <div className="flex items-center gap-2">

                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>

                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:150ms]"></div>

                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]"></div>

                                    <span className="text-sm ml-2">

                                        Thinking...

                                    </span>

                                </div>

                            </div>

                        </div>

                    )

                }

                <div ref={messagesEndRef}></div>

            </div>

            {/* Footer */}

            <div className="border-t border-slate-700 bg-slate-900 p-4">

                <div className="flex gap-3">

                    <input

                        type="text"

                        value={message}

                        onChange={(e)=>setMessage(e.target.value)}

                        onKeyDown={(e)=>{

                            if(e.key==="Enter"){

                                sendMessage();

                            }

                        }}

                        placeholder="Ask SmartBank AI..."

                        className="flex-1 bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-2xl px-5 py-3 outline-none transition"

                    />

                    <button

                        onClick={sendMessage}

                        disabled={loading}

                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 disabled:opacity-50 transition-all px-6 rounded-2xl font-bold"

                    >

                        ➤

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ChatbotModal;