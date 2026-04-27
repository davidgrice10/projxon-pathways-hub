import { motion } from "framer-motion";

interface Props {
  text: string;
}

export default function SectionBridge({ text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-4 max-w-3xl mx-auto"
    >
      <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
      <p className="text-center text-sm md:text-base text-muted-foreground italic font-heading">
        {text}
      </p>
      <span className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
    </motion.div>
  );
}
