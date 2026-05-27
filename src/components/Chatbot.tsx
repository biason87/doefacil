/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot, Loader2, ChevronRight, Droplets } from 'lucide-react';
import { CHAT_FAQS } from '../lib/constants';
import { askDoeFacil } from '../lib/ai';
import { motion, AnimatePresence } from 'motion/react';
import { firebaseService } from '../lib/firebaseService';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Custom Firefighter Hero Icon using the provided image
const FirefighterBotIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <img 
      src="/chatbot-hero.png" 
      alt="Herói DoeFácil" 
      className="w-full h-full object-contain rounded-full bg-white"
      onError={(e) => {
        // Fallback if image doesn't exist yet
        e.currentTarget.src = "https://api.dicebear.com/7.x/bottts/svg?seed=Lucky&backgroundColor=ef4444";
      }}
    />
  </div>
);

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Olá! Sou o Herói DoeFácil, seu assistente bombeiro da doação. Como posso proteger vidas com você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usedFaqs, setUsedFaqs] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await firebaseService.getFAQs('chat');
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(CHAT_FAQS);
          // Seed if empty
          CHAT_FAQS.forEach(async (faq) => {
            await addDoc(collection(db, 'faqs'), { ...faq, category: 'chat' });
          });
        }
      } catch (error) {
        setFaqs(CHAT_FAQS);
      }
    }
    fetchFaqs();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // If the manual text matches a FAQ, mark it as used
    if (faqs.some(faq => faq.question.toLowerCase() === text.trim().toLowerCase())) {
      setUsedFaqs(prev => [...prev, text.trim()]);
    }

    const response = await askDoeFacil(text);
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: response || 'Desculpe, tive um problema ao processar seu pedido.' };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleFaqClick = (faq: any) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: faq.question };
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: faq.answer };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setUsedFaqs(prev => [...prev, faq.question]);
  };

  const availableFaqs = faqs.filter(faq => !usedFaqs.includes(faq.question));

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 md:bottom-10 md:right-10 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageSquare className="group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-10 md:w-[400px] md:h-[600px] bg-white z-50 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-red-600 p-6 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-xl">
                  <FirefighterBotIcon size={32} />
                </div>
                <div>
                  <h3 className="font-bold">Herói DoeFácil</h3>
                  <p className="text-xs text-red-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online agora
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-1 rounded-full h-fit flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-red-50 text-red-600' : 'bg-red-100 text-red-600'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <FirefighterBotIcon size={18} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none shadow-md' : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-red-600" />
                    <span className="text-sm text-gray-500 italic">Digitando...</span>
                  </div>
                </div>
              )}

              {!isLoading && availableFaqs.length > 0 && (
                <div className="pt-4 space-y-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 px-2 tracking-wider">Sugestões de Perguntas</p>
                  {availableFaqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleFaqClick(faq)}
                      className="w-full text-left p-3 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 hover:border-red-200 hover:bg-red-50 transition-all flex justify-between items-center group shadow-sm"
                    >
                      {faq.question}
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-red-400 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-4 bg-white border-t border-gray-100 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tire sua dúvida aqui..."
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
