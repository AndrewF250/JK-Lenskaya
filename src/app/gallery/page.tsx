'use client';

import { useState } from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'exterior', label: 'Экстерьер' },
  { id: 'interior', label: 'Интерьер' },
  { id: 'infrastructure', label: 'Инфраструктура' },
  { id: 'territory', label: 'Территория' },
];

const galleryImages = [
  { id: '1', category: 'exterior', alt: 'Фасад корпуса 1' },
  { id: '2', category: 'exterior', alt: 'Фасад корпуса 2' },
  { id: '3', category: 'interior', alt: 'Лобби' },
  { id: '4', category: 'interior', alt: 'Квартира' },
  { id: '5', category: 'infrastructure', alt: 'Детская площадка' },
  { id: '6', category: 'infrastructure', alt: 'Спортивная зона' },
  { id: '7', category: 'territory', alt: 'Двор' },
  { id: '8', category: 'territory', alt: 'Озеленение' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <ContentPage
      title="Галерея"
      description="Визуализации и фотографии жилого комплекса"
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeCategory === category.id
                ? 'bg-accent-600 text-white'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="aspect-square bg-primary-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(image.id)}
          >
            <div className="w-full h-full flex items-center justify-center text-primary-400">
              {image.alt}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-primary-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-white text-xl">
            {galleryImages.find(img => img.id === selectedImage)?.alt}
          </div>
        </div>
      )}
    </ContentPage>
  );
}
