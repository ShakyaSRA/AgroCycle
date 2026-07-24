import logo from "../../assets/logo2.png";
import bgVideo from "../../assets/bg-video1.mp4";
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

function Hero() {
  return (
    <div>
      <section className="relative h-screen flex flex-col items-center justify-start pt-40 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto pt-0">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 object-contain mx-auto"
          />
          <h1 className="text-7xl font-bold text-white mt-4">AgroCycle</h1>
          <p className="text-gray-300 mt-4 font-medium text-2xl tracking-widest">
            Turning Agricultural Waste into Value
          </p>
          <div className="text-gray-200 mt-8 font-light text-xl tracking-wider">
            Connect with buyers, recyclers, and eco-friendly product makers.
            Transform your agricultural waste into income while protecting the
            environment.
          </div>

          <div className="mt-10 flex justify-center gap-6">
            <button className="bg-green-700 hover:bg-green-800 hover:scale-105 cursor-pointer text-white font-semibold py-2 px-4 rounded flex items-center gap-2 transition">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="bg-transparent border border-green-600 cursor-pointer text-green-500 font-semibold py-2 px-4 rounded hover:bg-green-700 hover:text-white hover:scale-105 transition">
              Add Waste
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
        </div>

        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-14">
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
        </div>
      </section>

      <section className="bg-green-50 py-20 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose AgroCycle?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-14">
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
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="bg-green-700 shadow-xl rounded-2xl p-10 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready To Get Started?
          </h2>

          <p className="text-white mt-6 font-light text-lg md:text-m tracking-wide leading-relaxed max-w-3xl mx-auto">
            Join thousands of farmers who are already making a difference while
            earning an extra income.
          </p>

          <button className="bg-white cursor-pointer text-green-700 font-semibold py-3 px-6 rounded-xl flex items-center gap-3 mx-auto mt-8 hover:scale-105 transition duration-300">
            Join Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center py-10 ">
        <div className="bg-yellow-100 w-18 h-18 rounded-full flex items-center justify-center mb-4">
          <Lightbulb size={35} />
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-black text-center">
          Smart Reuse Ideas
        </h2>

        <p className="text-gray-700 mt-4 text-lg tracking-wide text-center max-w-3xl mx-auto">
          Discover innovative ways to transform agricultural waste into valuable
          products
        </p>

        <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-14">
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
        </div>
      </section>
      <div className="bg-green-50 mx-150 my-10 p-4 border border-green-700/40 rounded-xl">
        <p className="text-center text-gray-700 text-md leading-relaxed  ">
          <b>Did you know? </b>Agricultural waste can be transformed into
          biofuels, organic fertilizers, building materials, and eco-friendly
          products. Every kilogram of waste reused helps reduce carbon emissions
          and supports sustainable farming.
        </p>
      </div>
    </div>
  );
}

export default Hero;
