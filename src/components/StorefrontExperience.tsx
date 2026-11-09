'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { ProductGrid } from './ProductGrid';
import { Footer } from './Footer';

export function StorefrontExperience() {
  const [searchValue, setSearchValue] = useState('');
  return <><Header searchValue={searchValue} onSearchChange={setSearchValue}/><main><Hero/><ProductGrid searchValue={searchValue}/></main><Footer/></>;
}
