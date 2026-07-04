function About() {
  return (
    <section className="bg-slate-900 text-white py-24">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div>

          <h2 className="text-5xl font-bold mb-8">
            Why Choose
            <span className="text-cyan-400"> SmartBank AI?</span>
          </h2>

          <p className="text-gray-300 text-lg leading-8">

            SmartBank AI is a modern banking platform developed using
            React, FastAPI and MySQL.

            It provides secure authentication, instant transactions,
            real-time balance updates and AI-ready banking services.

          </p>

          <div className="mt-10 space-y-4">

            <p>✅ Secure Authentication</p>

            <p>✅ Real-time Transactions</p>

            <p>✅ AI Powered Banking</p>

            <p>✅ Fast & Responsive UI</p>

          </div>

        </div>

        {/* Right */}

        <div className="bg-slate-800 rounded-3xl p-10 shadow-2xl">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Project Tech Stack
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Frontend</span>
              <span className="text-cyan-400">React + Tailwind</span>
            </div>

            <div className="flex justify-between">
              <span>Backend</span>
              <span className="text-cyan-400">FastAPI</span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-cyan-400">MySQL</span>
            </div>

            <div className="flex justify-between">
              <span>Authentication</span>
              <span className="text-cyan-400">Security Question</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;