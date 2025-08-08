"use client";

import { Product } from "@/features/products/domain/product";
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button";
import { ProductDetailsModal } from "@/components/ui/product-details-modal";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-muted-foreground"
      }`}
    />
  ));
}

export function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <motion.div
        className="bg-card rounded-xl shadow-lg overflow-hidden group relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-success text-success-foreground text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                ✨ Nuevo
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                🔥 -{discountPercentage}%
              </span>
            )}
            {product.featured && (
              <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                ⭐ Destacado
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            {/* Wishlist Button */}
            <motion.button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                isWishlisted ? 'bg-destructive/90 text-destructive-foreground' : 'bg-card/90 text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
            
            {/* Quick View Button */}
            <motion.button 
              onClick={() => setShowModal(true)}
              className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:text-primary text-muted-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Stock indicator */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-destructive text-destructive-foreground px-6 py-3 rounded-xl font-bold text-lg shadow-xl">
                😔 Agotado
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Brand and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary uppercase tracking-wider font-bold bg-primary/10 px-2 py-1 rounded-lg">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-xl font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-card-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <div className="text-sm text-success font-medium">
                  ¡Ahorras ${(product.originalPrice! - product.price).toFixed(2)}!
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </motion.div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  );
};