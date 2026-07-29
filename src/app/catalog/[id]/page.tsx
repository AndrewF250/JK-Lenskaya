'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApartment, useApartments } from '@/lib/hooks/useApartments';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useModalStore } from '@/lib/stores/modal';
import { formatPrice, formatArea, formatRooms, getStatusLabel, getStatusColor, cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ApartmentCard } from '@/components/catalog/ApartmentCard';
import { CatalogFilter } from '@/types';

export default function ApartmentPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: apartment, isLoading, error } = useApartment(id);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { openModal } = useModalStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const similarFilters: CatalogFilter = {
    page: 1,
    limit: 4,
    rooms: apartment ? [apartment.rooms] : undefined,
  };
  const { data: similarData } = useApartments(similarFilters);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-primary-100 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-primary-100 rounded-xl" />
              <div className="space-y-4">
                <div className="h-8 bg-primary-100 rounded w-1/2" />
                <div className="h-6 bg-primary-100 rounded w-3/4" />
                <div className="h-6 bg-primary-100 rounded w-1/2" />
                <div className="h-10 bg-primary-100 rounded w-1/3 mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom text-center py-12">
          <h1 className="text-2xl font-display font-semibold mb-4">Квартира не найдена</h1>
          <p className="text-primary-600 mb-8">Запрашиваемая квартира не существует или была удалена</p>
          <Link href="/catalog" className="btn-primary">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(apartment.id);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(apartment.id);
    } else {
      addFavorite(apartment.id);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-primary-500 mb-8">
          <Link href="/" className="hover:text-accent-600">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-accent-600">Каталог</Link>
          <span>/</span>
          <span className="text-graphite">{formatRooms(apartment.rooms)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 cursor-pointer" onClick={() => setShowLightbox(true)}>
              {apartment.images.length > 0 ? (
                <Image
                  src={apartment.images[selectedImage]}
                  alt={`${formatRooms(apartment.rooms)} - Фото ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={cn('px-3 py-1.5 rounded-full text-sm font-medium', getStatusColor(apartment.status))}>
                  {getStatusLabel(apartment.status)}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {apartment.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {apartment.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative aspect-square rounded-lg overflow-hidden',
                      selectedImage === index && 'ring-2 ring-accent-600'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`Фото ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apartment Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl md:text-4xl font-display font-semibold">
                {formatRooms(apartment.rooms)}
              </h1>
              <button
                onClick={handleFavoriteClick}
                className="w-12 h-12 border-2 border-primary-200 rounded-full flex items-center justify-center hover:border-red-300 transition-colors"
              >
                <svg
                  className={cn('w-6 h-6 transition-colors', isFav ? 'text-red-500 fill-current' : 'text-primary-400')}
                  fill={isFav ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <p className="text-lg text-primary-600 mb-6">
              Корпус {apartment.building}, секция {apartment.section}, этаж {apartment.floor}, №{apartment.number}
            </p>

            {/* Price */}
            {apartment.price && (
              <div className="text-3xl font-bold text-accent-600 mb-8">
                {formatPrice(apartment.price)}
              </div>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-sm text-primary-500 mb-1">Общая площадь</div>
                <div className="text-xl font-semibold">{formatArea(apartment.areaTotal)}</div>
              </div>
              {apartment.areaLiving && (
                <div className="bg-primary-50 rounded-xl p-4">
                  <div className="text-sm text-primary-500 mb-1">Жилая площадь</div>
                  <div className="text-xl font-semibold">{formatArea(apartment.areaLiving)}</div>
                </div>
              )}
              {apartment.areaKitchen && (
                <div className="bg-primary-50 rounded-xl p-4">
                  <div className="text-sm text-primary-500 mb-1">Кухня</div>
                  <div className="text-xl font-semibold">{formatArea(apartment.areaKitchen)}</div>
                </div>
              )}
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-sm text-primary-500 mb-1">Этаж</div>
                <div className="text-xl font-semibold">{apartment.floor}</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-8">
              {apartment.hasBalcony && (
                <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium">
                  Балкон
                </span>
              )}
              {apartment.hasTerrace && (
                <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium">
                  Терраса
                </span>
              )}
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                Секция {apartment.section}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-1" onClick={() => openModal('booking')}>
                Забронировать
              </Button>
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => openModal('consultation')}>
                Получить консультацию
              </Button>
            </div>

            {/* Floor Plan */}
            {apartment.floorPlanUrl && (
              <div className="border-t border-primary-100 pt-8">
                <h3 className="text-lg font-display font-semibold mb-4">Планировка</h3>
                <div className="relative aspect-square max-w-md rounded-xl overflow-hidden border border-primary-200">
                  <Image
                    src={apartment.floorPlanUrl}
                    alt="Планировка квартиры"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Apartments */}
        {similarData && similarData.data.length > 0 && (
          <div className="mt-16 pt-16 border-t border-primary-100">
            <h2 className="section-title mb-8">Похожие квартиры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarData.data
                .filter((a) => a.id !== apartment.id)
                .slice(0, 4)
                .map((apt) => (
                  <ApartmentCard key={apt.id} apartment={apt} />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && apartment.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setShowLightbox(false)}>
          <button className="absolute top-4 right-4 text-white hover:text-primary-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={apartment.images[selectedImage]}
              alt={`${formatRooms(apartment.rooms)} - Фото ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
            {apartment.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? apartment.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === apartment.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
