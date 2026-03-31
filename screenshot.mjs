import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function takeScreenshot() {
  const url = process.argv[2] || 'http://localhost:3000';
  const label = process.argv[3] ? `-${process.argv[3]}` : '';

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshotDir = path.join(__dirname, 'temporary screenshots');
    const { existsSync, mkdirSync } = await import('fs');
    
    if (!existsSync(screenshotDir)) {
      mkdirSync(screenshotDir, { recursive: true });
    }

    // Find next screenshot number
    const { readdirSync } = await import('fs');
    let screenshotNum = 1;
    try {
      const files = readdirSync(screenshotDir);
      const nums = files
        .map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || 0))
        .filter(n => n > 0);
      screenshotNum = Math.max(...nums, 0) + 1;
    } catch (e) {}

    const filename = `screenshot-${screenshotNum}${label}.png`;
    const filepath = path.join(screenshotDir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved: ${filepath}`);

  } finally {
    await browser.close();
  }
}

takeScreenshot().catch(console.error);