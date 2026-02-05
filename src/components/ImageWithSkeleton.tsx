 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Skeleton } from "@/components/ui/skeleton";
 
 interface ImageWithSkeletonProps {
   src: string;
   alt: string;
   className?: string;
   aspectRatio?: string;
 }
 
 const ImageWithSkeleton = ({
   src,
   alt,
   className = "",
   aspectRatio = "aspect-[4/5]",
 }: ImageWithSkeletonProps) => {
   const [isLoaded, setIsLoaded] = useState(false);
   const [hasError, setHasError] = useState(false);
 
   return (
     <div className={`relative overflow-hidden ${aspectRatio}`}>
       <AnimatePresence>
         {!isLoaded && !hasError && (
           <motion.div
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="absolute inset-0"
           >
             <Skeleton className="w-full h-full" />
             {/* Shimmer effect */}
             <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
           </motion.div>
         )}
       </AnimatePresence>
 
       <motion.img
         src={src}
         alt={alt}
         className={`w-full h-full object-cover ${className}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: isLoaded ? 1 : 0 }}
         transition={{ duration: 0.4 }}
         onLoad={() => setIsLoaded(true)}
         onError={() => setHasError(true)}
       />
 
       {hasError && (
         <div className="absolute inset-0 flex items-center justify-center bg-muted">
           <span className="text-sm text-muted-foreground">Failed to load</span>
         </div>
       )}
     </div>
   );
 };
 
 export default ImageWithSkeleton;