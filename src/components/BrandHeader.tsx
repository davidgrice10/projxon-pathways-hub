import { motion } from "framer-motion";

export default function BrandHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-center items-center py-5 border-b border-amber-400/10"
    >
      <span className="font-heading font-bold text-xl md:text-2xl text-amber-400 tracking-widest select-none">
        PROJXON
      </span>
    </motion.header>
  );
}
