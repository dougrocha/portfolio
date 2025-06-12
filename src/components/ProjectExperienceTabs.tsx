import { ArrowRight } from "lucide-react";
import asu_logo from "@/assets/asu_logo.jpg";
import blue_cross_blue_shield_logo from "@/assets/blue_cross_blue_shield_logo.png";
import brookdale_logo from "@/assets/brookdale_logo.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projects from "@/data/projects.json";
import ProjectCard from "./project_card.tsx";

const experiences = [
  {
    company: "Blue Cross Blue Shield of Arizona",
    role: "Full-Stack Software Engineer (Intern)",
    period: "May 2025 (Ongoing)",
    logo: blue_cross_blue_shield_logo.src,
    achievements: ["Excited for future opportunities"],
  },
  {
    company: "Blue Cross Blue Shield of Arizona",
    role: "Full-Stack Software Engineer (Intern)",
    period: "May 2023-Nov 2023",
    logo: blue_cross_blue_shield_logo.src,
    achievements: [
      "Contributed to the development of key features using Next.js, TypeScript, and Sitecore for customer-facing product releases, enhancing user experience.",
      "Assisted in redesigning authentication processes with Okta and Next.js, improving access security for users.",
      "Helped create documentation for new features and processes to facilitate knowledge transfer and maintenance.",
      "Participated in identifying and resolving bugs in the customer web portal, contributing to improved reliability.",
      "Engaged in Agile sprints, supporting timely feature deployment.",
    ],
  },
];

const education = [
  {
    school: "Arizona State University",
    degree: "BS in Computer Science",
    period: "May 2023-May 2026(expected)",
    logo: asu_logo.src,
  },
  {
    school: "Brookdale Community College",
    degree: "AS in Computer Science",
    period: "Sep 2020-Dec 2022",
    logo: brookdale_logo.src,
  },
];

export const ProjectsExperienceTabs = () => {
  return (
    <Tabs defaultValue="projects">
      <TabsList className="w-full">
        <TabsTrigger value="projects" className="cursor-pointer">
          Projects
        </TabsTrigger>
        <TabsTrigger value="experience" className="cursor-pointer">
          Experience
        </TabsTrigger>
      </TabsList>
      <div className="space-y-2 rounded-xl border p-6">
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-none font-semibold tracking-tight sm:text-2xl">
              Featured Projects
            </h2>

            <a
              href="/projects"
              className="flex items-center justify-center gap-2 text-sm"
            >
              view more
              <ArrowRight className="h-6 w-6" />
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((i) => (
              <ProjectCard
                title={i.title}
                description={i.description}
                site_url={i.site_url}
                source_url={i.source_url}
                tags={i.tags}
              />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="experience" className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl leading-none font-semibold tracking-tight sm:text-2xl">
              Experience
            </h2>

            <ul className="space-y-4 pl-2">
              {experiences.map((exp) => (
                <li className="flex space-x-6">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="mt-2 h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <time className="text-xs">{exp.period}</time>
                    <h3 className="leading-none font-semibold">
                      {exp.company}
                    </h3>
                    <p className="text-xs">{exp.role}</p>
                    <ul className="prose dark:prose-invert list-outside list-disc space-y-2 pr-8 pl-2">
                      {exp.achievements.map((ach) => (
                        <li className="text-sm">{ach}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl leading-none font-semibold tracking-tight sm:text-2xl">
              Education
            </h2>

            <ul className="space-y-4 pl-2">
              {education.map((edu) => (
                <li className="flex items-center space-x-6">
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <time className="text-xs">{edu.period}</time>
                    <h3 className="leading-none font-semibold">{edu.school}</h3>
                    <p className="text-xs">{edu.degree}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProjectsExperienceTabs;
