import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Stock Historical Prices API",
    version: "1.0.0",
  },
  host: "localhost:8080",
  schemes: ["http"],
  tags: [
    {
      name: "Stocks",
    },
  ],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routers/stock_prices.router"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
