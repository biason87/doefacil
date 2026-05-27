/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import InteractiveMap from './components/InteractiveMap';
import UrgentAlerts from './components/UrgentAlerts';
import UserProfile from './components/UserProfile';
import Chatbot from './components/Chatbot';
import { motion, AnimatePresence } from 'motion/react';
import { GUIDE_FAQS } from './lib/constants';
import { ChevronRight, Info } from 'lucide-react';
import { firebaseService } from './lib/firebaseService';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await firebaseService.getFAQs('guide');
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(GUIDE_FAQS);
          // Seed if empty
          GUIDE_FAQS.forEach(async (faq) => {
            await addDoc(collection(db, 'faqs'), { ...faq, category: 'guide' });
          });
        }
      } catch (error) {
        setFaqs(GUIDE_FAQS);
      }
    }
    fetchFaqs();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'map':
        return <InteractiveMap />;
      case 'alerts':
        return <UrgentAlerts />;
      case 'info':
        return (
          <div className="p-6 max-w-3xl mx-auto pb-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-red-100 rounded-3xl">
                <Info className="text-red-600" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">Guia do Doador</h1>
                <p className="text-gray-500 font-medium">Tudo o que você precisa saber para salvar vidas.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Requisitos Básicos</h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Estar em boas condições de saúde.",
                    "Ter entre 16 e 69 anos (menores com autorização).",
                    "Pesar no mínimo 50kg.",
                    "Estar descansado (mínimo 6h de sono).",
                    "Estar alimentado (evitar alimentação gordurosa).",
                    "Apresentar documento original com foto."
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-2xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                      <span className="text-sm font-medium leading-tight">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold px-2 text-gray-900">Perguntas Frequentes</h2>
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-all hover:border-red-100">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-gray-800 hover:bg-gray-50 transition-colors">
                      <span className="pr-4">{faq.question}</span>
                      <ChevronRight size={20} className="text-red-400 group-open:rotate-90 group-open:text-red-600 transition-all" />
                    </summary>
                    <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>

              <div className="bg-red-50 rounded-[40px] p-10 border border-red-100">
                <h2 className="text-2xl font-black mb-8 text-red-900">O que impede a doação?</h2>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <p className="font-bold text-red-600 mb-4 uppercase tracking-[0.2em] text-[10px]">Impedimentos Temporários</p>
                    <ul className="space-y-3 text-red-900/80 font-medium">
                      <li className="flex items-center gap-2">• <span className="text-sm">Resfriado: aguardar 7 dias</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">Gravidez: 90 dias pós parto</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">Amamentação: aguardar 12 meses</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">Tatuagem: aguardar 12 meses</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-red-600 mb-4 uppercase tracking-[0.2em] text-[10px]">Impedimentos Definitivos</p>
                    <ul className="space-y-3 text-red-900/80 font-medium">
                      <li className="flex items-center gap-2">• <span className="text-sm">Hepatite após os 11 anos</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">Doença de Chagas</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">HIV (AIDS)</span></li>
                      <li className="flex items-center gap-2">• <span className="text-sm">Uso de drogas injetáveis</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <UserProfile />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white md:pt-16">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Chatbot />
    </div>
  );
}
