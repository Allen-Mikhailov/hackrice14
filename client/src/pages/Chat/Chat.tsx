import { useEffect, useRef, useState } from "react"
import "./Chat.css"
import { Chat as ChatType, Message } from "server/src/routers/chats";
import { auth } from "../../modules/firebase";
import { io } from "socket.io-client";
import { getStartingPoint } from "../../modules/backend_functions";
import { useNavigate, useParams } from "react-router-dom";
import { getChat } from "../../modules/backend_functions";

function Chat()
{
    const input = useRef<HTMLInputElement>(null);
    const [chat, setChat] = useState<ChatType | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const id = useParams().id;
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            setChat(await getChat(id));
            setMessages(chat?.messages || []);

            if(!chat) {
                nav("/");
                return;
            }

            const socket = io(`${getStartingPoint()}/chats/socket.io`, {
                auth: {
                    token: auth.currentUser?.getIdToken()
                }
            });
            socket.connect();
            socket.on("connect", async () => {
                socket.emit("join", chat?._id);
            });
        })();
    }, [id, chat?.messages]);
    
    return <div>
        <div>
            <h1>Chat Page</h1>
        </div>
        <div>
           {messages.map(message => <p key={message.timestamp} >{message.user}: {message.message}</p>)}
        </div>
        <input ref={input} />
        <button onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            if(input.current === null || !auth.currentUser?.displayName) return;

            setMessages([...messages, {
                timestamp: Math.floor(Date.now() / 1000),
                user: auth.currentUser?.displayName,
                message: input.current.value
            }]);
            input.current.value = "";
        }}>send</button>
    </div>
}

export default Chat