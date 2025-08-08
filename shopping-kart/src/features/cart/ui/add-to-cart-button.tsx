'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Loader2, Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from '@/features/products/domain/product';
import { useCart } from '@/hooks/use-cart';

export function AddToCartButton({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addProduct, updateQuantity, removeProduct, getProductQuantity, isProductInCart } = useCart();
  
  const quantity = getProductQuantity(product.id);
  const inCart = isProductInCart(product.id);

  const handleAddToCart = async () => {
    if (isLoading || isAdded || !product.inStock) return;
    
    setIsLoading(true);
    try {
      await addProduct(product);
      setIsAdded(true);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (newQuantity <= 0) {
        await removeProduct(product.id);
      } else {
        await updateQuantity(product.id, newQuantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Si el producto está en el carrito, mostrar controles de cantidad
  if (inCart && quantity > 0) {
    return (
      <div className="w-full space-y-3">
        {/* Indicador de que está en el carrito */}
        <div className="flex items-center justify-center gap-2 text-sm text-success font-medium">
          <Check className="w-4 h-4" />
          <span>En el carrito</span>
        </div>
        
        {/* Controles de cantidad */}
        <div className="flex items-center justify-between bg-muted rounded-xl p-2">
          <motion.button
            onClick={() => handleUpdateQuantity(quantity - 1)}
            disabled={isLoading}
            className="w-10 h-10 rounded-lg bg-background hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center justify-center disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {quantity === 1 ? (
              <Trash2 className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </motion.button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold min-w-[2rem] text-center">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                quantity
              )}
            </span>
            <span className="text-sm text-muted-foreground">en carrito</span>
          </div>
          
          <motion.button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            disabled={isLoading || !product.inStock}
            className="w-10 h-10 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Si no está en el carrito, mostrar botón normal
  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading || isAdded || !product.inStock}
      className={`
        relative w-full py-3 px-6 rounded-xl font-semibold text-sm
        transition-all duration-300 overflow-hidden group
        ${!product.inStock 
          ? 'bg-muted text-muted-foreground cursor-not-allowed'
          : isAdded
          ? 'bg-success text-success-foreground'
          : 'bg-primary hover:bg-primary-hover text-primary-foreground hover:shadow-lg hover:shadow-primary/25'
        }
      `}
      whileHover={product.inStock && !isLoading && !isAdded ? { scale: 1.02 } : {}}
      whileTap={product.inStock && !isLoading && !isAdded ? { scale: 0.98 } : {}}
    >
      {/* Background gradient animation */}
      {product.inStock && !isAdded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      )}
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Agregando...</span>
          </>
        ) : isAdded ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
            <span>¡Agregado!</span>
          </>
        ) : !product.inStock ? (
          <span>Agotado</span>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Agregar al Carrito</span>
          </>
        )}
      </div>
      
      {/* Ripple effect */}
      {product.inStock && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-active:scale-100 transition-transform duration-200"
          initial={false}
        />
      )}
    </motion.button>
  );
}