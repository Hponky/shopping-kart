import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases CSS de manera inteligente usando clsx y tailwind-merge
 * @param inputs - Clases CSS a combinar
 * @returns String de clases CSS optimizado
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea precios en formato de moneda
 * @param price - Precio a formatear
 * @param currency - Código de moneda (default: 'USD')
 * @returns Precio formateado
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Genera un delay escalonado para animaciones
 * @param index - Índice del elemento
 * @param baseDelay - Delay base en ms (default: 100)
 * @returns Delay en segundos
 */
export function getStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay / 1000;
}

/**
 * Trunca texto a una longitud específica
 * @param text - Texto a truncar
 * @param length - Longitud máxima
 * @returns Texto truncado
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}