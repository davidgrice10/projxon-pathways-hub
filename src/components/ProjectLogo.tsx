import logoSrc from "@/assets/projxon-logo.svg";

interface ProjectLogoProps {
  variant: "full" | "monogram" | "watermark" | "outline" | "strip";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const fullSizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
};

export default function ProjectLogo({ variant, size = "md", className = "" }: ProjectLogoProps) {
  if (variant === "full") {
    return (
      <div className={`rounded-lg overflow-hidden ${fullSizes[size]} ${className}`}>
        <img src={logoSrc} alt="PROJXON" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (variant === "monogram") {
    return (
      <div className={`w-8 h-8 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center ${className}`}>
        <span className="font-heading font-bold text-amber-400 text-sm tracking-widest">P</span>
      </div>
    );
  }

  if (variant === "watermark") {
    return (
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={120}
        height={120}
        className={`opacity-[0.04] pointer-events-none select-none ${className}`}
      />
    );
  }

  if (variant === "outline") {
    return (
      <span className={`tracking-widest font-heading font-bold text-amber-400/60 ${className}`}>
        PROJXON
      </span>
    );
  }

  // strip
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 ${className}`}>
      <span className="w-4 h-4 rounded-sm bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
        <span className="font-heading font-bold text-amber-400 text-[9px] tracking-widest leading-none">P</span>
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-amber-400/70">PROJXON</span>
    </span>
  );
}
