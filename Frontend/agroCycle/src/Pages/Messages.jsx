import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import DashboardLayout from "../Components/DashboardLayout";
import { getConversations, getThread, sendMessage } from "../api/messages";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Messages() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [conversations, setConversations] = useState([]);
  const [thread, setThread] = useState([]);
  const [body, setBody] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const bottomRef = useRef(null);

  const loadConversations = useCallback(() => {
    getConversations()
      .then(setConversations)
      .catch(() => {})
      .finally(() => setLoadingConversations(false));
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const loadThread = useCallback(() => {
    if (!userId) return;
    getThread(userId)
      .then(setThread)
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    loadThread();
    const interval = setInterval(loadThread, 4000);
    return () => clearInterval(interval);
  }, [userId, loadThread]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  async function handleSend(e) {
    e.preventDefault();
    if (!body.trim()) return;
    try {
      await sendMessage({ receiver_id: userId, body });
      setBody("");
      loadThread();
      loadConversations();
    } catch {
      showToast("Could not send message.", "error");
    }
  }

  const activeUser = conversations.find(
    (c) => String(c.user.id) === userId
  )?.user;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">
          Chat with farmers and buyers about your listings
        </p>

        <div className="grid md:grid-cols-3 mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[520px]">
          <div className="border-r border-gray-200 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900 p-4 border-b border-gray-200">Conversations</h2>

            {loadingConversations ? (
              <p className="text-gray-500 text-sm p-4">Loading...</p>
            ) : conversations.length === 0 ? (
              <p className="text-gray-500 text-sm p-4">No conversations yet.</p>
            ) : (
              <ul className="overflow-y-auto">
                {conversations.map((c) => (
                  <li key={c.user.id}>
                    <button
                      onClick={() => navigate(`/messages/${c.user.id}`)}
                      className={`w-full text-left px-4 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        String(c.user.id) === userId ? "bg-green-50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm text-gray-900">{c.user.name}</span>
                        {c.unread_count > 0 && (
                          <span className="bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                            {c.unread_count}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-1">
                        {c.last_message}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col">
            {!userId ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Select a conversation to start chatting
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-gray-200 font-medium text-sm text-gray-900">
                  {activeUser?.name || "New conversation"}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
                  {thread.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`max-w-[70%] px-3.5 py-2 rounded-xl text-sm ${
                        m.sender_id === user.id
                          ? "bg-green-600 text-white ml-auto"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {m.body}
                    </motion.div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                <form
                  onSubmit={handleSend}
                  className="p-4 border-t border-gray-200 flex gap-2.5"
                >
                  <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Send size={15} />
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Messages;
