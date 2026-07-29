import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';
import { YandexMap } from '@/components/ui/YandexMap';

export const metadata = generateSEO({
  title: 'Расположение — ЖК «Ленская»',
  description: 'Удобное расположение жилого комплекса «Ленская» в Перми: набережная, парки, школы, транспорт.',
});

export default function LocationPage() {
  return (
    <ContentPage
      title="Расположение"
      description="Удобная транспортная доступность и развитая инфраструктура"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-4">Район</h2>
            <p className="text-primary-600 mb-6">
              ЖК «Ленская» расположен в престижном районе Перми на правом берегу Камы. 
              Рядом — набережная, парки, школы, детские сады и торговые центры. 
              Удобная транспортная доступность позволяет быстро добраться до любой части города.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">5 минут</div>
                  <div className="text-sm text-primary-500">до набережной Камы</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">10 минут</div>
                  <div className="text-sm text-primary-500">до школ и детских садов</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">15 минут</div>
                  <div className="text-sm text-primary-500">до торговых центров</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <YandexMap height="400px" className="rounded-xl" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold mb-6">Инфраструктура района</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏥', title: 'Медицина', items: ['Поликлиника', 'Аптеки', 'Стоматология'] },
              { icon: '🏫', title: 'Образование', items: ['Школы', 'Детские сады', 'Университеты'] },
              { icon: '🛒', title: 'Торговля', items: ['ТЦ', 'Супермаркеты', 'Магазины'] },
              { icon: '🌳', title: 'Отдых', items: ['Парки', 'Набережная', 'Скверы'] },
            ].map((category, index) => (
              <div key={index} className="card p-4">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-display font-semibold mb-2">{category.title}</h3>
                <ul className="text-sm text-primary-600 space-y-1">
                  {category.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
