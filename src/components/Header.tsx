'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import styled from 'styled-components';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useCartStore, selectCartCount } from '@/storage/cartStore';

const Bar = styled.header`position:sticky;top:0;z-index:30;background:${({theme})=>theme.colors.surface};border-bottom:1px solid ${({theme})=>theme.colors.border};`;
const Inner = styled.div`height:82px;display:flex;align-items:center;justify-content:space-between;gap:25px;@media(max-width:900px){gap:10px}@media(max-width:640px){height:70px;gap:8px}`;
const Brand = styled(Link)`display:inline-flex;align-items:center;gap:9px;font-size:25px;font-weight:950;letter-spacing:1px;color:${({theme})=>theme.colors.navy};white-space:nowrap;.bag{color:${({theme})=>theme.colors.orange}}`;
const Nav = styled.nav`display:flex;align-items:center;gap:25px;font-size:13px;font-weight:700;color:${({theme})=>theme.colors.muted};a:hover{color:${({theme})=>theme.colors.orange}}@media(max-width:900px){display:none}`;
const SearchForm = styled.label`display:flex;align-items:center;gap:8px;border:1px solid ${({theme})=>theme.colors.border};background:${({theme})=>theme.colors.surfaceMuted};border-radius:99px;height:42px;padding:0 13px;min-width:220px;flex:1;max-width:340px;color:${({theme})=>theme.colors.muted};input{border:0;outline:0;background:transparent;width:100%;min-width:0;color:${({theme})=>theme.colors.text};font-size:12px}@media(max-width:640px){display:none;min-width:0;max-width:none;width:100%}`;
const Actions = styled.div`display:flex;align-items:center;gap:9px;`;
const CartLink = styled(Link)`position:relative;width:40px;height:40px;display:grid;place-items:center;border:1px solid ${({theme})=>theme.colors.border};border-radius:50%;color:${({theme})=>theme.colors.navy};.count{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 4px;display:grid;place-items:center;border-radius:20px;background:${({theme})=>theme.colors.orange};color:white;font-size:10px;font-weight:800}`;
const MobileButton = styled.button`display:none;border:0;background:transparent;color:${({theme})=>theme.colors.text};padding:7px;@media(max-width:900px){display:grid;place-items:center}`;
const MobileMenu = styled.div`display:none;padding:0 0 16px;gap:12px;flex-direction:column;color:${({theme})=>theme.colors.muted};font-size:13px;font-weight:700;@media(max-width:900px){display:flex}.mobile-search{display:flex;min-width:0;max-width:none;width:100%}`;

export function Header({ searchValue, onSearchChange, showSearch = true, showNav = true }: { searchValue: string; onSearchChange: (value: string) => void; showSearch?: boolean; showNav?: boolean }) {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const count = selectCartCount(items);
  return <Bar><div className="container">
    <Inner>
      <Brand href="/"><span>NOVA</span><ShoppingBag className="bag" size={24}/></Brand>
      {showNav&&<Nav><Link href="/">{t('home')}</Link><a href="#products">{t('products')}</a><a href="#categories">{t('categories')}</a></Nav>}
      {showSearch&&<SearchForm><Search size={16}/><input value={searchValue} onChange={(event)=>onSearchChange(event.target.value)} placeholder={t('search')} aria-label={t('search')}/></SearchForm>}
      <Actions><LocaleSwitcher/><ThemeToggle/><CartLink href="/cart" aria-label={t('cart')}><ShoppingBag size={18}/>{hydrated&&count>0&&<span className="count">{count>99?'99+':count}</span>}</CartLink><MobileButton type="button" onClick={()=>setMenuOpen(v=>!v)} aria-label={t('menu')}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</MobileButton></Actions>
    </Inner>
    {menuOpen&&<MobileMenu>{showSearch&&<SearchForm className="mobile-search"><Search size={16}/><input value={searchValue} onChange={(event)=>onSearchChange(event.target.value)} placeholder={t('search')} aria-label={t('search')}/></SearchForm>}<Link href="/" onClick={()=>setMenuOpen(false)}>{t('home')}</Link>{showNav&&<><a href="#products" onClick={()=>setMenuOpen(false)}>{t('products')}</a><a href="#categories" onClick={()=>setMenuOpen(false)}>{t('categories')}</a></>}<Link href="/cart" onClick={()=>setMenuOpen(false)}>{t('cart')}</Link></MobileMenu>}
  </div></Bar>;
}
