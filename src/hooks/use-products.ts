"use client";

import { useState, useEffect } from 'react';
import { ProductShowcaseItem } from '@/types/ui-components';

export function useProducts() {
  const [products, setProducts] = useState<ProductShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: "MacBook Pro 16\" M3 Max",
            price: 3499,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
            rating: 4.9,
            reviews: 234,
            category: "Laptops",
            featured: true
          },
          {
            id: 2,
            name: "iPhone 15 Pro Max",
            price: 1199,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
            rating: 4.8,
            reviews: 567,
            category: "Smartphones",
            featured: true
          },
          {
            id: 3,
            name: "AirPods Pro 2nd Gen",
            price: 249,
            image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop",
            rating: 4.6,
            reviews: 892,
            category: "Audio",
            featured: true
          }
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch {
        setError('Error al cargar productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}