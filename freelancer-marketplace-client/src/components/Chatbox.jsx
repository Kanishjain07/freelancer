import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://freelancer-9826.vercel.app");

function ChatBox({ senderId, receiverId }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.receiverId === senderId || data.senderId === senderId) {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [senderId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", { senderId, receiverId, message });
    setChat((prev) => [...prev, { senderId, receiverId, message }]);
    setMessage("");
  };

  return (
    <div className="border p-4 rounded max-w-md mx-auto">
      <div className="h-64 overflow-y-scroll mb-2">
        {chat.map((msg, idx) => (
          <p key={idx} className={msg.senderId === senderId ? "text-right" : "text-left"}>
            <span className="bg-blue-100 inline-block p-1 rounded">{msg.message}</span>
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border p-2 rounded-l"
          placeholder="Type message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
