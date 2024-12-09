import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

function Swayam() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm; codecs=opus',
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleVoiceInput(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please enable microphone access to use this feature.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceInput = async (audioBlob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.ogg');

      const speechResponse = await fetch('http://localhost:5001/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      const speechData = await speechResponse.json();

      if (!speechData.malayalamText) {
        throw new Error('Speech-to-text conversion returned empty result');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: speechData.malayalamText,
        },
      ]);

      await sendMessageToAI(speechData.malayalamText);
    } catch (error) {
      console.error('Error processing voice input:', error.message);
      alert('Failed to process voice input. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToAI = async (message) => {
    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, needsMalayalamResponse: true }),
      });

      const chatData = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: chatData.malayalamText || chatData.englishText,
        },
      ]);
    } catch (error) {
      console.error('Error sending message to AI:', error.message);
      alert('Failed to process the message. Please try again.');
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userMessage },
      ]);

      await sendMessageToAI(userMessage);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to process the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[85vh]">
      {/* Left Side - Chat UI */}
      <div className="w-1/2 bg-white border-r p-6 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-grow bg-gray-50 rounded-xl mb-4 p-4 overflow-y-auto"
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Start a conversation in Malayalam or English!
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
                        : 'bg-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-xl ${isRecording ? 'bg-red-500' : 'bg-gray-100'}`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border rounded-lg px-3 py-2"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-[rgba(67,24,255,0.85)] text-white rounded-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <img
          src="https://thumbs.dreamstime.com/b/cute-ginger-kitten-blue-eyes-isolated-gray-background-ai-generated-design-instagram-facebook-wall-painting-animal-290678542.jpg"
          alt="AI Generated Animal"
          className="max-w-full max-h-[80%] object-contain"
        />
      </div>
    </div>
  );
}

export default Swayam;
