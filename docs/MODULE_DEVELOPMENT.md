# Module Development Guide

## Adding a Backend Module

1. Create `backend/src/modules/newModule/newModule.routes.js`.
2. Create `backend/src/modules/newModule/newModule.controller.js`.
3. Add models to `backend/prisma/schema.prisma` if the module needs persistent data.
4. Import and mount the router in `backend/src/app.js` using `app.use('/api/new-module', authenticate, newModuleRoutes)`.
5. Add role protection with `authorize('ADMIN', 'MANAGER')` where needed.

## Adding a Frontend Module

1. Create a page component in `frontend/src/pages`.
2. Add it to the navigation array in `frontend/src/layouts/AppLayout.jsx`.
3. Add rendering logic in `frontend/src/App.jsx`.
4. Use `frontend/src/services/api.js` for API calls.

## Production Notes

- Replace JWT secret in `.env`.
- Use PostgreSQL or MySQL instead of SQLite.
- Configure email/SMS provider for password reset tokens.
- Add file storage for product images and invoice PDFs.
- Add audit logging for financial and stock-changing operations.
- Restrict CORS to the production frontend URL.
