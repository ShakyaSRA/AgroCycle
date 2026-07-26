import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Hash,
  MapPin,
  FileText,
  Upload,
  DollarSign,
  X,
} from "lucide-react";
import { getCategories } from "../../api/categories";
import { createListing, updateListing, getListing } from "../../api/listings";
import { API_URL } from "../../api/client";
import { useToast } from "../../context/ToastContext";

function AddWasteForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category_id: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!editId) return;
    getListing(editId)
      .then((listing) => {
        setForm({
          category_id: String(listing.category_id),
          quantity: listing.quantity,
          unit: listing.unit,
          price: listing.price ?? "",
          location: listing.location,
          description: listing.description,
        });
        setExistingImages(listing.images || []);
      })
      .catch(() => showToast("Could not load listing.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFiles(e) {
    setImages([...images, ...Array.from(e.target.files)]);
  }

  function removeImage(index) {
    setImages(images.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("category_id", form.category_id);
    data.append("quantity", form.quantity);
    data.append("unit", form.unit);
    if (form.price !== "") data.append("price", form.price);
    data.append("location", form.location);
    data.append("description", form.description);
    images.forEach((file) => data.append("images[]", file));

    try {
      if (editId) {
        await updateListing(editId, data);
        showToast("Listing updated and sent for re-review.");
      } else {
        await createListing(data);
        showToast("Listing submitted for admin review.");
      }
      navigate("/farmer");
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = errors
        ? Object.values(errors)[0][0]
        : "Could not save listing. Please check the form.";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-gray-500 text-center py-20">
        Loading listing...
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
        {editId ? "Edit Waste Listing" : "Add Waste Listing"}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Post your agricultural waste to connect with buyers and recyclers
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6 space-y-6">
        {/* Waste Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Waste Type <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <Box className="text-gray-400" size={17} />

            <select
              name="category_id"
              required
              value={form.category_id}
              onChange={handleChange}
              className="ml-2.5 w-full outline-none bg-transparent text-sm"
            >
              <option value="">Select waste type</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity + Unit */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
              <Hash className="text-gray-400" size={17} />
              <input
                type="number"
                name="quantity"
                min="0.01"
                step="0.01"
                required
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="ml-2.5 w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Unit</label>

            <div className="flex items-center border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-sm"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="bags">bags</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-gray-700">Price (LKR, optional)</label>

          <div className="flex items-center border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <DollarSign className="text-gray-400" size={17} />
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Leave blank if free / negotiable"
              className="ml-2.5 w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <MapPin className="text-gray-400" size={17} />
            <input
              type="text"
              name="location"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Kandy, Sri Lanka"
              className="ml-2.5 w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>

          <div className="flex border border-gray-300 rounded-lg mt-2 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <FileText className="text-gray-400 mt-1" size={17} />
            <textarea
              rows={5}
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Provide details about the waste condition, quality and any relevant information..."
              className="ml-2.5 w-full outline-none resize-none text-sm"
            />
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">Upload Images</label>

          <label className="mt-2 border-2 border-dashed border-gray-300 rounded-xl h-44 flex flex-col justify-center items-center text-gray-500 hover:border-green-500 hover:bg-green-50/30 transition-colors cursor-pointer">
            <Upload size={32} className="text-gray-400" />
            <p className="mt-3 text-sm font-medium text-gray-600">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              className="hidden"
            />
          </label>

          {(existingImages.length > 0 || images.length > 0) && (
            <div className="flex flex-wrap gap-2.5 mt-4">
              {existingImages.map((img) => (
                <img
                  key={img.id}
                  src={`${API_URL}/storage/${img.image_path}`}
                  alt="Uploaded waste"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
              {images.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Selected upload"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/farmer")}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <motion.button
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            {submitting
              ? "Saving..."
              : editId
              ? "Save Changes"
              : "Publish Listing"}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}

export default AddWasteForm;
