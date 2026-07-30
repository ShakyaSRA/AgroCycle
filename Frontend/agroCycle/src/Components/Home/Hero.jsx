import logo from "../../assets/logo2.png";
import bgVideo from "../../assets/bg-video1.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sprout,
  Users,
  DollarSign,
  Leaf,
  TrendingUp,
  Recycle,
  Lightbulb,
  Wheat,
  Cherry,
  Shell,
} from "lucide-react";
import HowItworksCard from "./HowItworksCard";
import Choose from "./Choose";
import ReuseIdeas from "./ReuseIdeas";
import CommunityReuseIdeas from "./CommunityReuseIdeas";
import { staggerContainer } from "../../lib/motion";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  function handleAddWasteClick() {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "farmer") {
      navigate("/addwaste");
      return;
    }
    showToast("Only farmers can add waste listings.", "error");
    navigate(user.role === "admin" ? "/admin" : "/buyer");
  }

  return (
    <div>
      <section className="relative h-[95vh] min-h-[560px] flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 object-contain mx-auto"
          />
          <h1 className="text-4xl md:text-6xl font-semibold text-white mt-6 tracking-tight">
            AgroCycle
          </h1>
          <p className="text-gray-200 mt-3 font-medium text-lg">
            Turning Agricultural Waste into Value
          </p>
          <p className="text-gray-300 mt-5 text-base leading-relaxed max-w-lg mx-auto">
            Connect with buyers, recyclers, and eco-friendly product makers.
            Transform your agricultural waste into income while protecting the
            environment.
          </p>

          <div className="mt-9 flex justify-center gap-3">
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-sm font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors"
            >
              Get Started
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleAddWasteClick}
              className="bg-white/10 backdrop-blur border border-white/20 cursor-pointer text-white text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-white/20 transition-colors"
            >
              Add Waste
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            How It Works
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8"
        >
          <HowItworksCard
            icon={<Sprout size={40} />}
            number="1"
            title="Post Your Waste"
            description="List your agricultural waste with details about type, quantity, and location."
          />

          <HowItworksCard
            icon={<Users size={40} />}
            number="2"
            title="Connect with Buyers"
            description="Recyclers and eco-businesses can discover your listings and request pickup."
          />

          <HowItworksCard
            icon={<DollarSign size={40} />}
            number="3"
            title="Earn & Help Earth"
            description="Generate income from agricultural waste while supporting sustainability."
          />
        </motion.div>
      </section>

      <section className="bg-gray-50 py-24 px-6 border-y border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Why Choose AgroCycle?
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8"
        >
          <Choose
            icon={<Leaf size={40} />}
            title="Eco-Friendly"
            description="Reduce environmental pollution by converting waste into useful resources. Support sustainable agriculture."
          />

          <Choose
            icon={<TrendingUp size={40} />}
            title="Income Generation"
            description="Turn agricultural waste into an additional revenue stream. Every kilogram counts towards your earnings."
          />

          <Choose
            icon={<Recycle size={40} />}
            title="Circular Economy"
            description="Be part of the recycling movement. Help create a closed-loop system that benefits everyone."
          />
        </motion.div>
      </section>
      <section className="py-24 px-6 bg-white">
        <div className="bg-green-700 rounded-2xl p-12 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Ready To Get Started?
          </h2>

          <p className="text-green-50 mt-4 text-base leading-relaxed max-w-2xl mx-auto">
            Join thousands of farmers who are already making a difference while
            earning an extra income.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-white cursor-pointer text-green-700 text-sm font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 mx-auto mt-7 hover:bg-green-50 transition-colors"
          >
            Join Now
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
          <Lightbulb size={22} className="text-amber-600" />
        </div>

        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight text-center">
          Smart Reuse Ideas
        </h2>

        <p className="text-gray-500 mt-3 text-base text-center max-w-2xl mx-auto">
          Discover innovative ways to transform agricultural waste into valuable
          products
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
        >
          <ReuseIdeas
            icon={<Wheat size={40} />}
            title="Rice Husk"
            item1="Organic Fertilizer"
            item2="Fuel Briquettes"
            item3="Insulation Material"
            item4="Animal Bedding"
          />

          <ReuseIdeas
            icon={<Shell size={40} />}
            title="Coconut Shell"
            item1="Activated Charcoal"
            item2="Handicrafts"
            item3="Garden Mulch"
            item4="Biofuel"
          />

          <ReuseIdeas
            icon={<Wheat size={40} />}
            title="Wheat Straw"
            item1="Paper Production"
            item2="Animal Feed"
            item3="Biogas"
            item4="Mushroom Cultivation"
          />
          <ReuseIdeas
            icon={<Leaf size={40} />}
            title="Banana Leaves"
            item1="Biodegradable Plates"
            item2="Eco Packaging"
            item3="Compost"
            item4="Traditional Cooking"
          />

          <ReuseIdeas
            icon={<Cherry size={40} />}
            title="Sugarcane Bagasse"
            item1="Paper & Pulp"
            item2="Biofuel"
            item3="Building Boards"
            item4="Compost"
          />

          <ReuseIdeas
            icon={<Sprout size={40} />}
            title="Cotton Stalks"
            item1="Fuel Briquettes"
            item2="Compost"
            item3="Paper Production"
            item4="Particle Board"
          />
        </motion.div>
      </section>

      <CommunityReuseIdeas />

      <div className="bg-green-50 max-w-3xl mx-auto my-16 p-5 border border-green-100 rounded-xl">
        <p className="text-center text-gray-600 text-sm leading-relaxed">
          <span className="font-semibold text-gray-900">Did you know? </span>
          Agricultural waste can be transformed into biofuels, organic
          fertilizers, building materials, and eco-friendly products. Every
          kilogram of waste reused helps reduce carbon emissions and supports
          sustainable farming.
        </p>
      </div>
    </div>
  );
}

export default Hero;
