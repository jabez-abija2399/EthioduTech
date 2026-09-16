import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "Who is this platform for?",
      a: "This platform is designed primarily for learners aged 10-18, though it is suitable for any beginner wanting to learn coding and computer science through hands-on projects."
    },
    {
      q: "Do beginners need programming experience?",
      a: "No! The curriculum starts from absolute zero and guides students step-by-step until they are writing complex applications."
    },
    {
      q: "What can students build?",
      a: "Students build real, functional web applications, interactive stories, small games, data visualizers, and eventually integrate simple AI capabilities into their projects."
    },
    {
      q: "How does the AI tutor work?",
      a: "The AI tutor acts like a teacher. Instead of just giving the answer, it reviews the student's code, asks guiding questions, and helps them debug their own logic."
    },
    {
      q: "What happens if the internet connection is weak?",
      a: "Our integrated code editor saves progress locally to the device. If the connection drops, students can keep coding, and it will sync back to the server once reconnected."
    },
    {
      q: "Can parents see progress?",
      a: "Yes! Parents have a dedicated dashboard to see which skills their child has mastered and view the portfolio projects they have built."
    }
  ];

  return (
    <section className="bg-[#f8f9fa] py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white border border-[#DDDCDB]/40 rounded-xl overflow-hidden shadow-sm">
              <summary className="flex justify-between items-center font-bold text-[#3C4044] cursor-pointer p-6 list-none hover:bg-gray-50 transition">
                <span>{faq.q}</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-[#3C4044]/40" />
                </span>
              </summary>
              <div className="p-6 pt-0 text-[#3C4044]/70 leading-relaxed border-t border-[#DDDCDB]/10 mt-2">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
