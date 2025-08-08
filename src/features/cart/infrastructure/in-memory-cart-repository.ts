import { Cart } from "@/features/cart/domain/cart";
import { CartRepository } from "@/features/cart/domain/cart-repository";
import { Product } from "@/features/products/domain/product";

const cart: Cart = {
  items: [],
};

export const inMemoryCartRepository: CartRepository = {
  async get(): Promise<Cart> {
    return Promise.resolve(cart);
  },

  async addProduct(product: Product): Promise<Cart> {
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product, quantity: 1 });
    }

    return Promise.resolve(cart);
  },

  async updateQuantity(productId: number, quantity: number): Promise<Cart> {
    const existingItem = cart.items.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.product.id !== productId
        );
      } else {
        existingItem.quantity = quantity;
      }
    }

    return Promise.resolve(cart);
  },

  async removeProduct(productId: number): Promise<Cart> {
    cart.items = cart.items.filter(
      (item) => item.product.id !== productId
    );

    return Promise.resolve(cart);
  },

  async clearCart(): Promise<Cart> {
    cart.items = [];
    return Promise.resolve(cart);
  },
};