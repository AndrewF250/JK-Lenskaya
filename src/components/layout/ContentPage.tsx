import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ContentPageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ContentPage({ title, description, children }: ContentPageProps) {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-graphite to-primary-900 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-4">{title}</h1>
          <p className="text-lg text-primary-200 max-w-2xl">{description}</p>
        </div>

        {/* Content */}
        {children || (
          <div className="prose prose-lg max-w-none">
            <p className="text-primary-600 text-lg">
              Содержимое страницы находится в разработке. Следите за обновлениями.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-primary-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-display font-semibold mb-4">Заинтересовались?</h2>
          <p className="text-primary-600 mb-6 max-w-md mx-auto">
            Запишитесь на бесплатную консультацию и узнайте больше о жилом комплексе
          </p>
          <Button size="lg">Записаться на консультацию</Button>
        </div>
      </div>
    </div>
  );
}
