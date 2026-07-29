import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from '@/lib/stores/favorites';

describe('Favorites Store', () => {
  beforeEach(() => {
    useFavoritesStore.getState().clearFavorites();
  });

  it('should have empty items initially', () => {
    const { items } = useFavoritesStore.getState();
    expect(items).toEqual([]);
  });

  it('should add a favorite', () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');

    const { items, isFavorite } = useFavoritesStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].apartmentId).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(isFavorite('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
  });

  it('should not add duplicate favorite', () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    addFavorite('123e4567-e89b-12d3-a456-426614174000');

    const { items } = useFavoritesStore.getState();
    expect(items).toHaveLength(1);
  });

  it('should remove a favorite', () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    removeFavorite('123e4567-e89b-12d3-a456-426614174000');

    const { items, isFavorite } = useFavoritesStore.getState();
    expect(items).toHaveLength(0);
    expect(isFavorite('123e4567-e89b-12d3-a456-426614174000')).toBe(false);
  });

  it('should handle multiple favorites', () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    addFavorite('987fcdeb-51a2-43d1-b456-789012345678');

    const { items, isFavorite, getCount } = useFavoritesStore.getState();
    expect(items).toHaveLength(2);
    expect(isFavorite('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    expect(isFavorite('987fcdeb-51a2-43d1-b456-789012345678')).toBe(true);
    expect(getCount()).toBe(2);
  });

  it('should clear all favorites', () => {
    const { addFavorite, clearFavorites } = useFavoritesStore.getState();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    addFavorite('987fcdeb-51a2-43d1-b456-789012345678');
    clearFavorites();

    const { items, getCount } = useFavoritesStore.getState();
    expect(items).toHaveLength(0);
    expect(getCount()).toBe(0);
  });

  it('should return correct count', () => {
    const { addFavorite, getCount } = useFavoritesStore.getState();
    expect(getCount()).toBe(0);

    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    expect(getCount()).toBe(1);

    addFavorite('987fcdeb-51a2-43d1-b456-789012345678');
    expect(getCount()).toBe(2);
  });

  it('should return false for non-existent favorite', () => {
    const { isFavorite } = useFavoritesStore.getState();
    expect(isFavorite('non-existent-id')).toBe(false);
  });

  it('should handle removing non-existent favorite gracefully', () => {
    const { removeFavorite } = useFavoritesStore.getState();
    removeFavorite('non-existent-id');

    const { items } = useFavoritesStore.getState();
    expect(items).toHaveLength(0);
  });

  it('should add favorites with timestamp', () => {
    const { addFavorite } = useFavoritesStore.getState();
    const before = new Date().toISOString();
    addFavorite('123e4567-e89b-12d3-a456-426614174000');
    const after = new Date().toISOString();

    const { items } = useFavoritesStore.getState();
    expect(items[0].addedAt).toBeDefined();
    expect(items[0].addedAt >= before).toBe(true);
    expect(items[0].addedAt <= after).toBe(true);
  });
});