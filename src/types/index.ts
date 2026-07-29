export interface Apartment {
  id: string;
  number: number;
  floor: number;
  rooms: number; // 0 = studio
  areaTotal: number;
  areaLiving?: number;
  areaKitchen?: number;
  building: string;
  section: string;
  hasBalcony: boolean;
  hasTerrace: boolean;
  status: 'free' | 'booked' | 'sold' | 'unpublished';
  price?: number;
  currency: string;
  images: string[];
  floorPlanUrl?: string;
  seoSlug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CatalogFilter {
  page: number;
  limit: number;
  rooms?: number[];
  floorMin?: number;
  floorMax?: number;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  status?: ('free' | 'booked' | 'sold' | 'unpublished')[];
  building?: string[];
}

export interface ApartmentResponse {
  data: Apartment[];
  meta: {
    total: number;
    page: number;
    pageCount: number;
    limit: number;
  };
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  type: 'callback' | 'booking' | 'question' | 'consultation' | 'mortgage';
  apartmentId?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt?: string;
}

export interface PageSection {
  id: string;
  type: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  order: number;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sections: PageSection[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface FavoriteItem {
  apartmentId: string;
  addedAt: string;
}

export type ModalType = 'consultation' | 'booking' | 'presentation' | 'selection' | 'subscription';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ProjectProgress {
  id: string;
  building: string;
  status: 'foundation' | 'walls' | 'roof' | 'finishing' | 'completed';
  progress: number; // 0-100
  description: string;
  imageUrl?: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  slug: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'exterior' | 'interior' | 'infrastructure' | 'territory';
}
