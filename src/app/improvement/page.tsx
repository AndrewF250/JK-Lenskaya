import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'Благоустройство — ЖК «Ленская»',
  description: 'Благоустроенная территория жилого комплекса «Ленская»: озеленение, детские площадки, зоны отдыха.',
});

export default function ImprovementPage() {
  return (
    <ContentPage
      title="Благоустройство"
      description="Озелененная территория с зонами отдыха и детскими площадками"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-4">Территория</h2>
            <p className="text-primary-600 mb-4">
              Территория жилого комплекса «Ленская» спроектирована с учетом максимального 
              комфорта для жителей. Озеленение, удобные дорожки и зоны отдыха создают 
              атмосферу уюта и спокойствия.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-primary-50 rounded-xl">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">2,5</div>
                <div className="text-sm text-primary-600">Гектара территория</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-xl">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">500+</div>
                <div className="text-sm text-primary-600">Деревьев и кустарников</div>
              </div>
            </div>
          </div>
          <div className="bg-primary-100 rounded-xl h-64 flex items-center justify-center">
            <p className="text-primary-500">Фото территории</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold mb-6">Элементы благоустройства</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Детские площадки', desc: 'Безопасные и современные игровые комплексы для детей разного возраста' },
              { title: 'Зоны отдыха', desc: 'Скамейки, беседки и места для отдыха на свежем воздухе' },
              { title: 'Спортивные зоны', desc: 'Тренажеры, воркаут-площадки и зоны для йоги' },
              { title: 'Озеленение', desc: 'Ландшафтный дизайн с многолетними растениями' },
              { title: 'Освещение', desc: 'Декоративное и функциональное освещение территории' },
              { title: 'Парковка', desc: 'Подземная и гостевая парковка для жителей и гостей' },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
