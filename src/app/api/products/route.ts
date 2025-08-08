import { NextResponse } from "next/server";
import { modernProductRepository } from "@/features/products/infrastructure/modern-product-repository";

export async function GET() {
  try {
    const products = await modernProductRepository.findAll();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}