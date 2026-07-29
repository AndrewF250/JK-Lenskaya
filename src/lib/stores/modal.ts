import { create } from 'zustand';
import { ModalType } from '@/types';

interface ModalState {
  activeModal: ModalType | null;
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  isOpen: false,

  openModal: (type: ModalType) => {
    set({ activeModal: type, isOpen: true });
  },

  closeModal: () => {
    set({ activeModal: null, isOpen: false });
  },
}));
