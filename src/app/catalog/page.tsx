'use client';

import { useState, useCallback } from 'react';
import { useApartments } from '@/lib/hooks/useApartments';
import { ApartmentCard } from '@/components/catalog/ApartmentCard';
import { CatalogFilter } from '@/types';
import { cn } from '@/lib/utils';

const defaultFilters: CatalogFilter = {
  page: 1,
  limit: 12,
};

const roomOptions = [
  { value: 0, label: 'Студия' },
  { value: 1, label: '1 комната' },
  { value: 2, label: '2 комнаты' },
  { value: 3, label: '3 комнаты' },
  { value: 4, label: '4+ комнат' },
];

const statusOptions = [
  { value: 'free', label: 'Свободна' },
  { value: 'booked', label: 'Забронирована' },
  { value: 'sold', label: 'Продана' },
];

export default function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilter>(defaultFilters);
  const { data, isLoading, error } = useApartments(filters);

  const updateFilter = useCallback((key: keyof CatalogFilter, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page on filter change
    }));
  }, []);

  const toggleRoom = useCallback((room: number) => {
    setFilters((prev) => {
      const currentRooms = prev.rooms || [];
      const newRooms = currentRooms.includes(room)
        ? currentRooms.filter((r) => r !== room)
        : [...currentRooms, room];
      return { ...prev, rooms: newRooms.length > 0 ? newRooms : undefined, page: 1 };
    });
  }, []);

  const toggleStatus = useCallback((status: string) => {
    setFilters((prev) => {
      const currentStatus = prev.status || [];
      const newStatus = currentStatus.includes(status as 'free' | 'booked' | 'sold')
        ? currentStatus.filter((s) => s !== status)
        : [...currentStatus, status as 'free' | 'booked' | 'sold'];
      return { ...prev, status: newStatus.length > 0 ? newStatus : undefined, page: 1 };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Каталог квартир</h1>
          <p className="text-lg text-primary-600">
            Выберите идеальную квартиру из {data?.meta.total || 709} вариантов
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-display font-semibold">Фильтры</h2>
                <button onClick={resetFilters} className="text-sm text-accent-600 hover:text-accent-700">
                  Сбросить
                </button>
              </div>

              {/* Room Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-3">Комнаты</h3>
                <div className="flex flex-wrap gap-2">
                  {roomOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleRoom(option.value)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        filters.rooms?.includes(option.value)
                          ? 'bg-accent-600 text-white'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-3">Цена, ₽</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.priceMin || ''}
                    onChange={(e) => updateFilter('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.priceMax || ''}
                    onChange={(e) => updateFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Area Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-3">Площадь, м²</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.areaMin || ''}
                    onChange={(e) => updateFilter('areaMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.areaMax || ''}
                    onChange={(e) => updateFilter('areaMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Floor Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-3">Этаж</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="От"
                    min="1"
                    value={filters.floorMin || ''}
                    onChange={(e) => updateFilter('floorMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    min="1"
                    value={filters.floorMax || ''}
                    onChange={(e) => updateFilter('floorMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-3">Статус</h3>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status?.includes(option.value as 'free' | 'booked' | 'sold') || false}
                        onChange={() => toggleStatus(option.value)}
                        className="w-4 h-4 text-accent-600 rounded focus:ring-accent-500"
                      />
                      <span className="text-sm text-primary-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-primary-600">
                Найдено <span className="font-semibold text-graphite">{data?.meta.total || 0}</span> квартир
              </p>
              <select
                className="input-field w-auto text-sm"
                value={filters.limit}
                onChange={(e) => updateFilter('limit', Number(e.target.value))}
              >
                <option value={12}>Показать 12</option>
                <option value={24}>Показать 24</option>
                <option value={48}>Показать 48</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="aspect-[4/3] bg-primary-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-primary-100 rounded w-1/2" />
                      <div className="h-4 bg-primary-100 rounded w-3/4" />
                      <div className="h-4 bg-primary-100 rounded w-1/2" />
                      <div className="h-8 bg-primary-100 rounded w-1/3 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Ошибка загрузки квартир</p>
                <button onClick={() => window.location.reload()} className="btn-primary">
                  Попробовать снова
                </button>
              </div>
            )}

            {/* Results Grid */}
            {data && !isLoading && (
              <>
                {data.data.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-primary-600 mb-2">Квартиры не найдены</p>
                    <p className="text-primary-500 mb-4">Попробуйте изменить параметры фильтрации</p>
                    <button onClick={resetFilters} className="btn-primary">
                      Сбросить фильтры
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.data.map((apartment) => (
                      <ApartmentCard key={apartment.id} apartment={apartment} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {data.meta.pageCount > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    <button
                      onClick={() => handlePageChange(filters.page - 1)}
                      disabled={filters.page === 1}
                      className="px-4 py-2 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Назад
                    </button>
                    {[...Array(data.meta.pageCount)].map((_, i) => {
                      const page = i + 1;
                      const isCurrent = page === filters.page;
                      const isNearCurrent = Math.abs(page - filters.page) <= 2;
                      const isFirst = page === 1;
                      const isLast = page === data.meta.pageCount;

                      if (isCurrent || isNearCurrent || isFirst || isLast) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={cn(
                              'w-10 h-10 rounded-lg font-medium transition-colors',
                              isCurrent
                                ? 'bg-accent-600 text-white'
                                : 'border border-primary-200 text-primary-700 hover:bg-primary-50'
                            )}
                          >
                            {page}
                          </button>
                        );
                      }

                      if (page === 2 || page === data.meta.pageCount - 1) {
                        return <span key={page} className="px-2 text-primary-400">...</span>;
                      }

                      return null;
                    })}
                    <button
                      onClick={() => handlePageChange(filters.page + 1)}
                      disabled={filters.page === data.meta.pageCount}
                      className="px-4 py-2 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Далее
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
