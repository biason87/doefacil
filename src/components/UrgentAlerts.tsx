/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { URGENT_NEEDS, CAMPAIGNS } from "../lib/constants";
import { AlertTriangle, Calendar, ArrowRight, Share2, Hospital } from "lucide-react";
import { firebaseService } from "../lib/firebaseService";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function UrgentAlerts() {
  const [urgentNeeds, setUrgentNeeds] = useState<any[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const alerts = await firebaseService.getUrgentAlerts();
        const camps = await firebaseService.getCampaigns();

        if (alerts && alerts.length > 0) {
          setUrgentNeeds(alerts);
        } else {
          setUrgentNeeds(URGENT_NEEDS);
          // Seed initial data
          URGENT_NEEDS.forEach(async (need) => {
            await addDoc(collection(db, 'urgent_alerts'), need);
          });
        }

        if (camps && camps.length > 0) {
          setActiveCampaigns(camps);
        } else {
          setActiveCampaigns(CAMPAIGNS);
          // Seed initial data
          CAMPAIGNS.forEach(async (camp) => {
            await addDoc(collection(db, 'campaigns'), camp);
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setUrgentNeeds(URGENT_NEEDS);
        setActiveCampaigns(CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 rounded-2xl">
          <AlertTriangle className="text-red-600" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas de Urgência</h1>
          <p className="text-gray-500 text-sm">Hospitais que precisam de você agora.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {urgentNeeds.map((need, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={need.id}
            className="bg-white border-2 border-red-50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-4 py-1.5 rounded-full text-white font-black text-lg shadow-sm ${
                    need.level === 'Crítico' ? 'bg-red-600' : 'bg-orange-500'
                  }`}>
                    {need.bloodType}
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    need.level === 'Crítico' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                  }`}>
                    {need.level}
                  </span>
                  <span className="text-gray-400 text-xs font-medium ml-1">Emergência</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Hospital size={20} className="text-red-600 shrink-0" />
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{need.hospital}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed max-w-lg">{need.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="flex-1 md:flex-none bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100 hover:shadow-red-200 active:scale-95">
                  Eu vou doar <ArrowRight size={18} />
                </button>
                <button className="p-3 bg-gray-50 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-gray-100 active:scale-95 group">
                  <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Calendar className="text-blue-600" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Campanhas Ativas</h1>
            <p className="text-gray-500 text-sm">Participe de eventos e ações coletivas.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {activeCampaigns.map((campaign, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={campaign.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                  {campaign.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors text-gray-900">{campaign.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{campaign.description}</p>
                <button className="mt-4 text-blue-600 font-bold flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
