import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listing";
const app = express();
const port = 9000;

app.use(bodyParser.json());

// /listings
app.get("/listings", (_req, res) => {
  return res.send(listings);
});
app.post("/listings", (req, res) => {
  const id: string = req.body.id;

  const index = listings.findIndex(x => x.id === id);
  if (index > 0) {
    return res.send(listings.splice(index, 1)[0]);
  }
  return res.status(404).send("Could not be found.");
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
