'use client';

import { ArrowUpLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/shared/StoreButtons';

const Banner = styled.section`
  padding: 30px 0 0;
`;
const Surface = styled.div`
  min-height: 380px;
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: linear-gradient(115deg, #f4e9df 0%, #f6efe9 48%, #e5e3e2 100%);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  padding: 45px 6%;
  isolation: isolate;
  @media (max-width: 740px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 36px 25px 25px;
    gap: 20px;
  }
`;
const Copy = styled.div`
  position: relative;
  z-index: 2;
  max-width: 510px;
  direction: inherit;
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #dd672e;
    background: #fff8f3;
    border: 1px solid #f4d5c3;
    border-radius: 99px;
    padding: 8px 13px;
    font-size: 11px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  .note {
    font-size: 12px;
    color: #596577;
    margin-top: 20px;
  }
  h1 {
    font-size: clamp(29px, 4vw, 45px);
    line-height: 1.5;
    letter-spacing: -1.2px;
    color: #14243c;
    margin: 0 0 12px;
    font-weight: 950;
  }
  p {
    color: #5b6575;
    font-size: 14px;
    line-height: 2;
    margin: 0 0 23px;
  }
`;
const Visual = styled.div`
  position: relative;
  min-height: 285px;
  display: flex;
  align-items: center;
  justify-content: center;
  .halo {
    position: absolute;
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.42);
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  .item {
    position: absolute;
    filter: drop-shadow(0 25px 20px rgba(25, 37, 55, 0.18));
    object-fit: contain;
  }
  .headphones {
    width: 48%;
    height: 245px;
    inset-inline-start: 5%;
    transform: rotate(-9deg);
  }
  .watch {
    width: 36%;
    height: 230px;
    inset-inline-end: 5%;
    transform: rotate(8deg);
  }
  .shoe {
    width: 55%;
    height: 160px;
    bottom: -8px;
    left: 24%;
    transform: rotate(-9deg);
  }
  @media (max-width: 740px) {
    min-height: 205px;
    .halo {
      width: 230px;
      height: 230px;
    }
    .headphones {
      height: 180px;
    }
    .watch {
      height: 170px;
    }
    .shoe {
      height: 110px;
    }
  }
`;

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  return (
    <Banner>
      <div className="container">
        <Surface>
          <Copy>
            <div className="eyebrow">
              <Sparkles size={14} />
              {t('eyebrow')}
            </div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
            <a href="#products">
              <Button>
                {t('cta')}
                {locale === 'fa' ? (
                  <ArrowUpLeft size={17} />
                ) : (
                  <ArrowUpRight size={17} />
                )}
              </Button>
            </a>
            <div className="note">✦ {t('note')}</div>
          </Copy>
          <Visual aria-hidden="true">
            <div className="halo" />
            <img
              className="item headphones"
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=85"
              alt=""
            />
            <img
              className="item watch"
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=85"
              alt=""
            />
            <img
              className="item shoe"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=85"
              alt=""
            />
          </Visual>
        </Surface>
      </div>
    </Banner>
  );
}
