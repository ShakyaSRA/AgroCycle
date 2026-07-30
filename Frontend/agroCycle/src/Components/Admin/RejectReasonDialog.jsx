import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

function RejectReasonDialog({
  open,
  title,
  message,
  reason,
  onReasonChange,
  onConfirm,
  onCancel,
  confirmText = "Reject",
  cancelText = "Cancel",
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-reason-dialog-title"
            aria-describedby="reject-reason-dialog-message"
            className="w-full max-w-lg rounded-2xl bg-white px-6 py-7 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={24} className="text-red-600" />
            </div>

            <h2
              id="reject-reason-dialog-title"
              className="mt-4 text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>

            <p
              id="reject-reason-dialog-message"
              className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500"
            >
              {message}
            </p>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => onReasonChange(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                placeholder="Explain why this listing is being rejected."
              />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onConfirm}
                disabled={!reason.trim()}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${
                  reason.trim()
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-400 cursor-not-allowed"
                }`}
              >
                {confirmText}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RejectReasonDialog;
