'use client';

import styled from 'styled-components';

export const Button = styled.button`
  min-height:45px;padding:0 20px;border:0;border-radius:11px;background:${({theme})=>theme.colors.orange};color:white;font-weight:900;font-size:12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.18s;&:hover{filter:brightness(.96);transform:translateY(-1px)}&:disabled{opacity:.5;cursor:not-allowed;transform:none}
`;
export const SecondaryButton = styled.button`
  min-height:42px;padding:0 16px;border:1px solid ${({theme})=>theme.colors.border};border-radius:10px;background:${({theme})=>theme.colors.surface};color:${({theme})=>theme.colors.text};font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;gap:8px;
`;
