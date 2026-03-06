import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    setSubscribing(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: trimmed });
    setSubscribing(false);
    if (error?.code === "23505") {
      toast({ title: "You're already subscribed!" });
    } else if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Welcome! You're now subscribed." });
      setEmail("");
    }
  };

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
                <Link key={post.id} to={`/journal/${post.id}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group flex flex-col overflow-hidden hover:bg-secondary transition-colors duration-300"
                >
                  {(post.image_url || fallbackImages[post.id]) && (
                    <div className="image-hover aspect-[16/9]">
                      <img
                        src={post.image_url || fallbackImages[post.id]}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="bg-secondary/50 group-hover:bg-secondary p-8 md:p-10 flex flex-col justify-between space-y-6 flex-1 transition-colors duration-300">
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
                  </div>
                </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-spacing">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center space-y-6"
          >
            <span className="label-text text-champagne">Stay Updated</span>
            <h2 className="text-foreground">Subscribe to the Journal</h2>
            <p className="text-muted-foreground">
              Receive studio notes on design trends, colour direction, and craft
              — delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={subscribing} variant="outline" className="gap-2">
                {subscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Subscribe
              </Button>
            </form>
          </motion.div>
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
