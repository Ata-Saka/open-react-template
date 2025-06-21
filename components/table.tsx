"use client";

import Spotlight from "./spotlight";

export default function ComparisonTable() {
  return (
    <section className="relative py-20">
      {/* Background blur */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/30 to-indigo-900/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
              Why Choose Visibly
            </span>
          </div>
          <h2 className="bg-gradient-to-r from-gray-200 via-indigo-200 to-indigo-300 bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl">
            Visibly vs. Traditional Tools
          </h2>
        </div>

        {/* Enhanced Table */}
        <Spotlight>
          <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="w-1/3 px-6 py-4 text-left font-medium text-gray-300">Feature</th>
                  <th className="w-1/3 px-6 py-4 text-center font-medium text-indigo-400">Visibly</th>
                  <th className="w-1/3 px-6 py-4 text-center font-medium text-gray-200">Others</th> {/* Changed to gray-200 */}
                </tr>
              </thead>

              <tbody>
                {[
                  ["Lead Response Time", "2.4 hours", "48+ hours"],
                  ["Reply Rates", "42% avg.", "12% avg."],
                  ["Setup Time", "15 minutes", "2+ weeks"],
                  ["AI Optimization", "Real-time", "Manual"],
                  ["Reporting", "Automated", "Spreadsheets"]
                ].map(([feature, visibly, others], index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-300 font-medium">{feature}</td> {/* Added font-medium */}
                    <td className="px-6 py-4 text-center text-green-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        {visibly}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-200"> {/* Changed to gray-200 */}
                      {others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}