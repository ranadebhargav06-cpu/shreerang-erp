# Database Schema Notes

The Prisma schema supports future expansion with normalized entities:

- Users and roles for RBAC.
- Product categories, products and product batches for finished goods.
- Customers, addresses, payments and invoices for billing and credit history.
- Sales and sale items for retail/wholesale tracking.
- Raw materials and stock movements for inventory.
- Suppliers, purchases, purchase items and expenses for procurement.
- Notifications for alerts and reminders.

For production scalability, move from SQLite to PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then set `DATABASE_URL` to your PostgreSQL connection string and run Prisma migrations.
