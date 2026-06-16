# Architecture Guide

## Overview

Shreerang Papad ERP is organized as a monorepo with separate backend and frontend workspaces. The backend exposes REST APIs and owns business rules. The frontend consumes only API endpoints, making it possible to later add Android, desktop, or partner integrations without changing core business logic.

## Backend Structure

Each backend module lives in `backend/src/modules/<module-name>` and contains route/controller files. This keeps ERP domains independent:

- `auth`: login, users, roles, password reset.
- `dashboard`: today's sales, monthly sales, outstanding payments, customers, inventory status, charts and top products.
- `products`: categories, products, pricing, images and product batches.
- `customers`: contact details, GST number, addresses, payment history and credit.
- `billing`: GST invoices, invoice PDF data and WhatsApp links.
- `sales`: retail, wholesale, daily sales and sales returns.
- `inventory`: raw material stock, movements and low stock alerts.
- `purchases`: suppliers, purchase orders and raw material purchases.
- `finance`: income, expenses, profit/loss, cash book and summaries.
- `reports`: sales, product, customer, inventory and profit reports with CSV export.
- `notifications`: low stock, pending payment and order update notifications.
- `ai`: future AI integration placeholder.

Shared infrastructure is in `config`, `middleware` and `utils`.

## Frontend Structure

The frontend uses React pages mapped to ERP modules. `AppLayout.jsx` owns navigation and brand shell. Module pages can be replaced by richer module-specific components without affecting other modules.

## Database Scalability

Prisma models define normalized tables for users, products, batches, customers, invoices, payments, sales, raw materials, purchases, expenses and notifications. The local default is SQLite for easy startup. For production, use PostgreSQL by changing the Prisma datasource provider and `DATABASE_URL`, then run migrations.

## Future AI Readiness

AI features should be added under `backend/src/modules/ai`. They should read from normalized sales, purchase, inventory and customer data through service functions. This avoids coupling ML logic with transactional ERP modules.
