import { ShieldCheck, Wallet, History, Brain } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <ShieldCheck size={45} />,
      title: "Secure Login",
      description:
        "Advanced security question authentication for maximum account protection.",
    },
    {
      icon: <Wallet size={45} />,
      title: "Smart Transactions",
      description:
        "Deposit and withdraw money instantly with real-time balance updates.",
    },
    {
      icon: <History size={45} />,
      title: "Transaction History",
      description:
        "Track all your deposits and withdrawals anytime.",
    },
    {
      icon: <Brain size={45} />,
      title: "AI Banking",
      description:
        "Future-ready AI assistant for smarter financial decisions.",
    },
  ];

  return (
    <section id="features" className="bg-slate-950 py-20 px-8 text-white">
      <h2 className="text-5xl font-bold text-center mb-4">
        Our Features
      </h2>

      <p className="text-center text-gray-400 mb-14">
        Experience next-generation digital banking powered by AI.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, index) => (

          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-8 text-center hover:scale-105 duration-300 shadow-xl"
          >
            <div className="flex justify-center text-cyan-400 mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>

        ))}

      </div>
    </section>
  );
}

export default Features;