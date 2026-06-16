# Shreerang Papad ERP

Complete ERP-style business management software for **Shreerang Papad**, a papad manufacturing and distribution business located in **Mahagaon, Yavatmal, Maharashtra, India**.

The system manages billing, GST invoices, inventory, sales, purchases, customers, finance, reports, notifications and future AI analytics in one integrated web application.

## Stack

- Backend: Node.js, Express, Prisma ORM, JWT authentication, clean modular MVC-style modules.
- Database: Prisma schema currently configured for SQLite for local setup. Change `DATABASE_URL` and Prisma datasource provider for PostgreSQL/MySQL in production.
- Frontend: React, Vite, responsive CSS, PWA manifest and service worker.
- Architecture: API-first backend with independent modules under `backend/src/modules` and frontend pages under `frontend/src/pages`.

## Quick Start

```bash
cd shreerang-papad-erp
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run db:generate
npm run db:migrate --workspace backend -- --name init
npm run seed
npm run dev
```

Default admin after seeding:

- Email: `admin@shreerangpapad.com`
- Password: `admin123`

## Included Products

- Udad Papad
- Masala Papad
- Rice Papad
- Custom products are supported through the Product Management module.

## Main Features

The application includes admin and employee login, role-based access control, password reset token flow, dashboard analytics, product categories, pricing, stock, images, batch number tracking, customer GST/address/credit history, GST billing, invoice records, printing-ready invoice data, WhatsApp invoice sharing links, sales return records, retail/wholesale sales, daily/monthly reports, raw material and finished goods inventory, low stock alerts, suppliers, purchase orders, expense tracking, income/expense/profit reports, cash book, CSV export, notifications, and AI-ready endpoints.
