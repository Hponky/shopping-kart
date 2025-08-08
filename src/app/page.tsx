"use client";

import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/layout/hero-section";
import { ProductDetailsModal } from "@/components/ui/product-details-modal";
import { BudgetOptimizer } from "@/components/ui/budget-optimizer";
import { useProductModal } from "@/hooks/use-product-modal";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Award, Calculator } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { icon: Users, value: "10K+", label: "Clientes Satisfechos" },
  { icon: Star, value: "4.9", label: "Calificación Promedio" },
  { icon: Award, value: "500+", label: "Productos Premium" },
];

const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    price: 3499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 234
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 567
  },
  {
    id: 3,
    name: "AirPods Pro 2nd Gen",
    price: 249,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 892
  }
];

export default function LandingPage() {
  const { isOpen, selectedProduct, openModalWithFeatured, closeModal } = useProductModal();
  const [isBudgetOptimizerOpen, setIsBudgetOptimizerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section sin el botón */}
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="w-full px-4 md:px-8 lg:px-16">
          {/* Agregar el botón aquí, antes de las estadísticas */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => setIsBudgetOptimizerOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Optimizar Presupuesto
            </Button>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección de productos más populares
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      ${product.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({product.reviews} reseñas)</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => openModalWithFeatured(product)}
                    >
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para encontrar tu producto ideal?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Explora nuestro catálogo completo y encuentra exactamente lo que necesitas
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="group">
                Ver Todos los Productos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shared Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
      
      <BudgetOptimizer 
        isOpen={isBudgetOptimizerOpen}
        onClose={() => setIsBudgetOptimizerOpen(false)}
      />
    </div>
  );
}