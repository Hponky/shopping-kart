import { inMemoryCartRepository } from "@/features/cart/infrastructure/in-memory-cart-repository";

export const getCart = () => {
  return inMemoryCartRepository.get();
};