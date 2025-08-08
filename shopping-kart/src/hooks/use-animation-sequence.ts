"use client";

import { useEffect, useState } from 'react';

export function useAnimationSequence<T>(items: T[], delay: number = 0.1) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * delay * 1000);
    });

    return () => setVisibleItems([]);
  }, [items, delay]);

  return visibleItems;
}