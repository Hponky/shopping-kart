"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, ChevronDown } from "lucide-react";
import { ProductFilters, ProductCategory, ProductBrand, SortOption } from "@/features/products/domain/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
}

const categories: { value: ProductCategory; label: string }[] = [
  { value: 'electronics', label: 'Electrónicos' },
  { value: 'accessories', label: 'Accesorios' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'office', label: 'Oficina' }
];

const brands: { value: ProductBrand; label: string }[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'logitech', label: 'Logitech' },
  { value: 'razer', label: 'Razer' },
  { value: 'hp', label: 'HP' },
  { value: 'dell', label: 'Dell' }
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Calificados' }
];

export function ProductFilters({ filters, onFiltersChange, sortBy, onSortChange, totalProducts }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');

  const updateFilter = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchTerm('');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            updateFilter('searchTerm', e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filter Toggle & Sort */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {totalProducts} productos
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Limpiar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3">Categoría</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.value}
                        variant={filters.category === category.value ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => updateFilter('category', 
                          filters.category === category.value ? undefined : category.value
                        )}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium mb-3">Marca</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {brands.map(brand => (
                      <Button
                        key={brand.value}
                        variant={filters.brand === brand.value ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => updateFilter('brand', 
                          filters.brand === brand.value ? undefined : brand.value
                        )}
                      >
                        {brand.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Rango de Precio</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Mín"
                      value={filters.minPrice || ''}
                      onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="border border-border rounded px-3 py-2 bg-background"
                    />
                    <input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxPrice || ''}
                      onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="border border-border rounded px-3 py-2 bg-background"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3">Calificación Mínima</h4>
                  <div className="flex gap-2">
                    {[4, 3, 2, 1].map(rating => (
                      <Button
                        key={rating}
                        variant={filters.minRating === rating ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => updateFilter('minRating', 
                          filters.minRating === rating ? undefined : rating
                        )}
                      >
                        {rating}+ ⭐
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={filters.inStock || false}
                    onChange={(e) => updateFilter('inStock', e.target.checked || undefined)}
                    className="rounded"
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    Solo productos en stock
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}