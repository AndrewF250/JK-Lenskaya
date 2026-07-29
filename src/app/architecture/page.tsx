import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'Архитектура — ЖК «Ленская»',
  description: 'Современная архитектура жилого комплекса «Ленская»: вентилируемые фасады, панорамное остекление, энергоэффективность класса A.',
});

export default function ArchitecturePage() {
  return (
    <ContentPage
      title="Архитектура"
      description="Современный дизайн с использованием премиальных материалов"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-4">Фасады</h2>
            <p className="text-primary-600 mb-4">
              Вентилируемые фасады с использованием натурального камня и композитных панелей. 
              Панорамное остекление с энергосберегающими стеклопакетами обеспечивают максимальное 
              естественное освещение и прекрасные виды.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Натуральный камень</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Панорамное остекление</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Энергоэффективность класса A</span>
              </li>
            </ul>
          </div>
          <div className="bg-primary-100 rounded-xl h-64 flex items-center justify-center">
            <p className="text-primary-500">Фото фасадов</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary-100 rounded-xl h-64 flex items-center justify-center order-2 md:order-1">
            <p className="text-primary-500">Фото планировок</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-display font-semibold mb-4">Планировки</h2>
            <p className="text-primary-600 mb-4">
              Эргономичные планировки с высокими потолками 3,1 м. Умные решения для хранения 
              и зонирования пространства. Каждая квартира спроектирована с учетом максимального 
              комфорта для жителей.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Потолки 3,1 м</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Панорамные окна</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Свободная планировка</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
