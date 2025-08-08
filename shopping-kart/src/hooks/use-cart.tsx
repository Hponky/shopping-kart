"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode, useMemo } from 'react';
import { Cart } from '@/features/cart/domain/cart';
import { Product } from '@/features/products/domain/product';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => Promise<Cart>;
  updateQuantity: (productId: number, quantity: number) => Promise<Cart>;
  removeProduct: (productId: number) => Promise<Cart>;
  clearCart: () => Promise<Cart>; // Agregar esta línea
  getProductQuantity: (productId: number) => number;
  isProductInCart: (productId: number) => boolean;
  itemCount: number;
  totalPrice: number;
  refetch: () => Promise<void>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        // Validar que la respuesta tenga la estructura esperada
        if (data && typeof data === 'object' && Array.isArray(data.items)) {
          setCart(data);
        } else {
          throw new Error('Invalid cart data structure');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch cart`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addProduct = useCallback(async (product: Product): Promise<Cart> => {
    if (!product || typeof product.id !== 'number') {
      throw new Error('Invalid product data');
    }

    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        const updatedCart = await response.json();
        if (updatedCart && typeof updatedCart === 'object' && Array.isArray(updatedCart.items)) {
          setCart(updatedCart);
          return updatedCart;
        } else {
          throw new Error('Invalid cart data structure in response');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to add product`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error adding product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: number, quantity: number): Promise<Cart> => {
    if (typeof productId !== 'number' || typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Invalid productId or quantity');
    }

    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (response.ok) {
        const updatedCart = await response.json();
        if (updatedCart && typeof updatedCart === 'object' && Array.isArray(updatedCart.items)) {
          setCart(updatedCart);
          return updatedCart;
        } else {
          throw new Error('Invalid cart data structure in response');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to update quantity`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error updating quantity:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeProduct = useCallback(async (productId: number): Promise<Cart> => {
    if (typeof productId !== 'number') {
      throw new Error('Invalid productId');
    }

    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      
      if (response.ok) {
        const updatedCart = await response.json();
        if (updatedCart && typeof updatedCart === 'object' && Array.isArray(updatedCart.items)) {
          setCart(updatedCart);
          return updatedCart;
        } else {
          throw new Error('Invalid cart data structure in response');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to remove product`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error removing product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async (): Promise<Cart> => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clearAll: true }),
      });
      
      if (response.ok) {
        const updatedCart = await response.json();
        if (updatedCart && typeof updatedCart === 'object' && Array.isArray(updatedCart.items)) {
          setCart(updatedCart);
          return updatedCart;
        } else {
          throw new Error('Invalid cart data structure in response');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to clear cart`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error clearing cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductQuantity = useCallback((productId: number): number => {
    if (!cart?.items || typeof productId !== 'number') {
      return 0;
    }
    const item = cart.items.find(item => item.product?.id === productId);
    return item?.quantity || 0;
  }, [cart?.items]);

  const isProductInCart = useCallback((productId: number): boolean => {
    return getProductQuantity(productId) > 0;
  }, [getProductQuantity]);

  // Memoizar valores calculados para evitar re-renders innecesarios
  const itemCount = useMemo(() => {
    return cart?.items?.reduce((total, item) => {
      return total + (typeof item.quantity === 'number' ? item.quantity : 0);
    }, 0) || 0;
  }, [cart?.items]);

  const totalPrice = useMemo(() => {
    return cart?.items?.reduce((total, item) => {
      const price = typeof item.product?.price === 'number' ? item.product.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return total + (price * quantity);
    }, 0) || 0;
  }, [cart?.items]);

  const contextValue = useMemo(() => ({
    cart,
    loading,
    error,
    addProduct,
    updateQuantity,
    removeProduct,
    clearCart, // Agregar esta línea
    getProductQuantity,
    isProductInCart,
    itemCount,
    totalPrice,
    refetch: fetchCart,
    clearError,
  }), [
    cart,
    loading,
    error,
    addProduct,
    updateQuantity,
    removeProduct,
    getProductQuantity,
    isProductInCart,
    itemCount,
    totalPrice,
    fetchCart,
    clearError,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}