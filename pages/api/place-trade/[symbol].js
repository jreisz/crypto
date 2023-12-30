export default async function handler(req, res) {
  const symbol = req.url.substring(req.url.lastIndexOf("/") + 1);

  const endpoint = "/place_trade";
  let trade = {};

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}${endpoint}/${symbol}`,
      {
        method: "POST",
      }
    );

    const responseJson = await response.json();
    if (!responseJson.detail) {
      trade = responseJson;
      res.status(200).json(trade);
      return;
    } else {
      res.status(502).json(responseJson);
    }
  } catch (err) {
    console.error(
      `Failed to load data from endpoint ${endpoint}.`,
      err.message
    );
  }
}
