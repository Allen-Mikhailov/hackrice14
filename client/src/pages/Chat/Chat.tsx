import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Chat as ChatType, Message } from "server/src/routers/chats";
import { io } from "socket.io-client";
import { getStartingPoint } from "../../modules/backend_functions";
import { useNavigate, useParams } from "react-router-dom";
import { getChat } from "../../modules/backend_functions";
import { auth } from "../../modules/firebase";

function Chat() {
  const input = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const id = useParams().id;
  const send = useRef((message: Message) => { console.log(message.message)})

  const nav = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        nav("/");
        return;
      }

      const chat = await getChat(user, id);

      if (!chat) {
        nav("/");
        return;
      }

      setMessages(chat.messages || []);
      const token = await user.getIdToken();
      console.log(token);

      const socket = io(`ws://localhost:8081`, {
        auth: { token },
      });
      socket.connect();
      socket.on("connect", () => {
        socket.emit("join", chat._id);
      });
      socket.on("message", (message: Message) => {
        setMessages([...messages, message]);
      });
      send.current = (message: Message) => {
        socket.emit("message", message);
      }
    });
  }, []);

  return (
    <div>
      <div>
        <h1>Chat Page</h1>
      </div>
      <div>
        {messages.map((message) => (
          <p key={message.timestamp}>
            {message.user}: {message.message}
          </p>
        ))}
      </div>
      <input ref={input} />
      <button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (input.current === null || !auth.currentUser?.displayName) return;

          const message = {
            timestamp: Math.floor(Date.now() / 1000),
            user: auth.currentUser?.displayName,
            message: input.current.value,
          };

          setMessages([
            ...messages,
            message
          ]);

          send.current(message);
          input.current.value = "";
        }}
      >send</button>
    </div>
  );
}

export default Chat;
