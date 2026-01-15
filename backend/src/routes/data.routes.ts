/**
 * Data API Routes - Protected by HTTP 402
 * 
 * DeFi data endpoints requiring micropayments on Arc Network
 */

import { Router, Request, Response } from 'express';
import { apiKeyAuth } from '../middleware/auth';
import { requirePayment } from '../middleware/x402';
import { getAllDataProducts, findDataProductById, searchDataProducts, getDataProductsByCategory } from '../marketplace/data';
import * as defiData from '../services/defiData';

const router = Router();

// All routes require API key authentication
router.use(apiKeyAuth);

/**
 * GET /api/data/catalog
 * Get all available data products (free)
 */
router.get('/catalog', async (req: Request, res: Response) => {
  try {
    const products = getAllDataProducts();
    res.json({ 
      success: true, 
      data: products,
      count: products.length,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/catalog/search
 * Search data products (free)
 */
router.get('/catalog/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required',
      });
    }

    const results = searchDataProducts(q);
    res.json({ success: true, data: results, count: results.length });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/catalog/:id
 * Get specific data product details (free)
 */
router.get('/catalog/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = findDataProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Data product not found',
      });
    }

    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== PAID DATA ENDPOINTS ====================

/**
 * GET /api/data/yields/aave
 * Aave lending yields (Requires payment: 0.002 USDC)
 */
router.get('/yields/aave', requirePayment(0.002), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getAaveYields();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/yields/compound
 * Compound lending yields (Requires payment: 0.002 USDC)
 */
router.get('/yields/compound', requirePayment(0.002), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getCompoundYields();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/yields/uniswap
 * Uniswap V3 pool yields (Requires payment: 0.003 USDC)
 */
router.get('/yields/uniswap', requirePayment(0.003), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getUniswapYields();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/yields/curve
 * Curve pool yields (Requires payment: 0.002 USDC)
 */
router.get('/yields/curve', requirePayment(0.002), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getCurveYields();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/tvl/protocols
 * Protocol TVL rankings (Requires payment: 0.003 USDC)
 */
router.get('/tvl/protocols', requirePayment(0.003), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getProtocolTVL();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/tvl/chains
 * Chain TVL distribution (Requires payment: 0.002 USDC)
 */
router.get('/tvl/chains', requirePayment(0.002), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getChainTVL();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/analytics/best-yields
 * Best yield opportunities (Requires payment: 0.005 USDC)
 */
router.get('/analytics/best-yields', requirePayment(0.005), async (req: Request, res: Response) => {
  try {
    const data = await defiData.getBestYields();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
