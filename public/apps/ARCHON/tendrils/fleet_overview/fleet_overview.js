// src/apps/ARCHON/tendrils/fleet_overview/fleet_overview.js — Tendril: Tabbed Divisions

// Import drone data and the slate component
import drones from '../../data/drones.json' with { type: 'json' };                 // relative path – adjust if needed
import { createDroneSlate } from '../../components/droneSlate.js';  // assuming default export

export default function fleet_overviewTendril(viewport) {
  viewport.innerHTML = '';

  // ── Top tab bar ───────────────────────────────────────────────────────────────
  const tabBar = document.createElement('div');
  tabBar.style.cssText = `
    display: flex;
    height: 15vh;
    margin: 1px;
    padding: 1px;
    gap: 1px;
    background: rgba(0, 255, 255, 0.05);
    border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  `;
  viewport.appendChild(tabBar);

  const tabs = [
    { label: 'Operational', tab: 'op' },
    { label: 'Maintenance', tab: 'maint' },
    { label: 'Production', tab: 'prod' }
  ];

  let activeTab = 'op';

  tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.textContent = t.label;
    btn.dataset.tab = t.tab;
    btn.style.cssText = `
      flex: 1;
      background: rgba(0, 255, 255, 0.08);
      border: none;
      color: aqua;
      font-family: monospace;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
    btn.addEventListener('click', () => {
      activeTab = t.tab;
      tabBar.querySelectorAll('button').forEach(b => {
        b.style.background = 'rgba(0, 255, 255, 0.08)';
      });
      btn.style.background = 'rgba(0, 255, 255, 0.3)';
      renderTabContent();
    });
    tabBar.appendChild(btn);
  });

  // ── Main content area ─────────────────────────────────────────────────────────
  const tabContainer = document.createElement('div');
  tabContainer.style.cssText = `
    flex: 1;
    overflow-y: auto;
    background: rgba(0, 255, 255, 0.02);
    padding: 8px;
    box-sizing: border-box;
  `;
  viewport.appendChild(tabContainer);

  const tabWindow = document.createElement('div');
  tabWindow.id = 'tab-window';
  tabWindow.style.cssText = `
    width: 100%;
    height: 100%;
  `;
  tabContainer.appendChild(tabWindow);

  // ── Render logic ──────────────────────────────────────────────────────────────
  function renderTabContent() {
    tabWindow.innerHTML = '';

    if (activeTab === 'op') {
      // Filter ready drones (you had 6 in the mock)
      const readyDrones = drones.filter(d => d.status === 'ready');
      const total = drones.length;
      const readyCount = readyDrones.length;

      // Header with stats
      const header = document.createElement('div');
      header.style.cssText = `
        color: #00ffff;
        font-family: monospace;
        font-size: 1.1rem;
        padding: 8px 12px;
        border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        margin-bottom: 8px;
      `;
      header.textContent = `Operational Drones (${readyCount}/${total} ready)`;
      tabWindow.appendChild(header);

      // List container
      const list = document.createElement('div');
      list.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 1px;
      `;

      // Create slate for each ready drone
      readyDrones.forEach(drone => {
        const slate = createDroneSlate(drone);
        list.appendChild(slate);
      });

      // If no ready drones (fallback)
      if (readyDrones.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.cssText = `
          color: #ff5555;
          font-family: monospace;
          text-align: center;
          padding: 40px 20px;
        `;
        emptyMsg.textContent = 'No operational drones at this time.';
        list.appendChild(emptyMsg);
      }

      tabWindow.appendChild(list);
    } 
    else if (activeTab === 'maint') {
      const maintDrones = drones.filter(d => 
        d.status === 'maintenance' || d.status === 'charging'
      );

      const content = document.createElement('div');
      content.style.cssText = `
        color: #ffaa00;
        font-family: monospace;
        font-size: 1.2rem;
        text-align: center;
        padding: 40px 20px;
      `;
      content.textContent = `Maintenance Drones (${maintDrones.length} in progress)`;
      tabWindow.appendChild(content);
      // → later: add list here too
    } 
    else if (activeTab === 'prod') {
      const content = document.createElement('div');
      content.style.cssText = `
        color: #55ff55;
        font-family: monospace;
        font-size: 1.2rem;
        text-align: center;
        padding: 40px 20px;
      `;
      content.textContent = 'Production Drones\n(2 in assembly/testing)';
      tabWindow.appendChild(content);
      // → later: add list here too
    }
  }

  // Initial render
  renderTabContent();

  console.log('Fleet Overview tendril running – loaded', drones.length, 'drones');
}