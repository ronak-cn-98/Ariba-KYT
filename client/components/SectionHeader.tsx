interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <p
          className="animate-fade-in mb-3 text-xs font-semibold uppercase tracking-widest font-mono"
          style={{ color: "rgb(6,182,212)", letterSpacing: "0.12em" }}
        >
          {label}
        </p>
      )}
      <h2
        className="animate-text-reveal text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: "rgb(244,244,245)", letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`animate-fade-in-up mt-4 text-base leading-relaxed ${centered ? "mx-auto max-w-xl" : ""}`}
          style={{ color: "rgb(113,113,122)", animationDelay: "0.08s" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
