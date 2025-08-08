import { useState } from "react";
import { Product } from "@/features/products/domain/product";

interface FeaturedProductData {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

export function useProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const openModalWithFeatured = (featuredProduct: FeaturedProductData) => {
    const fullProduct = createProductFromFeatured(featuredProduct);
    setSelectedProduct(fullProduct);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return {
    isOpen,
    selectedProduct,
    openModal,
    openModalWithFeatured,
    closeModal
  };
}

function createProductFromFeatured(featuredProduct: FeaturedProductData): Product {
  return {
    id: featuredProduct.id,
    name: featuredProduct.name,
    price: featuredProduct.price,
    description: `${featuredProduct.name} - Producto destacado de alta calidad con excelentes características y rendimiento superior.`,
    shortDescription: `Producto destacado con calificación de ${featuredProduct.rating} estrellas`,
    image: featuredProduct.image,
    images: [featuredProduct.image],
    category: featuredProduct.name.toLowerCase().includes('macbook') || featuredProduct.name.toLowerCase().includes('laptop') ? 'laptops' : 
              featuredProduct.name.toLowerCase().includes('iphone') || featuredProduct.name.toLowerCase().includes('phone') ? 'smartphones' : 'audio',
    brand: featuredProduct.name.toLowerCase().includes('mac') || featuredProduct.name.toLowerCase().includes('iphone') || featuredProduct.name.toLowerCase().includes('airpods') ? 'apple' : 'apple',
    rating: featuredProduct.rating,
    reviewCount: featuredProduct.reviews,
    inStock: true,
    stockCount: 10,
    featured: true,
    isNew: false,
    tags: ['Premium', 'Destacado', 'Alta Calidad'],
    specifications: {
      'Garantía': '1 año',
      'Envío': 'Gratis',
      'Soporte': '24/7'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}