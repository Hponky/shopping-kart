"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, Shield, Zap, Truck } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FloatingElements } from "@/components/animations/floating-elements";
import { MagneticHover } from "@/components/animations/magnetic-hover";

const features = [
  {
    icon: Zap,
    title: "Tecnología Avanzada",
    description: "Los últimos productos con IA integrada",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Garantía Premium",
    description: "3 años de protección total",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Truck,
    title: "Envío Express",
    description: "Entrega en 24h en toda la ciudad",
    color: "from-blue-400 to-cyan-500"
  }
];

const stats = [
  { value: "50K+", label: "Clientes Felices", icon: "👥" },
  { value: "4.9", label: "Rating Promedio", icon: "⭐" },
  { value: "1000+", label: "Productos Premium", icon: "🏆" },
  { value: "24/7", label: "Soporte Técnico", icon: "🛠️" }
];

export function ModernHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{ y }}
      />
      
      {/* Floating Elements */}
      <FloatingElements count={12} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      <motion.div 
        className="relative z-10 container mx-auto px-4 pt-32 pb-20"
        style={{ opacity }}
      >
        {/* Main Hero Content */}
        <div className="text-center max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0.2}>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Líder en Tecnología 2024</span>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                El Futuro de la
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tecnología
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Descubre productos revolucionarios que transformarán tu forma de trabajar, 
              jugar y conectar con el mundo digital.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <MagneticHover>
                <Link href="/products">
                  <GradientButton size="lg" glow className="group">
                    Explorar Productos
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </GradientButton>
                </Link>
              </MagneticHover>
              
              <MagneticHover>
                <GradientButton variant="secondary" size="lg" className="group">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </GradientButton>
              </MagneticHover>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal direction="up" delay={1.0}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center hover:scale-105 transition-transform">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal direction="up" delay={1.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                >
                  <GlassCard className="p-8 text-center group hover:bg-white/15">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}