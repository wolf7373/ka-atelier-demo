import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const Journal = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["journal-posts"],
    queryFn: fetchPosts,
  });

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
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <p className="text-center text-muted-foreground py-20">
              Unable to load posts. Please try again later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {posts?.map((post, i) => (
                <motion.article
                  key={post.id}
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
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.article>
              ))}
            </div>
          )}
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
