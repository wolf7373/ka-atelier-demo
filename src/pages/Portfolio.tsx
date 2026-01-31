import { useState } from "react";
import { motion } from "framer-motion";
import PortfolioGrid, { portfolioItems } from "@/components/PortfolioGrid";

const categories = ["All", "Textile Print", "Fabric Pattern", "Wallpaper"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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
            <span className="label-text text-champagne">Portfolio</span>
            <h1 className="text-foreground">Selected Works</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A curated collection of textile prints, fabric patterns, and
              surface designs. Each project represents a unique collaboration
              and creative journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`label-text pb-2 transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-champagne border-b border-champagne"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-spacing pt-0">
        <div className="container-editorial">
          <PortfolioGrid
            category={activeCategory === "All" ? undefined : activeCategory}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="label-text text-champagne">Our Process</span>
            <h2 className="mt-4 text-foreground">From Concept to Creation</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your brand, audience, and vision.",
              },
              {
                step: "02",
                title: "Concept",
                description: "Developing initial sketches and mood boards.",
              },
              {
                step: "03",
                title: "Refinement",
                description: "Iterating on designs based on your feedback.",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Production-ready files in your required formats.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-3"
              >
                <span className="font-display text-3xl text-champagne">
                  {item.step}
                </span>
                <h4 className="font-display text-lg text-foreground">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
