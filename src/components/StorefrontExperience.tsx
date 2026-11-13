'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { Header } from './Header';
import { Hero } from './Hero';
import { ProductGrid } from './ProductGrid';
import { Footer } from './Footer';

interface Props {
  initialProducts: Product[];
  initialCategories: string[];
}

export function StorefrontExperience({
  initialProducts,
  initialCategories,
}: Props) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />
      <main>
        <Hero />
        <ProductGrid
          searchValue={searchValue}
          initialProducts={initialProducts}
          initialCategories={initialCategories}
        />
      </main>
      <Footer />
    </>
  );
}
