import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Calendar, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import botanicalImg from "@/assets/journal/botanical-motifs.jpg";
import colourImg from "@/assets/journal/colour-forecasting.jpg";
import wallpaperImg from "@/assets/journal/wallpaper-collection.jpg";
import craftImg from "@/assets/journal/craft-meets-code.jpg";
import sustainabilityImg from "@/assets/journal/sustainability.jpg";
import blockPrintingImg from "@/assets/journal/block-printing.jpg";

const fallbackImages: Record<string, string> = {
  "170417b4-bf15-425f-9233-0b57062fe001": botanicalImg,
  "59284f95-53ee-49f3-b9b4-5290ff006314": colourImg,
  "e367fbb4-0434-4086-a52b-c99459e08a32": wallpaperImg,
  "d77d2880-6b32-436e-bbda-53d061285ebf": craftImg,
  "e9796659-d354-4bc7-bf86-c7db656d673a": sustainabilityImg,
  "6319449e-6899-4258-90d7-1fefe2c8cf39": blockPrintingImg,
};

const JournalPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["journal-post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_posts")
        .select("*")
        .eq("id", id!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Post not found");
      return data;
    },
    enabled: !!id,
  });

  const imageUrl = post?.image_url || (post ? fallbackImages[post.id] : null);

  if (isLoading) {
    return (
      <section className="section-spacing">
        <div className="container-editorial flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section-spacing">
        <div className="container-editorial text-center space-y-6 py-20">
          <h1 className="text-foreground !text-3xl">Post Not Found</h1>
          <p className="text-muted-foreground">
            This post may have been removed or is no longer available.
          </p>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 label-text text-champagne hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </section>
    );
  }

  // Split content into paragraphs for rendering
  const contentParagraphs = post.content
    ? post.content.split(/\n\n+/).filter(Boolean)
    : null;

  return (
    <>
      {/* Back link */}
      <section className="pt-8 pb-0">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 label-text text-muted-foreground hover:text-champagne transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero */}
      <section className="section-spacing pb-0">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 label-text text-champagne">
                <Tag className="w-3.5 h-3.5" />
                {post.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>
            <h1 className="text-foreground">{post.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature image */}
      {imageUrl && (
        <section className="section-spacing pb-0">
          <div className="container-editorial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full aspect-[21/9] object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl mx-auto"
          >
            {contentParagraphs ? (
              <div className="space-y-6">
                {contentParagraphs.map((paragraph, i) => {
                  // Support markdown-style headings
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="font-display text-2xl text-foreground mt-10 mb-4"
                      >
                        {paragraph.slice(3)}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={i}
                        className="font-display text-xl text-foreground mt-8 mb-3"
                      >
                        {paragraph.slice(4)}
                      </h3>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-muted-foreground leading-[1.85] text-[1.05rem]"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-muted-foreground leading-[1.85] text-[1.05rem]">
                  {post.excerpt}
                </p>
                <p className="text-muted-foreground/60 italic text-sm">
                  Full article content coming soon.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h2 className="text-foreground">Inspired by this piece?</h2>
            <p className="text-muted-foreground text-lg">
              Let's turn that inspiration into your next project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 label-text text-champagne hover:text-foreground transition-colors duration-300"
            >
              Get in Touch <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default JournalPost;
