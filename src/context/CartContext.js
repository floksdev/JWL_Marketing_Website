'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const CartContext = createContext(undefined);

function normalizeItem(item) {
  if (!item || !item.id) {
    throw new Error('Cart items require an id.');
  }
  return {
    quantity: 1,
    image: null,
    price: null,
    priceDisplay: null,
    href: '#',
    ...item,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const persistTimer = useRef(null);
  const isPersisting = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    async function hydrate() {
      try {
        const response = await fetch('/api/cart', { method: 'GET' });
        if (!response.ok) throw new Error('Cart hydration failed');
        const data = await response.json();
        if (!isCancelled && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!isCancelled) {
          setIsHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
    }

    persistTimer.current = setTimeout(async () => {
      if (isPersisting.current) return;
      isPersisting.current = true;

      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
      } catch (error) {
        console.error(error);
      } finally {
        isPersisting.current = false;
      }
    }, 200);

    return () => {
      if (persistTimer.current) {
        clearTimeout(persistTimer.current);
        persistTimer.current = null;
      }
    };
  }, [items, isHydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const addItem = useCallback((item) => {
    const normalized = normalizeItem(item);
    setItems(prev => {
      const existingIndex = prev.findIndex(entry => entry.id === normalized.id);
      if (existingIndex === -1) {
        return [...prev, normalized];
      }
      const updated = [...prev];
      const existing = updated[existingIndex];
      updated[existingIndex] = {
        ...existing,
        quantity: existing.quantity + (normalized.quantity || 1),
        price: normalized.price ?? existing.price,
        priceDisplay: normalized.priceDisplay ?? existing.priceDisplay,
        image: normalized.image ?? existing.image,
        href: normalized.href ?? existing.href,
      };
      return updated;
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }, []);

  const { total, count } = useMemo(() => {
    const totals = items.reduce((acc, item) => {
      const price = typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0;
      const qty = item.quantity ?? 1;
      acc.total += price * qty;
      acc.count += qty;
      return acc;
    }, { total: 0, count: 0 });
    return totals;
  }, [items]);

  const value = useMemo(() => ({
    items,
    isOpen,
    total,
    count,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }), [items, isOpen, total, count, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
