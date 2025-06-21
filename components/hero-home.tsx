export default function HeroHome() {
  return (
    <section className="pt-32 pb-32 px-6 sm:px-10 md:px-0">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-15">
          Unlock More Revenue With <br /> AI Driven Lead Automation
        </h1>
        <p className="text-lg text-indigo-200 mb-30 max-w-2xl mx-auto">
          Collect qualified leads, automate outreach, and launch AI campaigns—all from a single dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-10">
          <a
            className="btn w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
            href="#0"
          >
            Start for Free →
          </a>
          <a
            className="btn w-full sm:w-auto bg-gray-800 text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-700 transition-all"
            href="#0"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>

  );
}
