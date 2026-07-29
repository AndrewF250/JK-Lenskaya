import { faker } from '@faker-js/faker';

faker.seed(42); // Фиксированный seed для воспроизводимости

interface ApartmentData {
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
  seoSlug: string;
}

const STATUS_WEIGHTS = {
  free: 0.6,      // 60% свободных
  booked: 0.2,    // 20% забронированных
  sold: 0.15,     // 15% проданных
  unpublished: 0.05 // 5% неопубликованных
};

const ROOM_CONFIGS = [
  { rooms: 0, areaMin: 25, areaMax: 40, priceMin: 4_500_000, priceMax: 7_000_000 },    // Студия
  { rooms: 1, areaMin: 35, areaMax: 55, priceMin: 6_000_000, priceMax: 10_000_000 },   // 1-комн.
  { rooms: 2, areaMin: 50, areaMax: 80, priceMin: 8_000_000, priceMax: 14_000_000 },   // 2-комн.
  { rooms: 3, areaMin: 70, areaMax: 110, priceMin: 12_000_000, priceMax: 20_000_000 }, // 3-комн.
];

function weightedRandom(weights: Record<string, number>): string {
  const entries = Object.entries(weights);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let random = Math.random() * total;
  
  for (const [key, weight] of entries) {
    random -= weight;
    if (random <= 0) return key;
  }
  return entries[0][0];
}

function generateApartment(index: number): ApartmentData {
  const roomConfig = faker.helpers.arrayElement(ROOM_CONFIGS);
  const status = weightedRandom(STATUS_WEIGHTS) as ApartmentData['status'];
  const building = faker.helpers.arrayElement(['A', 'B']);
  const section = faker.helpers.arrayElement(['1', '2', '3']);
  const floor = faker.number.int({ min: 1, max: 25 });
  const areaTotal = faker.number.float({ 
    min: roomConfig.areaMin, 
    max: roomConfig.areaMax, 
    fractionDigits: 1 
  });
  
  const areaLiving = roomConfig.rooms > 0 
    ? faker.number.float({ min: areaTotal * 0.5, max: areaTotal * 0.7, fractionDigits: 1 })
    : undefined;
  
  const areaKitchen = faker.number.float({ min: 8, max: 18, fractionDigits: 1 });
  
  const price = status === 'unpublished' 
    ? undefined 
    : faker.number.int({ min: roomConfig.priceMin, max: roomConfig.priceMax });

  const roomsLabel = roomConfig.rooms === 0 ? 'studiya' : `${roomConfig.rooms}-komnatnaya`;
  const seoSlug = `${roomsLabel}-${Math.round(areaTotal)}m2-${building.toLowerCase()}-${index + 1}`;

  return {
    number: 100 + index + (building === 'B' ? 500 : 0),
    floor,
    rooms: roomConfig.rooms,
    areaTotal,
    areaLiving,
    areaKitchen,
    building,
    section,
    hasBalcony: faker.datatype.boolean(0.7),
    hasTerrace: faker.datatype.boolean(0.3),
    status,
    price,
    currency: 'RUB',
    seoSlug,
  };
}

export async function seedApartments(apiBase: string, token: string): Promise<any[]> {
  const apartments = Array.from({ length: 15 }, (_, i) => generateApartment(i));
  const created = [];

  for (const apartment of apartments) {
    const response = await fetch(`${apiBase}/api/apartments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: apartment }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create apartment: ${response.statusText}`);
    }

    const result = await response.json();
    created.push(result.data);
  }

  return created;
}
