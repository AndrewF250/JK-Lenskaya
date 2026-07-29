'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-milk">
          <div className="text-center px-4">
            <h1 className="text-6xl font-display font-bold text-red-600 mb-4">Ошибка</h1>
            <h2 className="text-2xl font-display font-semibold mb-4">Что-то пошло не так</h2>
            <p className="text-lg text-primary-600 mb-8 max-w-md mx-auto">
              Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="btn-primary"
              >
                Попробовать снова
              </button>
              <Link href="/" className="btn-secondary">
                На главную
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
