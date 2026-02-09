// src/apps/ARCHON/tendrils/drone_overview/drone_overview.js

import drones from '../../data/drones.json' with { type: 'json' };  // single source of truth

// Selected drone — defaults to first in array
let selectedDrone = drones[0] || { id: '—', name: 'No drones loaded' };

// Function to change selected drone (call from slate click later)
function setSelectedDrone(id) {
  selectedDrone = drones.find(d => d.id === id) || drones[0];
  console.log('Drone selected in overview:', selectedDrone.id, selectedDrone.name);
  // Re-render will be called from main tendril when needed
}

// Quick status color helper (same as slate)
function getStatusColor(status) {
  const colors = {
    ready: '#4caf50',
    charging: '#ff9800',
    offline: '#f44336',
    maintenance: '#9e9e9e',
    testing: '#2196f3',
    default: '#757575'
  };
  return colors[status] || colors.default;
}

// Render function — now takes viewport as parameter
function renderDroneOverview(viewport) {
  viewport.innerHTML = '';  // clear

  const container = document.createElement('div');
  container.style.cssText = `
    color: #00ffff;
    font-family: monospace;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: rgba(0,0,0,0.4);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #00ffff33;
  `;

  content.innerHTML = `
    <h2 style="text-align:center; margin-bottom: 30px;">Drone Overview</h2>

    <div style="font-size: 1.4rem; margin-bottom: 16px;">
      <strong>ID:</strong> ${selectedDrone.id || '—'}
    </div>
    <div style="font-size: 1.2rem; margin-bottom: 12px;">
      <strong>Name:</strong> ${selectedDrone.name || 'Unnamed'}
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Status:</strong> 
      <span style="color: ${getStatusColor(selectedDrone.status)};">
        ${selectedDrone.status || 'unknown'}
      </span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Battery:</strong> ${selectedDrone.battery != null ? selectedDrone.battery + '%' : '—'}
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Vertiport:</strong> ${selectedDrone.location?.vertiport || '—'}
    </div>
    <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
      <strong>Connection URI:</strong> ${selectedDrone.connection?.uri || '—'}
    </div>
  `;

  container.appendChild(content);

  // Footer note
  const footer = document.createElement('div');
  footer.style.cssText = `
    text-align: center;
    margin-top: 30px;
    font-size: 0.9rem;
    opacity: 0.7;
  `;
  footer.textContent = `Selected drone ID: ${selectedDrone.id} — ready for components`;
  container.appendChild(footer);

  viewport.appendChild(container);
}

// Main tendril function – keeps exact same signature
export default function drone_overviewTendril(viewport) {
  // Initial render with default selected drone
  renderDroneOverview(viewport);

  console.log('Drone Overview tendril running');
  console.log('Currently selected drone:', selectedDrone.id, selectedDrone.name);
  
  // Later: call setSelectedDrone('cf-003') from slate click → then call renderDroneOverview(viewport) again
}