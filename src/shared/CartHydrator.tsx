'use client';

import { useEffect } from 'react';
import { useCartStore } from '../storage/cartStore';

export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}
