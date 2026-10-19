import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Bus, MapPin, Navigation, Info, Layers, RefreshCw } from 'lucide-react';
import { campusCenter, campusStops, transitRoutes } from '../../data/mockTransit';
import { useAppData } from '../../context/AppDataContext';
import { TransitBus } from '../../types';

interface CampusMapProps {
  selectedBusId?: string | null;
  onSelectBus?: (bus: TransitBus) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({ selectedBusId, onSelectBus }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const busMarkersRef = useRef<Record<string, L.Marker>>({});
  const { buses } = useAppData();
  const [simulationTick, setSimulationTick] = useState(0);

  // Periodic simulated slight jitter / movement to show "live GPS"
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationTick(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: campusCenter,
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Draw route polylines
    transitRoutes.forEach(route => {
      L.polyline(route.path, {
        color: route.color,
        weight: 5,
        opacity: 0.8,
        dashArray: route.id === 'RT-PURPLE' ? '6, 8' : undefined,
      }).addTo(map);
    });

    // Add stop markers
    campusStops.forEach(stop => {
      const stopIcon = L.divIcon({
        className: 'custom-stop-marker',
        html: `
          <div style="background-color: white; border: 2px solid #0F172A; border-radius: 9999px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            <div style="background-color: #4F46F5; width: 8px; height: 8px; border-radius: 9999px;"></div>
          </div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; font-weight: bold; color: #0F172A;">
          📍 ${stop.name}
        </div>
      `);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update bus markers when buses or simulation tick updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    buses.forEach((bus, index) => {
      // Add slight simulated offset based on simulationTick
      const offset = (Math.sin(simulationTick + index) * 0.0003);
      const lat = bus.currentLocation[0] + offset;
      const lng = bus.currentLocation[1] + offset * 0.8;

      const isSelected = selectedBusId === bus.id;

      const busIcon = L.divIcon({
        className: `custom-bus-marker-${bus.id}`,
        html: `
          <div style="
            background: ${bus.routeColor};
            color: white;
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            transition: all 0.3s ease;
          ">
            <span>🚌</span>
            <span>${bus.etaMinutes}m</span>
          </div>
        `,
        iconSize: [50, 24],
        iconAnchor: [25, 12],
      });

      if (busMarkersRef.current[bus.id]) {
        busMarkersRef.current[bus.id].setLatLng([lat, lng]);
        busMarkersRef.current[bus.id].setIcon(busIcon);
      } else {
        const marker = L.marker([lat, lng], { icon: busIcon }).addTo(map);
        marker.on('click', () => {
          if (onSelectBus) onSelectBus(bus);
        });
        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; color: #0F172A; padding: 2px;">
            <strong style="color: ${bus.routeColor}">${bus.busNumber}</strong><br/>
            Next: <strong>${bus.nextStop}</strong><br/>
            ETA: <strong>${bus.etaMinutes} mins</strong> | Crowd: <strong>${bus.crowdLevel}</strong>
          </div>
        `);
        busMarkersRef.current[bus.id] = marker;
      }
    });
  }, [buses, simulationTick, selectedBusId, onSelectBus]);

  // Center on selected bus
  useEffect(() => {
    if (selectedBusId && mapInstanceRef.current) {
      const bus = buses.find(b => b.id === selectedBusId);
      if (bus) {
        mapInstanceRef.current.flyTo(bus.currentLocation, 16, { duration: 1.2 });
      }
    }
  }, [selectedBusId, buses]);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Route Legend Overlay */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg text-xs space-y-1.5 pointer-events-auto max-w-[200px]">
        <div className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <Layers className="w-3.5 h-3.5 text-indigo-500" /> Active Routes
        </div>
        {transitRoutes.map(route => (
          <div key={route.id} className="flex items-center gap-2">
            <span
              className="w-3 h-1.5 rounded-full"
              style={{ backgroundColor: route.color }}
            />
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
              {route.code} • {route.name}
            </span>
          </div>
        ))}
      </div>

      {/* Simulated Disclaimer Banner */}
      <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/85 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[11px] font-medium flex items-center justify-between border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="truncate">
            Simulated Campus Feed: GPS shuttle locations & ETAs updated live
          </span>
        </div>
        <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">
          Demo Sandbox
        </span>
      </div>
    </div>
  );
};
