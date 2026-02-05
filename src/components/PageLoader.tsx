 import { motion } from "framer-motion";
 
 const PageLoader = () => {
   return (
     <div className="min-h-[60vh] flex items-center justify-center">
       <motion.div
         className="flex flex-col items-center gap-6"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
       >
         {/* Spinner */}
         <div className="relative w-12 h-12">
           <motion.div
             className="absolute inset-0 border-2 border-champagne/20 rounded-full"
           />
           <motion.div
             className="absolute inset-0 border-2 border-transparent border-t-champagne rounded-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           />
         </div>
         
         {/* Loading text */}
         <p className="label-text text-muted-foreground">Loading...</p>
       </motion.div>
     </div>
   );
 };
 
 export default PageLoader;