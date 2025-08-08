'use client';

import { useEffect, useState } from 'react';
import { Cart } from '@/features/cart/domain/cart';

export const CartComponent = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.product.id} className="flex justify-between items-center mb-2">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};