import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
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
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <h1 className="text-5xl font-bold">Messages</h1>
          <p className="text-gray-600 mt-2">
            Chat with farmers and buyers about your listings
          </p>

          <div className="grid md:grid-cols-3 mt-10 bg-white rounded-2xl shadow overflow-hidden min-h-[520px]">
            <div className="border-r flex flex-col">
              <h2 className="text-xl font-bold p-4 border-b">Conversations</h2>

              {loadingConversations ? (
                <p className="text-gray-500 p-4">Loading...</p>
              ) : conversations.length === 0 ? (
                <p className="text-gray-500 p-4">No conversations yet.</p>
              ) : (
                <ul className="overflow-y-auto">
                  {conversations.map((c) => (
                    <li key={c.user.id}>
                      <button
                        onClick={() => navigate(`/messages/${c.user.id}`)}
                        className={`w-full text-left px-4 py-4 border-b hover:bg-gray-50 transition ${
                          String(c.user.id) === userId ? "bg-green-50" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{c.user.name}</span>
                          {c.unread_count > 0 && (
                            <span className="bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                              {c.unread_count}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm truncate mt-1">
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
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a conversation to start chatting
                </div>
              ) : (
                <>
                  <div className="p-4 border-b font-semibold">
                    {activeUser?.name || "New conversation"}
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
                    {thread.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
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
                    className="p-4 border-t flex gap-3"
                  >
                    <input
                      type="text"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-green-600 text-white px-5 rounded-xl hover:bg-green-700 flex items-center gap-2"
                    >
                      <Send size={16} />
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Messages;
