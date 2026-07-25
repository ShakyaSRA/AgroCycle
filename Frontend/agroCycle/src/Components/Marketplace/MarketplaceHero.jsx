import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function MarketplaceHero() {
  return (
    <section className="bg-gradient-to-br from-green-700 to-emerald-800 pt-24 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-white" size={28} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Waste Marketplace
        </h2>

        <p className="text-green-100 mt-4 text-lg leading-relaxed">
          Browse available agricultural waste and request pickup.
        </p>
      </motion.div>
    </section>
  );
}

export default MarketplaceHero;
