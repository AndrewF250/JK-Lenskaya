import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatArea,
  formatRooms,
  getStatusLabel,
  getStatusColor,
  cn,
  debounce,
  generateSlug,
  truncateText,
  getImageUrl,
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('should format price in RUB', () => {
      const result = formatPrice(12000000);
      expect(result).toContain('12');
      expect(result).toContain('000');
    });

    it('should format price with custom currency', () => {
      const result = formatPrice(12000000, 'USD');
      expect(result).toBeDefined();
    });

    it('should format zero price', () => {
      const result = formatPrice(0);
      expect(result).toContain('0');
    });

    it('should format large price', () => {
      const result = formatPrice(1000000000);
      expect(result).toBeDefined();
    });
  });

  describe('formatArea', () => {
    it('should format area with one decimal', () => {
      const result = formatArea(65.5);
      expect(result).toBe('65.5 м²');
    });

    it('should format area without decimals', () => {
      const result = formatArea(65);
      expect(result).toBe('65.0 м²');
    });

    it('should format small area', () => {
      const result = formatArea(0.1);
      expect(result).toBe('0.1 м²');
    });
  });

  describe('formatRooms', () => {
    it('should format studio', () => {
      expect(formatRooms(0)).toBe('Студия');
    });

    it('should format 1 room', () => {
      expect(formatRooms(1)).toBe('1 комната');
    });

    it('should format 2 rooms', () => {
      expect(formatRooms(2)).toBe('2 комнаты');
    });

    it('should format 3 rooms', () => {
      expect(formatRooms(3)).toBe('3 комнаты');
    });

    it('should format 4 rooms', () => {
      expect(formatRooms(4)).toBe('4 комнаты');
    });

    it('should format 5 rooms', () => {
      expect(formatRooms(5)).toBe('5 комнат');
    });
  });

  describe('getStatusLabel', () => {
    it('should return label for free status', () => {
      expect(getStatusLabel('free')).toBe('Свободна');
    });

    it('should return label for booked status', () => {
      expect(getStatusLabel('booked')).toBe('Забронирована');
    });

    it('should return label for sold status', () => {
      expect(getStatusLabel('sold')).toBe('Продана');
    });

    it('should return label for unpublished status', () => {
      expect(getStatusLabel('unpublished')).toBe('Не опубликована');
    });

    it('should return original status for unknown', () => {
      expect(getStatusLabel('unknown')).toBe('unknown');
    });
  });

  describe('getStatusColor', () => {
    it('should return color for free status', () => {
      const result = getStatusColor('free');
      expect(result).toContain('green');
    });

    it('should return color for booked status', () => {
      const result = getStatusColor('booked');
      expect(result).toContain('yellow');
    });

    it('should return color for sold status', () => {
      const result = getStatusColor('sold');
      expect(result).toContain('red');
    });

    it('should return color for unpublished status', () => {
      const result = getStatusColor('unpublished');
      expect(result).toContain('gray');
    });

    it('should return default color for unknown status', () => {
      const result = getStatusColor('unknown');
      expect(result).toContain('gray');
    });
  });

  describe('cn', () => {
    it('should join classes', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should filter out falsy values', () => {
      expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      expect(cn()).toBe('');
    });
  });

  describe('generateSlug', () => {
    it('should generate slug from text', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Hello, World!')).toBe('hello-world');
    });

    it('should handle multiple spaces', () => {
      expect(generateSlug('Hello   World')).toBe('hello-world');
    });

    it('should handle leading/trailing hyphens', () => {
      expect(generateSlug('-Hello World-')).toBe('hello-world');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a long text that needs to be truncated';
      expect(truncateText(text, 20)).toBe('This is a long text...');
    });

    it('should not truncate short text', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('should handle exact length', () => {
      const text = 'Exactly twenty chars';
      expect(truncateText(text, 20)).toBe('Exactly twenty chars');
    });
  });

  describe('getImageUrl', () => {
    it('should return http url as is', () => {
      expect(getImageUrl('http://example.com/image.jpg')).toBe('http://example.com/image.jpg');
    });

    it('should return https url as is', () => {
      expect(getImageUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
    });

    it('should add /images prefix to relative path', () => {
      expect(getImageUrl('/apartments/1.jpg')).toBe('/images/apartments/1.jpg');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let count = 0;
      const debouncedFn = debounce(() => {
        count++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(count).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(count).toBe(1);
    });
  });
});