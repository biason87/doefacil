import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { DONATION_POINTS } from '../lib/constants';
import { MapPin, Navigation, Phone, LocateFixed } from 'lucide-react';
import { useState, useEffect } from 'react';

// Fix for default marker icons in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Override the default Leaflet icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    // Force a resize to fix "corrupted" display issues on first load
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap() {
  const sorocabaCenter: [number, number] = [-23.5015, -47.4526];
  const [center, setCenter] = useState<[number, number]>(sorocabaCenter);
  const [zoom, setZoom] = useState(13);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    handleLocateUser(false); // Silent location check on mount
  }, []);

  const handleLocateUser = (pan = true) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(loc);
        if (pan) {
          setCenter(loc);
          setZoom(15);
        }
      }, (err) => {
        console.log("Geo error:", err);
      });
    }
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] w-full relative overflow-hidden bg-gray-100">
      <div className="absolute top-4 left-4 right-4 z-20 md:left-20 md:right-auto md:w-80">
        <div className="bg-white/95 backdrop-blur shadow-2xl rounded-[32px] p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-xl flex items-center gap-2 text-gray-900">
              <MapPin className="text-red-600" />
              Onde Doar
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => handleLocateUser(true)}
                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                title="Minha Localização"
              >
                <LocateFixed size={20} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {DONATION_POINTS.map((point) => (
              <div 
                key={point.id} 
                className={`p-4 border rounded-2xl cursor-pointer transition-all group ${
                  center[0] === point.lat && center[1] === point.lng
                    ? 'border-red-600 bg-red-50/50 shadow-sm' 
                    : 'border-gray-100 bg-white hover:border-red-200'
                }`}
                onClick={() => {
                  setCenter([point.lat, point.lng]);
                  setZoom(15);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors">{point.name}</h3>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
                    point.status.includes('Crítico') || point.status.includes('Urgente') 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {point.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{point.address}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); openInGoogleMaps(point.lat, point.lng); }}
                    className="flex-1 text-[10px] flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <Navigation size={12} /> Ver Rota
                  </button>
                  <a 
                    href={`tel:${point.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Phone size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MapContainer 
        key="sorocaba-map"
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ChangeView center={center} zoom={zoom} />
        
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="p-1 font-bold text-gray-900">Você está aqui</div>
            </Popup>
          </Marker>
        )}

        {DONATION_POINTS.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]}>
            <Popup>
              <div className="p-3 min-w-[220px]">
                <h3 className="font-black text-red-600 text-base mb-1">{point.name}</h3>
                <p className="text-xs text-gray-500 leading-tight mb-3">{point.address}</p>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Status do Estoque</p>
                  <p className={`text-sm font-bold ${
                    point.status.includes('Crítico') || point.status.includes('Urgente') 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>{point.status}</p>
                </div>
                <button 
                  onClick={() => openInGoogleMaps(point.lat, point.lng)}
                  className="w-full mt-4 bg-red-600 text-white text-xs py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  <Navigation size={14} /> Como Chegar
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
