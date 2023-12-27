import express from "express";
import dotenv from "dotenv";
dotenv.config();
import swaggerRouter from "./routers/swagger.router";
import stockPricesRouter from "./routers/stock_prices.router";
import { middleWareInterceptor } from "./controllers";

const port = process.env.PORT;
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Stock Historical Prices API",
  });
});

app.use("/", swaggerRouter);
app.use("/", middleWareInterceptor, stockPricesRouter);

app.listen(port);
console.log(`Server listening on port: ${port}.`);

module.exports = app;
