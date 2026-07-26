import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function MarketplaceHero() {
  return (
    <section className="bg-green-700 pt-20 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-white" size={22} />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          Waste Marketplace
        </h2>

        <p className="text-green-100 mt-3 text-sm leading-relaxed">
          Browse available agricultural waste and request pickup.
        </p>
      </motion.div>
    </section>
  );
}

export default MarketplaceHero;
