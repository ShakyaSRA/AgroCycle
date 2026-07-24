function Choose({ icon, title, description }) {
  return (
    <div className="border border-none shadow-md p-6 rounded-2xl w-full max-w-sm m-4 hover:shadow-xl transition duration-300 bg-white">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 hover:bg-green-200 transition duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 hover:text-green-700 transition duration-300">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>
    </div>
  );
}

export default Choose;
