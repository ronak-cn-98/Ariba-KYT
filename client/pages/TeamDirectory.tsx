import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import EmployeeCard from "@/components/EmployeeCard";
import SectionHeader from "@/components/SectionHeader";
import { employees, teamStructure } from "@/data/employees";
import { Search, X } from "lucide-react";
import { useParams } from "react-router-dom";

const filters = [
  { key: "all",             label: "All",        count: employees.length },
  { key: "aribaLeadership", label: "Leadership", count: teamStructure.aribaLeadership.length },
  { key: "technology",      label: "Technology", count: teamStructure.technology.length },
];

export default function TeamDirectory() {
  const [activeFilter, setFilter] = useState("all");
  const [search, setSearch]       = useState("");
  const { employeeId } = useParams<{ employeeId?: string }>();

  const normalizedSearch = search.trim().toLowerCase();

  const selectedEmployee = useMemo(() => {
    if (!employeeId) return undefined;
    return employees.find((member) => member.id === employeeId);
  }, [employeeId]);

  const filteredPool = useMemo(() => {
    if (selectedEmployee) {
      return [selectedEmployee];
    }

    let currentPool = employees;
    if (activeFilter === "aribaLeadership") currentPool = teamStructure.aribaLeadership;
    else if (activeFilter === "technology") currentPool = teamStructure.technology;

    if (!normalizedSearch) {
      return currentPool;
    }

    return currentPool.filter((e) => {
      return (
        e.name.toLowerCase().includes(normalizedSearch) ||
        e.role.toLowerCase().includes(normalizedSearch) ||
        e.skills?.some((skill) => skill.toLowerCase().includes(normalizedSearch))
      );
    });
  }, [activeFilter, normalizedSearch, selectedEmployee]);

  useEffect(() => {
    if (!employeeId) return;
    const timeout = window.setTimeout(() => {
      const target = document.getElementById(`employee-card-${employeeId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [employeeId, filteredPool]);

  return (
    <div className="min-h-screen" style={{ background: "rgb(9,9,11)", color: "rgb(244,244,245)" }}>
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="People"
            title="Team Directory"
            description="Every engineer behind Ariba's infrastructure and automation."
          />

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgb(113,113,122)" }} />
              <input
                type="text"
                placeholder="Search by name, role or skill…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg text-sm"
                style={{
                  background: "rgb(17,17,20)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgb(244,244,245)",
                  outline: "none",
                }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.4)"; }}
                onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5" style={{ color: "rgb(113,113,122)" }} />
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex gap-2">
              {filters.map((f) => {
                const active = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-base"
                    style={{
                      background: active ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.04)",
                      border: active ? "1px solid rgba(6,182,212,0.25)" : "1px solid rgba(255,255,255,0.07)",
                      color: active ? "rgb(6,182,212)" : "rgb(113,113,122)",
                    }}
                  >
                    {f.label}
                    <span
                      className="text-[10px] font-mono rounded px-1 py-0.5"
                      style={{ background: active ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.06)", color: "inherit" }}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs font-mono mb-6" style={{ color: "rgb(71,71,80)" }}>
            {filteredPool.length} {filteredPool.length === 1 ? "member" : "members"} found
          </p>

          {/* Grid */}
          {filteredPool.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {filteredPool.map((emp, idx) => {
                const isHighlighted = employeeId === emp.id;
                return (
                  <div
                    key={emp.id}
                    id={`employee-card-${emp.id}`}
                    className={`animate-fade-in-up ${isHighlighted ? "ring-2 ring-cyan-400/60 shadow-[0_12px_40px_rgba(6,182,212,0.35)]" : ""}`}
                    style={{ animationDelay: `${Math.min(idx * 0.04, 0.3)}s` }}
                  >
                    <EmployeeCard
                      employee={emp}
                      featured={
                        activeFilter === "aribaLeadership" ||
                        emp.role.toLowerCase().includes("lead") ||
                        emp.role.toLowerCase().includes("representative")
                      }
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-semibold mb-2" style={{ color: "rgb(161,161,170)" }}>No members found</p>
              <p className="text-sm" style={{ color: "rgb(113,113,122)" }}>Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
