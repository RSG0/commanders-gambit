import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import cors from "cors";
import redis from "redis"

const app = express();
const PORT = 4000;

app.use(cors()); //Without this line the browser will block the server script since they contain different ports

app.get("/search", (req, res) => {
  const commanders = JSON.parse(fs.readFileSync("commanders.json"));
  res.json(commanders);
});


app.get("/search", async (req, res) => {
  const pages = 426 // number of pages to fetch. //TEMPORARY
  const seenNames = new Set(); // should not allow duplicate games

  // NDJSON streaming
  res.setHeader("Content-Type", "application/x-ndjson"); // Tells the client that each data will be sent as a seperate JSON object

  // const fileStream = fs.createWriteStream("commanders.jsonl", { flags: "a" });

  for (let i = 1; i <= pages; i++) {
  const response = await fetch(`https://api.magicthegathering.io/v1/cards?page=${i}&pageSize=100&type=creature&supertypes=legendary`);
  const data = await response.json();
    try {
      if (i == pages)
      {
        console.log("Finished displaying all pages")
      }
      console.log("Pages:", i) //Duplicate Pages are expected in React Strict

      for (const card of data.cards) {
        const isLegendaryCreature =
          card.supertypes?.includes("Legendary") && // is it legendary
          card.types?.includes("Creature") && // is it a creature
          card.imageUrl; // does it have an image

          //Code excludes planeswalkers that are commanders. Later problem

        if (isLegendaryCreature && !seenNames.has(card.name)) { // if its a legendary creature and unique
          seenNames.add(card.name);  //Add to Set

          // stream to file
          // fileStream.write(JSON.stringify(card) + "\n"); // Disabling for now

          // stream to frontend
          res.write(JSON.stringify(card) + "\n"); //converts card data to json and sends to app.jsx
        }
      }
    } catch (err) {
      console.error("Error fetching page", i, err);
    }
  }

  res.end();
  // fileStream.end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
