const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'https://www.premierleague.com/results';
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  // Scroll infinito para cargar más partidos
  let previousHeight = 0;
  while (true) {
    let newHeight = await page.evaluate('document.body.scrollHeight');
    if (newHeight === previousHeight) break; // Si no hay más contenido, salir del bucle
    previousHeight = newHeight;
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar a que cargue el contenido
  }

  // Extraer datos de los partidos
  const matchData = await page.evaluate(() => {
    const partidos = [];
    const fechas = document.querySelectorAll('.fixtures__date-container');

    fechas.forEach((fecha) => {
      const jornada = fecha.querySelector('.fixtures__date')?.getAttribute('datetime')?.trim();
      const partidos_jornada = fecha.querySelectorAll('.matchList li');

      partidos_jornada.forEach((partido) => {
        const marcador = partido.querySelector('.match-fixture__score')?.textContent.trim();
        const data_partido = {
          local: partido.getAttribute('data-home'),
          visitante: partido.getAttribute('data-away'),
          marcador: marcador || 'No disponible',
          fecha: jornada || 'Fecha no disponible'
        };
        partidos.push(data_partido);
      });
    });

    return partidos;
  });

  // Guardar los datos en un archivo JSON
  fs.writeFileSync('matchData.json', JSON.stringify(matchData, null, 2));

  console.log('✅ Datos guardados en matchData.json');
  await browser.close();
})();
