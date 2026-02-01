// src/apps/ARCHON/tendrils/control_center/control_center.js — Tendril: Drone Selection Added

import nodeWire from '../../nodeWire.js';  // ← Import at top — intent bus

export default function control_centerTendril(viewport) {
  viewport.innerHTML = '';

  // Status object — live reactive state with getter
  const status = {
    _current: 'idle',  // private backing field
    get current() {
      return this._current;
    },
    set current(value) {
      this._current = value;
      console.log('Status changed to:', value);
      renderStatus();  // auto-render on change
    },
    airborne: ''  // placeholder
  };

    // Status display -------------------------------------------------------------
  const statusDisplay = document.createElement('div');
  statusDisplay.id = 'status-display';
  statusDisplay.style.cssText = `
    color: aqua;
    font-family: monospace;
    font-size: 1.6rem;
    text-shadow: 0 0 20px aqua;
    text-align: center;
    margin: 40px 0;
  `;
  viewport.appendChild(statusDisplay);

  function renderStatus() {
    statusDisplay.textContent = `Status: ${status.current}`;
    console.log('[CONTROL CENTER] Rendered status:', status.current);
  }

  // Initial render
  renderStatus();

  // ── Header section ────────────────────────────────────────────────────────────
  const headerSection = document.createElement('div');
  headerSection.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 40px 0;
    padding: 15px 20px;
    background: rgba(0, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.15);
    gap: 20px;
  `;

  // Left side: Title + dropdown
  const leftGroup = document.createElement('div');
  leftGroup.style.cssText = `
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1 1 auto;
    min-width: 300px;
  `;

  const title = document.createElement('div');
  title.textContent = 'Drone Selection';
  title.style.cssText = `
    color: #00ffff;
    font-family: monospace;
    font-size: 1.4rem;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  `;
  leftGroup.appendChild(title);

  // Functional dropdown
  const droneDropdown = document.createElement('select');
  droneDropdown.style.cssText = `
    padding: 8px 12px;
    font-size: 14px;
    font-family: monospace;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
    border: 1.5px solid #00ffff;
    border-radius: 8px;
    cursor: pointer;
    min-width: 220px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300ffff' d='M2 4l4 4 4-4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: all 0.25s;
  `;
  droneDropdown.innerHTML = `
    <option value="" disabled selected>Select Drone...</option>
    <option value="CF-001">CF-001 - Red Alpha</option>
    <option value="CF-002">CF-002 - Blue Beta</option>
    <option value="CF-003">CF-003 - Green Gamma</option>
    <option value="all">All Drones</option>
  `;

  droneDropdown.addEventListener('focus', () => {
    droneDropdown.style.boxShadow = '0 0 12px rgba(0, 255, 255, 0.4)';
  });
  droneDropdown.addEventListener('blur', () => {
    droneDropdown.style.boxShadow = 'none';
  });

  droneDropdown.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected && selected !== 'all') {
      window.sharedXenoFrame.activeDroneId = selected;
      const selectedText = e.target.options[e.target.selectedIndex].text;
      status.current = `Selected: ${selectedText} — Ready`;
      console.log(`Drone selected: ${selected}`);
    } else if (selected === 'all') {
      status.current = 'All Drones selected — Multi-mode';
      // Optional: clear activeDroneId or handle swarm logic later
    }
  });

  leftGroup.appendChild(droneDropdown);
  headerSection.appendChild(leftGroup);

  // Right side: Emergency / Safe / Takeoff buttons
  const buttonGroup = document.createElement('div');
  buttonGroup.style.cssText = `
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  `;

  // Emergency Land (still dead for now)
  const emergencyBtn = document.createElement('button');
  emergencyBtn.textContent = 'Emergency Land';
  emergencyBtn.style.cssText = `
    padding: 10px 20px;
    font-size: 15px;
    font-family: monospace;
    color: #ff5555;
    background: rgba(255, 85, 85, 0.08);
    border: 1.5px solid #ff5555;
    border-radius: 10px;
    cursor: not-allowed;
    opacity: 0.65;
    transition: all 0.25s;
    min-width: 140px;
    text-align: center;
  `;
  emergencyBtn.addEventListener('mouseenter', () => { emergencyBtn.style.opacity = '0.85'; });
  emergencyBtn.addEventListener('mouseleave', () => { emergencyBtn.style.opacity = '0.65'; });
  buttonGroup.appendChild(emergencyBtn);

  // Safe Land (still dead)
  const safeLandBtn = document.createElement('button');
  safeLandBtn.textContent = 'Safe Land';
  safeLandBtn.style.cssText = `
    padding: 10px 20px;
    font-size: 15px;
    font-family: monospace;
    color: #55ff55;
    background: rgba(85, 255, 85, 0.08);
    border: 1.5px solid #55ff55;
    border-radius: 10px;
    cursor: not-allowed;
    opacity: 0.65;
    transition: all 0.25s;
    min-width: 140px;
    text-align: center;
  `;
  safeLandBtn.addEventListener('mouseenter', () => { safeLandBtn.style.opacity = '0.85'; });
  safeLandBtn.addEventListener('mouseleave', () => { safeLandBtn.style.opacity = '0.65'; });
  buttonGroup.appendChild(safeLandBtn);

  // NEW: Takeoff button (moved to header, functional)
  const takeoffBtn = document.createElement('button');
  takeoffBtn.textContent = 'Takeoff';
  takeoffBtn.style.cssText = `
    padding: 10px 20px;
    font-size: 15px;
    font-family: monospace;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.15);
    border: 2px solid #00ffff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transition: all 0.3s;
    min-width: 140px;
    text-align: center;
  `;
  takeoffBtn.addEventListener('click', () => {
    const droneId = window.sharedXenoFrame?.activeDroneId || 'CF-001';
    console.log('[CONTROL CENTER] TAKEOFF INTENT EMITTED for', droneId);
    nodeWire.emit('flight-command', {
      droneId,
      cmd: 'takeoff'
    });
    status.current = 'intent-sent — takeoff';
  });
  takeoffBtn.addEventListener('mouseenter', () => {
    takeoffBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
  });
  takeoffBtn.addEventListener('mouseleave', () => {
    takeoffBtn.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
  });
  buttonGroup.appendChild(takeoffBtn);

  headerSection.appendChild(buttonGroup);
  viewport.appendChild(headerSection);
  // ──────────────────────────────────────────────────────────────────────────────



  // Debug listener (unchanged)
  nodeWire.on('exoprint', (data) => {
    console.log('[CONTROL CENTER] DEBUG: Full exoprint object from relay:', data);
  });

  console.log('Control Center tendril running');

  return () => {
    console.log('Control Center tendril burned');
  };
}