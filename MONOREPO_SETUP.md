# Monorepo Setup Guide

This guide will help you complete the transition to the monorepo structure.

## Current Status

✅ **Completed:**
- Root workspace configuration (`package.json` with workspaces)
- Next.js landing page in `packages/landing/` with all pages and components
- Landing page configuration (Next.js, Tailwind, TypeScript)

⏳ **Pending:**
- Move `backend/` to `packages/backend/`
- Move `frontend/` to `packages/marketplace/`
- Update import paths
- Test the full monorepo workflow

## Step 1: Move Backend

```bash
# Create packages directory if it doesn't exist
mkdir -p packages

# Move backend folder
mv backend packages/backend
```

**Update paths in `packages/backend/`:**
- Check all import statements
- Ensure `tsconfig.json` paths are correct
- Update any file references

## Step 2: Move Frontend

```bash
# Move frontend to marketplace
mv frontend packages/marketplace
```

**Update `packages/marketplace/package.json`:**

```json
{
  "name": "arcfeed-marketplace",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --port 3000",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Step 3: Install All Dependencies

From the root directory:

```bash
# Install root workspace dependencies
npm install

# Install all workspace dependencies
npm install --workspaces
```

## Step 4: Run the Monorepo

### Run Everything Simultaneously

```bash
# From root directory
npm run dev
```

This will start:
- Backend on `http://localhost:5001`
- Marketplace on `http://localhost:3000`
- Landing on `http://localhost:3002`

### Run Individual Services

```bash
# Backend only
npm run dev:backend

# Marketplace only
npm run dev:marketplace

# Landing only
npm run dev:landing
```

## Step 5: Build for Production

```bash
# Build all packages
npm run build

# Or build individually
npm run build --workspace=packages/backend
npm run build --workspace=packages/marketplace
npm run build --workspace=packages/landing
```

## Deployment

### Landing Page (Vercel)

```bash
cd packages/landing
vercel --prod
```

The landing page is configured for static export and will deploy seamlessly to Vercel.

### Backend (Railway/Render)

```bash
cd packages/backend
# Follow your preferred deployment guide
```

### Marketplace (Netlify/Vercel)

```bash
cd packages/marketplace
npm run build
# Deploy the dist/ folder
```

## Troubleshooting

### Port Conflicts

If ports 3000, 3002, or 5001 are in use:

**Landing page:**
Edit `packages/landing/package.json`:
```json
"scripts": {
  "dev": "next dev -p 3003"
}
```

**Marketplace:**
Edit `packages/marketplace/vite.config.ts`:
```ts
server: { port: 3001 }
```

### Import Errors After Move

If you see import errors after moving folders:

1. Check `tsconfig.json` paths
2. Ensure all relative imports are correct
3. Run `npm install` in each workspace

### Workspace Not Found

If npm can't find a workspace:

1. Verify `package.json` in root has:
   ```json
   "workspaces": ["packages/*"]
   ```
2. Ensure each package has a `package.json` with a unique `name`
3. Run `npm install` from root

## Next Steps

Once the migration is complete:

1. ✅ Test all three apps run simultaneously
2. ✅ Verify backend API calls work from marketplace
3. ✅ Verify landing page links to marketplace
4. ✅ Run builds to ensure production readiness
5. 🚀 Deploy to production!

## Package Scripts Reference

### Root `package.json`

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:marketplace\" \"npm run dev:landing\"",
    "dev:backend": "npm run dev --workspace=packages/backend",
    "dev:marketplace": "npm run dev --workspace=packages/marketplace",
    "dev:landing": "npm run dev --workspace=packages/landing",
    "build": "npm run build --workspaces",
    "build:backend": "npm run build --workspace=packages/backend",
    "build:marketplace": "npm run build --workspace=packages/marketplace",
    "build:landing": "npm run build --workspace=packages/landing"
  }
}
```

## Architecture Overview

```
┌─────────────────────────────────────┐
│   Landing Page (Next.js)            │
│   http://localhost:3002             │
│   - Marketing site                  │
│   - API documentation               │
│   - Live demos                      │
│   - Links to marketplace →          │
└─────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│   Marketplace (React Vite)          │
│   http://localhost:3000             │
│   - Data products UI                │
│   - AI chat interface               │
│   - Wallet management               │
│   - Calls backend API →             │
└─────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│   Backend (Express)                 │
│   http://localhost:5001             │
│   - HTTP 402 middleware             │
│   - Payment verification            │
│   - DeFi data endpoints             │
│   - AI agent tools                  │
└─────────────────────────────────────┘
                  │
                  ↓
          ┌───────────────┐
          │  Arc Network  │
          │  (Blockchain) │
          └───────────────┘
```

## Success Criteria

Your monorepo is fully set up when:

- ✅ `npm run dev` starts all three services
- ✅ Landing page loads at localhost:3002
- ✅ Marketplace loads at localhost:3000
- ✅ Backend API responds at localhost:5001
- ✅ Landing page "Launch App" button opens marketplace
- ✅ Marketplace can purchase data from backend
- ✅ All builds complete without errors
