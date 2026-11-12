'use client';

import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import styled from 'styled-components';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  useCartStore,
  selectCartCount,
  selectCartTotal,
} from '@/storage/cartStore';
import { Header } from './Header';
import { Footer } from './Footer';
import { formatPrice } from '@/utils/formatPrice';
import { Button, SecondaryButton } from '@/shared/StoreButtons';

const Main = styled.main`
  padding: 52px 0 80px;
  min-height: 55vh;
`;
const Heading = styled.div`
  margin-bottom: 28px;
  h1 {
    font-size: clamp(25px, 3vw, 34px);
    margin: 0 0 9px;
    color: ${({ theme }) => theme.colors.navy};
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    line-height: 1.9;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 24px;
  align-items: start;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;
const List = styled.div`
  display: grid;
  gap: 13px;
`;
const Row = styled.article`
  display: grid;
  grid-template-columns: 105px minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 15px;
  @media (max-width: 560px) {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 12px;
  }
  .photo {
    width: 105px;
    height: 105px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: 12px;
    object-fit: contain;
    @media (max-width: 560px) {
      width: 76px;
      height: 76px;
      grid-row: span 2;
    }
  }
`;
const ProductInfo = styled.div`
  min-width: 0;
  h3 {
    font-size: 13px;
    line-height: 1.8;
    margin: 0 0 7px;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 11px;
    text-transform: capitalize;
  }
`;
const Price = styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.navy};
  font-size: 13px;
  margin-top: 11px;
  span {
    font-size: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.muted};
    margin-inline-end: 5px;
  }
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  button {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
  span {
    min-width: 22px;
    text-align: center;
    font-size: 12px;
    font-weight: 800;
  }
  @media (max-width: 560px) {
    grid-column: 2;
  }
`;
const Remove = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: #d65d57;
  font-size: 11px;
  margin-top: 12px;
  padding: 0;
`;
const RowTotal = styled.div`
  text-align: end;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.navy};
  @media (max-width: 560px) {
    grid-column: 2;
    text-align: start;
    display: block;
  }
`;
const Summary = styled.aside`
  position: sticky;
  top: 104px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 22px;
  h2 {
    font-size: 16px;
    margin: 0 0 20px;
  }
  .line {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    margin: 14px 0;
  }
  .grand {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: 17px;
    margin-top: 18px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 900;
    font-size: 14px;
  }
  .note {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 10px;
    line-height: 1.8;
    margin-top: 14px;
  }
  @media (max-width: 850px) {
    position: static;
  }
`;
const Empty = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  text-align: center;
  padding: 65px 20px;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    color: ${({ theme }) => theme.colors.orange};
    margin: 0 auto 16px;
  }
  h2 {
    color: ${({ theme }) => theme.colors.navy};
    font-size: 19px;
    margin: 0 0 9px;
  }
  p {
    font-size: 12px;
    line-height: 1.9;
    margin: 0 auto 22px;
    max-width: 390px;
  }
`;
const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

export function CartPageClient() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hasHydrated);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clearCart);
  const count = selectCartCount(items);
  const total = selectCartTotal(items);
  const BackIcon = locale === 'fa' ? ArrowRight : ArrowLeft;
  return (
    <>
      <Header
        searchValue=""
        onSearchChange={() => undefined}
        showSearch={false}
        showNav={false}
      />
      <Main className="container">
        <Heading>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </Heading>
        {!hydrated ? (
          <Empty>
            <ShoppingBag size={34} />
            <p>{t('title')}</p>
          </Empty>
        ) : items.length === 0 ? (
          <Empty>
            <ShoppingBag size={40} />
            <h2>{t('emptyTitle')}</h2>
            <p>{t('emptyText')}</p>
            <Link href="/">
              <Button>
                <BackIcon size={16} />
                {t('continue')}
              </Button>
            </Link>
          </Empty>
        ) : (
          <>
            <TopActions>
              <SecondaryButton onClick={clear}>
                <Trash2 size={15} />
                {t('clear')}
              </SecondaryButton>
            </TopActions>
            <Layout>
              <List>
                {items.map((item) => {
                  const rowTotal = item.product.price * item.quantity;
                  return (
                    <Row key={item.product.id}>
                      <img
                        className="photo"
                        src={item.product.image}
                        alt={item.product.title}
                      />
                      <ProductInfo>
                        <h3>{item.product.title}</h3>
                        <p>{item.product.category}</p>
                        <Price>
                          <span>{t('unitPrice')}</span>
                          {formatPrice(item.product.price, locale)}
                        </Price>
                        <Controls>
                          <button
                            type="button"
                            aria-label={t('decrease')}
                            onClick={() => decrease(item.product.id)}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={t('increase')}
                            onClick={() => increase(item.product.id)}
                          >
                            <Plus size={14} />
                          </button>
                        </Controls>
                        <Remove
                          type="button"
                          onClick={() => remove(item.product.id)}
                        >
                          <Trash2 size={13} />
                          {t('remove')}
                        </Remove>
                      </ProductInfo>
                      <RowTotal>{formatPrice(rowTotal, locale)}</RowTotal>
                    </Row>
                  );
                })}
              </List>
              <Summary>
                <h2>{t('summary')}</h2>
                <div className="line">
                  <span>
                    {t('items')} ({count})
                  </span>
                  <span>{formatPrice(total, locale)}</span>
                </div>
                <div className="line">
                  <span>{t('shipping')}</span>
                  <span>{t('free')}</span>
                </div>
                <div className="line grand">
                  <span>{t('grandTotal')}</span>
                  <span>{formatPrice(total, locale)}</span>
                </div>
                <Link href="/">
                  <Button style={{ width: '100%', marginTop: 12 }}>
                    <BackIcon size={15} />
                    {t('continue')}
                  </Button>
                </Link>
                <p className="note">{t('disclaimer')}</p>
              </Summary>
            </Layout>
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}
