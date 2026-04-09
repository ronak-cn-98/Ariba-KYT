import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import { employees, teamStructure } from "@/data/employees";
import {
  ArrowUpRight,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const values = [
  {
    title: "Automation First",
    desc: "We remove repetitive operational work so engineering can move faster with fewer manual dependencies.",
    Icon: Workflow,
  },
  {
    title: "Reliability by Default",
    desc: "Our systems are designed for clear recovery paths, strong observability, and predictable delivery.",
    Icon: Radar,
  },
  {
    title: "Security Built In",
    desc: "Security is part of the platform contract, not an afterthought added after the release.",
    Icon: LockKeyhole,
  },
  {
    title: "Shared Ownership",
    desc: "We work as a product-enablement team with transparent standards, tooling, and communication.",
    Icon: ShieldCheck,
  },
];

const differentiators = [
  {
    label: "Release Quality",
    title: "Safer change at higher velocity",
    desc: "Delivery standards, automation, and repeatable environments reduce friction while keeping releases stable.",
  },
  {
    label: "Operational Clarity",
    title: "Better visibility when systems move",
    desc: "Observability, incident readiness, and cleaner service signals make it easier to detect, respond, and recover.",
  },
  {
    label: "Platform Leverage",
    title: "Shared systems that compound across teams",
    desc: "The work scales beyond one squad by creating foundations that improve engineering quality across the product organization.",
  },
];

const operatingOutcomes = [
  {
    value: "Fewer manual steps",
    detail: "Automation removes repeated operational handoffs from the release path.",
  },
  {
    value: "Clearer recovery paths",
    detail: "Reliability practices make incidents easier to understand and resolve under pressure.",
  },
  {
    value: "Stronger team leverage",
    detail: "Shared standards help every product team move with more confidence and less variance.",
  },
];

const operatingSignals = ["Platform systems", "Release automation", "Operational resilience"];

export default function About() {
  const { cloudNexus } = teamStructure;
  const yashSingh = cloudNexus.find((person) => person.name === "Yash");
  const kaustubhSingh = cloudNexus.find((person) => person.name === "Kaustubh Singh");
  const featuredLeaders = [yashSingh, kaustubhSingh].filter(
    (person): person is NonNullable<typeof person> => Boolean(person),
  );

  const facts = [
    { label: "Founded", value: "Feb 2025" },
    { label: "Team Size", value: `${employees.length} members` },
    { label: "Department", value: "DevOps · Ariba" },
    { label: "Base", value: "Bhopal, MP" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <Header />

      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.05),transparent_26%)]" />
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div className="max-w-4xl">
              <p className="animate-fade-in mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                About
              </p>
              <h1 className="animate-text-reveal max-w-[11ch] text-5xl font-semibold tracking-[-0.06em] text-zinc-50 md:text-7xl">
                The DevOps function behind CloudNexus delivery.
              </h1>
              <p
                className="animate-fade-in-up mt-8 max-w-3xl text-lg leading-9 text-zinc-400 md:text-[1.35rem] md:leading-10"
                style={{ animationDelay: "0.08s" }}
              >
                Ariba DevOps is the platform and delivery layer responsible for infrastructure, release automation,
                observability, and engineering reliability across the CloudNexus product ecosystem.
              </p>

              <div
                className="animate-fade-in-up mt-12 flex flex-wrap gap-3"
                style={{ animationDelay: "0.14s" }}
              >
                {operatingSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm tracking-[0.02em] text-zinc-300"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="animate-fade-in-up overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,20,0.98),rgba(10,10,12,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
              style={{ animationDelay: "0.12s" }}
            >
              <div className="border-b border-white/8 px-7 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">What We Do</p>
                <p className="mt-5 text-[1.75rem] font-medium leading-10 tracking-[-0.04em] text-zinc-100">
                  We create the internal systems that let product teams ship with confidence, security, and operational clarity.
                </p>
              </div>
              <div className="grid grid-cols-2">
                {facts.map((fact, idx) => (
                  <div
                    key={fact.label}
                    className={`px-7 py-6 ${idx % 2 === 0 ? "border-r border-white/8" : ""} ${
                      idx < 2 ? "border-b border-white/8" : ""
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">{fact.label}</p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.03em] text-zinc-100">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-14">
            <div>
              <SectionHeader
                label="Identity"
                title="Who We Are"
                description="A modern infrastructure team focused on building the systems, standards, and tooling that make engineering delivery reliable."
                centered={false}
              />
              <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.06s" }}>
                <p className="text-2xl font-medium leading-[1.6] tracking-[-0.03em] text-zinc-200">
                  At CloudNexus, we are more than just an IT consulting company—we are innovators, problem-solvers, and architects of the digital future. We specialize in progressive IT solutions, cloud transformation, AI-driven automation, and enterprise consulting, helping businesses thrive in an ever-evolving tech landscape.
                </p>
                <p className="mt-8 text-base leading-[1.8] text-zinc-400">
                  Our team of technology experts, strategists, and problem-solvers collaborates closely with clients to design tailored solutions that enhance efficiency, drive growth, and future-proof operations. Whether it's cloud migration, software development, automation, or cybersecurity, we ensure that your IT ecosystem is agile, secure, and optimized for success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[0.78fr_1.22fr]">
            <div>
              <SectionHeader
                label="Leadership"
                title="Department Leadership"
                description="A focused public view of the leadership that shaped Ariba and continues to guide its technical direction."
                centered={false}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {featuredLeaders.map((person, idx) => (
                <div
                  key={person.id}
                  className="animate-fade-in-up overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]"
                  style={{ animationDelay: `${0.05 + idx * 0.07}s` }}
                >
                  <div className="aspect-[4/3] bg-[linear-gradient(180deg,#1f1f24,#101014)]">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-end p-6">
                        <span className="text-7xl font-semibold tracking-[-0.05em] text-zinc-700">
                          {person.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Leadership</p>
                        <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-zinc-100">{person.name}</h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-600" />
                    </div>
                    <p className="mt-4 text-base leading-8 text-zinc-400">{person.role}</p>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
                      {person.name === "Yash"
                        ? "Original leadership behind the Ariba identity, product direction, and technical foundation that shaped the team."
                        : "Executive leadership guiding the broader CloudNexus vision and long-term direction around which the Ariba function operates."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-14">
            <div>
              <SectionHeader
                label="Capabilities"
                title="What Makes This Team Different"
                description="The difference is not just what the team manages, but how it shapes engineering quality across the product organization."
                centered={false}
              />
              <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.06s" }}>
                <p className="text-xl leading-9 tracking-[-0.03em] text-zinc-200 mb-6 font-medium">
                  What makes this team different isn’t just the scope of what it owns it’s the standard it sets for how engineering is practiced across the entire organization.
                </p>
                <p className="text-base leading-8 text-zinc-400 mb-6">
                  This team doesn’t operate in isolation or simply “manage infrastructure.” Instead, it actively shapes how product teams build, ship, and scale. By defining best practices, enabling reliable systems, and creating strong feedback loops, it raises the overall engineering quality across every layer of the product.
                </p>
                <p className="text-base leading-8 text-zinc-400 mb-6">
                  The impact is tangible. Releases move with greater confidence because systems are predictable and well observed. Operational visibility improves, allowing teams to detect, understand, and resolve issues faster. Most importantly, product teams experience a consistent, dependable development environment one that reduces friction, accelerates delivery, and builds trust in the platform they rely on every day.
                </p>
                <p className="text-xl leading-9 tracking-[-0.03em] text-zinc-200 font-medium">
                  In short, this team doesn’t just support engineering it elevates it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
