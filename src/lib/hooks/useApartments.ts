import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApartmentResponse, CatalogFilter, Lead } from '@/types';

const API_BASE = '/api';

async function fetchApartments(filters: CatalogFilter): Promise<ApartmentResponse> {
  const params = new URLSearchParams();
  
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.limit) params.set('limit', filters.limit.toString());
  if (filters.rooms?.length) params.set('rooms', filters.rooms.join(','));
  if (filters.floorMin) params.set('floorMin', filters.floorMin.toString());
  if (filters.floorMax) params.set('floorMax', filters.floorMax.toString());
  if (filters.priceMin) params.set('priceMin', filters.priceMin.toString());
  if (filters.priceMax) params.set('priceMax', filters.priceMax.toString());
  if (filters.areaMin) params.set('areaMin', filters.areaMin.toString());
  if (filters.areaMax) params.set('areaMax', filters.areaMax.toString());
  if (filters.status?.length) params.set('status', filters.status.join(','));
  if (filters.building?.length) params.set('building', filters.building.join(','));

  const response = await fetch(`${API_BASE}/apartments?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch apartments');
  }
  
  return response.json();
}

async function fetchApartmentById(id: string) {
  const response = await fetch(`${API_BASE}/apartments/${id}`);
  
  if (!response.ok) {
    throw new Error('Apartment not found');
  }
  
  return response.json();
}

async function submitLead(data: Lead): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit lead');
  }
  
  return response.json();
}

export function useApartments(filters: CatalogFilter) {
  return useQuery({
    queryKey: ['apartments', filters],
    queryFn: () => fetchApartments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useApartment(id: string) {
  return useQuery({
    queryKey: ['apartment', id],
    queryFn: () => fetchApartmentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubmitLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
