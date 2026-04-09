import { BriefcaseBusiness, Globe, Linkedin, Rocket, Users } from "lucide-react";

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  location: string;
  contact: string;
  joiningDate: string;
  timezone: string;
  skills: string[];
  introduction: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  dateOfBirth?: string;
  imagePosition?: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
  featured?: boolean;
}

function pickAccent(employee: Employee, featured?: boolean) {
  if (featured) {
    return {
      text: "#22d3ee",
      soft: "rgba(34,211,238,0.14)",
      iconBg: "linear-gradient(135deg, #164e63, #06b6d4)",
      Icon: Users,
    };
  }

  if (employee.role.toLowerCase().includes("business")) {
    return {
      text: "#c084fc",
      soft: "rgba(192,132,252,0.16)",
      iconBg: "linear-gradient(135deg, #7c3aed, #d946ef)",
      Icon: BriefcaseBusiness,
    };
  }

  if (employee.role.toLowerCase().includes("lead")) {
    return {
      text: "#2dd4bf",
      soft: "rgba(45,212,191,0.16)",
      iconBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
      Icon: Rocket,
    };
  }

  return {
    text: "#60a5fa",
    soft: "rgba(96,165,250,0.16)",
    iconBg: "linear-gradient(135deg, #2563eb, #60a5fa)",
    Icon: Globe,
  };
}

export default function EmployeeCard({ employee, onClick, featured }: EmployeeCardProps) {
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const accent = pickAccent(employee, featured);
  const skillPreview = employee.skills?.slice(0, 2) ?? [];
  const displayRole = employee.role.replace(" – ", "\n– ");

  return (
    <article
      onClick={onClick}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0a0d] text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1"
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="relative h-[220px] shrink-0 overflow-hidden bg-[#111216]">
        {employee.image ? (
          <img
            src={employee.image}
            alt={employee.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: employee.imagePosition || "center 15%" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#1c1d22,#101115)]">
            <span className="text-5xl font-semibold tracking-[0.1em] text-zinc-600">{initials}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.4)_75%,rgba(0,0,0,0.85))]" />

        <div className="absolute inset-x-5 bottom-4 text-white">
          <h3 className="text-[1.65rem] font-semibold leading-[1.05] tracking-[-0.03em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            {employee.name.split(" ")[0]}
          </h3>
          <p className="mt-0.5 text-[0.85rem] font-medium text-white/80">
            {employee.name.split(" ").slice(1).join(" ")}
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-6">
        <div
          className="absolute -top-6 right-5 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#0a0a0d] text-white shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
          style={{ background: accent.iconBg }}
        >
          <accent.Icon className="h-5 w-5" />
        </div>

        <p className="text-[0.9rem] font-medium tracking-[-0.01em]" style={{ color: accent.text }}>
          {featured ? "Leadership" : employee.role.split(" / ")[0].split(" – ")[0]}
        </p>

        <p
          className="mt-2 text-[0.85rem] leading-[1.6] text-zinc-400 text-justify"
          style={{ textJustify: "inter-word", hyphens: "auto" }}
        >
          {employee.introduction}
        </p>

        {skillPreview.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {skillPreview.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-2.5 py-[3px] text-[10px] font-medium uppercase tracking-wide"
                style={{ background: accent.soft, color: "#e4e4e7" }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            <span>
              {employee.location}
              {employee.joiningDate && employee.joiningDate !== "—" ? ` • Joined ${employee.joiningDate.split(" ")[2]}` : ""}
              {employee.timezone && employee.timezone !== "—" ? ` • ${employee.timezone}` : ""}
            </span>
          {employee.social?.linkedin && (
            <a
              href={employee.social.linkedin}
              target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
