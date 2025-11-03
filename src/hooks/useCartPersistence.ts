'use client';
import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

export function useCartPersistence() {
  const { items, setItems } = useCart();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedCart = localStorage.getItem('audiophile_cart');
          if (savedCart) {
            const parsedItems = JSON.parse(savedCart);
            setItems(parsedItems);
          }
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    };
    
    loadCart();
  }, [setItems]);

  // Save cart to localStorage when items change
  useEffect(() => {
    const saveCart = () => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('audiophile_cart', JSON.stringify(items));
        }
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    };
    
    saveCart();
  }, [items]);
}