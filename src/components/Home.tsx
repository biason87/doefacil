/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Droplets, Heart, MapPin, ShieldCheck, Zap } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-red-600 font-bold mb-4 justify-center md:justify-start">
              <Droplets className="animate-bounce" />
              <span className="uppercase tracking-widest text-sm">Simplificando a Doação</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Uma doação,<br/>
              <span className="text-red-600">quatro vidas</span> salvas.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Nossa missão é facilitar sua jornada como doador. Encontre onde doar, desmistifique medos e atenda pedidos urgentes perto de você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate('map')}
                className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-200 flex items-center justify-center gap-2"
              >
                Começar agora <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate('info')}
                className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Tirar dúvidas
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative px-4"
          >
            <div className="relative">
              <img 
                src="/images/regenerated_image_1777554981194.png" 
                alt="Donation Hero" 
                className="rounded-[40px] shadow-2xl h-[500px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl animate-pulse border border-gray-50">
                <Heart className="text-red-600 mb-2 fill-current" size={32} />
                <p className="font-bold text-gray-900">12.5k</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Vidas Salvas este mês</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Por que doar pelo DoeFácil?</h2>
          <p className="text-gray-500">Transformamos dados em esperança através da tecnologia.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: "Alertas em Tempo Real", 
              desc: "Receba notificações quando hospitais da sua região precisarem urgentemente do seu tipo sanguíneo.",
              color: "bg-blue-100 text-blue-600" 
            },
            { 
              icon: MapPin, 
              title: "Mapa Interativo", 
              desc: "Encontre o hemocentro mais próximo e trace rotas automáticas integradas com GPS.",
              color: "bg-red-100 text-red-600" 
            },
            { 
              icon: ShieldCheck, 
              title: "Informação Confiável", 
              desc: "Tire dúvidas com nossa IA treinada e acesse guias completos de pré-requisitos antes de sair de casa.",
              color: "bg-green-100 text-green-600" 
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto bg-red-600 rounded-[48px] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Agende sua primeira doação hoje.</h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Doe sangue. Se você não puder, doe seu tempo compartilhando a causa. Juntos somos mais fortes.
          </p>
          <button 
            onClick={() => onNavigate('map')}
            className="bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all relative z-10 shadow-2xl shadow-red-900/50"
          >
            Ver Pontos Próximos
          </button>
        </div>
      </section>
    </div>
  );
}
