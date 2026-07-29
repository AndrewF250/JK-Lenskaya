interface PageConfig {
  slug: string;
  title: string;
  contentBlocks: any[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

const PAGES: PageConfig[] = [
  {
    slug: 'hero',
    title: 'Hero-баннер',
    contentBlocks: [
      {
        type: 'hero',
        data: {
          heading: 'ЖК Lenskaya',
          subheading: 'Архитектурный квартал на правом берегу Камы',
          ctaText: 'Выбрать квартиру',
          ctaLink: '/catalog',
          secondaryCta: 'Получить презентацию',
          videoUrl: null,
          posterUrl: '/images/hero-poster.jpg',
        },
      },
    ],
    seo: {
      title: 'ЖК Lenskaya — Премиальный жилой комплекс в Перми',
      description: 'Жилой комплекс бизнес-класса на ул. Ленская. Панорамные виды на Каму, террасная архитектура, приватные дворы.',
    },
  },
  {
    slug: 'contacts',
    title: 'Контакты',
    contentBlocks: [
      {
        type: 'contacts',
        data: {
          officeName: 'Офис продаж ЖК Lenskaya',
          address: 'г. Пермь, ул. Ленская, 10',
          phone: '+7 (342) 123-45-67',
          workingHours: 'Пн-Вс: 10:00 - 20:00',
          telegram: 'https://t.me/lenskaya',
          whatsapp: 'https://wa.me/79001234567',
          mapCoordinates: { lat: 58.0105, lng: 56.2502 },
        },
      },
    ],
    seo: {
      title: 'Контакты — ЖК Lenskaya',
      description: 'Свяжитесь с нами: офис продаж, телефон, мессенджеры.',
    },
  },
  {
    slug: 'about',
    title: 'О комплексе',
    contentBlocks: [
      {
        type: 'hero',
        data: {
          heading: 'О проекте',
          subheading: 'Место, где природа встречает архитектуру',
          imageUrl: '/images/about-hero.jpg',
        },
      },
      {
        type: 'text',
        data: {
          heading: 'Концепция',
          content: 'ЖК Lenskaya — это архитектурный квартал, созданный в гармонии с природным ландшафтом правого берега Камы. Террасная застройка обеспечивает каждому жителю вид на реку и лес.',
        },
      },
      {
        type: 'stats',
        data: {
          items: [
            { value: '709', label: 'Квартир' },
            { value: '2', label: 'Корпуса' },
            { value: '25', label: 'Этажей' },
            { value: '1', label: 'Линия Камы' },
          ],
        },
      },
    ],
    seo: {
      title: 'О проекте — ЖК Lenskaya',
      description: 'Узнайте больше о концепции, архитектуре и преимуществах жилого комплекса Lenskaya.',
    },
  },
];

export async function seedPages(apiBase: string, token: string): Promise<void> {
  for (const page of PAGES) {
    const response = await fetch(`${apiBase}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: page }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create page ${page.slug}: ${response.statusText}`);
    }
  }
}
