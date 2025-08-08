import { CartRepository } from "@/features/cart/domain/cart-repository";
import { inMemoryCartRepository } from "@/features/cart/infrastructure/in-memory-cart-repository";
import { Product } from "@/features/products/domain/product";

export function addProductToCart(
  product: Product,
  cartRepository: CartRepository = inMemoryCartRepository
) {
  return cartRepository.addProduct(product);
}