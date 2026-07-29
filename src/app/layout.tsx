import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ModalManager } from '@/components/modals/ModalManager';
import { WebVitalsReporter } from '@/components/providers/WebVitalsReporter';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'ЖК «Ленская» — Премиальный жилой комплекс в Перми',
    template: '%s | ЖК «Ленская»',
  },
  description: 'Премиальный жилой комплекс бизнес-класса на правом берегу Камы. Современная архитектура, благоустроенная территория, квартиры от 25 до 120 м².',
  keywords: ['ЖК Ленская', 'квартиры в Перми', 'новостройки Пермь', 'премиальное жилье', 'жилой комплекс'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://lenskaya.ru',
    siteName: 'ЖК «Ленская»',
    title: 'ЖК «Ленская» — Премиальный жилой комплекс в Перми',
    description: 'Премиальный жилой комплекс бизнес-класса на правом берегу Камы',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ЖК «Ленская»',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lenskaya.ru',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-milk text-graphite antialiased">
        <QueryProvider>
          <WebVitalsReporter />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ModalManager />
        </QueryProvider>
      </body>
    </html>
  );
}
