import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'О проекте — ЖК «Ленская»',
  description: 'Узнайте больше о премиальном жилом комплексе «Ленская» в Перми. Архитектура, инфраструктура, благоустройство.',
});

export default function AboutPage() {
  return (
    <ContentPage
      title="О проекте"
      description="Премиальный жилой комплекс бизнес-класса на правом берегу Камы"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-display font-semibold mb-4">О комплексе</h2>
          <p className="text-primary-600 mb-4">
            ЖК «Ленская» — это уникальный проект премиального жилого комплекса, расположенного 
            в живописном месте на правом берегу реки Камы в Перми. Комплекс сочетает в себе 
            современную архитектуру, высокое качество строительства и развитую инфраструктуру.
          </p>
          <p className="text-primary-600">
            Проект включает 5 жилых корпусов с квартирами различных планировок — от уютных студий 
            до просторных четырехкомнатных квартир с панорамными видами на реку и город.
          </p>
        </div>
        <div className="bg-primary-100 rounded-xl h-64 flex items-center justify-center">
          <p className="text-primary-500">Фото комплекса</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-primary-50 rounded-xl">
          <div className="text-4xl font-display font-bold text-accent-600 mb-2">5</div>
          <div className="text-primary-600">Корпусов</div>
        </div>
        <div className="text-center p-6 bg-primary-50 rounded-xl">
          <div className="text-4xl font-display font-bold text-accent-600 mb-2">709</div>
          <div className="text-primary-600">Квартир</div>
        </div>
        <div className="text-center p-6 bg-primary-50 rounded-xl">
          <div className="text-4xl font-display font-bold text-accent-600 mb-2">2,5</div>
          <div className="text-primary-600">Гектара территория</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">Преимущества</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Премиальное расположение</h3>
              <p className="text-primary-600">Рядом набережная, парки, школы и торговые центры</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Современная архитектура</h3>
              <p className="text-primary-600">Панорамное остекление, вентилируемые фасады, высокие потолки</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Благоустроенная территория</h3>
              <p className="text-primary-600">Озеленение, детские площадки, зоны отдыха</p>
            </div>
          </li>
        </ul>
      </div>
    </ContentPage>
  );
}
