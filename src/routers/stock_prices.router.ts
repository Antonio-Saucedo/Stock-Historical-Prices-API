import { Router } from "express";
import { getStockHistoricalPrices } from "../controllers";
const stockPricesRouter = Router();

// Get stock historical prices
stockPricesRouter.get("/api/stock", getStockHistoricalPrices);

export default stockPricesRouter;
