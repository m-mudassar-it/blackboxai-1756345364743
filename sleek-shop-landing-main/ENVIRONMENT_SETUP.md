# Environment Variables Setup

## Overview
The application now uses environment variables for all API and asset URLs instead of hardcoded values.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ASSETS_BASE_URL=http://localhost:8000/nodeassets
VITE_API_URL=http://localhost:8000
```

## For Production

For production deployment, update the values to your production URLs:

```env
# Production API Configuration
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_ASSETS_BASE_URL=https://your-backend-domain.com/nodeassets
VITE_API_URL=https://your-backend-domain.com
```

## Files Updated

The following files now use environment variables:

1. **`src/lib/config.ts`**
   - `API_BASE_URL` - Uses `VITE_API_BASE_URL`
   - `ASSETS_BASE_URL` - Uses `VITE_ASSETS_BASE_URL`

2. **`src/lib/utils.ts`**
   - `API_URL` - Uses `VITE_API_URL`

3. **`src/pages/Products.tsx`**
   - Image URL construction now uses `API_URL` from utils

## Fallback Values

All environment variables have fallback values to localhost for development:
- If `VITE_API_BASE_URL` is not set → defaults to `http://localhost:8000/api`
- If `VITE_ASSETS_BASE_URL` is not set → defaults to `http://localhost:8000/nodeassets`
- If `VITE_API_URL` is not set → defaults to `http://localhost:8000`

## Important Notes

- Environment variables must start with `VITE_` to be accessible in the frontend
- The `.env.local` file should be added to `.gitignore` to keep sensitive URLs private
- Restart your development server after creating the `.env.local` file
