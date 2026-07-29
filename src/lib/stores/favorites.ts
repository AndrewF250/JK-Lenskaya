import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteItem } from '@/types';

interface FavoritesState {
  items: FavoriteItem[];
  addFavorite: (apartmentId: string) => void;
  removeFavorite: (apartmentId: string) => void;
  isFavorite: (apartmentId: string) => boolean;
  clearFavorites: () => void;
  getCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (apartmentId: string) => {
        const { items } = get();
        if (!items.some(item => item.apartmentId === apartmentId)) {
          set({
            items: [
              ...items,
              {
                apartmentId,
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },

      removeFavorite: (apartmentId: string) => {
        set({
          items: get().items.filter(item => item.apartmentId !== apartmentId),
        });
      },

      isFavorite: (apartmentId: string) => {
        return get().items.some(item => item.apartmentId === apartmentId);
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      getCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'lenskaya-favorites',
    }
  )
);
