import { NextRequest, NextResponse } from 'next/server';
import { getCart } from '@/features/cart/application/get-cart';
import { addProductToCart } from '@/features/cart/application/add-product-to-cart';
import { inMemoryCartRepository } from '@/features/cart/infrastructure/in-memory-cart-repository';

export async function GET() {
  try {
    const cart = await getCart();
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const cart = await addProductToCart(product);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product to cart' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();
    
    if (typeof productId !== 'number' || typeof quantity !== 'number') {
      return NextResponse.json(
        { error: 'Invalid productId or quantity' },
        { status: 400 }
      );
    }
    
    const cart = await inMemoryCartRepository.updateQuantity(productId, quantity);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update quantity' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Si se solicita limpiar todo el carrito
    if (body.clearAll === true) {
      const cart = await inMemoryCartRepository.clearCart();
      return NextResponse.json(cart);
    }
    
    // Si se solicita eliminar un producto específico
    const { productId } = body;
    
    if (typeof productId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid productId' },
        { status: 400 }
      );
    }
    
    const cart = await inMemoryCartRepository.removeProduct(productId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove product or clear cart' },
      { status: 500 }
    );
  }
}