# Shopping Kart

Una aplicación moderna desarrollada con Next.js 15, React 19 y TypeScript, con funcionalidades avanzadas como optimización de presupuesto y animaciones fluidas.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características Principales](#características-principales)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación](#instalación)
- [Uso](#uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Licencia](#licencia)

## Descripción

Shopping Kart es una plataforma de comercio electrónico moderna que permite a los usuarios navegar, buscar y añadir al carrito de compras productos tecnológicos. La aplicación incluye funcionalidades avanzadas como:

- **Navegación Intuitiva**: Menú de navegación claro y accesible
- **Búsqueda Avanzada**: Funcionalidad de búsqueda con filtros por categoría.
- **Filtrado por Categoría**: Navegación por diferentes secciones de productos.
- **Optimizador de Presupuesto**: Algoritmo inteligente que sugiere la mejor combinación de productos dentro de un presupuesto específico.
- **Carrito de Compras Persistente**: Gestión completa del carrito de compras con persistencia de datos en el lado del cliente.
- **Interfaz Animada**: Experiencia de usuario fluida con animaciones personalizadas usando Framer Motion
- **Diseño Responsivo**: Interfaz adaptable a todos los dispositivos
- **Arquitectura Modular**: Implementación basada en Domain-Driven Design (DDD)

## Tecnologías Utilizadas

### Frontend
- **Next.js 15.4.6** - Framework de React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Framer Motion 12.23.12** - Biblioteca de animaciones

### UI/UX
- **Lucide React 0.537.0** - Iconos modernos
- **clsx 2.1.1** - Utilidad para clases condicionales
- **tailwind-merge 3.3.1** - Fusión inteligente de clases Tailwind

### Herramientas de Desarrollo
- **ESLint 9** - Linter para JavaScript/TypeScript
- **PostCSS** - Procesador de CSS
- **Turbopack** - Bundler de alta velocidad para desarrollo

## Características Principales

### 🛒 Gestión de Carrito
- Agregar/eliminar productos
- Actualización de cantidades
- Cálculo automático de totales
- Persistencia de datos
- Validación de stock

### 💰 Optimizador de Presupuesto
- Algoritmo inteligente de optimización
- Sugerencias personalizadas de productos
- Maximización del valor dentro del presupuesto
- Integración directa con el carrito

### 🎨 Experiencia Visual
- Animaciones fluidas con Framer Motion
- Componentes con efectos de hover magnético
- Elementos flotantes animados
- Transiciones suaves entre páginas
- Diseño glassmorphism

### 📱 Interfaz Responsiva
- Diseño mobile-first
- Adaptación a tablets y desktop
- Componentes modulares reutilizables
- Sistema de grid flexible

## Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en **Domain-Driven Design (DDD)** con separación clara de responsabilidades:

```
src/
├── features/           # Módulos de dominio
│   ├── cart/          # Gestión del carrito
│   └── products/      # Gestión de productos
├── components/        # Componentes UI reutilizables
├── hooks/            # Custom hooks de React
├── lib/              # Utilidades y configuraciones
└── types/            # Definiciones de tipos TypeScript
```

### Capas por Feature
- **Domain**: Entidades y lógica de negocio
- **Application**: Casos de uso y servicios
- **Infrastructure**: Implementaciones concretas
- **UI**: Componentes específicos del dominio

## Requisitos del Sistema

- **Node.js**: 18.0.0 o superior
- **npm**: 8.0.0 o superior (o yarn/pnpm equivalente)
- **Sistema Operativo**: Windows, macOS, o Linux

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd shopping-kart
```

2. **Instalar dependencias**
```bash
npm install
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
   - Navega a [http://localhost:3000](http://localhost:3000)

## Uso

### Navegación Básica
1. **Página Principal**: Muestra productos destacados y estadísticas
2. **Catálogo de Productos**: Navegación completa con filtros
3. **Carrito de Compras**: Gestión de productos seleccionados
4. **Optimizador de Presupuesto**: Herramienta de optimización inteligente

### Funcionalidades Clave

#### Agregar Productos al Carrito
```typescript
// Usando el hook useCart
const { addProduct } = useCart();
await addProduct(product);
```

#### Optimizar Presupuesto
```typescript
// Usando el hook useBudgetOptimizer
const { optimizeAndAddToCart } = useBudgetOptimizer();
await optimizeAndAddToCart(budget);
```

## Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar linter
npm run lint
```

## Estructura del Proyecto

```
shopping-kart/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── api/               # API Routes
│   │   │   ├── cart/         # Endpoints del carrito
│   │   │   └── products/     # Endpoints de productos
│   │   ├── products/         # Página de productos
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Página de inicio
│   ├── components/            # Componentes reutilizables
│   │   ├── animations/       # Componentes animados
│   │   ├── layout/          # Componentes de layout
│   │   ├── sections/        # Secciones de página
│   │   └── ui/              # Componentes UI básicos
│   ├── features/             # Módulos de dominio
│   │   ├── cart/            # Feature del carrito
│   │   │   ├── application/ # Casos de uso
│   │   │   ├── domain/      # Entidades y tipos
│   │   │   ├── infrastructure/ # Implementaciones
│   │   │   └── ui/          # Componentes específicos
│   │   └── products/        # Feature de productos
│   │       ├── application/
│   │       ├── domain/
│   │       ├── infrastructure/
│   │       └── ui/
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilidades
│   └── types/                # Tipos TypeScript
├── public/                   # Archivos estáticos
├── package.json             # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.js      # Configuración Tailwind
└── next.config.js          # Configuración Next.js
```

## API Endpoints

### Carrito
- `GET /api/cart` - Obtener carrito actual
- `POST /api/cart` - Agregar producto al carrito
- `PUT /api/cart` - Actualizar cantidad de producto
- `DELETE /api/cart` - Eliminar producto del carrito

### Productos
- `GET /api/products` - Listar productos con filtros
- `GET /api/products/[id]` - Obtener producto específico

## Tipos de Datos Principales

### Product
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
  brand: ProductBrand;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  // ... más propiedades
}
```

### Cart
```typescript
interface Cart {
  items: CartItem[];
}

interface CartItem {
  product: Product;
  quantity: number;
}
```

## Licencia

Este proyecto está bajo la Licencia MIT.
        
