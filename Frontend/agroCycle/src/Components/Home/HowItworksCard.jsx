function HowItworksCard({ icon, number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 hover:bg-green-200">
        {icon}
      </div>

      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mt-6">
        {number}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 hover-green-700">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>
    </div>
  );
}

export default HowItworksCard;
