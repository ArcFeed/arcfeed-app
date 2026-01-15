# Manual Migration Steps

Since terminal file operations are failing in this environment, here are the manual steps to complete the monorepo migration.

## Quick Reference

**What's already done:**
- ✅ Root `package.json` with workspaces configuration
- ✅ `packages/` directory created
- ✅ `packages/landing/` fully configured with Next.js app

**What you need to do:**
- Move `backend/` folder
- Move `frontend/` folder
- Install dependencies
- Test the setup

---

## Step 1: Move Backend Folder

Using your file explorer or terminal:

### Option A: File Explorer (Easiest)
1. Open your workspace folder: `/workspaces/arcfeed-app/`
2. Drag `backend/` folder into `packages/` folder
3. Result: `/workspaces/arcfeed-app/packages/backend/`

### Option B: Terminal (if working)
```bash
cd /workspaces/arcfeed-app
mv backend packages/backend
```

### Option C: VS Code Explorer
1. Right-click `backend` folder
2. Select "Cut"
3. Right-click `packages` folder
4. Select "Paste"

---

## Step 2: Move Frontend Folder

### Option A: File Explorer
1. Open `/workspaces/arcfeed-app/`
2. Rename `frontend/` to `marketplace/`
3. Drag `marketplace/` into `packages/` folder
4. Result: `/workspaces/arcfeed-app/packages/marketplace/`

### Option B: Terminal
```bash
cd /workspaces/arcfeed-app
mv frontend packages/marketplace
```

---

## Step 3: Update Package Names

### Update `packages/marketplace/package.json`

Find this file and change the name:

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

### Update `packages/backend/package.json`

```json
{
  "name": "arcfeed-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## Step 4: Install Dependencies

Open terminal in `/workspaces/arcfeed-app/` and run:

```bash
# Install root dependencies (concurrently)
npm install

# Install all workspace dependencies
npm install --workspaces
```

This will install dependencies for:
- Root workspace
- packages/backend
- packages/marketplace
- packages/landing

---

## Step 5: Verify Structure

Your folder structure should now look like:

```
arcfeed-app/
├── packages/
│   ├── backend/              ✅ Moved from root
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── marketplace/          ✅ Moved from root (was frontend/)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── landing/              ✅ Already created
│       ├── app/
│       ├── components/
│       └── package.json
├── temp/                     (can be deleted later)
├── documentation/            (can be kept or moved)
├── package.json              ✅ Root workspace config
├── README.md                 ✅ Updated
└── MONOREPO_SETUP.md         ✅ This guide
```

---

## Step 6: Test the Setup

### Test Backend

```bash
cd /workspaces/arcfeed-app
npm run dev:backend
```

Expected output:
- Server starts on port 5001
- No import errors
- Routes load successfully

### Test Marketplace

```bash
npm run dev:marketplace
```

Expected output:
- Vite dev server on port 3000
- React app loads
- Can make API calls to backend

### Test Landing

```bash
npm run dev:landing
```

Expected output:
- Next.js dev server on port 3002
- All pages load (/, /demo, /docs, /pricing)
- AgentTerminal animates
- PricingWidget slider works

### Test All Together

```bash
npm run dev
```

Expected output:
- Three concurrent processes start
- Backend on :5001
- Marketplace on :3000
- Landing on :3002
- All accessible via browser

---

## Step 7: Update Import Paths (If Needed)

Check these files for broken imports after moving:

### In `packages/backend/`
- `src/index.ts` - Check relative imports
- `src/routes/*.ts` - Check middleware imports
- `src/services/*.ts` - Check config imports

### In `packages/marketplace/`
- `src/services/api.ts` - API base URL should be `http://localhost:5001`
- Component imports should still work (no changes needed)

---

## Troubleshooting

### "Cannot find module" errors

**Cause:** Dependencies not installed
**Fix:**
```bash
npm install --workspaces
```

### "Port already in use"

**Cause:** Previous process still running
**Fix:**
```bash
# Kill process on specific port
lsof -ti:5001 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Marketplace
lsof -ti:3002 | xargs kill -9  # Landing
```

### Backend import errors

**Cause:** TypeScript paths changed after move
**Fix:** Check `packages/backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Marketplace API calls fail

**Cause:** API base URL incorrect
**Fix:** Update `packages/marketplace/src/services/api.ts`:
```ts
const API_BASE_URL = 'http://localhost:5001'
```

---

## Verification Checklist

Before proceeding, ensure:

- [ ] `packages/backend/` exists and has all files
- [ ] `packages/marketplace/` exists (renamed from frontend)
- [ ] `packages/landing/` exists with Next.js app
- [ ] Root `package.json` has workspaces config
- [ ] `npm install` completes without errors
- [ ] `npm run dev:backend` starts successfully
- [ ] `npm run dev:marketplace` starts successfully
- [ ] `npm run dev:landing` starts successfully
- [ ] `npm run dev` runs all three concurrently
- [ ] Can access all three apps in browser
- [ ] No import errors in any package
- [ ] API calls work from marketplace to backend

---

## Next Steps After Migration

Once all three apps run successfully:

1. **Test Full Flow:**
   - Open marketplace at localhost:3000
   - Create wallets
   - Purchase data via AI agent
   - Verify payments on Arc Network

2. **Test Landing Page:**
   - Open landing at localhost:3002
   - Click "Launch App" → Should open marketplace
   - Check all internal navigation
   - Test terminal animation

3. **Prepare for Deployment:**
   - Build all packages: `npm run build`
   - Fix any build errors
   - Deploy landing to Vercel
   - Deploy backend to Railway/Render
   - Deploy marketplace to Netlify

4. **Update Documentation:**
   - Add live URLs to README
   - Update demo instructions
   - Create video walkthrough

---

## Success!

When you can run `npm run dev` and all three apps start without errors, your monorepo migration is complete! 🎉

You now have:
- Professional landing page for marketing
- Functional marketplace app
- Backend with Arc Network integration
- Clean monorepo structure
- Ready for hackathon submission
