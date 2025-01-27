import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const user = useSelector(store => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        try {
            const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
                withCredentials: true,
            });



            const chatMessages = chat?.data?.messages?.map((msg) =>
            ({
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text: msg?.text,
            })) || [];

            setMessages(chatMessages);
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
            setMessages([]);
        }
    };

    useEffect(() => {
        fetchChatMessages();
    }, [targetUserId]);

    useEffect(() => {
        if (!userId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        newSocket.on("connect", () => {
        });

        newSocket.emit("joinChat", {
            firstName: user?.firstName,
            userId,
            targetUserId,
        });

        newSocket.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessages((prevMessages) => [...prevMessages, { firstName, lastName, text }]);
        });

        newSocket.on("disconnect", () => {
            console.warn("Socket disconnected");
        });

        return () => {
            newSocket.disconnect();
        };
    }, [userId, targetUserId]);


    const sendMessage = () => {
        if (!socket || !newMessage.trim()) {
            console.warn("Cannot send message: Socket not connected or message is empty");
            return;
        }
        socket.emit("sendMessage", {
            firstName: user?.firstName,
            lastName: user?.lastName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mt-10 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-700 text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800">
                Chat
            </h1>

            <div className="flex-1 overflow-y-auto p-5 bg-gray-900 text-white custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={"chat " + (user?.firstName === msg?.firstName ? "chat-end" : "chat-start")}>
                        <div className="chat-header">
                            {`${msg.firstName}  ${msg.lastName}`}
                            <time className="text-xs opacity-50 m-2">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-800 flex items-center space-x-3">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;