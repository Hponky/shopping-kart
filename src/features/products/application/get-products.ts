import { productRepository } from "@/features/products/infrastructure/product-repository";

export const getProducts = async () => {
  return await productRepository.findAll();
};