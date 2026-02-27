import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    date: "February 2026",
    title: "The Return of Botanical Motifs in Modern Interiors",
    excerpt:
      "Botanical prints are experiencing a renaissance — but today's interpretations trade Victorian excess for restrained, tonal elegance. We explore the trend and share how we approach it in our studio.",
    tag: "Trends",
  },
  {
    date: "January 2026",
    title: "Colour Forecasting: What's Shaping 2026 Palettes",
    excerpt:
      "Warm neutrals, oxidised terracotta, and quiet greens dominate the forecasts. Here's how we translate colour direction into production-ready textile palettes.",
    tag: "Colour",
  },
  {
    date: "December 2025",
    title: "Behind the Pattern: Designing a Wallpaper Collection",
    excerpt:
      "A look at the journey from initial sketches to a finished wallpaper collection for a luxury hospitality project in Mumbai.",
    tag: "Process",
  },
  {
    date: "November 2025",
    title: "Craft Meets Code: Digital Tools in Traditional Design",
    excerpt:
      "How we use digital fabrication alongside hand-drawing techniques to create patterns with warmth and precision.",
    tag: "Craft",
  },
  {
    date: "October 2025",
    title: "Sustainability in Surface Design",
    excerpt:
      "Responsible design goes beyond materials. We discuss how pattern scale, repeat efficiency, and ink coverage impact the sustainability of textile production.",
    tag: "Sustainability",
  },
  {
    date: "September 2025",
    title: "Heritage Textiles: Lessons from Indian Block Printing",
    excerpt:
      "What centuries-old block printing traditions in Rajasthan teach us about rhythm, imperfection, and the beauty of the handmade.",
    tag: "Inspiration",
  },
];

const Journal = () => {
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
            <span className="label-text text-champagne">Journal</span>
            <h1 className="text-foreground">
              Thoughts on Design, Craft & Colour
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Notes from the studio — on trends we're watching, processes we
              refine, and the heritage techniques that continue to inspire our
              work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-spacing pt-0">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-secondary/50 p-8 md:p-10 flex flex-col justify-between space-y-6 hover:bg-secondary transition-colors duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="label-text text-champagne">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 label-text text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read More{" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h2 className="text-foreground">Inspired?</h2>
            <p className="text-muted-foreground text-lg">
              If something here resonated, let's turn that inspiration into your
              next project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 label-text text-champagne hover:text-foreground transition-colors duration-300"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Journal;
