import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'Новости — ЖК «Ленская»',
  description: 'Последние новости жилого комплекса «Ленская»: ход строительства, события, обновления.',
});

const newsItems = [
  {
    id: '1',
    title: 'Старт продаж корпуса 3',
    excerpt: 'Открыты бронирования квартир в третьем корпусе жилого комплекса. Специальные условия для первых покупателей.',
    date: '15 декабря 2024',
    slug: 'start-sales-building-3',
  },
  {
    id: '2',
    title: 'Завершение отделки лобби',
    excerpt: 'Завершены работы по отделке общественных зон первого корпуса. Дизайн выполнен в премиальном стиле.',
    date: '10 декабря 2024',
    slug: 'lobby-renovation-complete',
  },
  {
    id: '3',
    title: 'Благоустройство территории',
    excerpt: 'Начаты работы по озеленению и благоустройству двора. Высажены первые деревья и кустарники.',
    date: '5 декабря 2024',
    slug: 'territory-improvement',
  },
  {
    id: '4',
    title: 'Подключение коммуникаций',
    excerpt: 'Завершено подключение центрального отопления и водоснабжения к первому корпусу.',
    date: '28 ноября 2024',
    slug: 'utilities-connected',
  },
  {
    id: '5',
    title: 'Отделка квартир',
    excerpt: 'Начата чистовая отделка квартир в первом корпусе. Доступны варианты с разными дизайн-проектами.',
    date: '20 ноября 2024',
    slug: 'apartment-finishing',
  },
];

export default function NewsPage() {
  return (
    <ContentPage
      title="Новости"
      description="Последние новости жилого комплекса"
    >
      <div className="space-y-6">
        {newsItems.map((item) => (
          <article key={item.id} className="card p-6 hover:shadow-md transition-shadow">
            <time className="text-sm text-primary-500">{item.date}</time>
            <h2 className="text-xl font-display font-semibold mt-2 mb-3">
              <Link href={`/news/${item.slug}`} className="hover:text-accent-600 transition-colors">
                {item.title}
              </Link>
            </h2>
            <p className="text-primary-600 mb-4">{item.excerpt}</p>
            <Link href={`/news/${item.slug}`} className="text-accent-600 hover:text-accent-700 font-medium text-sm">
              Читать далее →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="btn-secondary">Загрузить еще</button>
      </div>
    </ContentPage>
  );
}
