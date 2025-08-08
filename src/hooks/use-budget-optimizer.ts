"use client";

import { useState, useCallback } from 'react';
import { Product } from '@/features/products/domain/product';
import { useCart } from '@/hooks/use-cart';
import { modernProductRepository } from '@/features/products/infrastructure/modern-product-repository';

interface OptimizationResult {
  products: Product[];
  totalValue: number;
  remainingBudget: number;
}

export function useBudgetOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState<OptimizationResult | null>(null);
  const { addProduct, clearCart } = useCart();

  // Algoritmo de optimización (Knapsack Problem)
  const findBestCombination = useCallback((products: Product[], budget: number): OptimizationResult => {
    const n = products.length;
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));
    
    // Llenar la tabla DP
    for (let i = 1; i <= n; i++) {
      const product = products[i - 1];
      const price = Math.floor(product.price);
      
      for (let w = 0; w <= budget; w++) {
        if (price <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - price] + price
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
    
    // Reconstruir la solución
    const selectedProducts: Product[] = [];
    let w = budget;
    
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        const product = products[i - 1];
        selectedProducts.push(product);
        w -= Math.floor(product.price);
      }
    }
    
    const totalValue = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    
    return {
      products: selectedProducts,
      totalValue,
      remainingBudget: budget - totalValue
    };
  }, []);

  const optimizeAndAddToCart = useCallback(async (budget: number) => {
    setIsOptimizing(true);
    
    try {
      // Obtener todos los productos disponibles
      const allProducts = await modernProductRepository.findAll();
      const availableProducts = allProducts.filter(p => p.inStock && p.price <= budget);
      
      if (availableProducts.length === 0) {
        throw new Error('No hay productos disponibles dentro del presupuesto especificado');
      }
      
      // Encontrar la mejor combinación
      const result = findBestCombination(availableProducts, Math.floor(budget));
      
      if (result.products.length === 0) {
        throw new Error('No se pudo encontrar una combinación óptima de productos para este presupuesto');
      }
      
      setLastOptimization(result);
      
      // Limpiar carrito actual y agregar productos optimizados
      await clearCart();
      
      // Agregar productos uno por uno con manejo de errores
      for (const product of result.products) {
        try {
          await addProduct(product);
        } catch (error) {
          console.warn(`Error adding product ${product.name}:`, error);
          // Continuar con el siguiente producto en lugar de fallar completamente
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error in budget optimization:', error);
      throw error;
    } finally {
      setIsOptimizing(false);
    }
  }, [findBestCombination, addProduct, clearCart]);

  return {
    optimizeAndAddToCart,
    isOptimizing,
    lastOptimization
  };
}