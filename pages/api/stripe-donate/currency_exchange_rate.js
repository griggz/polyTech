import { Cashify } from "cashify";
import axios from "axios";
import getCurrencyValue from "../../../apps/stripe-donate/utils/GetCurrencyValue";
import Numeral from "numeral";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { currency, symbol, values } = req.body;

      const amounts = Object.keys(values);
      // fetch the exchange rates
      const exchangeEndpoint = `https://openexchangerates.org/api/latest.json?app_id=${process.env.EXCHANGE_API_KEY}`;
      const rates = await axios
        .get(exchangeEndpoint)
        .then(function (response) {
          return response.data.rates;
        })
        .catch(function (error) {
          console.log(error);
        });
      // conversion object init
      const cashify = new Cashify({ base: "USD", rates });

      // convert currency for each specified value
      amounts.forEach(function (d) {
        if (d === "0") {
          values[d].value = Numeral(0).format(`${symbol}0,0.00`);
          values[d].amount = Numeral(0).format("0,0.00");
        } else if (d !== "0") {
          const result = cashify.convert(d, { from: "USD", to: `${currency}` });
          values[d].value = getCurrencyValue({ value: result, symbol: symbol });
          values[d].amount = getCurrencyValue({ value: result });
        }
      });

      res.status(200).send(values);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
