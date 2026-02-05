import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "./ImageWithSkeleton";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Botanical Whisper",
    category: "Textile Print",
    image: portfolio1,
  },
  {
    id: "2",
    title: "Geometry in Gold",
    category: "Wallpaper",
    image: portfolio2,
  },
  {
    id: "3",
    title: "Heritage Bloom",
    category: "Fabric Pattern",
    image: portfolio3,
  },
  {
    id: "4",
    title: "Natural Weave",
    category: "Textile Print",
    image: portfolio4,
  },
  {
    id: "5",
    title: "Flowing Lines",
    category: "Wallpaper",
    image: portfolio5,
  },
  {
    id: "6",
    title: "Damask Revival",
    category: "Fabric Pattern",
    image: portfolio6,
  },
];

interface PortfolioGridProps {
  limit?: number;
  category?: string;
}

const PortfolioGrid = ({ limit, category }: PortfolioGridProps) => {
  let items = portfolioItems;
  
  if (category) {
    items = items.filter((item) => item.category === category);
  }
  
  if (limit) {
    items = items.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Link to="/portfolio" className="block">
            <div className="image-hover mb-4 bg-muted">
              <ImageWithSkeleton
                src={item.image}
                alt={item.title}
                aspectRatio="aspect-[4/5]"
              />
            </div>
            <div className="space-y-1">
              <span className="label-text text-muted-foreground">
                {item.category}
              </span>
              <h3 className="font-display text-lg text-foreground group-hover:text-champagne transition-colors duration-300">
                {item.title}
              </h3>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export { portfolioItems };
export default PortfolioGrid;
