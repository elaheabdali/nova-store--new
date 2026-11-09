import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  hasHydrated: boolean;
  addItem: (product: Product) => void;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
}

const browserStorage: StateStorage = {
  getItem: (name) => typeof window === 'undefined' ? null : window.localStorage.getItem(name),
  setItem: (name, value) => { if (typeof window !== 'undefined') window.localStorage.setItem(name, value); },
  removeItem: (name) => { if (typeof window !== 'undefined') window.localStorage.removeItem(name); },
};

export const useCartStore = create<CartState>()(persist(
  (set) => ({
    items: [],
    hasHydrated: false,
    addItem: (product) => set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      return existing
        ? { items: state.items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) }
        : { items: [...state.items, { product, quantity: 1 }] };
    }),
    increase: (productId) => set((state) => ({ items: state.items.map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item) })),
    decrease: (productId) => set((state) => ({ items: state.items.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item) })),
    removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
    clearCart: () => set({ items: [] }),
    setHasHydrated: (value) => set({ hasHydrated: value }),
  }),
  {
    name: 'nova-store-cart-v1',
    storage: createJSONStorage(() => browserStorage),
    skipHydration: true,
    partialize: (state) => ({ items: state.items }),
    onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
  },
));

export const selectCartCount = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (items: CartItem[]) => items.reduce((total, item) => total + item.product.price * item.quantity, 0);
