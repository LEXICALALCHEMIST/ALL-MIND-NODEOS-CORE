// src/apps/archon/archon_os.js — ARCHON: Persistent Shell

import './xenoFrameArch.js';  // Shared frame exposed on window
import './relayTest.js';  // Mock relay — simulates Pi listener
  console.log('Mock relay loaded');
import nodeWire from './nodeWire.js';  // ← Import here
  window.nodeWire = nodeWire;

window.ArchonSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  root.innerHTML = '';



  // Persistent shared XenoFrame — lives for entire session
  window.sharedXenoFrame = window.sharedXenoFrame || {
    activeDroneId: null,
    activeView: 'control_center',
    fleetState: {} // future: { droneId: { battery, position, ... } }
  };

  const container = document.createElement('div');
  container.className = 'naxContainer';

  // NAX BACKGROUND
  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  // Title
  const title = document.createElement('div');
  title.textContent = 'ARCHON';
  title.className = 'naxTitle';
  container.appendChild(title);

  // Central viewport — single mutable surface
  const hiveViewport = document.createElement('div');
  hiveViewport.id = 'hiveViewport';
  hiveViewport.style.cssText = `
    width: 90%;
    max-width: 1200px;
    margin: 40px auto 80px;
    min-height: 80vh;
    background: rgba(46, 46, 46, 0.56);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 16px;
    box-shadow: 0 0 60px rgba(0, 255, 255, 0.2);
    overflow: hidden;
    position: relative;
  `;
  container.appendChild(hiveViewport);

  root.appendChild(container);

  // POLYGON IMPORT
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      console.log('Polygon summoned');
    })
    .catch(() => console.warn('Polygon silent'));

  // Navigation bar — persistent, below viewport
  const navBar = document.createElement('div');
  navBar.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    z-index: 100;
  `;
  container.appendChild(navBar);

  const navButtonStyles = `
    padding: 12px 24px;
    font-size: 10px;
    font-family: orbitron, sans-serif;
    color: aqua;
    background: rgba(0, 255, 255, 0.08);
    border: 1px solid aqua;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transition: all 0.3s;
  `;

  const views = [
    { label: 'C-C', view: 'control_center' },
    { label: 'F-O', view: 'fleet_overview' },
    { label: 'M-C', view: 'mission' },
    { label: 'A-L', view: 'alerts' }
  ];

  views.forEach(v => {
    const btn = document.createElement('button');
    btn.textContent = v.label;
    btn.style.cssText = navButtonStyles;
    btn.addEventListener('click', () => {
      console.log(`[ARCHON] Navigate intent: ${v.view}`);
      sharedXenoFrame.activeView = v.view;
      loadTendril(v.view);
    });
    navBar.appendChild(btn);
  });

  // Load initial tendril (default or from frame)
  const initialView = sharedXenoFrame.activeView || 'control_center';
  loadTendril(initialView);

  // Helper: load & inject tendril (burn old, stream new)
  function loadTendril(viewName) {
    hiveViewport.innerHTML = ''; // Burn previous

    import(`/apps/ARCHON/tendrils/${viewName}/${viewName}.js?t=${Date.now()}`)
      .then(module => {
        const tendrilFn = module[`${viewName}Tendril`] || module.default;
        if (typeof tendrilFn === 'function') {
          tendrilFn(hiveViewport);
          console.log(`Tendril injected: ${viewName}`);
        } else {
          console.error(`Tendril ${viewName} not found`);
        }
      })
      .catch(err => console.error('Tendril load failed:', err));
  }

  // Ready signal
  window.dispatchEvent(new Event('archon_os_ready'));
};