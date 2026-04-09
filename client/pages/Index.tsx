import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import { AribaLogo, BrandLockup, CloudNexusLogo } from "@/components/Brand";
import SectionHeader from "@/components/SectionHeader";
import { employees, teamStructure } from "@/data/employees";
import {
  ArrowRight,
  ChevronRight,
  GitBranch,
  Cloud,
  Shield,
  Server,
  Activity,
  RefreshCw,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  LogIn,
  Lock,
} from "lucide-react";
import type { Employee } from "@/components/EmployeeCard";
import type { Employee } from "@/components/EmployeeCard";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const s = Math.ceil(end / 40);
      const t = setInterval(() => {
        n += s;
        if (n >= end) { setCount(end); clearInterval(t); }
        else setCount(n);
      }, 30);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const chunkArray = <T,>(items: T[], size: number): T[][] => {
  if (!size) return [];
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};

function TreeNode({
  employee,
  onClick,
  compact = false,
}: {
  employee: Employee;
  onClick: () => void;
  compact?: boolean;
}) {
  const size = compact ? 60 : 70;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center gap-1 rounded-[20px] border px-4 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/70 border-white/10 bg-black/5"
      style={{ minWidth: 150 }}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-black"
        style={{ width: size, height: size }}
      >
        {employee.image ? (
          <img
            src={employee.image}
            alt={employee.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl font-semibold text-white/70">
            {employee.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
        )}
        <span className="absolute inset-0 block border border-cyan-400/20" aria-hidden />
      </div>
      <p className="text-sm font-semibold text-white/90 leading-[1.2]">{employee.name}</p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">{employee.role}</p>
    </button>
  );
}

function ConnectorLine({ length = 10 }: { length?: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="h-1 w-6 rounded-full bg-[linear-gradient(90deg,transparent,rgba(8,145,178,0.8),transparent)]"
        style={{ transform: "translateY(-4px)" }}
      />
      <span className="h-10 w-px rounded-full bg-gradient-to-b from-cyan-400/60 via-cyan-500/40 to-transparent" />
      <span
        className="h-1 w-6 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.7)_0,_rgba(14,165,233,0)_70%)]"
        style={{ transform: "translateY(-4px)" }}
      />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgb(9,9,11)" }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              <BrandLockup />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgb(113,113,122)" }}>
              Delivering world-class DevOps, cloud infrastructure, and automation for Cloud Nexus.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://linkedin.com", Icon: Linkedin },
                { href: "https://twitter.com", Icon: Twitter },
                { href: "https://facebook.com", Icon: Facebook },
                { href: "https://instagram.com", Icon: Instagram },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-base"
                  style={{ color: "rgb(113,113,122)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgb(161,161,170)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgb(113,113,122)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "rgb(113,113,122)" }}>Navigation</p>
            <ul className="space-y-2.5">
              {[{ label: "Org Chart", href: "/" }, { label: "Team Directory", href: "/team-directory" }, { label: "About", href: "/about" }].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm transition-base" style={{ color: "rgb(113,113,122)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(161,161,170)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(113,113,122)"; }}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "rgb(113,113,122)" }}>Company</p>
            <ul className="space-y-2.5">
              <li>
                <a href="https://cloudnexus.in" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-base flex items-center gap-1"
                  style={{ color: "rgb(113,113,122)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(161,161,170)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(113,113,122)"; }}
                >cloudnexus.in ↗</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs font-mono" style={{ color: "rgb(71,71,80)" }}>
            © {new Date().getFullYear()} CloudNexus · Ariba DevOps Department
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs transition-base" style={{ color: "rgb(71,71,80)" }}>Privacy</a>
            <a href="#" className="text-xs transition-base" style={{ color: "rgb(71,71,80)" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  const { cloudNexus, aribaLeadership, technology } = teamStructure;
  const navigate = useNavigate();
  const executiveSponsor = cloudNexus[0];
  const deputyLeader = cloudNexus[1];
  const thirdTier = aribaLeadership.slice(2, 4).filter(Boolean) as Employee[];
  const engineerRows = useMemo(() => chunkArray(technology, 4), [technology]);

  const handleEmployeeClick = (employee: Employee) => {
    navigate(`/team-directory/${employee.id}`);
  };

  const stats = [
    { label: "Team Members", value: employees.length, suffix: "" },
    { label: "Delivery Domains", value: 6, suffix: "+" },
    { label: "Uptime SLA", value: 99, suffix: ".9%" },
    { label: "Automation Assets", value: 40, suffix: "+" },
  ];

  const capabilities = [
    { icon: Cloud, title: "Cloud Implementing Strategy", desc: "We design and execute a seamless Cloud Implementation Strategy to help businesses migrate, optimize, and scale in the cloud. Our approach ensures a smooth transition with minimal disruption, enhanced security, and cost efficiency." },
    { icon: Server, title: "Cloud App Services", desc: "We offer cutting-edge Cloud Application Services to help businesses scale, innovate, and optimize operations. Our cloud solutions ensure high performance, security, and flexibility, enabling seamless access to applications anytime, anywhere." },
    { icon: Shield, title: "Cloud Management Service", desc: "We provide end-to-end Cloud Management Services to optimize performance, security, and scalability. Our solutions cover cloud migration, infrastructure management, and hybrid cloud environments." },
    { icon: RefreshCw, title: "DevOps As A Service", desc: "We streamline your development and operations with our DevOps as a Service (DaaS) solutions. We enable faster deployments, improved collaboration, and continuous integration & delivery (CI/CD) to enhance your software development lifecycle." },
    { icon: LogIn, title: "Identity & Access Management(IAM)", desc: "We provide robust Identity & Access Management (IAM) solutions to secure and streamline user access across your digital ecosystem. Our IAM services ensure that the right individuals have the right access to the right resources at the right time enhancing security." },
    { icon: Lock, title: "Cloud & Infrastructure Security", desc: "We provide robust Cloud & Infrastructure Security solutions to protect your digital assets from evolving cyber threats. Our comprehensive security services ensure data integrity, compliance, and resilience across cloud and on premises environments." },
  ];

  const deliveryProcess = [
    {
      step: "1",
      title: "Infrastructure as Code",
      desc: "Automated infrastructure provisioning and management using Terraform, AWS CloudFormation, and Ansible.",
    },
    {
      step: "2",
      title: "CI/CD Pipeline",
      desc: "Automated build, test, and deployment pipelines using GitHub Actions, Jenkins, AWS CodePipeline, and GitLab CI/CD.",
    },
    {
      step: "3",
      title: "Monitoring & Logging",
      desc: "Comprehensive system monitoring and log management using Prometheus, Grafana, ELK Stack, and AWS CloudWatch.",
    },
    {
      step: "4",
      title: "Security & Compliance (DevSecOps)",
      desc: "Implementation of DevSecOps practices with Shift Left Security using tools like Snyk, Aqua Security, and HashiCorp Vault.",
    },
    {
      step: "5",
      title: "Performance Optimization",
      desc: "Continuous system optimization and scaling using cloud-native approaches like microservices, containers, Kubernetes, and serverless computing with AWS Lambda or Azure Functions.",
    },
    {
      step: "6",
      title: "Service Models (SaaS, PaaS, IaaS)",
      desc: "IaaS provides virtualized computing resources (e.g., AWS EC2, Azure VMs), PaaS offers managed development environments (e.g., Google App Engine, AWS Elastic Beanstalk), and SaaS delivers software applications over the internet (e.g., Google Workspace, Dropbox).",
    },
    {
      step: "7",
      title: "Deployment Models",
      desc: "Cloud computing models include Public Cloud (shared infrastructure managed by third parties), Private Cloud (dedicated infrastructure for single organizations), Hybrid Cloud (combining public and private clouds), and Multi-Cloud (utilizing multiple providers for flexibility and redundancy).",
    },
    {
      step: "8",
      title: "Configuration Management",
      desc: "Use tools like Chef, Puppet, and Ansible to standardize and automate system configurations.",
    },
    {
      step: "9",
      title: "Agile & Collaboration",
      desc: "Use Agile project management methodologies like Scrum and Kanban, leveraging collaboration tools such as Jira, Slack, and Confluence.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "rgb(9,9,11)", color: "rgb(244,244,245)" }}>
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Subtle radial glow – single, far away */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb label */}
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <CloudNexusLogo className="h-4 w-4" />
                <span className="text-xs font-mono" style={{ color: "rgb(113,113,122)" }}>CloudNexus</span>
              </div>
              <ChevronRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} />
              <div className="flex items-center gap-2">
                <AribaLogo className="h-4 w-auto" />
                <span className="text-xs font-mono" style={{ color: "rgb(6,182,212)" }}>DevOps</span>
              </div>
            </div>

            <h1
              className="font-bold tracking-tight mb-5 animate-fade-in-up"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                animationDelay: "0.05s",
              }}
            >
              Meet the DevOps<br />
              <span style={{ color: "rgb(6,182,212)" }}>Engine</span>
            </h1>

            <p
              className="text-lg mb-8 leading-relaxed max-w-lg animate-fade-in-up"
              style={{ color: "rgb(113,113,122)", animationDelay: "0.1s" }}
            >
              The team building and scaling the infrastructure that powers CloudNexus's entire product ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Link to="/team-directory"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-base"
                style={{ background: "rgb(6,182,212)", color: "rgb(9,9,11)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Meet the Team
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://cloudnexus.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-base"
                style={{ color: "rgb(161,161,170)", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                Visit CloudNexus
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold tracking-tight tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                    <Counter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs mt-1 font-mono" style={{ color: "rgb(113,113,122)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Operating Model ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-6">
          <SectionHeader label="Structure" title="DevOps Operating Model" description="A clearer view of how the department is sponsored, led, and executed across business and platform lanes." />

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,20,0.98),rgba(10,10,13,0.98))] p-6 md:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
              <div className="absolute left-12 top-10 h-40 w-40 rounded-full bg-cyan-400/7 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-500/7 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:34px_34px] opacity-[0.07]" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="space-y-8">
                <div className="flex justify-center">
                  {executiveSponsor && (
                    <div className="inline-flex justify-center rounded-[26px] border border-white/10 bg-black/30 p-6">
                      <TreeNode employee={executiveSponsor} onClick={() => handleEmployeeClick(executiveSponsor)} />
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <ConnectorLine />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {deputyLeader && (
                    <TreeNode
                      key={deputyLeader.id}
                      employee={deputyLeader}
                      onClick={() => handleEmployeeClick(deputyLeader)}
                    />
                  )}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <ConnectorLine />
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-6 w-px bg-gradient-to-b from-cyan-400/80 to-transparent" />
                    <span className="h-px w-28 rounded-full bg-gradient-to-r from-cyan-400/80 via-cyan-300/30 to-transparent" />
                    <span className="h-6 w-px bg-gradient-to-b from-cyan-400/80 to-transparent" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {thirdTier.map((person) => (
                    <TreeNode key={person.id} employee={person} onClick={() => handleEmployeeClick(person)} />
                  ))}
                </div>

                <div className="rounded-[34px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Engineering lane</p>
                    <h3 className="text-2xl font-medium tracking-[-0.03em] text-zinc-100">DevOps Engineers</h3>
                    <p className="text-sm leading-7 text-zinc-400">
                      {technology.length} engineers executing infrastructure, automation, delivery, reliability, and platform operations.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {technology.map((engineer) => (
                      <TreeNode
                        key={engineer.id}
                        employee={engineer}
                        compact
                        onClick={() => handleEmployeeClick(engineer)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/team-directory"
              className="inline-flex items-center gap-2 text-sm font-medium transition-base"
              style={{ color: "rgb(113,113,122)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(161,161,170)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(113,113,122)"; }}
            >
              View full team directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Process"
            title="Our Process"
            description="A structured approach built to move from assessment to long-term operational support."
          />

          <div className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,rgba(17,17,20,0.98),rgba(10,10,13,0.98))] px-6 py-12 md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.08]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-28 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.05),transparent_72%)]" />
              <div className="absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_right,rgba(34,211,238,0.05),transparent_72%)]" />
            </div>

            <div className="relative z-10">
              <div className="mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {deliveryProcess.map((item, idx) => (
                    <div
                      key={item.step}
                      className="group relative h-full rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.01))] p-5 xl:p-6 text-left transition-all duration-300 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.012))]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="mb-5 flex items-start justify-between">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(18,89,105,0.96),rgba(9,60,71,0.96))] text-xs font-medium text-white shadow-[0_0_15px_rgba(34,211,238,0.15)] animate-signal-pulse"
                          style={{ animationDelay: `${idx * 0.3}s` }}
                        >
                          {item.step}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-px w-5 bg-cyan-300/30" />
                          <span className="text-[9px] uppercase tracking-[0.24em] text-cyan-300/70">
                            Step
                          </span>
                        </div>
                      </div>

                      <h3 className="mb-2 text-base font-medium leading-[1.3] tracking-[-0.02em] text-zinc-50">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-[1.6] text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-6">
          <SectionHeader label="Services" title="DevOps Capabilities" description="Core competencies keeping CloudNexus infrastructure running at peak performance." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl p-5 transition-base animate-fade-in-up"
                  style={{
                    background: "rgb(14,14,17)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    animationDelay: `${idx * 0.06}s`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon className="w-4 h-4" style={{ color: "rgb(161,161,170)" }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1.5" style={{ color: "rgb(244,244,245)", letterSpacing: "-0.01em" }}>
                    {cap.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-justify" style={{ color: "rgb(113,113,122)" }}>{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Vision ────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-6">
          <SectionHeader label="" title="Vision & Mission" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="rounded-xl p-6" style={{ background: "rgb(14,14,17)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(6,182,212)" }}>Vision</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgb(161,161,170)" }}>
                To be the global leader in IT solutions and digital product innovation, empowering businesses with progressive technology that enhances efficiency, scalability, and growth. At CloudNexus, we envision a future where businesses thrive by leveraging smart, automated, and future-ready solutions.
              </p>
            </div>
            <div className="rounded-xl p-6" style={{ background: "rgb(14,14,17)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(113,113,122)" }}>Mission</p>
              <ul className="space-y-3">
                {[
                  "Developing industry-leading IT solutions and products that enable businesses to operate efficiently, automate workflows, and stay ahead in a rapidly evolving digital world.",
                  "Transforming outdated methodologies by replacing legacy systems with modern, intelligent, and scalable solutions tailored to each business's needs.",
                  "Driving digital innovation through AI, cloud computing, and automation, ensuring seamless integration of technology into daily business operations.",
                  "Empowering businesses of all sizes with accessible, secure, and intelligent IT infrastructure that fosters productivity and long-term success."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm items-start" style={{ color: "rgb(161,161,170)" }}>
                    <span className="mt-0.5 shrink-0 font-mono" style={{ color: "rgb(6,182,212)" }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
