import { faker } from '@faker-js/faker';

interface LeadData {
  name: string;
  phone: string;
  email?: string;
  source: 'consultation' | 'office_booking' | 'presentation' | 'apartment_card' | 'callback';
  apartmentId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  message?: string;
  consent: boolean;
  status: 'new' | 'processed' | 'converted';
}

const SOURCE_TYPES: LeadData['source'][] = [
  'consultation',
  'office_booking',
  'presentation',
  'apartment_card',
  'callback',
];

const LEAD_STATUSES: LeadData['status'][] = ['new', 'processed', 'converted'];

const UTM_SOURCES = ['yandex', 'google', 'telegram', 'instagram', 'direct'];
const UTM_MEDIUMS = ['cpc', 'social', 'email', 'referral', 'none'];

function generateLead(apartmentId?: string): LeadData {
  const source = faker.helpers.arrayElement(SOURCE_TYPES);
  
  return {
    name: faker.person.fullName(),
    phone: faker.phone.number({ style: 'international' }),
    email: faker.datatype.boolean(0.7) ? faker.internet.email() : undefined,
    source,
    apartmentId: source === 'apartment_card' ? apartmentId : undefined,
    utmSource: faker.helpers.arrayElement(UTM_SOURCES),
    utmMedium: faker.helpers.arrayElement(UTM_MEDIUMS),
    utmCampaign: faker.helpers.arrayElement(['spring_sale', 'new_project', 'promo', undefined]),
    message: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : undefined,
    consent: true,
    status: faker.helpers.arrayElement(LEAD_STATUSES),
  };
}

export async function seedLeads(
  apiBase: string, 
  token: string, 
  apartments: any[]
): Promise<any[]> {
  const leads = Array.from({ length: 10 }, (_, i) => {
    const randomApartment = faker.helpers.arrayElement(apartments);
    return generateLead(randomApartment?.id);
  });

  const created = [];

  for (const lead of leads) {
    const response = await fetch(`${apiBase}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: lead }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create lead: ${response.statusText}`);
    }

    const result = await response.json();
    created.push(result.data);
  }

  return created;
}
