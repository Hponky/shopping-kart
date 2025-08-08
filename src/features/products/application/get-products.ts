import { modernProductRepository } from "@/features/products/infrastructure/modern-product-repository";

export const getProducts = async () => {
  return await modernProductRepository.findAll();
};