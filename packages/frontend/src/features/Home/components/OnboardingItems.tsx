import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const tableOfContents = [
  {
    title: "Pre-Study",
    description: "Get to know our platform and its features.",
    link: "/preliminary-study",
  },
  {
    title: "Task 1: Introduction",
    description: "Get to know our platform and its features.",
    link: "/task",
  },
  {
    title: "Task 2: Introduction",
    description: "Get to know our platform and its features.",
    link: "/task",
  },
  {
    title: "Task 3: Introduction",
    description: "Get to know our platform and its features.",
    link: "/task",
  },
  {
    title: "Final Interview",
    description: "Get to know our platform and its features.",
    link: "/preliminary-study",
  },
];

export const OnboardingItems = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className="container fade-in delay-150 my-8 lg:my-[8rem] flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8"
    >
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-4xl font-bold">Onboarding Activities</h2>
        <p className="text-gray-500 text-lg">
          Welcome to our params.ai user research, let's get you onboarded with
          these activities.
        </p>
        <img
          alt="Onboarding illustration"
          className="w-full object-cover rounded-lg pt-8"
          height="200"
          src="/images/ai-developer-illustration.jpeg"
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <ul className="space-y-4">
          {tableOfContents.map((content) => (
            <li key={content.title}>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-id="9"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6" data-id="10">
                  <h3 className="text-xl font-semibold" data-id="11">
                    {content.title}
                  </h3>
                </div>
                <div className="p-6" data-id="12">
                  <p className="text-gray-500" data-id="13">
                    {content.description}
                  </p>
                  <Link
                    className="inline-flex mt-2 items-center text-blue-500 hover:underline"
                    data-id="14"
                    to={content.link}
                    rel="ugc"
                  >
                    Start Activity
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 ml-2"
                      data-id="15"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
