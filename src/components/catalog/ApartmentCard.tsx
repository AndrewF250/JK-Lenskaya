'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Apartment } from '@/types';
import { formatPrice, formatArea, formatRooms, getStatusLabel, getStatusColor, cn } from '@/lib/utils';
import { useFavoritesStore } from '@/lib/stores/favorites';

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isFav = isFavorite(apartment.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(apartment.id);
    } else {
      addFavorite(apartment.id);
    }
  };

  return (
    <Link href={`/catalog/${apartment.id}`} className="card group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {apartment.images.length > 0 ? (
          <Image
            src={apartment.images[0]}
            alt={`${formatRooms(apartment.rooms)} на этаже ${apartment.floor}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getStatusColor(apartment.status))}>
            {getStatusLabel(apartment.status)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <svg
            className={cn('w-5 h-5 transition-colors', isFav ? 'text-red-500 fill-current' : 'text-primary-400')}
            fill={isFav ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-display font-semibold">
            {formatRooms(apartment.rooms)}
          </h3>
          <span className="text-sm text-primary-500">
            №{apartment.number}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{formatArea(apartment.areaTotal)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Корпус {apartment.building}, этаж {apartment.floor}</span>
          </div>
          {apartment.hasBalcony && (
            <div className="flex items-center gap-2 text-sm text-primary-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Балкон</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-primary-100">
          {apartment.price ? (
            <div className="text-xl font-bold text-accent-600">
              {formatPrice(apartment.price)}
            </div>
          ) : (
            <div className="text-sm text-primary-500">Цена по запросу</div>
          )}
        </div>
      </div>
    </Link>
  );
}
