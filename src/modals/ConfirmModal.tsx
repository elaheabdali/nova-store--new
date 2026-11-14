'use client';

import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import styled from 'styled-components';
import { Button, SecondaryButton } from '@/shared/StoreButtons';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  animation: slideUp 0.3s ease-out;
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.orangeSoft};
    color: ${({ theme }) => theme.colors.orange};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  h3 {
    color: ${({ theme }) => theme.colors.navy};
    font-size: 18px;
    margin: 0 0 10px;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    line-height: 1.6;
    margin: 0 0 25px;
  }
  .actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    button {
      flex: 1;
    }
  }
`;

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  confirmIcon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirmIcon,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <div className="icon-wrapper">
          <AlertTriangle size={28} />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="actions">
          <SecondaryButton type="button" onClick={onCancel}>
            {cancelLabel}
          </SecondaryButton>
          <Button
            type="button"
            onClick={onConfirm}
            style={{ background: '#d65d57' }}
          >
            {confirmIcon}
            {confirmLabel}
          </Button>
        </div>
      </ModalBox>
    </ModalOverlay>
  );
}
