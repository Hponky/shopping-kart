import { Cart } from "./cart";
import { Product } from "@/features/products/domain/product";

export interface CartRepository {
  get(): Promise<Cart>;
  addProduct(product: Product): Promise<Cart>;
  updateQuantity(productId: number, quantity: number): Promise<Cart>;
  removeProduct(productId: number): Promise<Cart>;
  clearCart(): Promise<Cart>;
}