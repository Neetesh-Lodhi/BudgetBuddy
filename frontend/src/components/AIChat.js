import { useState } from "react";
import API from "../api";

function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! Ask me anything about your inventory." },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await API.post("/ai/chat", { message: input });

      const aiReply = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error contacting AI assistant." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          💬 AI Chat
        </button>
      )}

      {/* Chat Drawer */}
      {open && (
        <div className="w-80 bg-white shadow-xl rounded-xl border flex flex-col">
          <div className="bg-indigo-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span>🤖 Inventory AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white font-bold"
            >
              ✕
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-3 text-sm flex-1 flex flex-col gap-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg max-w-[75%] break-words ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex border-t p-2 gap-2">
            <input
              className="flex-1 p-2 outline-none text-sm border rounded-md"
              placeholder="Ask inventory AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIChat;
