import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getFarmerRatings, rateFarmer } from "../../api/ratings";

function StarRow({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function FarmerRatingWidget({ farmerId }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!farmerId) return;
    setLoading(true);
    getFarmerRatings(farmerId)
      .then((res) => {
        setData(res);
        if (res.my_rating) {
          setSelected(res.my_rating.rating);
          setComment(res.my_rating.comment || "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [farmerId]);

  async function handleSubmit() {
    if (!selected) {
      showToast("Please select a star rating.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const myRating = await rateFarmer(farmerId, { rating: selected, comment });
      setData((prev) => {
        const others = (prev?.ratings || []).filter((r) => r.id !== myRating.id);
        const ratings = [myRating, ...others];
        const average =
          Math.round((ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) * 10) / 10;
        return { average, count: ratings.length, ratings, my_rating: myRating };
      });
      showToast(
        data?.my_rating ? "Your rating has been updated." : "Thanks for rating this farmer."
      );
    } catch (err) {
      showToast(err.response?.data?.message || "Could not submit rating.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!farmerId || loading) return null;

  const canRate = user?.role === "buyer" && user.id !== farmerId;

  return (
    <div className="mt-5 pt-5 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">Farmer Rating</h4>
        {data?.count > 0 ? (
          <div className="flex items-center gap-2">
            <StarRow value={data.average} />
            <span className="text-xs text-gray-500">
              {data.average} ({data.count})
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">No ratings yet</span>
        )}
      </div>

      {canRate && (
        <div className="mt-3 bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-2">
            {data?.my_rating ? "Update your rating" : "Rate this farmer"}
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSelected(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                className="cursor-pointer"
              >
                <Star
                  size={22}
                  className={
                    n <= (hovered || selected)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment (optional)"
            className="w-full mt-3 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 resize-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            {data?.my_rating ? "Update Rating" : "Submit Rating"}
          </button>
        </div>
      )}

      {data?.ratings?.length > 0 && (
        <ul className="mt-3 space-y-2.5 max-h-40 overflow-y-auto">
          {data.ratings.map((r) => (
            <li key={r.id} className="text-sm">
              <div className="flex items-center gap-2">
                <StarRow value={r.rating} size={13} />
                <span className="text-xs font-medium text-gray-700">
                  {r.buyer?.name || "Buyer"}
                </span>
              </div>
              {r.comment && <p className="text-xs text-gray-500 mt-0.5">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FarmerRatingWidget;
