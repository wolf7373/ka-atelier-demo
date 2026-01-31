import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PortfolioGrid from "@/components/PortfolioGrid";
import heroImage from "@/assets/hero-textile.jpg";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container-editorial py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="label-text text-champagne">
                  Textile & Surface Design Studio
                </span>
                <h1 className="text-foreground leading-tight">
                  Where Tradition Meets
                  <span className="block italic text-champagne">
                    Contemporary Design
                  </span>
                </h1>
              </div>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                Crafting bespoke textile prints, fabric patterns, and surface
                wallpapers that bridge heritage craftsmanship with modern
                aesthetics.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="editorial" size="lg" asChild>
                  <Link to="/portfolio">View Portfolio</Link>
                </Button>
                <Button variant="champagne-outline" size="lg" asChild>
                  <Link to="/contact">Start a Project</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Elegant textile pattern design"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-champagne opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <span className="label-text text-champagne">The Studio</span>
            <h2 className="text-foreground">
              Design with Intention, Craft with Care
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              KA_ATELIER_082 is a boutique design studio specializing in textile
              and surface pattern design. We collaborate with interior brands,
              home décor labels, and textile manufacturers to create distinctive
              patterns that tell a story.
            </p>
            <div className="divider-champagne mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="label-text text-champagne">What We Do</span>
            <h2 className="mt-4 text-foreground">Our Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Textile Print Design",
                description:
                  "Bespoke patterns for fabrics, from initial concept to production-ready files.",
              },
              {
                title: "Fabric Pattern Development",
                description:
                  "Complex repeating patterns optimized for various textile applications.",
              },
              {
                title: "Wall & Surface Wallpapers",
                description:
                  "Contemporary wallpaper designs that transform spaces with elegance.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4 p-8 bg-secondary/50"
              >
                <div className="w-12 h-px bg-champagne mx-auto" />
                <h3 className="font-display text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="minimal" asChild>
              <Link to="/services">
                Explore All Services <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <span className="label-text text-champagne">Portfolio</span>
              <h2 className="mt-4 text-foreground">Featured Works</h2>
            </div>
            <Button variant="minimal" asChild>
              <Link to="/portfolio">
                View All Projects <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </motion.div>

          <PortfolioGrid limit={3} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <span className="label-text text-champagne">Let's Collaborate</span>
            <h2 className="text-foreground">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're a textile brand, interior designer, or home décor
              label, we'd love to hear about your project.
            </p>
            <div className="pt-4">
              <Button variant="champagne" size="xl" asChild>
                <Link to="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
