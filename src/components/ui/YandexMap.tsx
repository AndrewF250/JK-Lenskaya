'use client';

import { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    coordinates: [number, number];
    title?: string;
    description?: string;
    icon?: string;
  }>;
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    ymaps: typeof import('yandex-maps');
  }
}

export function YandexMap({
  center = [58.0105, 56.2502], // Perm coordinates
  zoom = 14,
  markers = [],
  className = '',
  height = '400px',
}: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Yandex Maps script
    const loadMap = () => {
      if (window.ymaps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || ''}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = () => {
        setError('Не удалось загрузить Яндекс Карты');
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      try {
        const map = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: ['zoomControl', 'searchControl', 'typeControl', 'fullscreenControl'],
        });

        // Add markers
        markers.forEach((marker) => {
          const placemark = new window.ymaps.Placemark(
            marker.coordinates,
            {
              balloonContentHeader: marker.title,
              balloonContentBody: marker.description,
            },
            {
              preset: marker.icon || 'islands#redDotIcon',
            }
          );
          map.geoObjects.add(placemark);
        });

        // If no markers, add default marker for the complex
        if (markers.length === 0) {
          const placemark = new window.ymaps.Placemark(
            center,
            {
              balloonContentHeader: 'ЖК «Ленская»',
              balloonContentBody: 'Премиальный жилой комплекс бизнес-класса',
            },
            {
              preset: 'islands#redDotIcon',
            }
          );
          map.geoObjects.add(placemark);
        }

        setIsLoaded(true);
      } catch (err) {
        setError('Ошибка инициализации карты');
        console.error('Yandex Maps error:', err);
      }
    };

    loadMap();
  }, [center, zoom, markers]);

  if (error) {
    return (
      <div className={`bg-primary-100 rounded-xl flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <svg className="w-12 h-12 text-primary-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-primary-500">{error}</p>
          <p className="text-sm text-primary-400 mt-2">Добавьте NEXT_PUBLIC_YANDEX_MAPS_API_KEY в .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-100 rounded-xl flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
        </div>
      )}
      <div ref={mapRef} style={{ height }} className="rounded-xl overflow-hidden" />
    </div>
  );
}
