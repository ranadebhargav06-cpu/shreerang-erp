# API Reference

Base URL: `/api`

All endpoints except `/auth/login`, `/auth/password/forgot`, `/auth/password/reset` and `/health` require `Authorization: Bearer <token>`.

## Authentication

- `POST /auth/login` with `{ email, password }`
- `GET /auth/me`
- `POST /auth/password/forgot`
- `POST /auth/password/reset`
- `POST /auth/users` admin only
- `GET /auth/users` admin/manager

## Dashboard

- `GET /dashboard` returns today's sales, monthly sales, outstanding payments, customer count, inventory status, top products and revenue chart data.

## Products

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id` deactivates product
- `GET /products/categories/list`
- `POST /products/categories`
- `GET /products/:productId/batches`
- `POST /products/:productId/batches`

## Customers

- `GET /customers`
- `GET /customers/:id`
- `POST /customers`
- `PUT /customers/:id`
- `DELETE /customers/:id`
- `POST /customers/:id/addresses`
- `POST /customers/:id/payments`

## Sales and Billing

- `GET /sales`
- `POST /sales`
- `GET /sales/summary`
- `POST /sales/:id/return`
- `GET /billing/invoices`
- `POST /billing/invoices/from-sale/:saleId`
- `GET /billing/invoices/:id/pdf-data`
- `GET /billing/invoices/:id/whatsapp`

## Inventory, Purchases and Finance

- `GET /inventory/raw-materials`
- `POST /inventory/raw-materials`
- `GET /inventory/low-stock`
- `POST /inventory/movements`
- `GET /purchases/suppliers`
- `POST /purchases/suppliers`
- `GET /purchases`
- `POST /purchases`
- `GET /finance/profit-loss`
- `GET /finance/cash-book`
- `GET /finance/monthly-summary`
- `POST /finance/expenses`

## Reports and Notifications

- `GET /reports/sales`
- `GET /reports/products`
- `GET /reports/customers`
- `GET /reports/inventory`
- `GET /reports/profit`
- `GET /reports/export.csv`
- `GET /notifications`
- `POST /notifications`
- `PATCH /notifications/:id/read`
- `POST /notifications/generate-alerts`

## AI

- `GET /ai/readiness`
