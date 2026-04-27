import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2031-01-01T00:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[80px] md:min-w-[110px]">
      <motion.div
        key={value}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-5xl font-bold font-heading text-gradient-gold tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest-custom text-muted-foreground mt-1 font-heading">
        {label}
      </span>
    </div>
  );
}

export default function CountdownPanel() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-background/40 to-transparent p-6 md:p-10 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      <div className="relative">
        <span className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">
          Future Fulfilled
        </span>
        <div className="flex justify-center items-end gap-3 md:gap-6 mt-5 mb-5">
          <Unit value={timeLeft.days} label="Days" />
          <span className="text-2xl md:text-4xl font-bold text-primary/40 pb-6">:</span>
          <Unit value={timeLeft.hours} label="Hours" />
          <span className="text-2xl md:text-4xl font-bold text-primary/40 pb-6">:</span>
          <Unit value={timeLeft.minutes} label="Minutes" />
        </div>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          The moment our ecosystem reaches full scale across talent, education, and employment.
        </p>
      </div>
    </motion.section>
  );
}
