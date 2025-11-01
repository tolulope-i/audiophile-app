'use client';
import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'info';
};

type CartContext = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  subtotal: number;
  showCart: boolean;
  setShowCart: (b: boolean) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
};

const CartCtx = createContext<CartContext | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        showToast(`Updated ${item.name} quantity`, 'success');
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      showToast(`${item.name} added to cart`, 'success');
      return [...prev, item];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty === 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    showToast('Cart updated', 'info');
  };

  const removeItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    if (item) {
      showToast(`${item.name} removed from cart`, 'info');
    }
  };

  const clear = () => {
    setItems([]);
    showToast('Cart cleared', 'info');
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartCtx.Provider value={{ 
      items, 
      addItem, 
      updateQty, 
      removeItem, 
      clear, 
      subtotal, 
      showCart, 
      setShowCart,
      showToast 
    }}>
      {children}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};