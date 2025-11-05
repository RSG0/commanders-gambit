import express from "express";
import fetch from "node-fetch";
import fs, { write } from "fs";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());

const JSON_FILENAME = "commanders.jsonl"

// Utility to check if a file is empty
function isFileEmpty(filePath) 
{
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

app.get("/update", async (req, res) => // will update the commanders
{
  res.setHeader("Content-Type", "application/x-ndjson")
  fs.unlink('./commanders.jsonl', (err) =>
  {
    if (err)
    {
      console.log("Error deleting JSON file: ", err)
    }
    else
    {
      console.log("Successfully deleted JSON file");
    }
  })
  await new Promise(resolve => setTimeout(resolve, 500)); // Delay .5 seconds
  console.log("Now Fetching")
  await fetchCommandersScryfall(res)

})

app.get("/search", async (req, res) => 
{
  res.setHeader("Content-Type", "application/x-ndjson");

  const empty = await isFileEmpty(JSON_FILENAME);

  if (empty) {
    console.log("File empty, fetching from API...");
    await fetchCommandersScryfall(res)
  } else {
    console.log("Serving commanders from local file...");
    const readStream = fs.createReadStream(JSON_FILENAME, 'utf-8');
    readStream.pipe(res);
  }
});

async function fetchCommandersScryfall(res) {
  const seenNames = new Set();
  const commanders = [];
  let url = `https://api.scryfall.com/cards/search?q=t:legendary+t:creature`

  const writeStream = fs.createWriteStream(JSON_FILENAME, {encoding: 'utf-8', flags: 'a'}) // appends the information and creates the JSON file
      try {
        while (url)
        {
          const response = await fetch(url); // returns all legendary creatures, (illegal)
          const data = await response.json();
          data.data.forEach((card) => //data.data  is needed based on scryfall API
          {
            const imageUrl = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;             
            if (imageUrl && !seenNames.has(card.name)) // prevents duplicates (maybe be obsolete)
            {
              commanders.push({name: card.name, imageUrl})
              // console.log("Adding Commander:", card.name)
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
          if (data.has_more === false) // if scryfall is done loading in commanders display the comamanders
          {
            console.log("Scryfall is done loading commanders")
            const readStream = fs.createReadStream(JSON_FILENAME, 'utf-8');
            readStream.pipe(res);
          }

        }
          

      } catch (err) {
        console.error(`Error 194`, err);
        return [];
      };

  writeStream.end()
  return commanders;
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
