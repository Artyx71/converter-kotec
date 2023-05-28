const express = require("express");
const axios = require("axios");

const app = express();
const apiKey = "YOUR_API_KEY"; // Заменить на ваш API-ключ

app.get("/api/currency", async (req, res) => {
  const baseCurrency = req.query.base; // Базовая валюта
  const targetCurrency = req.query.target; // Целевая валюта

  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json`,
      {
        params: {
          app_id: apiKey,
          base: baseCurrency,
        },
      }
    );

    const rates = response.data.rates;
    const rate = rates[targetCurrency];

    if (rate) {
      res.json({ base: baseCurrency, target: targetCurrency, rate });
    } else {
      res.status(400).json({ error: "Invalid currency" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch currency rates" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
