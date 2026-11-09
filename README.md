# NOVA Store

فروشگاه عمومی NOVA با Next.js App Router و TypeScript. این پروژه مخزن مستقلی از `nova-admin` است و package، environment، build و Git history خودش را دارد.

## قابلیت‌ها

- صفحه فروشگاه عمومی با هدر، Hero، دسته‌بندی‌ها، کارت محصول و Footer
- دریافت محصول و دسته‌بندی از FakeStoreAPI
- جستجو، فیلتر دسته‌بندی و مرتب‌سازی براساس قیمت و عنوان
- صفحه‌بندی سمت فرانت‌اند با ۶ محصول در هر صفحه
- سبد خرید Zustand با افزایش/کاهش تعداد، حذف ردیف و خالی‌کردن سبد
- محاسبه مبلغ هر ردیف و مبلغ کل
- ماندگاری سبد خرید پس از Refresh با LocalStorage و hydration کنترل‌شده
- فارسی/انگلیسی با next-intl، مسیرهای locale-based و RTL/LTR
- Theme روشن/تیره با Context API
- طراحی Mobile First برای موبایل، تبلت و دسکتاپ
- Metadata محلی‌سازی‌شده، Open Graph، robots و sitemap

## فناوری‌ها

Next.js 16، React 19، TypeScript 5، next-intl، Styled Components، Zustand، Axios و Lucide.

## پیش‌نیازها

- Node.js 20.9+ (نسخه 22 LTS توصیه می‌شود)
- npm 10+
- دسترسی شبکه به `https://fakestoreapi.com`

## نصب و اجرا

```bash
npm install
cp .env.example .env.local
npm run dev
```

نشانی‌های محلی: `http://localhost:3000/fa` و `http://localhost:3000/en`.

## Type-check و Build

```bash
npm run typecheck
npm run build
npm start
```

## متغیرهای محیطی

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | FakeStoreAPI base URL | `https://fakestoreapi.com` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, robots and sitemap | `https://nova-store.example` |

این متغیرها حاوی Secret نیستند. پیش از استقرار، `NEXT_PUBLIC_SITE_URL` را با دامنه واقعی جایگزین کنید.

## ساختار پوشه‌ها

```text
src/
├── api/                         # AxiosInstance مستقل فروشگاه
├── app/
│   ├── [locale]/                 # صفحات و Layout بر اساس locale
│   │   ├── cart/                 # صفحه سبد خرید
│   │   └── page.tsx              # صفحه اصلی
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/                  # Header, Hero, ProductGrid, Cart و Footer
├── context/                     # Theme Context و تم‌ها
├── dictionary/                  # پیام‌های fa و en
├── i18n/                        # routing و navigationهای تایپ‌شده
├── requests/                    # توابع دریافت داده از API
├── shared/                      # Styled Components registry، button و cart hydration
├── storage/                     # Zustand persisted cart store
├── types/enums/                 # Typeها و enumهای مستقل
├── utils/                       # formatterها و توابع مستقل UI
└── i18n.ts                      # تنظیمات next-intl
src/proxy.ts                    # locale routing در Next.js 16
```

## State Management

- Zustand فقط state عمومی سبد خرید را مدیریت می‌کند؛ هر ردیف شامل محصول و تعداد است.
- Zustand persist با LocalStorage استفاده شده، اما hydration به‌صورت دستی و در `CartHydrator` بعد از mount اجرا می‌شود. تا قبل از hydration شمارنده سبد مقدار محاسبه‌شده از داده‌های ذخیره‌شده را نمایش نمی‌دهد تا mismatch میان SSR و مرورگر رخ ندهد.
- Theme در Context API نگهداری می‌شود و stateهای فرم جستجو، دسته انتخاب‌شده، sort و صفحه در کامپوننت‌های مربوطه محلی هستند.

## API و AxiosInstance

`src/api/axiosInstance.ts` تنها AxiosInstance پروژه است. Base URL از `NEXT_PUBLIC_API_BASE_URL` خوانده می‌شود و response interceptor خطاهای API را به پیام استاندارد تبدیل می‌کند. لایه `src/requests/productRequests.ts` درخواست‌های محصول و دسته‌بندی را ارائه می‌دهد. درخواست‌ها در UI پراکنده نشده‌اند.

## FakeStoreAPI: محدودیت‌ها و رفتار انتخاب‌شده

- این API برای داده آزمایشی است؛ پاسخ موفق `POST` الزاماً به ذخیره دائمی منتهی نمی‌شود. در این Store هیچ checkout یا سفارش ثبت نمی‌شود.
- API برای این چالش صفحه‌بندی واقعی ارائه نمی‌کند. تمام محصولات دریافت و فیلتر، sort و pagination (شش محصول در هر صفحه) در Frontend اجرا می‌شود.
- ماندگاری LocalStorage فقط برای سبد خرید غیرحساس است و ارتباطی با ذخیره‌سازی محصولات API ندارد.
- سبد خرید بین `nova-store` و `nova-admin` به اشتراک گذاشته نمی‌شود.

## SEO و Localization

- `generateMetadata` در locale layout عنوان، توضیحات، metadataBase، Open Graph و canonical/language alternates تولید می‌کند.
- cart با `noindex` علامت‌گذاری شده است زیرا محتوای شخصی و غیرقابل ایندکس دارد.
- `src/app/robots.ts` و `src/app/sitemap.ts` مسیرهای عمومی locale را معرفی می‌کنند.
- `src/proxy.ts` با `next-intl` مسیرهای `/fa` و `/en` را مدیریت می‌کند. در Next.js 16 قرارداد جدید `proxy.ts` جایگزین `middleware.ts` شده است.

## SSR برای Styled Components

`StyledComponentsRegistry` از `ServerStyleSheet` و `useServerInsertedHTML` برای تزریق استایل‌ها در زمان SSR استفاده می‌کند و `compiler.styledComponents` در `next.config.ts` فعال است.

## فرض‌ها و تصمیم‌های فنی

- Locale پیش‌فرض فارسی است و هر دو زبان با prefix مسیر در دسترس‌اند.
- قیمت‌های FakeStoreAPI به‌صورت USD نمایش داده می‌شوند؛ تبدیل نرخ ارز در محدوده چالش نیست.
- هزینه ارسال در نمونه رایگان فرض شده و checkout خارج از محدوده است.
- تصاویر Hero از تصاویر remote و کارت‌های محصول از URL تصویر برگشتی FakeStoreAPI استفاده می‌کنند.
- برای پایداری نمایش، در صورت خطای endpoint دسته‌بندی، دسته‌ها از روی محصولات دریافت‌شده استخراج می‌شوند.
- ساختار پیشنهادی سند فارسی حفظ شده؛ `modals` و `validations` برای توسعه بعدی آماده‌اند و فرم داده‌محور در این نسخه وجود ندارد.

## Git مستقل

این پوشه یک Git repository مستقل با تاریخچه commitهای مرحله‌ای است. برای انتشار در سرویس Git میزبان، remote مخزن خودتان را اضافه کنید:

```bash
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```
