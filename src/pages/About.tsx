import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProcessSection from "@/components/ProcessSection";

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="label-text text-champagne">About</span>
              <h1 className="text-foreground">The Story Behind the Studio</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  KA_ATELIER_082 was founded with a singular vision: to create
                  textile and surface designs that honor traditional
                  craftsmanship while embracing contemporary aesthetics.
                </p>
                <p>
                  Based on the belief that great design is born from
                  understanding—understanding of materials, techniques, and the
                  stories they can tell—we approach each project as an
                  opportunity to create something meaningful.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <div className="text-center space-y-4 p-12">
                  <div className="font-display text-6xl md:text-7xl text-champagne italic">
                    082
                  </div>
                  <div className="divider-champagne mx-auto" />
                  <p className="label-text text-muted-foreground">
                    Est. 2024
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-champagne opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center space-y-6 mb-16">
              <span className="label-text text-champagne">Philosophy</span>
              <h2 className="text-foreground">Our Design Principles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Tradition Informed",
                  text: "We draw inspiration from heritage techniques and classic patterns, reinterpreting them for modern applications.",
                },
                {
                  title: "Contemporary Executed",
                  text: "Clean lines, refined palettes, and minimal complexity. We believe in the power of restraint.",
                },
                {
                  title: "Quality Driven",
                  text: "Every pattern is crafted with attention to technical requirements and aesthetic excellence.",
                },
                {
                  title: "Collaboration Centered",
                  text: "We see ourselves as partners in your creative journey, not just service providers.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <h4 className="font-display text-xl text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <span className="label-text text-champagne">The Founder</span>
            <h2 className="text-foreground">Keshav Arora</h2>
            <div className="w-24 h-24 mx-auto rounded-full bg-champagne-light flex items-center justify-center">
              <span className="font-display text-2xl text-champagne">KA</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              With a deep appreciation for textile heritage and a modern design
              sensibility, Keshav Arora founded KA_ATELIER_082 to bridge the gap
              between traditional craft and contemporary design needs. Every
              project is approached with curiosity, care, and commitment to
              excellence.
            </p>
            <div className="divider-champagne mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection />

      {/* Who We Work With */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            <span className="label-text text-champagne">Clients</span>
            <h2 className="text-foreground">Who We Work With</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 text-muted-foreground"
          >
            {[
              "Interior Design Studios",
              "Home Décor Brands",
              "Textile Manufacturers",
              "Fashion Labels",
              "Startups",
              "Hospitality Projects",
            ].map((client) => (
              <span key={client} className="label-text">
                {client}
              </span>
            ))}
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
            <h2 className="text-foreground">Let's Work Together</h2>
            <p className="text-muted-foreground text-lg">
              Ready to start a project? We'd love to hear about your vision and
              explore how we can bring it to life.
            </p>
            <Button variant="champagne" size="xl" asChild>
              <Link to="/contact">Start a Conversation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
