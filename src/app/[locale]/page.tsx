import { StorefrontExperience } from '@/components/StorefrontExperience';
import { productRequests } from '@/requests/productRequests';
import type { Product } from '@/types';

export default async function HomePage() {
  let initialProducts: Product[] = [];
  let initialCategories: string[] = [];

  try {
    initialProducts = await productRequests.getAll();
    try {
      initialCategories = await productRequests.getCategories();
    } catch {
      initialCategories = Array.from(
        new Set(initialProducts.map((p) => p.category)),
      );
    }
  } catch (error) {
    console.error('SSR Fetch Error:', error);
  }

  return (
    <StorefrontExperience
      initialProducts={initialProducts}
      initialCategories={initialCategories}
    />
  );
}
