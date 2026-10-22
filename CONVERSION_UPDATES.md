# Datespot Game Edition: conversion update

- Membership fee is **₹899**, set once in `src/app/App.tsx` as `MEMBERSHIP_PRICE`. UI and UPI QR deep link use this value.
- Added mobile first-screen intro and join button; clarified the desktop hero value proposition.
- Added an accessible FAQ accordion with clear questions about value, access, and expectations.
- Removed unsubstantiated crossed-out prices and a self-resetting six-hour sale timer; shows lasting membership value instead.
- Improved final CTAs, sticky CTA, and membership information, matching the original blue/dark theme.
- Shows existing proof screenshots before the mobile final purchase prompt. No new reviews or fabricated proof added.
- Updated page title, SEO description and removed `noindex` blocking discovery.
- The original screenshot upload and payment-success workflow were **left unchanged at the owner's request**. It is not a real payment-verification gateway and should not be described as one.

## Run locally

Install dependencies (`pnpm install`, or `npm install`), then start with `npm run dev` or build with `npm run build`.
