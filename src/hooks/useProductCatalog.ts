import { useState, useEffect, useMemo } from 'react';
import type { Product } from '@/types';
import { ProductSort } from '@/types/enums/ProductSort';
import { productRequests } from '@/requests/productRequests';

export function useProductCatalog(
  searchValue: string, 
  initialProducts: Product[] = [], 
  initialCategories: string[] = []
) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<ProductSort>(ProductSort.Featured);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const loadProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await productRequests.getAll();
      setProducts(data);
      try {
        setCategories(await productRequests.getCategories());
      } catch {
        setCategories([...new Set(data.map((product) => product.category))]);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      void loadProducts();
    }
  }, []);

  const filtered = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();
    const result = products.filter(
      (product) =>
        (category === 'all' || product.category === category) &&
        (!normalized ||
          `${product.title} ${product.description} ${product.category}`
            .toLowerCase()
            .includes(normalized)),
    );
    switch (sort) {
      case ProductSort.PriceAscending:
        result.sort((a, b) => a.price - b.price);
        break;
      case ProductSort.PriceDescending:
        result.sort((a, b) => b.price - a.price);
        break;
      case ProductSort.TitleAscending:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case ProductSort.TitleDescending:
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return result;
  }, [products, category, searchValue, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleProducts = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [category, searchValue, sort]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  return {
    categories, loading, error, category, setCategory, sort, setSort,
    page, setPage, pageCount, visibleProducts, filteredCount: filtered.length, loadProducts,
  };
}