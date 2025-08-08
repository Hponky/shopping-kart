import { Product } from '@/features/products/domain/product';

export interface OptimizationResult {
  products: Product[];
  totalPrice: number;
  remainingBudget: number;
}

/**
 * Implementa el algoritmo de la mochila (knapsack) para encontrar
 * la combinación óptima de productos dentro del presupuesto
 */
export function findBestCombination(
  products: Product[],
  budget: number
): OptimizationResult {
  // Filtrar solo productos en stock
  const availableProducts = products.filter(product => product.inStock);
  
  if (availableProducts.length === 0 || budget <= 0) {
    return {
      products: [],
      totalPrice: 0,
      remainingBudget: budget
    };
  }

  const n = availableProducts.length;
  // dp[i][w] = valor máximo que se puede obtener con los primeros i productos y presupuesto w
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));
  
  // Llenar la tabla de programación dinámica
  for (let i = 1; i <= n; i++) {
    const product = availableProducts[i - 1];
    const price = Math.floor(product.price); // Convertir a entero para el algoritmo
    
    for (let w = 0; w <= budget; w++) {
      // No incluir el producto actual
      dp[i][w] = dp[i - 1][w];
      
      // Incluir el producto actual si cabe en el presupuesto
      if (price <= w) {
        const valueWithProduct = dp[i - 1][w - price] + price;
        dp[i][w] = Math.max(dp[i][w], valueWithProduct);
      }
    }
  }
  
  // Reconstruir la solución
  const selectedProducts: Product[] = [];
  let remainingBudget = budget;
  
  for (let i = n; i > 0 && remainingBudget > 0; i--) {
    const product = availableProducts[i - 1];
    const price = Math.floor(product.price);
    
    // Si el valor cambió, significa que incluimos este producto
    if (dp[i][remainingBudget] !== dp[i - 1][remainingBudget]) {
      selectedProducts.push(product);
      remainingBudget -= price;
    }
  }
  
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  
  return {
    products: selectedProducts,
    totalPrice,
    remainingBudget: budget - totalPrice
  };
}

/**
 * Versión alternativa usando enfoque greedy (más rápido para datasets grandes)
 * Ordena por ratio valor/precio y selecciona productos hasta agotar presupuesto
 */
export function findBestCombinationGreedy(
  products: Product[],
  budget: number
): OptimizationResult {
  const availableProducts = products
    .filter(product => product.inStock && product.price <= budget)
    .sort((a, b) => {
      // Ordenar por precio descendente para maximizar valor
      return b.price - a.price;
    });
  
  const selectedProducts: Product[] = [];
  let remainingBudget = budget;
  
  for (const product of availableProducts) {
    if (product.price <= remainingBudget) {
      selectedProducts.push(product);
      remainingBudget -= product.price;
    }
  }
  
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  
  return {
    products: selectedProducts,
    totalPrice,
    remainingBudget: budget - totalPrice
  };
}