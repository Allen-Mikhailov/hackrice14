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
  const [chat, setChat] = useState<ChatType | null>(null);
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

      const _chat = await getChat(user, id)

      setChat(_chat);

      if (!_chat) {
        nav("/");
        return;
      }

      setMessages(_chat.messages || []);

      const socket = io(`${getStartingPoint()}/socket.io`, {
        auth: {
          token: auth.currentUser?.getIdToken(),
        },
      });
      socket.connect();
      socket.on("connect", () => {
        socket.emit("join", _chat._id);
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
