'use client';

import Link from 'next/link';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useApartment } from '@/lib/hooks/useApartments';
import { ApartmentCard } from '@/components/catalog/ApartmentCard';
import { Button } from '@/components/ui/Button';
import { Apartment } from '@/types';

function FavoriteApartmentCard({ apartmentId }: { apartmentId: string }) {
  const { data: apartment, isLoading, error } = useApartment(apartmentId);

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="aspect-[4/3] bg-primary-100" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-primary-100 rounded w-1/2" />
          <div className="h-4 bg-primary-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !apartment) {
    return null;
  }

  return <ApartmentCard apartment={apartment} />;
}

export default function FavoritesPage() {
  const { items, clearFavorites, getCount } = useFavoritesStore();
  const count = getCount();

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="section-title mb-2">Избранное</h1>
            <p className="text-lg text-primary-600">
              {count > 0
                ? `У вас ${count} ${count === 1 ? 'квартира' : count < 5 ? 'квартиры' : 'квартир'} в избранном`
                : 'В избранном пока нет квартир'}
            </p>
          </div>
          {count > 0 && (
            <Button variant="ghost" onClick={clearFavorites} className="mt-4 md:mt-0">
              Очистить избранное
            </Button>
          )}
        </div>

        {/* Empty State */}
        {count === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-primary-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-display font-semibold mb-4">Избранное пусто</h2>
            <p className="text-primary-600 mb-8 max-w-md mx-auto">
              Добавляйте понравившиеся квартиры в избранное, чтобы сравнить их и не потерять
            </p>
            <Link href="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        {count > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <FavoriteApartmentCard key={item.apartmentId} apartmentId={item.apartmentId} />
            ))}
          </div>
        )}

        {/* CTA */}
        {count > 0 && (
          <div className="mt-16 text-center">
            <p className="text-primary-600 mb-4">Хотите забронировать одну из квартир?</p>
            <Button size="lg">Записаться на просмотр</Button>
          </div>
        )}
      </div>
    </div>
  );
}
