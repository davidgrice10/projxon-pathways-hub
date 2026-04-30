import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function BrandHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between items-center py-5 border-b border-amber-400/10"
    >
      {/* Spacer to keep the wordmark visually centered */}
      <span className="w-[110px]" aria-hidden="true" />
      <span className="font-heading font-bold text-xl md:text-2xl text-amber-400 tracking-widest select-none">
        PROJXON
      </span>
      <button
        onClick={() => window.print()}
        className="export-pdf-btn flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-400 border border-border hover:border-amber-400/40 rounded-full px-3 py-1.5 transition-all duration-200"
      >
        <Download className="w-3.5 h-3.5" />
        Export PDF
      </button>
    </motion.header>
  );
}
