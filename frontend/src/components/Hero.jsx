import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white">

      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between">

        <div className="lg:w-1/2">

          <p className="text-cyan-400 font-semibold text-lg mb-3">
            🚀 AI Powered Digital Banking
          </p>

          <h1 className="text-6xl lg:text-7xl font-extrabold">
            SmartBank <span className="text-cyan-400">AI</span>
          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-8">
            Experience secure, intelligent and modern banking with
            AI-powered financial management.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/signup"
              className="bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-xl"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black"
            >
              Login
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">10K+</h2>
              <p>Happy Users</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">₹5Cr+</h2>
              <p>Transactions</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">99.9%</h2>
              <p>Secure</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">24×7</h2>
              <p>Support</p>
            </div>

          </div>

        </div>

        <div className="lg:w-1/2 mt-20 lg:mt-0 flex justify-center">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-[420px] shadow-2xl">

            <h2 className="text-3xl font-bold text-center mb-8">
              Banking Overview
            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 p-5 rounded-xl">
                <p className="text-gray-400">Available Balance</p>
                <h1 className="text-4xl text-green-400 font-bold">
                  ₹13,000
                </h1>
              </div>

              <div className="flex justify-between">

                <div className="bg-slate-800 rounded-xl p-5 w-[48%]">
                  <p className="text-gray-400">Deposit</p>
                  <h2 className="text-2xl text-cyan-400 font-bold">
                    ₹5,000
                  </h2>
                </div>

                <div className="bg-slate-800 rounded-xl p-5 w-[48%]">
                  <p className="text-gray-400">Withdraw</p>
                  <h2 className="text-2xl text-red-400 font-bold">
                    ₹2,000
                  </h2>
                </div>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <p className="text-gray-400">Latest Transaction</p>
                <h3 className="text-green-400 text-xl font-semibold">
                  Deposit Successful
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;