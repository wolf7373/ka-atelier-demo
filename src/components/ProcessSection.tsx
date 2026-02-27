import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with an in-depth conversation to understand your brand, market, and creative vision.",
  },
  {
    number: "02",
    title: "Concept Development",
    description:
      "Initial mood boards, colour explorations, and concept sketches are presented for your feedback.",
  },
  {
    number: "03",
    title: "Design & Refinement",
    description:
      "Selected concepts are developed into full-scale patterns with multiple colourways and repeat options.",
  },
  {
    number: "04",
    title: "Production Files",
    description:
      "Final designs are delivered as production-ready files, optimised for your manufacturing process.",
  },
];

const ProcessSection = () => {
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
          <span className="label-text text-champagne">How We Work</span>
          <h2 className="mt-4 text-foreground">Our Process</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <span className="font-display text-4xl text-champagne/40 shrink-0 leading-none pt-1">
                {step.number}
              </span>
              <div className="space-y-2">
                <h4 className="font-display text-xl text-foreground">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
