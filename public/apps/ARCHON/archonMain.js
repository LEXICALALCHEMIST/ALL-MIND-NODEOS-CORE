// src/apps/archon/archon_os.js — ARCHON: Main Entry with Placeholder Controls

window.ArchonSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  root.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'naxContainer';

  // NAX BACKGROUND — lattice pulse foundation
  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  // Title — ARCHON branding
  const title = document.createElement('div');
  title.textContent = 'ARCHON';
  title.className = 'naxTitle';
  container.appendChild(title);

  // Controls container — centered, flexible grid
  const controls = document.createElement('div');
  controls.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `;
  container.appendChild(controls);

  // Four placeholder buttons — styled, intent-ready
  const buttonStyles = `
    padding: 10px 20px;
    width: 200px;
    font-size: 12px;
    font-family: orbitron, sans-serif;
    color: aqua;
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid aqua;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transition: all 0.3s;
  `;

  const btn0 = document.createElement('button');
  btn0.textContent = 'CONTROL CENTER';
  btn0.style.cssText = buttonStyles;
  btn0.addEventListener('click', () => {
    console.log('[ARCHON] Intent: Navigate to overview');
    // Future: nodeWire.emit({ type: 'navigate', to: 'overview' });
    // Or: window.location = '?warp=archon-overview';
  });
  controls.appendChild(btn0);

  const btn1 = document.createElement('button');
  btn1.textContent = 'Fleet Overview';
  btn1.style.cssText = buttonStyles;
  btn1.addEventListener('click', () => {
    console.log('[ARCHON] Intent: Navigate to overview');
    // Future: nodeWire.emit({ type: 'navigate', to: 'overview' });
    // Or: window.location = '?warp=archon-overview';
  });
  controls.appendChild(btn1);

  const btn2 = document.createElement('button');
  btn2.textContent = 'Drone Detail';
  btn2.style.cssText = buttonStyles;
  btn2.addEventListener('click', () => {
    console.log('[ARCHON] Intent: Navigate to detail');
    // Future: window.location = '?warp=archon-detail&drone=CF-001';
  });
  controls.appendChild(btn2);

  const btn3 = document.createElement('button');
  btn3.textContent = 'Mission Control';
  btn3.style.cssText = buttonStyles;
  btn3.addEventListener('click', () => {
    console.log('[ARCHON] Intent: Navigate to mission');
    // Future: window.location = '?warp=archon-mission';
  });
  controls.appendChild(btn3);

  const btn4 = document.createElement('button');
  btn4.textContent = 'Alerts & Logs';
  btn4.style.cssText = buttonStyles;
  btn4.addEventListener('click', () => {
    console.log('[ARCHON] Intent: Navigate to alerts');
    // Future: window.location = '?warp=archon-alerts';
  });
  controls.appendChild(btn4);

  root.appendChild(container);

  // POLYGON IMPORT — lattice aesthetics
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      console.log('Polygon CSS summoned');
    })
    .catch(() => console.warn('Polygon summon silent'));

  // Ready signal — for reactor/XenoFrame wiring
  window.dispatchEvent(new Event('archon_os_ready'));
};