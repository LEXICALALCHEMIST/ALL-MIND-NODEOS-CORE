// src/apps/ARCHON/tendrils/fleet_overview/fleet_overview.js — Tendril: Tabbed Divisions

export default function fleet_overviewTendril(viewport) {
  viewport.innerHTML = '';

  // Top tab buttons group — fixed height, tight margin
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

  // Tab buttons with data-tab attribute
  const tabs = [
    { label: 'Operational', tab: 'op' },
    { label: 'Maintenance', tab: 'maint' },
    { label: 'Production', tab: 'prod' }
  ];

  let activeTab = 'op'; // default

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
      // Highlight active
      tabBar.querySelectorAll('button').forEach(b => {
        b.style.background = 'rgba(0, 255, 255, 0.08)';
      });
      btn.style.background = 'rgba(0, 255, 255, 0.3)';
      renderTabContent();
    });
    tabBar.appendChild(btn);
  });

  // Tab content container — fills remaining space
  const tabContainer = document.createElement('div');
  tabContainer.style.cssText = `
    flex: 1;
    overflow-y: auto;
    background: rgba(0, 255, 255, 0.02);
    padding: 8px;
    box-sizing: border-box;
  `;
  viewport.appendChild(tabContainer);

  // Internal tab window — switched content
  const tabWindow = document.createElement('div');
  tabWindow.id = 'tab-window';
  tabWindow.style.cssText = `
    width: 100%;
    height: 100%;
  `;
  tabContainer.appendChild(tabWindow);

  // Render function — switches content based on activeTab
  function renderTabContent() {
    tabWindow.innerHTML = '';

    let contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
      color: aqua;
      font-family: monospace;
      font-size: 1.2rem;
      text-align: center;
      padding: 20px;
    `;

    if (activeTab === 'op') {
      contentDiv.textContent = 'Operational Drones\n(2/6 running)';
    } else if (activeTab === 'maint') {
      contentDiv.textContent = 'Maintenance Drones\n(2 in progress)';
    } else if (activeTab === 'prod') {
      contentDiv.textContent = 'Production Drones\n(2 in assembly/testing)';
    }

    tabWindow.appendChild(contentDiv);
  }

  // Initial render
  renderTabContent();

  console.log('Fleet Overview tendril running');
}