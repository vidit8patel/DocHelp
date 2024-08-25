import React, { useState, useEffect, useRef } from 'react';

const parseMessageContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
        if (line.startsWith('###')) {
            return <h3 key={index} className="text-lg font-semibold">{line.substring(3).trim()}</h3>;
        } else if (line.startsWith('##')) {
            return <h2 key={index} className="text-xl font-bold">{line.substring(2).trim()}</h2>;
        } else if (line.startsWith('#')) {
            return <h1 key={index} className="text-2xl font-extrabold">{line.substring(1).trim()}</h1>;
        } else if (line.startsWith('-')) {
            const parts = line.substring(1).trim().split(/(\*\*.*?\*\*)/g);
            return (
                <li key={index} className="ml-4 list-disc">
                    {parts.map((part, i) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={i}>{part.substring(2, part.length - 2)}</strong>
                        ) : (
                            part
                        )
                    )}
                </li>
            );
        } else {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={index}>
                    {parts.map((part, i) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={i}>{part.substring(2, part.length - 2)}</strong>
                        ) : (
                            part
                        )
                    )}
                </p>
            );
        }
    });
};

const Chat = ({ messages, onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-screen p-4 items-center">
            <h1 className=" mb-4 text-4xl font-bold bg-gradient-to-r from-red-600 via-brown-500 to-indigo-400 inline-block text-transparent bg-clip-text">DocHelp</h1>
            <div className="flex-grow overflow-y-auto w-full max-w-3xl p-6 rounded-lg border">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 p-3 rounded-lg ${msg.role === 'user'
                            ? 'bg-indigo-500 text-white self-end'
                            : 'bg-white border border-gray-300 self-start'
                            }`}
                    >
                        <div className="whitespace-pre-wrap">
                            {parseMessageContent(msg.text)}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-4 flex w-full max-w-3xl">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-grow p-3 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-indigo-500 text-white px-6 py-3 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
