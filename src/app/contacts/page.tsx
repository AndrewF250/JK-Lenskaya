import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';
import { YandexMap } from '@/components/ui/YandexMap';

export const metadata = generateSEO({
  title: 'Контакты — ЖК «Ленская»',
  description: 'Свяжитесь с нами: телефон, email, адрес офиса продаж жилого комплекса «Ленская» в Перми.',
});

export default function ContactsPage() {
  return (
    <ContentPage
      title="Контакты"
      description="Свяжитесь с нами любым удобным способом"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-display font-semibold mb-6">Офис продаж</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Адрес</h3>
                <p className="text-primary-600">г. Пермь, ул. Ленская, 1</p>
                <p className="text-sm text-primary-500 mt-1">ТЦ «Ленский», 2 этаж, офис 201</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Телефон</h3>
                <a href="tel:+73421234567" className="text-accent-600 hover:text-accent-700 text-lg font-medium">
                  +7 (342) 123-45-67
                </a>
                <p className="text-sm text-primary-500 mt-1">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a href="mailto:info@lenskaya.ru" className="text-accent-600 hover:text-accent-700">
                  info@lenskaya.ru
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Режим работы</h3>
                <p className="text-primary-600">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-primary-600">Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://t.me/lenskaya"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Telegram
            </a>
            <a
              href="https://wa.me/73421234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold mb-6">Как добраться</h2>
          <YandexMap height="400px" className="rounded-xl mb-6" />
          <div className="bg-primary-50 rounded-xl p-6">
            <h3 className="font-medium mb-3">На автомобиле</h3>
            <p className="text-primary-600 text-sm mb-4">
              По ул. Ленская до ТЦ «Ленский». Парковка бесплатная для посетителей.
            </p>
            <h3 className="font-medium mb-3">На общественном транспорте</h3>
            <p className="text-primary-600 text-sm">
              Автобусы: 2, 15, 42. Остановка «ТЦ Ленский».
            </p>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
