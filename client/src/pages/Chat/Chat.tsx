import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Message } from "server/src/routers/chats";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { getChat } from "../../modules/backend_functions";
import { auth } from "../../modules/firebase";
import { User } from "firebase/auth";

function getWS()
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        return "ws://localhost:8081"
    else 
        return "wss://motivibe.live"
}

function Chat() {
  const input = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [addMessage, setAddMessage] = useState<Message|null>(null)
  const id = useParams().id;
  const send = useRef((message: Message) => { console.log(message.message)})
  const nav = useNavigate();

  function recieve_message(message: Message, user: User) {
    if (message.user === user.displayName) {return;}
    console.log("raaaa", messages);
    // const new_messages = [...messages, message];
    setAddMessage(message)
    // setMessages(new_messages);
  }

  useEffect(() => {
    if (addMessage != null)
    {
      setMessages([...messages, addMessage]);
    }
  }, [addMessage])

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

      setMessages(chat.messages);
      const token = await user.getIdToken();

      const socket = io(getWS(), {
        auth: { token },
      });
      socket.connect();
      socket.on("connect", () => {
        socket.emit("join", chat._id);
      });
      socket.on("message", (message) => recieve_message(message, user));
      send.current = (message: Message) => socket.emit("message", message);
    });
  }, []);

  function send_message(e: React.MouseEvent)
  {
    e.preventDefault();

    if (input.current === null || !auth.currentUser?.displayName) return;

    const message = {
      timestamp: Math.floor(Date.now() / 1000),
      user: auth.currentUser?.displayName,
      message: input.current.value,
    };

    const new_messages = [...messages, message]
    console.log("wdawtf", messages, new_messages)

    setMessages(new_messages);

    send.current(message);
    input.current.value = "";
  }

  return (
    <div>
      <div>
        <h1 style={{fontSize:50}}>Chat</h1>
      </div>
      <div className="chatwindow">
        {messages.map((message, index) => (
          <p key={index}>
            {message.user}: {message.message}
          </p>
        ))}
      </div>
      <input ref={input} />
      <button onClick={send_message}>send</button>
    </div>
  );
}

export default Chat;
