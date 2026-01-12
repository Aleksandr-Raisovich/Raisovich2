import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Loader2, Cpu, User } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToAgent } from '../services/api';

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Привет! Я ИИ-ассистент Технопарк. Введите артикул или название запчасти, и я помогу вам найти её наличие и цену.',
      timestamp: new Date()
    }
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToAgent(userMsg.content);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Ошибка соединения. Попробуйте еще раз.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-auto backdrop-blur-md bg-black/40 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative z-10 mb-20">

      {/* Header of Chat */}
      <div className="bg-zinc-900/80 p-4 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Поиск запчастей</h3>
            <p className="text-xs text-zinc-400">Powered by AI & N8N</p>
          </div>
        </div>
      </div>

      {/* Input Area (Now at the top) */}
      <div className="p-4 bg-zinc-900/80 border-b border-zinc-700">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите OEM номер или название (напр. 1R-0739)..."
            className="w-full bg-black/50 border border-zinc-600 rounded-xl py-4 pl-12 pr-14 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>

      {/* Messages Area (Now follows content length) */}
      <div
        ref={messagesContainerRef}
        className="p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user'
              ? 'bg-orange-600 text-white rounded-br-none'
              : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'assistant' ? <Cpu size={14} className="opacity-50" /> : <User size={14} className="opacity-50" />}
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-50">
                  {msg.role === 'user' ? 'Вы' : 'Технопарк AI'}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-400 rounded-2xl rounded-bl-none p-4 flex items-center gap-2 border border-zinc-700">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">Анализирую склад...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;