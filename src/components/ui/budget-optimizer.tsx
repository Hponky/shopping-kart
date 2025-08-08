"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ShoppingCart, DollarSign, TrendingUp, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudgetOptimizer } from '@/hooks/use-budget-optimizer';

interface BudgetOptimizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BudgetOptimizer({ isOpen, onClose }: BudgetOptimizerProps) {
  const [budget, setBudget] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { optimizeAndAddToCart, isOptimizing, lastOptimization } = useBudgetOptimizer();

  const handleOptimize = async () => {
    const budgetValue = parseFloat(budget);
    
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert('Por favor ingresa un presupuesto válido');
      return;
    }

    try {
      await optimizeAndAddToCart(budgetValue);
      setShowResults(true);
    } catch (error) {
      console.error('Error optimizing budget:', error);
      alert(error instanceof Error ? error.message : 'Error al optimizar el presupuesto');
    }
  };

  const handleClose = () => {
    setShowResults(false);
    setBudget('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="relative">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Optimizador de Presupuesto</CardTitle>
                    <CardDescription>
                      Encuentra la mejor combinación de productos para tu presupuesto
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {!showResults ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Presupuesto máximo</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Ej: 150"
                          className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>¿Cómo funciona?</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nuestro algoritmo encuentra la combinación de productos que maximiza el valor 
                        total sin exceder tu presupuesto. Los productos se agregan automáticamente al carrito.
                      </p>
                    </div>

                    <Button 
                      onClick={handleOptimize}
                      disabled={isOptimizing || !budget}
                      className="w-full"
                      size="lg"
                    >
                      {isOptimizing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Optimizando...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Optimizar Presupuesto
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  lastOptimization && (
                    <div className="space-y-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-primary">
                          ${lastOptimization.totalValue.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Valor total optimizado • Restante: ${lastOptimization.remainingBudget.toFixed(2)}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Productos seleccionados:</h4>
                        {lastOptimization.products.map((product) => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowResults(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          Nuevo Presupuesto
                        </Button>
                        <Button 
                          onClick={handleClose}
                          className="flex-1"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Ver Carrito
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}