import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2031-01-01T00:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[72px] md:min-w-[96px]">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
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

export default function HeroPanel() {
  const outcomes = [
    "500M+ projected ecosystem revenue",
    "5M+ individuals impacted",
    "Global network of universities and employers",
    "End-to-end talent development platform",
  ];

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 glow-gold">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Rocket className="text-primary" size={20} />
          </div>
          <span className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">Overview</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-gradient-gold leading-tight mb-4">
          Building the Future of<br />Workforce Development
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          PROJXON connects talent, education, and companies to create scalable career pathways.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {o}
            </motion.div>
          ))}
        </div>

        {/* 5-Year Target Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background/40 to-transparent p-6 md:p-8 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
          <div className="relative">
            <span className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">
              Our 5-Year Target
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-gradient-gold mt-2 mb-6">
              Building the Future of Workforce Development
            </h2>
            <div className="flex justify-center items-end gap-3 md:gap-6 mb-6">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="text-2xl md:text-4xl font-bold text-primary/40 pb-6">:</span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="text-2xl md:text-4xl font-bold text-primary/40 pb-6">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <span className="text-2xl md:text-4xl font-bold text-primary/40 pb-6">:</span>
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              We are working toward a fully realized ecosystem connecting talent, education, and employment at global scale.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
