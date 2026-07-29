'use client';

import { useState } from 'react';
import { useSubmitLead } from '@/lib/hooks/useApartments';
import { useModalStore } from '@/lib/stores/modal';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ModalType, Lead } from '@/types';

const modalConfig: Record<ModalType, { title: string; description: string }> = {
  consultation: {
    title: 'Записаться на консультацию',
    description: 'Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут',
  },
  booking: {
    title: 'Забронировать квартиру',
    description: 'Оставьте заявку на бронирование и мы свяжемся с вами для подтверждения',
  },
  presentation: {
    title: 'Скачать презентацию',
    description: 'Получите подробную презентацию жилого комплекса на почту',
  },
  selection: {
    title: 'Подобрать квартиру',
    description: 'Расскажите о ваших пожеланиях и мы подберем лучшие варианты',
  },
  subscription: {
    title: 'Подписаться на обновления',
    description: 'Получайте новости о ходе строительства и специальных предложениях',
  },
};

export function ModalManager() {
  const { activeModal, isOpen, closeModal } = useModalStore();

  if (!activeModal || !isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalConfig[activeModal].title}>
      <LeadForm type={activeModal} description={modalConfig[activeModal].description} onSuccess={closeModal} />
    </Modal>
  );
}

interface LeadFormProps {
  type: ModalType;
  description: string;
  onSuccess: () => void;
}

function LeadForm({ type, description, onSuccess }: LeadFormProps) {
  const submitLead = useSubmitLead();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный номер телефона';
    }

    if (type === 'presentation' && !formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const lead: Lead = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      type,
      message: formData.message || undefined,
      utmSource: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') || undefined : undefined,
      utmMedium: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_medium') || undefined : undefined,
      utmCampaign: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') || undefined : undefined,
    };

    try {
      await submitLead.mutateAsync(lead);
      onSuccess();
    } catch (error) {
      console.error('Failed to submit lead:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-primary-600 mb-6">{description}</p>

      <Input
        label="Имя *"
        placeholder="Введите ваше имя"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />

      <Input
        label="Телефон *"
        type="tel"
        placeholder="+7 (___) ___-__-__"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
      />

      <Input
        label={type === 'presentation' ? 'Email *' : 'Email'}
        type="email"
        placeholder="example@mail.ru"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        helperText={type === 'presentation' ? 'На этот адрес будет отправлена презентация' : undefined}
      />

      {(type === 'consultation' || type === 'selection') && (
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1.5">Сообщение</label>
          <textarea
            className="input-field min-h-[100px] resize-y"
            placeholder="Расскажите о ваших пожеланиях..."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />
        </div>
      )}

      <Button type="submit" className="w-full" isLoading={submitLead.isPending}>
        {type === 'presentation' ? 'Скачать презентацию' : 'Отправить заявку'}
      </Button>

      <p className="text-xs text-primary-500 text-center">
        Нажимая кнопку, вы соглашаетесь с{' '}
        <a href="/privacy" className="text-accent-600 hover:underline">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  );
}
