import express from "express";
import fetch from "node-fetch";
import fs, { write } from "fs";
import cors from "cors";

const app = express();
const PORT = 4000;
const ONE_DAY = 1000 * // ms
                60 *  // s
                60   // m

app.use(cors());

const JSON_FILENAME = "commanders.jsonl"
// const zlib = require('zlib')
// const compress = zlib.createGzip();
// const uncompress = zlib.createGunzip();

// Utility to check if a file is empty
function isFileEmpty(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') return resolve(true); // file doesn't exist
        return reject(err);
      }
      resolve(stats.size === 0);
    });
  });
}

app.get("/search", async (req, res) => {
  res.setHeader("Content-Type", "application/x-ndjson");

  const empty = await isFileEmpty(JSON_FILENAME);

  if (empty) {
    console.log("File empty, fetching from API...");
    // await fetchNewCommanders(res);
    // await fetchCommandersFromAPI(5);
    await fetchCommandersScryfall()
  } else {
    console.log("Serving commanders from local file...");
    const readStream = fs.createReadStream(JSON_FILENAME, 'utf-8');
    readStream.pipe(res);
  }
});

async function hasCard(cardName) {
  const url = `https://api.magicthegathering.io/v1/cards?type=creature&supertypes=legendary&name=${encodeURIComponent(cardName)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.cards || data.cards.length === 0) {
    console.log(`Commander "${cardName}" not found.`);
    return false;
  }

  console.log(`Found ${data.cards.length} results for "${cardName}"`);
  return true;
}

async function fetchCommandersScryfall() {
  const seenNames = new Set();
  const commanders = [];
  let url = `https://api.scryfall.com/cards/search?q=t:legendary+t:creature+f:commander`

  const writeStream = fs.createWriteStream(JSON_FILENAME, {encoding: 'utf-8', flags: 'a'})
      try {
        while (url)
        {
          const response = await fetch(url); // returns all legendary creatures, (legal)
          const data = await response.json(); //Needs to be let because we want to make it null when it runs out of pages
          data.data.forEach((card) =>
          {
            const imageUrl = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;            
            if (imageUrl && !seenNames.has(card.name)) // prevents duplicates (maybe be obsolete)
            {
              commanders.push({name: card.name, imageUrl })
              console.log("Adding Commander:", card.name)
              const JSONInformation = {name: card.name, imageUrl}
              seenNames.add(card.name); 
              writeStream.write(JSON.stringify(JSONInformation) + "\n")
            }
            else
            {
              console.log(`Card ${card.name} doesn't have an image`)
            }
          })
          console.log("Data has more:", data.has_more)
          url = data.has_more ? data.next_page : null;
        }
          

      } catch (err) {
        console.error(`Error 194`, err);
        return [];
      };

  writeStream.end()
  return commanders;
}

async function getTotalPagesScryfall() // May not be nessesary
{
  const url = "https://api.scryfall.com/cards/search?q=t:legendary+t:creature+f:commander"
  const response = await fetch(url)
  const data = await response()
  return data.data.cards.length; //Should return all the the length of cards
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
