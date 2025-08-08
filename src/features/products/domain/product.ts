export type ProductCategory = 
  | 'laptops' 
  | 'smartphones' 
  | 'audio' 
  | 'gaming' 
  | 'accessories' 
  | 'tablets' 
  | 'wearables';

export type ProductBrand = 
  | 'apple' 
  | 'samsung' 
  | 'sony' 
  | 'logitech' 
  | 'razer' 
  | 'bose' 
  | 'hp' 
  | 'dell' 
  | 'asus' 
  | 'microsoft';

export type SortOption = 
  | 'name' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'newest' 
  | 'popular';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  category: ProductCategory;
  brand: ProductBrand;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  isNew?: boolean;
  discount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  searchTerm?: string;
  category?: ProductCategory;
  brand?: ProductBrand;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  featured?: boolean;
  isNew?: boolean;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}