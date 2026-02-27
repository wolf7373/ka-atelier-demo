import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "KA_ATELIER_082 transformed our vision into patterns that exceeded every expectation. Their attention to detail is unmatched.",
    author: "Priya Mehta",
    role: "Creative Director, Asha Interiors",
  },
  {
    quote:
      "Working with Keshav felt like a true creative partnership. The final wallpaper collection became the centrepiece of our hospitality project.",
    author: "David Chen",
    role: "Principal, Studio Noor",
  },
  {
    quote:
      "From concept sketches to production files, the process was seamless. We've commissioned three collections since our first collaboration.",
    author: "Lena Fischer",
    role: "Head of Design, Maison Lumière",
  },
];

const Testimonials = () => {
  return (
    <section className="section-spacing">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-champagne">Testimonials</span>
          <h2 className="mt-4 text-foreground">What Clients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-secondary/50 p-8 flex flex-col justify-between space-y-6"
            >
              <p className="font-display text-lg italic text-foreground leading-relaxed">
                "{t.quote}"
              </p>
              <footer className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {t.author}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
