"use client";

import { ProductList } from "@/features/products/ui/product-list";
import { Header } from "@/components/layout/header";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  );
}