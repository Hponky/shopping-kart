"use client";

import { Modal } from "@/components/ui/modal";
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button";
import { Product } from "@/features/products/domain/product";
import { Star } from "lucide-react";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function ProductDetailsModal({ isOpen, onClose, product }: ProductDetailsModalProps) {
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      size="xl"
    >
      <div className="space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {product.isNew && (
            <span className="bg-success text-success-foreground text-xs px-3 py-1 rounded-full font-bold">
              ✨ Nuevo
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-bold">
              🔥 -{discountPercentage}%
            </span>
          )}
          {product.featured && (
            <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-bold">
              ⭐ Destacado
            </span>
          )}
        </div>

        {/* Brand and Rating */}
        <div className="space-y-3">
          <span className="text-sm text-primary uppercase tracking-wider font-bold bg-primary/10 px-3 py-1 rounded-lg">
            {product.brand}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reseñas)
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-bold text-card-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Descripción
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div>
            <h4 className="font-bold text-card-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              Especificaciones
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 px-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground font-medium">{key}:</span>
                  <span className="text-card-foreground font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div>
            <h4 className="font-bold text-card-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Características
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent/10 text-accent-foreground text-sm px-3 py-1 rounded-full font-medium border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-card-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="text-success font-medium">
                ¡Ahorras ${(product.originalPrice! - product.price).toFixed(2)}!
              </div>
            )}
          </div>
          
          <AddToCartButton product={product} />
        </div>
      </div>
    </Modal>
  );
}