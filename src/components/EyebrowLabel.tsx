import { type LucideIcon } from "lucide-react";

interface Props {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export default function EyebrowLabel({ icon: Icon, children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400/75 ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
