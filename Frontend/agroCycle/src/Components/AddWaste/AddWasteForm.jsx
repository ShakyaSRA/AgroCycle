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
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-5xl font-bold">
        {editId ? "Edit Waste Listing" : "Add Waste Listing"}
      </h1>

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

            <select
              name="category_id"
              required
              value={form.category_id}
              onChange={handleChange}
              className="ml-3 w-full outline-none bg-transparent"
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
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">
              Quantity <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
              <Hash className="text-gray-400" size={20} />
              <input
                type="number"
                name="quantity"
                min="0.01"
                step="0.01"
                required
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="ml-3 w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Unit</label>

            <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
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
          <label className="font-semibold">Price (LKR, optional)</label>

          <div className="flex items-center border rounded-xl mt-3 px-4 py-3">
            <DollarSign className="text-gray-400" size={20} />
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Leave blank if free / negotiable"
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
              name="location"
              required
              value={form.location}
              onChange={handleChange}
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
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Provide details about the waste condition, quality and any relevant information..."
              className="ml-3 w-full outline-none resize-none"
            />
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="font-semibold">Upload Images</label>

          <label className="mt-3 border-2 border-dashed rounded-2xl h-56 flex flex-col justify-center items-center text-gray-500 hover:border-green-500 transition cursor-pointer">
            <Upload size={44} />
            <p className="mt-4 text-lg">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, JPEG up to 5MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              className="hidden"
            />
          </label>

          {(existingImages.length > 0 || images.length > 0) && (
            <div className="flex flex-wrap gap-3 mt-4">
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
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/farmer")}
            className="px-8 py-3 border rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

          <motion.button
            whileHover={{ scale: submitting ? 1 : 1.03 }}
            whileTap={{ scale: submitting ? 1 : 0.97 }}
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60"
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
