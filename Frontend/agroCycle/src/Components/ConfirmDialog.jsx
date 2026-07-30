import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  icon: Icon = LogOut,
  confirmColor = "red",
}) {
  const confirmButtonClasses =
    confirmColor === "green"
      ? "bg-green-600 hover:bg-green-700"
      : confirmColor === "blue"
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-red-600 hover:bg-red-700";

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
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            className="w-full max-w-sm rounded-2xl bg-white px-6 py-7 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Icon size={24} className="text-gray-700" />
            </div>

            {/* Title */}
            <h2
              id="confirm-dialog-title"
              className="mt-4 text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>

            {/* Message */}
            <p
              id="confirm-dialog-message"
              className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500"
            >
              {message}
            </p>

            {/* Buttons */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onConfirm}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${confirmButtonClasses}`}
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

export default ConfirmDialog;
