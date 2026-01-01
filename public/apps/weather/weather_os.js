// src/apps/weather/weather_os.js — Full weather app skin with top 25% current + 50% forecast

import { updateWire, imprintPreview, getWeeklyForecast, forgeImprint } from './xenoFrameAPI.js';
import { naxList } from '../skins/components.js';

window.WeatherSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  root.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'naxContainer';

  // NAX BACKGROUND
  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  // Title
  const title = document.createElement('div');
  title.textContent = 'WEATHER';
  title.className = 'naxTitle';
  container.appendChild(title);

  // Search bar
  const searchBar = document.createElement('div');
  searchBar.style.cssText = `
    width: 60%;
    max-width: 600px;
    margin: 40px auto;
    padding: 10px;
    background: #1a1a1a;
    border: 1px solid aqua;
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const cityInput = document.createElement('input');
  cityInput.type = 'text';
  cityInput.placeholder = 'Enter city...';
  cityInput.value = 'London';
  cityInput.style.cssText = `
    flex: 1;
    background: transparent;
    border: none;
    color: aqua;
    font-family: monospace;
    font-size: 1.2rem;
    outline: none;
  `;
  cityInput.addEventListener('input', (e) => updateWire('city', e.target.value));

  const searchBtn = document.createElement('button');
  searchBtn.textContent = 'SEARCH';
  searchBtn.className = 'os_btn';
  searchBtn.style.cssText = 'font-size: 1.2rem; padding: 10px 20px;';
  searchBtn.addEventListener('click', async () => {
    await forgeImprint();
    updateDisplay();
  });

  searchBar.appendChild(cityInput);
  searchBar.appendChild(searchBtn);
  container.appendChild(searchBar);

  // Top 25% card — current weather
  const topCard = document.createElement('div');
  topCard.className = 'naxCard_25';

  const currentWeather = document.createElement('div');
  currentWeather.id = 'currentWeather';
  currentWeather.style.cssText = `
    font-size: 1.8rem;
    color: aqua;
    text-shadow: 0 0 20px aqua;
    text-align: center;
  `;
  topCard.appendChild(currentWeather);
  container.appendChild(topCard);

  // Bottom 50% card — forecast
  const forecastCard = document.createElement('div');
  forecastCard.className = 'naxCard_50';

  const forecastList = document.createElement('div');
  forecastList.id = 'forecastList';

  // Compacted styles — reduced padding, base font 14px, controlled height
  forecastList.style.cssText = `
    padding: 5px;
    font-size: 12px;
    line-height: 1.3;
    max-height: 280px; /* constrains to card bounds */
  `;

  forecastCard.appendChild(forecastList);
  container.appendChild(forecastCard); // ← restored — card now mounts cleanly

  // Update display
  const updateDisplay = () => {
  currentWeather.textContent = imprintPreview();

  forecastList.innerHTML = '';
  const weekly = getWeeklyForecast();
  let list = naxList(weekly);

  // Enforce compaction on the generated list/table
  list.style.cssText = `
    width: 100%;
    font-size: 12px;
    margin: 0;
  `;

  // Tighten cells if table structure
  if (list.tagName === 'TABLE') {
    const cells = list.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.padding = '4px 6px';
      cell.style.margin = '0';
    });
  }

  forecastList.appendChild(list);
  };

  // Initial display — preserved as before
  updateDisplay();

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.className = 'os_btn';
  closeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-size: 2rem;
    padding: 8px 16px;
  `;
  closeBtn.addEventListener('click', () => window.killApp());
  container.appendChild(closeBtn);

  root.appendChild(container);

  // POLYGON SUMMON
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});
};

window.dispatchEvent(new Event('weather_os_ready'));