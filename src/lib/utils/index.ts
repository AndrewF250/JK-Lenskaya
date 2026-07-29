export function formatPrice(price: number, currency: string = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number): string {
  return `${area.toFixed(1)} м²`;
}

export function formatRooms(rooms: number): string {
  if (rooms === 0) return 'Студия';
  if (rooms === 1) return '1 комната';
  if (rooms >= 2 && rooms <= 4) return `${rooms} комнаты`;
  return `${rooms} комнат`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    free: 'Свободна',
    booked: 'Забронирована',
    sold: 'Продана',
    unpublished: 'Не опубликована',
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    free: 'text-green-600 bg-green-50',
    booked: 'text-yellow-600 bg-yellow-50',
    sold: 'text-red-600 bg-red-50',
    unpublished: 'text-gray-600 bg-gray-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `/images${path}`;
}
