import { describe, it, expect, beforeEach } from 'vitest';
import { useModalStore } from '@/lib/stores/modal';

describe('Modal Store', () => {
  beforeEach(() => {
    useModalStore.getState().closeModal();
  });

  it('should have null activeModal initially', () => {
    const { activeModal } = useModalStore.getState();
    expect(activeModal).toBeNull();
  });

  it('should have isOpen false initially', () => {
    const { isOpen } = useModalStore.getState();
    expect(isOpen).toBe(false);
  });

  it('should open modal with type', () => {
    const { openModal } = useModalStore.getState();
    openModal('consultation');

    const { activeModal, isOpen } = useModalStore.getState();
    expect(activeModal).toBe('consultation');
    expect(isOpen).toBe(true);
  });

  it('should close modal', () => {
    const { openModal, closeModal } = useModalStore.getState();
    openModal('consultation');
    closeModal();

    const { activeModal, isOpen } = useModalStore.getState();
    expect(activeModal).toBeNull();
    expect(isOpen).toBe(false);
  });

  it('should open different modal types', () => {
    const { openModal } = useModalStore.getState();
    
    openModal('consultation');
    expect(useModalStore.getState().activeModal).toBe('consultation');

    openModal('callback');
    expect(useModalStore.getState().activeModal).toBe('callback');

    openModal('presentation');
    expect(useModalStore.getState().activeModal).toBe('presentation');
  });

  it('should handle opening same modal type multiple times', () => {
    const { openModal } = useModalStore.getState();
    
    openModal('consultation');
    openModal('consultation');

    const { activeModal, isOpen } = useModalStore.getState();
    expect(activeModal).toBe('consultation');
    expect(isOpen).toBe(true);
  });

  it('should handle closing already closed modal', () => {
    const { closeModal } = useModalStore.getState();
    closeModal();

    const { activeModal, isOpen } = useModalStore.getState();
    expect(activeModal).toBeNull();
    expect(isOpen).toBe(false);
  });
});