import { ArrowRight } from "lucide-react";
import asu_logo from "@/assets/asu_logo.jpg";
import blue_cross_blue_shield_logo from "@/assets/blue_cross_blue_shield_logo.png";
import brookdale_logo from "@/assets/brookdale_logo.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projects from "@/data/projects.json";
import ProjectCard from "./ProjectCard.tsx";
import { Button } from "./ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";

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
    period: "May 2023 - Nov 2023",
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
    period: "May 2023 - May 2026 (expected)",
    logo: asu_logo.src,
  },
  {
    school: "Brookdale Community College",
    degree: "AS in Computer Science",
    period: "Sep 2020 - Dec 2022",
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
          Experience & Education
        </TabsTrigger>
      </TabsList>
      <div className="space-y-2 rounded-xl border p-6">
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-none font-semibold sm:text-2xl">
              Featured Projects
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <a href="/projects">
                view more
                <ArrowRight />
              </a>
            </Button>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 4).map((i, index) => (
              <ProjectCard
                key={index}
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
          <div className="space-y-4">
            <h2 className="text-xl leading-none font-semibold sm:text-2xl">
              Experience
            </h2>
            <ul className="space-y-4">
              {experiences.map((exp, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader className="gap-4 sm:grid-cols-[1fr_auto]">
                      <div className="flex items-center gap-2">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="size-10 shrink-0 rounded-full"
                        />
                        <CardTitle className="flex flex-col justify-between">
                          <h3 className="text-base font-semibold sm:text-lg">
                            {exp.company}
                          </h3>
                          <p className="text-xs font-light text-muted-foreground sm:text-sm">
                            {exp.role}
                          </p>
                        </CardTitle>
                      </div>

                      <time className="text-xs whitespace-nowrap text-muted-foreground sm:text-sm">
                        {exp.period}
                      </time>
                    </CardHeader>
                    <CardContent>
                      <ul className="prose ml-4 list-outside list-disc space-y-2 sm:ml-8 dark:prose-invert">
                        {exp.achievements.map((ach, index) => (
                          <li
                            key={index}
                            className="text-xs leading-relaxed sm:text-sm"
                          >
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl leading-none font-semibold tracking-tight sm:text-2xl">
              Education
            </h2>
            <ul className="space-y-4 pl-2">
              {education.map((edu, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="size-10 shrink-0 rounded-full"
                        />
                        <CardTitle className="flex flex-col justify-between">
                          <p className="text-base font-semibold sm:text-lg">
                            {edu.school}
                          </p>
                          <p className="text-xs font-light text-muted-foreground sm:text-sm">
                            {edu.degree}
                          </p>
                        </CardTitle>
                      </div>

                      <time className="mt-1 text-xs whitespace-nowrap text-muted-foreground sm:text-sm">
                        {edu.period}
                      </time>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProjectsExperienceTabs;
