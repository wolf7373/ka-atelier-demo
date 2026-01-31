import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "textile-print",
    title: "Textile Print Design",
    description:
      "Creating original patterns for fabrics, from concept sketches to production-ready digital files. We work with various printing techniques including screen printing, digital printing, and block printing.",
    includes: [
      "Custom pattern development",
      "Repeat engineering",
      "Color separation",
      "Technical specifications",
      "Multiple colorway options",
    ],
  },
  {
    id: "fabric-pattern",
    title: "Fabric Pattern Development",
    description:
      "Developing complex, repeating patterns optimized for textile manufacturing. Whether it's for fashion, home textiles, or technical fabrics, we ensure seamless integration with production workflows.",
    includes: [
      "Seamless repeat patterns",
      "Scale variations",
      "Trend-aligned designs",
      "CAD-ready files",
      "Mill-ready specifications",
    ],
  },
  {
    id: "wallpaper",
    title: "Wall & Surface Wallpapers",
    description:
      "Designing contemporary wallpapers and surface coverings that transform spaces. From subtle textures to bold statements, we create patterns that elevate interiors.",
    includes: [
      "Residential wallpapers",
      "Commercial surface designs",
      "Murals and large-scale prints",
      "Repeat pattern wallpapers",
      "Custom colorways",
    ],
  },
];

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <span className="label-text text-champagne">Services</span>
            <h1 className="text-foreground">What We Offer</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Comprehensive textile and surface design services tailored to your
              brand's unique needs. Every project is approached with meticulous
              attention to detail and a deep respect for craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-spacing pt-0">
        <div className="container-editorial">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl text-champagne">
                      0{index + 1}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <h2 className="text-foreground text-2xl md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="bg-secondary p-8 space-y-4">
                  <h4 className="label-text text-foreground">
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Working With Us */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <span className="label-text text-champagne">Collaboration</span>
            <h2 className="text-foreground">Working With Us</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe in meaningful partnerships built on clear
              communication, mutual respect, and shared creative vision. Every
              project begins with a conversation to understand your needs,
              timeline, and goals.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-8 text-left">
              {[
                {
                  title: "Tailored Approach",
                  text: "Every project is unique. We adapt our process to fit your specific requirements.",
                },
                {
                  title: "Clear Communication",
                  text: "Regular updates and open dialogue throughout the design process.",
                },
                {
                  title: "Quality Delivery",
                  text: "Production-ready files delivered on time, every time.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h4 className="font-display text-lg text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <h2 className="text-foreground">Let's Create Together</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? We'd love to hear about it. Reach out to
              discuss how we can bring your vision to life.
            </p>
            <Button variant="champagne" size="xl" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
