// Fix: Implement the AI Assistant component using Gemini API for a conversational chat experience.
import React, { useState, useRef, useEffect } from 'react';
// Fix: Use correct import for GoogleGenAI and Chat from @google/genai.
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize chat session
  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are a helpful and friendly AI assistant for students preparing for Indian government exams. Provide clear, concise, and accurate answers related to their queries. Format your answers for readability.',
        },
      });
    } catch (err) {
      console.error("Failed to initialize AI Assistant:", err);
      setError("Could not initialize AI Assistant. Please check your API key and refresh the page.");
    }
  }, []);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading || !chatRef.current) return;

    const currentPrompt = prompt;
    setLoading(true);
    setError(null);
    setPrompt('');

    // Add user message to state
    setMessages(prev => [...prev, { role: 'user', text: currentPrompt }]);

    try {
      const chat = chatRef.current;
      const result = await chat.sendMessageStream({ message: currentPrompt });

      let text = '';
      let modelMessageAdded = false;

      for await (const chunk of result) {
        text += chunk.text;

        if (!modelMessageAdded) {
          // Add a new model message entry once we get the first chunk
          setMessages(prev => [...prev, { role: 'model', text }]);
          modelMessageAdded = true;
        } else {
          // Update the last message (which is the model's) with the new text
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = text;
            return newMessages;
          });
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage = 'Sorry, something went wrong. Please try again.';
      setError(errorMessage);
      // Add an error message to the chat
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };
  
  const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  );

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">AI Assistant</h2>
          <p className="text-slate-600 text-center mb-6">Have a question? Ask our AI for help with your exam prep!</p>

          <div className="h-96 overflow-y-auto p-4 bg-slate-50 rounded-lg mb-4 border border-slate-200 space-y-4">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-slate-500">No messages yet. Ask something to start!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex my-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-lg max-w-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                    <div style={{whiteSpace: 'pre-wrap'}}>{msg.text}</div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && !loading && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={loading}
              onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                      handleSubmit(e as any);
                  }
              }}
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center w-28"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-dashed rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center">
                  Send <SendIcon />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
