/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Droplets, MapPin, Bell, User, Info, Settings } from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const items = [
    { id: 'home', label: 'Início', icon: Droplets },
    { id: 'map', label: 'Onde Doar', icon: MapPin },
    { id: 'alerts', label: 'Urgências', icon: Bell },
    { id: 'info', label: 'Dúvidas', icon: Info },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-red-600 font-bold text-xl cursor-pointer min-w-[150px]" onClick={() => onNavigate('home')}>
          <Droplets className="fill-current" />
          <span>DoeFácil</span>
        </div>
        
        <div className="flex-1 flex justify-around md:justify-center gap-6 md:gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentPage === item.id ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <item.icon size={22} strokeWidth={currentPage === item.id ? 2.5 : 2} />
              <span className="text-[10px] uppercase font-semibold tracking-wider md:text-sm md:capitalize">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex justify-end min-w-[150px]">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Configurações"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
