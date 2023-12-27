import dotenv from "dotenv";
dotenv.config();

// Web Scraper
import cheerio from "cheerio";

// Variables
const baseUrl = (stock: string) =>
  `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;

export const getStockHistoricalPrices = async (req: any, res: any) => {
  const { stock } = req.query;
  if (!stock) {
    return res.status(400).send({
      message: "A stock name must be included to find stock historical prices.",
    });
  }

  try {
    const stockDataUrl = baseUrl(stock);
    const stockRes = await fetch(stockDataUrl);
    const data = await stockRes.text();
    const $ = cheerio.load(data);
    const stockHistoricalPrices = [
      ["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"],
    ];

    // Get stock historical data from table body rows/columns
    $("tbody tr").each((_index: any, element: any) => {
      const rowData: any[] = [];

      // Iterate through each td element in the current row
      $(element)
        .find("td")
        .each((_innerIndex: any, innerElement: any) => {
          rowData.push($(innerElement).text());
        });

      stockHistoricalPrices.push(rowData);
    });

    if (stockHistoricalPrices.length == 1) {
      res.status(404).send({
        message: `${stock} stock historical prices were not found. Please check stock spelling.`,
      });
    } else {
      res.status(200).send({ stockHistoricalPrices });
    }
  } catch (err) {
    res.status(500).send({
      message: `Something went wrong trying to get stock historical prices for ${stock}. Please try again later.`,
    });
  }
};

export const middleWareInterceptor = (req: any, res: any, next: any) => {
  const { key } = req.query;
  const keyActual = process.env.KEY;

  if (key !== keyActual) {
    return res.status(403).send({
      message:
        "You are not authorized to access this application. Please check your key.",
    });
  }
  return next();
};
