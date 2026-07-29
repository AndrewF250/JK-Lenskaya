'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useModalStore } from '@/lib/stores/modal';
import { ApartmentCard } from '@/components/catalog/ApartmentCard';
import { useApartments } from '@/lib/hooks/useApartments';
import { YandexMap } from '@/components/ui/YandexMap';
import { CatalogFilter } from '@/types';

const defaultFilters: CatalogFilter = {
  page: 1,
  limit: 4,
};

export default function HomePage() {
  const { openModal } = useModalStore();
  const { data: apartmentsData } = useApartments(defaultFilters);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-graphite to-primary-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-graphite/80" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-in">
            ЖК «Ленская»
          </h1>
          <p className="text-xl md:text-2xl text-primary-200 mb-8 max-w-3xl mx-auto animate-slide-up">
            Премиальный жилой комплекс бизнес-класса на правом берегу Камы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" onClick={() => openModal('consultation')}>
              Записаться на просмотр
            </Button>
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/catalog">Выбрать квартиру</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. Manifest Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">Манифест</h2>
            <p className="text-lg md:text-xl text-primary-600 leading-relaxed mb-8">
              «Ленская» — это больше, чем жилой комплекс. Это философия жизни, где каждый деталь 
              продумана для вашего комфорта. Мы создаем пространство, где современная архитектура 
              гармонично сочетается с природой, а премиальное качество становится частью повседневной жизни.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Архитектура</h3>
                <p className="text-primary-600">Современный дизайн с использованием премиальных материалов</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Благоустройство</h3>
                <p className="text-primary-600">Озелененная территория с зонами отдыха и детскими площадками</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Расположение</h3>
                <p className="text-primary-600">Удобная транспортная доступность и развитая инфраструктура</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Master Plan Section */}
      <section className="py-24 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Генплан</h2>
            <p className="section-subtitle mx-auto">
              Территория комплекса спроектирована с учетом максимального комфорта для жителей
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="aspect-video bg-primary-100 rounded-xl flex items-center justify-center">
              <p className="text-primary-500 text-lg">Интерактивный генплан</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">5</div>
                <div className="text-sm text-primary-600">Корпусов</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">709</div>
                <div className="text-sm text-primary-600">Квартир</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">25-120</div>
                <div className="text-sm text-primary-600">м² площадь</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-display font-bold text-accent-600 mb-2">2,5</div>
                <div className="text-sm text-primary-600">Гектара территория</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Location Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Расположение</h2>
              <p className="text-lg text-primary-600 mb-8">
                ЖК «Ленская» расположен в престижном районе Перми на правом берегу Камы. 
                Рядом — набережная, парки, школы, детские сады и торговые центры.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
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
                <div className="flex items-center gap-4">
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
                <div className="flex items-center gap-4">
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
            <YandexMap height="384px" className="rounded-2xl" />
          </div>
        </div>
      </section>

      {/* 5. Architecture Section */}
      <section className="py-24 bg-graphite text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6">Архитектура</h2>
            <p className="text-lg text-primary-300 max-w-3xl mx-auto">
              Современная архитектура с использованием премиальных материалов и инновационных решений
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-semibold mb-4">Фасады</h3>
              <p className="text-primary-300 mb-6">
                Вентилируемые фасады с использованием натурального камня и композитных панелей. 
                Панорамное остекление с энергосберегающими стеклопакетами.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Натуральный камень</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Панорамное остекление</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Энергоэффективность класса A</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-semibold mb-4">Планировки</h3>
              <p className="text-primary-300 mb-6">
                Эргономичные планировки с высокими потолками 3,1 м. 
                Умные решения для хранения и зонирования пространства.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Потолки 3,1 м</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Панорамные окна</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Свободная планировка</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Infrastructure Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Инфраструктура</h2>
            <p className="section-subtitle mx-auto">
              Все необходимое для комфортной жизни в шаговой доступности
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏥', title: 'Медицина', desc: 'Поликлиника и аптеки' },
              { icon: '🏫', title: 'Образование', desc: 'Школы и детские сады' },
              { icon: '🛒', title: 'Торговля', desc: 'Торговые центры и магазины' },
              { icon: '🌳', title: 'Отдых', desc: 'Парки и набережная' },
              { icon: '🏋️', title: 'Спорт', desc: 'Фитнес-центры и стадионы' },
              { icon: '🍽️', title: 'Рестораны', desc: 'Кафе и рестораны' },
              { icon: '🚌', title: 'Транспорт', desc: 'Остановки и метро' },
              { icon: '🎭', title: 'Культура', desc: 'Театры и музеи' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-primary-50 hover:bg-accent-50 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Apartments Preview Section */}
      <section className="py-24 bg-primary-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="section-title mb-2">Квартиры</h2>
              <p className="text-lg text-primary-600">Выберите идеальную квартиру для вашей семьи</p>
            </div>
            <Link href="/catalog" className="btn-secondary mt-4 md:mt-0">
              Смотреть все квартиры
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apartmentsData?.data.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Progress Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Ход строительства</h2>
            <p className="section-subtitle mx-auto">
              Следите за progressом строительства в режиме реального времени
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { building: 'Корпус 1', progress: 75, status: 'Отделка фасада' },
              { building: 'Корпус 2', progress: 45, status: 'Возведение стен' },
              { building: 'Корпус 3', progress: 20, status: 'Фундамент' },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-display font-semibold">{item.building}</h3>
                  <span className="text-2xl font-bold text-accent-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-3 mb-4">
                  <div
                    className="bg-accent-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="text-primary-600">{item.status}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/progress" className="btn-primary">
              Подробнее о ходе строительства
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Gallery Section */}
      <section className="py-24 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Галерея</h2>
            <p className="section-subtitle mx-auto">
              Визуализации и фотографии жилого комплекса
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-primary-200 rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                <div className="w-full h-full flex items-center justify-center text-primary-400">
                  Фото {item}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-secondary">
              Смотреть все фото
            </Link>
          </div>
        </div>
      </section>

      {/* 10. News Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title mb-0">Новости</h2>
            <Link href="/news" className="text-accent-600 hover:text-accent-700 font-medium">
              Все новости →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Старт продаж корпуса 3', date: '15 декабря 2024', excerpt: 'Открыты бронирования квартир в третьем корпусе жилого комплекса' },
              { title: 'Завершение отделки лобби', date: '10 декабря 2024', excerpt: 'Завершены работы по отделке общественных зон первого корпуса' },
              { title: 'Благоустройство территории', date: '5 декабря 2024', excerpt: 'Начаты работы по озеленению и благоустройству двора' },
            ].map((item, index) => (
              <article key={index} className="card p-6 hover:shadow-md transition-shadow">
                <time className="text-sm text-primary-500">{item.date}</time>
                <h3 className="text-xl font-display font-semibold mt-2 mb-3">{item.title}</h3>
                <p className="text-primary-600 mb-4">{item.excerpt}</p>
                <Link href="/news" className="text-accent-600 hover:text-accent-700 font-medium text-sm">
                  Читать далее →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA Section */}
      <section className="py-24 bg-accent-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6">
            Готовы выбрать квартиру мечты?
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Запишитесь на бесплатную консультацию и получите индивидуальное предложение
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-accent-600 hover:bg-primary-50">
              Записаться на консультацию
            </Button>
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/catalog">Выбрать квартиру</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-graphite z-50 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-20 h-20 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-display font-bold">Л</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">ЖК «Ленская»</h1>
        <p className="text-primary-300 mb-8">Премиальный жилой комплекс</p>
        <div className="w-64 bg-white/20 rounded-full h-2 mx-auto">
          <div
            className="bg-accent-500 h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={onComplete}
          className="mt-8 text-primary-400 hover:text-white transition-colors text-sm"
        >
          Пропустить
        </button>
      </div>
    </div>
  );
}
