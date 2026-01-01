// src/apps/weather/xenoFrameAPI.js — Full XENO frame with current + weekly forecast

let currentState = {
  city: 'London',
  currentWeather: null,
  weeklyForecast: [],
  loading: false,
  error: null
};

// Update wire from skin input
export function updateWire(name, value) {
  if (name === 'city') currentState.city = value.trim() || 'London';
}

// Live preview for current weather
export function imprintPreview() {
  if (currentState.loading) return 'Fetching weather...';
  if (currentState.error) return `Error: ${currentState.error}`;
  if (!currentState.currentWeather) return 'Enter city and fetch weather';

  const current = currentState.currentWeather;
  const temp = Math.round(current.temp);
  const feelsLike = Math.round(current.feelslike);
  const conditions = current.conditions;

  return `Weather: ${currentState.city}
  ${temp}°C (feels like ${feelsLike}°C)
  ${conditions}`;
  }

// Get 7-day forecast for naxList
export function getWeeklyForecast() {
  if (!currentState.weeklyForecast.length) {
    return [
      { a: 'Today', b: '—' },
      { a: 'Tomorrow', b: '—' },
      { a: 'Day 3', b: '—' },
      { a: 'Day 4', b: '—' },
      { a: 'Day 5', b: '—' },
      { a: 'Day 6', b: '—' },
      { a: 'Day 7', b: '—' }
    ];
  }

  return currentState.weeklyForecast.map((day, index) => {
    const dayName = index === 0 ? 'Today' :
                    index === 1 ? 'Tomorrow' :
                    `Day ${index + 1}`;
    const temp = Math.round(day.temp);
    return { a: dayName, b: `${temp}°C` };
  });
}

// Forge imprint — call API
export async function forgeImprint() {
  currentState.loading = true;
  currentState.error = null;

  try {
    const apiKey = 'EU7BT5CSTZXZN2PCB2CCX6LNM';  // Your key
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(currentState.city)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'City not found');
    }

    const data = await response.json();

    // Current weather
    currentState.currentWeather = data.currentConditions;

    // Weekly forecast (first 7 days)
    currentState.weeklyForecast = data.days.slice(0, 7);

    console.log('%cXENOFRAME → Weather + Weekly fetched', 'color: #00ff9f;', data);
  } catch (err) {
    currentState.error = err.message;
    console.error('%cXENOFRAME → Fetch failed', 'color: #ff0044;', err);
  } finally {
    currentState.loading = false;
  }

  return currentState;
}