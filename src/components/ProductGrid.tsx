'use client';

import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { Product } from '@/types';
import { ProductSort } from '@/types/enums/ProductSort';
import { useCartStore } from '@/storage/cartStore';
import { formatPrice } from '@/utils/formatPrice';
import { Button } from '@/shared/StoreButtons';
import { useProductCatalog } from '@/hooks/useProductCatalog';
import * as S from './ProductGrid.styles';
import { formatCategory } from '@/utils/formatCategory';
import { Link } from '@/i18n/navigation';

export function ProductGrid({
  searchValue,
  initialProducts,
  initialCategories,
}: {
  searchValue: string;
  initialProducts: Product[];
  initialCategories: string[];
}) {
  const t = useTranslations('catalog');
  const locale = useLocale();
  const addItem = useCartStore((state) => state.addItem);
  const [notice, setNotice] = useState('');

  const {
    categories,
    loading,
    error,
    category,
    setCategory,
    sort,
    setSort,
    page,
    setPage,
    pageCount,
    visibleProducts,
    filteredCount,
    loadProducts,
  } = useProductCatalog(searchValue, initialProducts, initialCategories);

  const handleAdd = (product: Product) => {
    addItem(product);
    setNotice(`${product.title} · ${t('added')}`);
    window.setTimeout(() => setNotice(''), 2200);
  };

  return (
    <S.Section id="products">
      <div className="container">
        <S.SectionTop>
          <div>
            <div className="eyebrow">{t('eyebrow')}</div>
            <h2 className="title">{t('title')}</h2>
            <p className="desc">{t('description')}</p>
          </div>
          <div
            style={{ fontSize: 12, color: 'var(--page-text)', fontWeight: 800 }}
          >
            {t('showing')}
          </div>
        </S.SectionTop>

        <div id="categories">
          <S.CategoryRow>
            <S.CategoryChip
              $active={category === 'all'}
              onClick={() => setCategory('all')}
            >
              {t('all')}
            </S.CategoryChip>
            {categories.map((item) => (
              <S.CategoryChip
                key={item}
                $active={category === item}
                onClick={() => setCategory(item)}
              >
                {formatCategory(item, locale)}
              </S.CategoryChip>
            ))}
          </S.CategoryRow>
        </div>

        <S.Controls>
          <S.ResultCount>
            {filteredCount} {t('showing')}
          </S.ResultCount>
          <S.Sort>
            <SlidersHorizontal size={15} />
            <span>{t('sort')}</span>
            <select
              aria-label={t('sort')}
              value={sort}
              onChange={(event) => setSort(event.target.value as ProductSort)}
            >
              <option value={ProductSort.Featured}>{t('featured')}</option>
              <option value={ProductSort.PriceAscending}>
                {t('priceAsc')}
              </option>
              <option value={ProductSort.PriceDescending}>
                {t('priceDesc')}
              </option>
              <option value={ProductSort.TitleAscending}>
                {t('titleAsc')}
              </option>
              <option value={ProductSort.TitleDescending}>
                {t('titleDesc')}
              </option>
            </select>
          </S.Sort>
        </S.Controls>

        {notice && (
          <S.Notice>
            <Check size={16} />
            {notice}
          </S.Notice>
        )}

        {loading ? (
          <S.State>{t('loading')}</S.State>
        ) : error ? (
          <S.State>
            <span>{t('error')}</span>
            <Button onClick={() => void loadProducts()}>{t('retry')}</Button>
          </S.State>
        ) : visibleProducts.length === 0 ? (
          <S.State>
            <Search size={28} />
            {t('empty')}
          </S.State>
        ) : (
          <S.Grid>
            {visibleProducts.map((product) => (
              <S.ProductCard key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <S.ImageWrap>
                    <S.CategoryTag>
                      {formatCategory(product.category, locale)}
                    </S.CategoryTag>
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                    />
                  </S.ImageWrap>
                </Link>

                <S.ProductInfo>
                  <Link href={`/products/${product.id}`}>
                    <S.ProductTitle title={product.title}>
                      {product.title}
                    </S.ProductTitle>
                  </Link>

                  <S.Rating>
                    <Star size={13} />
                    <strong>{product.rating?.rate?.toFixed(1) ?? '—'}</strong>
                    <span>({product.rating?.count ?? 0})</span>
                  </S.Rating>
                  <S.CardFooter>
                    <strong>{formatPrice(product.price, locale)}</strong>
                  </S.CardFooter>
                  <S.AddButton type="button" onClick={() => handleAdd(product)}>
                    <Plus size={15} />
                    {t('add')}
                  </S.AddButton>
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.Grid>
        )}

        {!loading && !error && filteredCount > 0 && (
          <S.Pager>
            <button
              type="button"
              aria-label={t('previous')}
              disabled={page === 1}
              onClick={() => setPage((v) => Math.max(1, v - 1))}
            >
              {locale === 'fa' ? (
                <ChevronRight size={17} />
              ) : (
                <ChevronLeft size={17} />
              )}
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (number) => (
                <button
                  type="button"
                  key={number}
                  className={number === page ? 'active' : ''}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ),
            )}
            <button
              type="button"
              aria-label={t('next')}
              disabled={page === pageCount}
              onClick={() => setPage((v) => Math.min(pageCount, v + 1))}
            >
              {locale === 'fa' ? (
                <ChevronLeft size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>
          </S.Pager>
        )}
      </div>
    </S.Section>
  );
}
