import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

function Swayam() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[85vh]">
      {/* Left side - Chat UI */}
      <div className="w-1/2 bg-white border-r p-6 flex flex-col">
        {/* Chat messages area */}
        <div 
          ref={chatContainerRef}
          className="flex-grow bg-gray-50 rounded-xl mb-4 p-4 overflow-y-auto"
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No messages yet. Start a conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-[rgba(67,24,255,0.85)] text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm rounded-xl px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat input area */}
        <div className="flex gap-2">
          <div className="flex-grow border rounded-xl flex items-center p-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 focus:outline-none"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Send className="h-5 w-5 text-[rgba(67,24,255,0.85)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Media content */}
      <div className="w-1/2 bg-white p-6 flex items-center">
        <div className="w-full space-y-8">
          <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://img.freepik.com/premium-photo/cartoon-character-with-brown-eyes-brown-hair_978914-10471.jpg"
              // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQqjN_wAk70GnPzMdkb_h1Ls2SI5R0vxAoQ&s'
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden bg-gray-50 shadow-lg flex items-center justify-center">
            <p className="text-gray-400">Video placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swayam;