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

async function getTotalPages() {
  const url = `https://api.magicthegathering.io/v1/cards?page=1&pageSize=100&type=creature&supertypes=legendary`;
  const response = await fetch(url);

  const totalCount = parseInt(response.headers.get("Total-Count"), 10);
  const pageSize   = parseInt(response.headers.get("Page-Size"), 10);

  const totalPages = Math.ceil(totalCount / pageSize);

  console.log("Total Count:", totalCount);
  console.log("Page Size:", pageSize);
  console.log("Total Pages:", totalPages);

  return totalPages;
}


// Fetch pages concurrently with batch size
async function fetchCommandersFromAPI(batchSize = 5) {
  // const totalPages = await getTotalPages()
  const totalPages = await getTotalPages();
  const seenNames = new Set();
  const commanders = [];

  const writeStream = fs.createWriteStream(JSON_FILENAME, {encoding: 'utf-8', flags: 'a'})

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  for (let i = 0; i < totalPages; i += batchSize) {
    // console.log("Working on Batch:", i + 1)
    console.log(`Working on pages: ${i+1}-${batchSize + i}`)
    console.log("i:", i)
    if (i >= totalPages)
    {
      console.log("Finished Adding All pages")
      break;
    }
    if (pages.at(i) == null) 
    {
      console.log("Page",  pages.at(i), "doesn't seem to exist.")
    }
    const batch = pages.slice(i, i + batchSize); // EX: if i =10 than (10, 10 + 10)
    const promises = batch.map(async (page) => {
      try {
        const response = await fetch(`https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=100&type=creature&supertypes=legendary`); // returns all legendary creatures
        const data = await response.json();
        // console.log("Cards:", data.cards)

        if (!data.cards || !Array.isArray(data.cards))
          {
            console.log("error detected 82")
            return [];
          }

        return data.cards
          .filter((card) => {
            const isLegendaryCreature = card.supertypes?.includes("Legendary") &&
              card.types?.includes("Creature") &&
              card.imageUrl;

            if (isLegendaryCreature && !card.imageUrl)
            {
              console.log(`${card.name} doesn't have an image. (Not adding to JSON)`)
            }
            if (!isLegendaryCreature || !card.imageUrl || seenNames.has(card.name)) return false;

            seenNames.add(card.name); // mark as seen immediately
            return true;
          })
          .map((card) => {
            writeStream.write(JSON.stringify(card) + "\n");
            return card;
          });


      } catch (err) {
        console.error(`Error fetching page ${page}:`, err);
        return [];
      }
    });

    const results = await Promise.all(promises);
    results.forEach(arr => commanders.push(...arr));
  } 
  writeStream.end()
  return commanders;
}

// Fetch new commanders and stream to client + save to file
async function fetchNewCommanders(res) {
  const commanders = await fetchCommandersFromAPI(10);

  // Read the file
  const readStream = fs.createReadStream(JSON_FILENAME, { encoding: 'utf-8', flags: "w" });
  for (const card of commanders) {
    readStream.write(JSON.stringify(card) + "\n");
    res.write(JSON.stringify(card) + "\n"); // stream to client
  }

  // writeStream.end();
  res.end();
}

app.get("/search", async (req, res) => {
  res.setHeader("Content-Type", "application/x-ndjson");

  const empty = await isFileEmpty(JSON_FILENAME);

  if (empty) {
    console.log("File empty, fetching from API...");
    // await fetchNewCommanders(res);
    await fetchCommandersFromAPI(10);
  } else {
    console.log("Serving commanders from local file...");
    const readStream = fs.createReadStream(JSON_FILENAME, 'utf-8');
    readStream.pipe(res);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
