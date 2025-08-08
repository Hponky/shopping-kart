import { Product, ProductCategory, ProductBrand } from "@/features/products/domain/product";

const modernProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    price: 3499,
    originalPrice: 3999,
    description: "La laptop más potente de Apple con chip M3 Max, perfecta para profesionales creativos y desarrolladores.",
    shortDescription: "Laptop profesional con chip M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    category: 'laptops' as ProductCategory,
    brand: 'apple' as ProductBrand,
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    stockCount: 15,
    featured: true,
    isNew: true,
    discount: 12,
    tags: ['professional', 'creative', 'high-performance'],
    specifications: {
      'Processor': 'Apple M3 Max',
      'RAM': '32GB Unified Memory',
      'Storage': '1TB SSD',
      'Display': '16.2\" Liquid Retina XDR'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199,
    description: "El iPhone más avanzado con cámara profesional de 48MP y chip A17 Pro.",
    shortDescription: "Smartphone premium con cámara pro",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    category: 'smartphones' as ProductCategory,
    brand: 'apple' as ProductBrand,
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    stockCount: 25,
    featured: true,
    isNew: true,
    tags: ['flagship', 'camera', 'premium'],
    specifications: {
      'Chip': 'A17 Pro',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Display': '6.7\" Super Retina XDR'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 3,
    name: "AirPods Pro 2nd Gen",
    price: 249,
    description: "Auriculares inalámbricos con cancelación activa de ruido y audio espacial.",
    shortDescription: "Auriculares premium con ANC",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop",
    category: 'audio' as ProductCategory,
    brand: 'apple' as ProductBrand,
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    stockCount: 45,
    featured: true,
    tags: ['wireless', 'anc', 'premium'],
    specifications: {
      'Driver': 'Custom Apple Driver',
      'Battery': '6h + 24h with case',
      'Features': 'Active Noise Cancellation'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Auriculares over-ear con la mejor cancelación de ruido del mercado.",
    shortDescription: "Over-ear con ANC líder",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
    category: 'audio' as ProductCategory,
    brand: 'sony' as ProductBrand,
    rating: 4.8,
    reviewCount: 654,
    inStock: true,
    stockCount: 22,
    featured: true,
    tags: ['over-ear', 'anc', 'audiophile'],
    specifications: {
      'Driver': '30mm Dynamic',
      'Battery': '30 hours with ANC',
      'Features': 'Industry-leading ANC'
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: 5,
    name: "Razer DeathAdder V3 Pro",
    price: 149,
    description: "Mouse gaming inalámbrico con sensor Focus Pro 30K y switches ópticos.",
    shortDescription: "Mouse gaming pro inalámbrico",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop",
    category: 'gaming' as ProductCategory,
    brand: 'razer' as ProductBrand,
    rating: 4.7,
    reviewCount: 312,
    inStock: true,
    stockCount: 35,
    featured: true,
    tags: ['gaming', 'wireless', 'pro'],
    specifications: {
      'Sensor': 'Focus Pro 30K',
      'DPI': 'Up to 30,000',
      'Battery': '90 hours'
    },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    price: 99,
    description: "Mouse de productividad premium con scroll electromagnético y conectividad multi-dispositivo.",
    shortDescription: "Mouse productividad premium",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=600&fit=crop",
    category: 'accessories' as ProductCategory,
    brand: 'logitech' as ProductBrand,
    rating: 4.9,
    reviewCount: 1205,
    inStock: true,
    stockCount: 28,
    featured: true,
    tags: ['productivity', 'multi-device', 'ergonomic'],
    specifications: {
      'Sensor': 'Darkfield 8000 DPI',
      'Battery': '70 days',
      'Connectivity': 'Bluetooth + USB-C'
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-13')
  }
];

export const modernProductRepository = {
  findAll: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(modernProducts), 100);
    });
  },
  
  findById: async (id: number): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = modernProducts.find(p => p.id === id);
        resolve(product || null);
      }, 50);
    });
  },
  
  findByCategory: async (category: ProductCategory): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = modernProducts.filter(p => p.category === category);
        resolve(filtered);
      }, 80);
    });
  }
};