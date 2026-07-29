import Link from 'next/link';
import { ContactInfo } from '@/types';

const contactInfo: ContactInfo = {
  phone: '+7 (342) 123-45-67',
  email: 'info@lenskaya.ru',
  address: 'г. Пермь, ул. Ленская, 1',
  workingHours: 'Пн-Вс: 9:00 - 21:00',
  coordinates: {
    lat: 58.0105,
    lng: 56.2502,
  },
};

const footerLinks = [
  {
    title: 'О проекте',
    links: [
      { label: 'О комплексе', href: '/about' },
      { label: 'Архитектура', href: '/architecture' },
      { label: 'Благоустройство', href: '/improvement' },
      { label: 'Расположение', href: '/location' },
      { label: 'Инфраструктура', href: '/infrastructure' },
    ],
  },
  {
    title: 'Квартиры',
    links: [
      { label: 'Каталог квартир', href: '/catalog' },
      { label: 'Избранное', href: '/favorites' },
      { label: 'Ход проекта', href: '/progress' },
      { label: 'Галерея', href: '/gallery' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Новости', href: '/news' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Документы', href: '/documents' },
      { label: 'Политика конфиденциальности', href: '/privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">Л</span>
              </div>
              <div>
                <span className="text-xl font-display font-semibold text-white">
                  Ленская
                </span>
                <span className="block text-xs text-primary-400 -mt-1">
                  Премиальный ЖК
                </span>
              </div>
            </Link>
            <p className="text-primary-300 text-sm mb-6">
              Премиальный жилой комплекс бизнес-класса на правом берегу Камы в Перми.
              Современная архитектура, благоустроенная территория и развитая инфраструктура.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/lenskaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.78-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.487-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://vk.com/lenskaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 13.222c.478.464.988.907 1.39 1.449.18.24.348.491.425.788.112.44-.199.625-.558.643h-1.942c-.482.044-.864-.154-1.195-.444-.262-.232-.507-.484-.76-.726-.104-.1-.213-.195-.339-.26-.243-.127-.452-.078-.584.164-.134.248-.163.523-.179.802-.024.422-.154.533-.577.557-1.05.06-2.04-.112-2.93-.67-1.013-.637-1.79-1.5-2.46-2.49-1.278-1.887-2.24-3.95-3.07-6.08-.194-.496-.06-.756.477-.77.556-.014 1.112-.014 1.668 0 .432.008.62.218.754.644.56 1.767 1.302 3.45 2.224 5.034.24.408.48.824.844 1.134.365.31.645.208.832-.228.096-.224.136-.46.156-.7.066-.794.07-1.589-.046-2.38-.062-.42-.292-.698-.707-.79-.213-.048-.182-.125-.078-.22.19-.174.387-.283.765-.283h1.82c.284.056.35.188.388.472l.002 2.016c-.005.135.068.537.312.625.196.064.325-.093.44-.224.33-.376.568-.81.78-1.256.374-.792.658-1.627.924-2.478.11-.351.278-.518.668-.513.39.005.78.003 1.17.003.424.006.64.176.724.6.168.85.172 1.707.006 2.56-.12.613-.362 1.18-.63 1.732-.218.447-.452.885-.682 1.326-.2.382-.186.567.15.857z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Контакты
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-primary-300">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{contactInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-400 text-sm">
              © {new Date().getFullYear()} ЖК «Ленская». Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-primary-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-primary-400 hover:text-white text-sm transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
