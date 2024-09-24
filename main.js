const download = require('image-downloader');
const https = require('https');
const path = require('path');
const fs = require('fs');

async function getJson() {
  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const info = JSON.parse(data).data;
        resolve(info);
      });
    }).on('error', (err) => {
      console.error(`Error: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadImage(card, folder) {
  if (card.card_images && card.card_images[0].image_url) {
    const name = card.name.replace(/[/\\?%*:|"<>]/g, '');
    const url = card.card_images[0].image_url;
    const extension = path.extname(url);
    const filePath = path.resolve(folder, `${name}_${card.race}_${card.type}${card.level ? '_lvl' + card.level : ''}${card.attribute ? '_' + card.attribute : ''}${extension}`);

    try {
      if (!fs.existsSync(filePath)) {
        await download.image({ url, dest: filePath });
        console.log(`Downloaded: ${filePath}`);
      } else {
        console.log(`Skipped (already exists): ${filePath}`);
      }
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`);
    }
  }
}

async function start() {
  const folder = path.resolve(__dirname, '../../cards');
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  let data;
  try {
    data = await getJson();
  } catch (err) {
    console.error("Failed to fetch card data:", err);
    process.exit(1);
  }

  const concurrency = 18; // Number of parallel downloads
  const delay = 1000 / concurrency; // Delay to stay within 18 calls/second
  const queue = [...data]; // Copy of data for processing

  async function downloadBatch() {
    while (queue.length > 0) {
      const batch = queue.splice(0, concurrency);
      await Promise.all(batch.map(card => downloadImage(card, folder)));
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait before the next batch
    }
  }

  await downloadBatch();
  console.log('All downloads completed.');
}

start();
