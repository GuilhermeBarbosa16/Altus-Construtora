import React from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícone personalizado
const CustomIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = CustomIcon;

const LocationSection: React.FC = () => {
  const position: [number, number] = [-19.9810584, -43.9936146];

  return (
    <section id="localizacao" className="relative py-20 from-gray-50 to-white">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho estilizado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-5">
            <div className="p-3 bg-[#DAA84B]/10 rounded-full">
              <MapPin className="w-8 h-8 text-[#DAA84B]" strokeWidth={1.8} />
            </div>
            <h2 className="text-4xl font-bold text-white-900 font-serif tracking-tight">
              Nossa <span className="text-[#DAA84B]">Localização</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nosso escritório no coração do Buritis, Belo Horizonte
          </p>
        </div>

        {/* Container do Mapa com efeito 3D */}
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white transform perspective-1000 hover:shadow-2xl transition-all duration-300">
            {/* Mapa com borda sutil */}
            <div className="w-full h-[450px] relative border-b border-gray-200/30">
              <MapContainer
                center={position}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup className="custom-popup">
                    <div className="text-center p-3">
                      <strong className="block text-lg font-medium mb-1 text-[#DAA84B]">Altus Engenharia</strong>
                      <span className="text-gray-700">Av. Professor Mário Werneck, 2170</span>
                      <div className="mt-2">
                        <a 
                          href="https://maps.google.com?q=Av.+Professor+Mário+Werneck,+2170+-+Buritis,+Belo+Horizonte" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Ver rotas
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            
            {/* Endereço com gradiente */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200/30">
              <p className="text-lg text-gray-700 flex items-center gap-3 justify-center font-medium">
                <MapPin className="w-5 h-5 text-[#DAA84B]" />
                <span>Av. Professor Mário Werneck, 2170 - Buritis, Belo Horizonte - MG</span>
              </p>
            </div>
          </div>

          {/* Botão com efeito */}
          <div className="mt-8">
            <a 
              href="https://maps.google.com?q=Av.+Professor+Mário+Werneck,+2170+-+Buritis,+Belo+Horizonte" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#DAA84B] to-[#C8973A] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 shadow-lg hover:from-[#C8973A] hover:to-[#DAA84B] group"
            >
              <span className="text-white mr-3">Abrir no Google Maps</span>
              <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;