import React, { useEffect, useRef, ReactNode } from 'react';
import cl from './styles.module.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={cl.modalOverlay}>
      <div className={cl.modalContent} ref={modalRef}>
        <button
          className={cl.modalClose}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <div className={cl.modalBody}>{children}</div>
      </div>
    </div>
  );
};
