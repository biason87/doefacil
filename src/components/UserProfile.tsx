/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Settings, History, Calendar, Heart, Award, LogOut, Camera, Save, X, LogIn } from "lucide-react";
import { BLOOD_TYPES } from "../lib/constants";
import { useAuth } from "../lib/AuthContext";
import { firebaseService } from "../lib/firebaseService";

export default function UserProfile() {
  const { user, loginWithGoogle, logout, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    bloodType: "O-",
    donationsCount: 5,
    lastDonation: "2026-01-12",
    nextDonation: "2026-05-12",
    photo: ""
  });

  const [editForm, setEditForm] = useState({ ...userData });

  useEffect(() => {
    if (user) {
      setProfileLoading(true);
      firebaseService.getProfile(user.uid).then((data: any) => {
        if (data) {
          setUserData(data);
          setEditForm(data);
        } else {
          // If no profile, use current (maybe from previous localStorage or default)
          const saved = localStorage.getItem("doeFacil_user_profile");
          if (saved) {
            try {
              const localData = JSON.parse(saved);
              setUserData(localData);
              setEditForm(localData);
              // Save to firestore for future
              firebaseService.saveProfile(user.uid, localData);
            } catch (e) {}
          } else {
            // Default data for new users
            const defaultData = {
              name: user.displayName || "Doador",
              email: user.email || "",
              bloodType: "O-",
              donationsCount: 0,
              lastDonation: "-",
              nextDonation: "-",
              photo: user.photoURL || ""
            };
            setUserData(defaultData);
            setEditForm(defaultData);
            firebaseService.saveProfile(user.uid, defaultData);
          }
        }
      }).finally(() => setProfileLoading(false));
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      await firebaseService.saveProfile(user.uid, editForm);
      setUserData(editForm);
      setIsEditing(false);
    } catch (e) {
      console.error("Save failed", e);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <Heart size={64} className="text-red-600 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Acesse Seu Perfil</h2>
        <p className="text-gray-500 mb-10 max-w-md">Para salvar suas informações e acompanhar suas doações de qualquer lugar, faça login na sua conta.</p>
        <button 
          onClick={loginWithGoogle}
          className="bg-red-600 text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-3 text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95"
        >
          <LogIn size={24} /> Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 max-w-4xl mx-auto pb-24 ${profileLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Profile Header */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden mb-8 transition-all">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-400 relative">
          <button 
            onClick={logout}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 left-8 border-4 border-white rounded-[32px] overflow-hidden shadow-xl bg-white">
            <div className="w-24 h-24 relative group">
              {editForm.photo || userData.photo ? (
                <img 
                  src={isEditing ? editForm.photo : userData.photo} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-600">
                  <User size={48} />
                </div>
              )}
              
              {isEditing && (
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              )}
            </div>
          </div>
          
          <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 uppercase">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-black bg-gray-50 border-none rounded-xl px-4 py-1 w-full focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Nome Completo"
                  />
                  <input 
                    type="email" 
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-500 bg-gray-50 border-none rounded-xl px-4 py-1 w-full focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Email"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-black text-gray-900">{userData.name}</h1>
                  <p className="text-gray-500 normal-case">{userData.email}</p>
                </>
              )}
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    disabled={profileLoading}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50"
                  >
                    <Save size={18} /> {profileLoading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setEditForm({ ...userData }); }}
                    className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-black transition-colors"
                >
                  <Settings size={18} /> Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl w-fit mb-4">
            <Heart size={24} />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Tipo Sanguíneo</p>
          {isEditing ? (
            <select 
              value={editForm.bloodType}
              onChange={(e) => setEditForm(prev => ({ ...prev, bloodType: e.target.value }))}
              className="text-2xl font-black text-red-600 bg-gray-50 border-none rounded-xl mt-1 w-full focus:ring-0 outline-none p-2"
            >
              {BLOOD_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          ) : (
            <p className="text-4xl font-black text-red-600 mt-1">{userData.bloodType}</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4">
            <Award size={24} />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Doações</p>
          {isEditing ? (
            <input 
              type="number"
              value={editForm.donationsCount}
              onChange={(e) => setEditForm(prev => ({ ...prev, donationsCount: parseInt(e.target.value) || 0 }))}
              className="text-2xl font-black text-gray-900 bg-gray-50 border-none rounded-xl mt-1 w-full focus:ring-2 focus:ring-red-500 outline-none p-2"
            />
          ) : (
            <p className="text-4xl font-black text-gray-900 mt-1">{userData.donationsCount}</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl w-fit mb-4">
              <Calendar size={24} />
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Próxima Doação</p>
            {isEditing ? (
              <input 
                type="text"
                value={editForm.nextDonation}
                onChange={(e) => setEditForm(prev => ({ ...prev, nextDonation: e.target.value }))}
                className="text-xl font-black text-gray-900 bg-gray-50 border-none rounded-xl mt-3 w-full focus:ring-2 focus:ring-red-500 outline-none p-2"
                placeholder="Ex: Maio, 2026"
              />
            ) : (
              <p className="text-xl font-black text-gray-900 mt-3 uppercase">{userData.nextDonation}</p>
            )}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="text-gray-400" /> Histórico de Doações
          </h3>
        </div>
        <div className="space-y-4">
          {userData.donationsCount > 0 ? (
            Array.from({ length: Math.min(userData.donationsCount, 3) }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-red-600 border border-gray-100">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm">Doação Registrada</p>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Histórico em processamento</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Concluído</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhuma doação registrada ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
