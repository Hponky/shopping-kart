"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { MagneticHover } from "@/components/animations/magnetic-hover";
import { useProducts } from "@/hooks/use-products";
import { useAnimationSequence } from "@/hooks/use-animation-sequence";
import { formatPrice } from "@/lib/utils";
import { SectionProps } from "@/types/ui-components";

export function ProductShowcase({ className = "" }: SectionProps) {
  const { products, loading } = useProducts();
  const visibleItems = useAnimationSequence(products, 0.2);

  if (loading) {
    return (
      <section className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Productos Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección premium de tecnología de vanguardia
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                y: visibleItems.includes(index) ? 0 : 30
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <MagneticHover>
                <GlassCard className="group hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Destacado
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviews} reseñas)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    
                    <GradientButton className="w-full group">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al Carrito
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </GradientButton>
                  </div>
                </GlassCard>
              </MagneticHover>
            </motion.div>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center">
            <Link href="/products">
              <GradientButton size="lg" className="group">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}