'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useModalStore } from '@/lib/stores/modal';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'О проекте', href: '/about' },
  { label: 'Квартиры', href: '/catalog' },
  { label: 'Архитектура', href: '/architecture' },
  { label: 'Благоустройство', href: '/improvement' },
  { label: 'Расположение', href: '/location' },
  { label: 'Галерея', href: '/gallery' },
  { label: 'Ход проекта', href: '/progress' },
  { label: 'Новости', href: '/news' },
  { label: 'Контакты', href: '/contacts' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getCount } = useFavoritesStore();
  const { openModal } = useModalStore();
  const favoritesCount = getCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display text-xl font-bold">Л</span>
            </div>
            <div>
              <span className="text-xl font-display font-semibold text-graphite">
                Ленская
              </span>
              <span className="block text-xs text-primary-500 -mt-1">
                Премиальный ЖК
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === item.href
                    ? 'text-accent-600'
                    : 'text-primary-700 hover:text-accent-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Favorites */}
            <Link
              href="/favorites"
              className="relative p-2 text-primary-700 hover:text-accent-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-bronze-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => openModal('consultation')}
              className="hidden sm:inline-flex"
            >
              Записаться
            </Button>

            {/* Phone */}
            <a
              href="tel:+73421234567"
              className="hidden md:flex items-center gap-2 text-primary-700 hover:text-accent-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">+7 (342) 123-45-67</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary-700 hover:text-accent-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-primary-100 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg',
                    pathname === item.href
                      ? 'bg-accent-50 text-accent-600'
                      : 'text-primary-700 hover:bg-primary-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-primary-100">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    openModal('consultation');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Записаться на просмотр
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Button({ variant, size, className, children, onClick }: {
  variant: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        variant === 'primary' && 'bg-accent-600 text-white hover:bg-accent-700',
        size === 'sm' && 'px-4 py-2 text-sm',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
