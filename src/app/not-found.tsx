import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-milk">
      <div className="text-center px-4">
        <h1 className="text-9xl font-display font-bold text-accent-600 mb-4">404</h1>
        <h2 className="text-3xl font-display font-semibold mb-4">Страница не найдена</h2>
        <p className="text-lg text-primary-600 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">На главную</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="secondary" size="lg">Каталог квартир</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
