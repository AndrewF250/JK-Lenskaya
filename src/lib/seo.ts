import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function generateSEO({
  title = 'ЖК «Ленская» — Премиальный жилой комплекс в Перми',
  description = 'Премиальный жилой комплекс бизнес-класса на правом берегу Камы. Современная архитектура, благоустроенная территория, квартиры от 25 до 120 м².',
  image = '/og-image.jpg',
  url = 'https://lenskaya.ru',
  type = 'website',
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ЖК «Ленская»',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ru_RU',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateApartmentSEO(apartment: {
  rooms: number;
  areaTotal: number;
  floor: number;
  building: string;
  price?: number;
}): Metadata {
  const roomsLabel = apartment.rooms === 0 ? 'Студия' : `${apartment.rooms}-комнатная квартира`;
  const title = `${roomsLabel} ${apartment.areaTotal} м² — ЖК «Ленская»`;
  const description = `${roomsLabel} площадью ${apartment.areaTotal} м² на ${apartment.floor} этаже, корпус ${apartment.building}. ${apartment.price ? `Цена: ${apartment.price.toLocaleString('ru-RU')} ₽` : 'Цена по запросу'}.`;

  return generateSEO({
    title,
    description,
    type: 'article',
  });
}

export function generateApartmentJsonLd(apartment: {
  id: string;
  rooms: number;
  areaTotal: number;
  floor: number;
  building: string;
  section: string;
  number: number;
  price?: number;
  images: string[];
}) {
  const roomsLabel = apartment.rooms === 0 ? 'Студия' : `${apartment.rooms}-комнатная квартира`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: `${roomsLabel} №${apartment.number}`,
    description: `${roomsLabel} площадью ${apartment.areaTotal} м² на ${apartment.floor} этаже`,
    url: `https://lenskaya.ru/catalog/${apartment.id}`,
    image: apartment.images[0] || '/og-image.jpg',
    floorLevel: apartment.floor,
    numberOfRooms: apartment.rooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: apartment.areaTotal,
      unitCode: 'MTK',
    },
    ...(apartment.price && {
      offers: {
        '@type': 'Offer',
        price: apartment.price,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Пермь',
      addressRegion: 'Пермский край',
      addressCountry: 'RU',
    },
  };
}
