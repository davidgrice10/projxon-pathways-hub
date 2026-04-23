import { motion } from "framer-motion";
import logo from "@/assets/projxon-logo.png";

export default function BrandHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center pt-2 pb-4"
    >
      <img
        src={logo}
        alt="PROJXON"
        className="h-10 md:h-12 w-auto select-none"
        draggable={false}
      />
    </motion.header>
  );
}
