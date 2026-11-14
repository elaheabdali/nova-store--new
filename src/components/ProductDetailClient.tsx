'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  PackageCheck,
  Plus,
  Star,
  Truck,
} from 'lucide-react';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types';
import { useCartStore } from '@/storage/cartStore';
import { formatPrice } from '@/utils/formatPrice';
import { formatCategory } from '@/utils/formatCategory';
import { Button } from '@/shared/StoreButtons';
import { Header } from './Header';
import { Footer } from './Footer';

const Main = styled.main`
  padding: 44px 0 80px;
  min-height: 60vh;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 24px;
  &:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 38px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 34px;
  align-items: center;
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    padding: 22px;
    gap: 24px;
  }
`;

const ImageBox = styled.div`
  height: 390px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width: 520px) {
    height: 260px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .badge {
    align-self: flex-start;
    padding: 6px 12px;
    border-radius: 99px;
    background: ${({ theme }) => theme.colors.orangeSoft};
    color: ${({ theme }) => theme.colors.orange};
    font-size: 11px;
    font-weight: 800;
  }
  h1 {
    font-size: clamp(20px, 2.6vw, 28px);
    line-height: 1.5;
    margin: 0;
    color: ${({ theme }) => theme.colors.navy};
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    svg {
      color: #e9a32e;
      fill: #e9a32e;
    }
  }
  .price {
    font-size: 24px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.navy};
    margin: 4px 0;
  }
  .desc-label {
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 6px;
  }
  .desc {
    font-size: 13px;
    line-height: 2;
    color: ${({ theme }) => theme.colors.muted};
    margin: 0;
  }
`;

const Perks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    svg {
      color: ${({ theme }) => theme.colors.orange};
    }
  }
`;

export function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations('productDetails');
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const BackIcon = locale === 'fa' ? ArrowRight : ArrowLeft;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header
        searchValue=""
        onSearchChange={() => undefined}
        showSearch={false}
        showNav={false}
      />
      <Main className="container">
        <BackLink href="/">
          <BackIcon size={16} />
          {t('back')}
        </BackLink>
        <Card>
          <ImageBox>
            <img src={product.image} alt={product.title} />
          </ImageBox>
          <Info>
            <span className="badge">
              {formatCategory(product.category, locale)}
            </span>
            <h1>{product.title}</h1>
            <div className="rating">
              <Star size={16} />
              <strong>{product.rating?.rate?.toFixed(1) ?? '—'}</strong>
              <span>
                ({product.rating?.count ?? 0} {t('reviews')})
              </span>
            </div>
            <div className="price">{formatPrice(product.price, locale)}</div>
            <div className="desc-label">{t('description')}</div>
            <p className="desc">{product.description}</p>
            <Perks>
              <span>
                <PackageCheck size={16} />
                {t('inStock')}
              </span>
              <span>
                <Truck size={16} />
                {t('freeShipping')}
              </span>
            </Perks>
            <Button type="button" onClick={handleAdd} style={{ maxWidth: 260 }}>
              {added ? (
                <>
                  <Check size={17} />
                  {t('addedToCart')}
                </>
              ) : (
                <>
                  <Plus size={17} />
                  {t('addToCart')}
                </>
              )}
            </Button>
          </Info>
        </Card>
      </Main>
      <Footer />
    </>
  );
}
