# ArcFeed Landing Page

Professional marketing landing page for the ArcFeed marketplace, built with Next.js 14.

## Features

- **Hero Page**: "The Agentic Data Economy" with Arc Network branding
- **Live Demo**: Interactive terminal showing HTTP 402 payment flow
- **Pricing Calculator**: Compare micropayments vs traditional SaaS pricing
- **API Documentation**: Complete integration guide
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion

## Getting Started

### Install Dependencies

\`\`\`bash
cd packages/landing
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The landing page will be available at [http://localhost:3002](http://localhost:3002)

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates a static export in the `out/` directory, ready for Vercel deployment.

## Pages

- **/** - Hero page with stats, live terminal demo, how it works
- **/demo** - Technical breakdown of the HTTP 402 flow
- **/pricing** - Interactive pricing calculator and data product table
- **/docs** - Complete API documentation

## Components

- **AgentTerminal** - Animated terminal showing live payment flow
- **PricingWidget** - Interactive slider comparing costs

## Deployment

This landing page is configured for static export and can be deployed to:

- **Vercel** (recommended): `vercel --prod`
- **Netlify**: Drag and drop the `out/` folder
- **GitHub Pages**: Push `out/` folder to gh-pages branch

## Tech Stack

- Next.js 14.1.0
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- Framer Motion 11.0.3

## Environment Variables

No environment variables needed - everything is static!

## License

MIT