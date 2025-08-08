"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Envío en 24-48 horas"
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "2 años de garantía"
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras +$100"
  }
];

// Posiciones fijas para evitar problemas de hidratación
const floatingElements = [
  { left: 15, top: 20, duration: 3, delay: 0 },
  { left: 85, top: 15, duration: 4, delay: 0.5 },
  { left: 25, top: 80, duration: 3.5, delay: 1 },
  { left: 75, top: 75, duration: 4.5, delay: 1.5 },
  { left: 50, top: 10, duration: 3.2, delay: 0.8 },
  { left: 90, top: 60, duration: 3.8, delay: 0.3 }
];

export function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated Background Elements */}
      {isClient && (
        <div className="absolute inset-0">
          {floatingElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full relative z-10">
        <div className="text-center w-full">
          {/* Main Heading */}
          <motion.div
            className="px-4 md:px-8 lg:px-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              La Mejor
              <span className="gradient-text block font-extrabold">
                Tecnología
              </span>
              a tu Alcance
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 w-full px-4 md:px-8 lg:px-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Descubre los últimos productos tecnológicos con la mejor calidad y precios increíbles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4 md:px-8 lg:px-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/products">
              <Button size="lg" className="group">
                Ver Productos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Conocer Más
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 md:px-8 lg:px-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-xl glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}