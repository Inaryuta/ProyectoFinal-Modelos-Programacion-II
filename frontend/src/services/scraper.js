import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const PREMIER_LEAGUE_URL = 'https://www.premierleague.com';
const TEAMS_URL = `${PREMIER_LEAGUE_URL}/clubs`;

async function scrapePlayerData() {
  console.log('Starting Premier League data scraping...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Accept cookies if present
    await page.goto(TEAMS_URL);
    try {
      await page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 5000 });
      await page.click('#onetrust-accept-btn-handler');
    } catch (e) {
      console.log('No cookie banner found or already accepted');
    }

    // Get all team URLs
    const teamUrls = await page.evaluate(() => {
      const teamLinks = document.querySelectorAll('.team-link');
      return Array.from(teamLinks).map(link => link.href);
    });

    const playerData = {};

    // Process first 5 teams (for demo purposes)
    for (let i = 0; i < 5; i++) {
      const teamUrl = teamUrls[i];
      console.log(`Scraping team: ${teamUrl}`);
      
      await page.goto(`${teamUrl}/squad`);
      await page.waitForSelector('.player-card');

      const teamPlayers = await page.evaluate(() => {
        const players = document.querySelectorAll('.player-card');
        return Array.from(players).map(player => {
          const nameElement = player.querySelector('.player-name');
          const imageElement = player.querySelector('.player-image img');
          const positionElement = player.querySelector('.player-position');
          
          return {
            name: nameElement ? nameElement.textContent.trim() : '',
            image: imageElement ? imageElement.src : '',
            position: positionElement ? positionElement.textContent.trim() : '',
          };
        });
      });

      for (const player of teamPlayers) {
        if (player.name && player.image) {
          playerData[player.name] = {
            image: player.image,
            position: player.position
          };
        }
      }

      // Wait between requests to be respectful
      await new Promise(r => setTimeout(r, 2000));
    }

    // Save the data
    await fs.writeFile(
      './src/services/playerData.json',
      JSON.stringify(playerData, null, 2)
    );

    console.log('Scraping completed successfully!');
    
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapePlayerData();