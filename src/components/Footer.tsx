'use client';

import styled from 'styled-components';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Instagram, Linkedin, Send, ShoppingBag } from 'lucide-react';

const FooterSurface = styled.footer`
  margin-top: 35px;
  background: ${({ theme }) => theme.colors.footer};
  color: #f5f7fc;
  padding: 55px 0 22px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 35px;
  padding-bottom: 40px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;
const Brand = styled.div`
  font-size: 25px;
  font-weight: 950;
  display: flex;
  gap: 9px;
  align-items: center;
  margin-bottom: 14px;
  .bag {
    color: #ff814b;
  }
  p {
    font-size: 12px;
    line-height: 2;
    color: #aab7c8;
    font-weight: 400;
    max-width: 290px;
  }
`;
const Column = styled.div`
  h4 {
    font-size: 13px;
    margin: 5px 0 17px;
  }
  a {
    display: block;
    color: #aab7c8;
    font-size: 12px;
    margin: 12px 0;
    &:hover {
      color: #ff9b70;
    }
  }
`;
const Social = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 18px;
  a {
    width: 34px;
    height: 34px;
    border: 1px solid #34445e;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #e4eaf3;
    margin: 0;
  }
`;
const Bottom = styled.div`
  border-top: 1px solid #34445e;
  padding-top: 19px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #91a0b4;
  font-size: 11px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export function Footer() {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  return (
    <FooterSurface>
      <div className="container">
        <Grid>
          <div>
            <Brand>
              <span>NOVA</span>
              <ShoppingBag className="bag" size={23} />
              <p>{t('about')}</p>
            </Brand>
            <Social>
              <a href="#" aria-label={t('socialInstagram')}>
                <Instagram size={16} />
              </a>
              <a href="#" aria-label={t('socialLinkedIn')}>
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label={t('socialTelegram')}>
                <Send size={16} />
              </a>
            </Social>
          </div>
          <Column>
            <h4>{t('quick')}</h4>
            <Link href="/">{n('home')}</Link>
            <a href="#products">{n('products')}</a>
            <Link href="/cart">{n('cart')}</Link>
          </Column>
          <Column>
            <h4>{t('support')}</h4>
            <a href="#">{t('shipping')}</a>
            <a href="#">{t('returns')}</a>
            <a href="#">{t('faq')}</a>
          </Column>
          <Column>
            <h4>{t('contact')}</h4>
            <a href="mailto:hello@nova.example">hello@nova.example</a>
            <a href="tel:+10000000000">+1 000 000 0000</a>
          </Column>
        </Grid>
        <Bottom>
          <span>
            © {new Date().getFullYear()} NOVA. {t('rights')}
          </span>
          <span>{t('tagline')}</span>
        </Bottom>
      </div>
    </FooterSurface>
  );
}
