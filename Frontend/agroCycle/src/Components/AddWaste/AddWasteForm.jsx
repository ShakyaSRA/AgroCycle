import { Box, Hash, MapPin, FileText, Upload } from "lucide-react";

function AddWasteForm() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold">Add Waste Listing</h1>

      <p className="text-gray-600 mt-3">
        Post your agricultural waste to connect with buyers and recyclers
      </p>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10 space-y-8">
        {/* Waste Type */}

        <div>
          <label className="font-semibold">
            Waste Type <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
            <Box className="text-gray-400" size={20} />

            <select className="ml-3 w-full outline-none bg-transparent">
              <option>Select waste type</option>
              <option>Rice Husk</option>
              <option>Coconut Shell</option>
              <option>Wheat Straw</option>
              <option>Banana Leaves</option>
              <option>Sugarcane Bagasse</option>
            </select>
          </div>
        </div>

        {/* Quantity */}

        <div>
          <label className="font-semibold">
            Quantity (kg) <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
            <Hash className="text-gray-400" size={20} />

            <input
              type="number"
              placeholder="e.g. 500"
              className="ml-3 w-full outline-none"
            />
          </div>
        </div>

        {/* Location */}

        <div>
          <label className="font-semibold">
            Location <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
            <MapPin className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="e.g. Kandy, Sri Lanka"
              className="ml-3 w-full outline-none"
            />
          </div>
        </div>

        {/* Description */}

        <div>
          <label className="font-semibold">Description</label>

          <div className="flex border rounded-xl mt-3 px-4 py-3">
            <FileText className="text-gray-400 mt-1" size={20} />

            <textarea
              rows={5}
              placeholder="Provide details about the waste condition, quality and any relevant information..."
              className="ml-3 w-full outline-none resize-none"
            />
          </div>
        </div>

        {/* Upload */}

        <div>
          <label className="font-semibold">Upload Images</label>

          <div className="mt-3 border-2 border-dashed rounded-2xl h-72 flex flex-col justify-center items-center text-gray-500 hover:border-green-500 transition">
            <Upload size={50} />

            <p className="mt-4 text-lg">Click to upload or drag & drop</p>

            <p className="text-sm">PNG, JPG, JPEG up to 10MB</p>

            <input type="file" multiple className="hidden" />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button className="px-8 py-3 border rounded-xl hover:bg-gray-100">
            Cancel
          </button>

          <button className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWasteForm;
