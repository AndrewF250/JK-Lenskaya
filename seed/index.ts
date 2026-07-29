import { seedApartments } from './apartments';
import { seedLeads } from './leads';
import { seedPages } from './pages';

const API_BASE = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Квартиры
    console.log('📦 Seeding apartments...');
    const apartments = await seedApartments(API_BASE, API_TOKEN);
    console.log(`✅ Created ${apartments.length} apartments\n`);

    // 2. Лиды
    console.log('📋 Seeding leads...');
    const leads = await seedLeads(API_BASE, API_TOKEN, apartments);
    console.log(`✅ Created ${leads.length} leads\n`);

    // 3. Страницы
    console.log('📄 Seeding pages...');
    await seedPages(API_BASE, API_TOKEN);
    console.log('✅ Pages configured\n');

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
