function Contact() {
  return (
    <section className="bg-slate-950 text-white py-24">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-12">

          Contact Us

        </h2>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl bg-slate-800"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-slate-800"
          />

          <textarea
            rows="5"
            placeholder="Message"
            className="w-full p-4 rounded-xl bg-slate-800"
          />

          <button
            className="bg-cyan-500 px-8 py-4 rounded-xl hover:bg-cyan-400"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;