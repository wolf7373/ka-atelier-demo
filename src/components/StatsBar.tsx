import { motion } from "framer-motion";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "40+", label: "Global Clients" },
  { value: "8", label: "Years of Craft" },
  { value: "15+", label: "Industry Awards" },
];

const StatsBar = () => {
  return (
    <section className="py-16 bg-foreground">
      <div className="container-editorial">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <p className="font-display text-4xl md:text-5xl text-champagne">
                {s.value}
              </p>
              <p className="label-text text-background/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
