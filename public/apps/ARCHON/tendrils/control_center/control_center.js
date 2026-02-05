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

  // Status display — expanded tech/telemetry panel
  const statusDisplay = document.createElement('div');
  statusDisplay.id = 'status-display';
  statusDisplay.style.cssText = `
    color: #00ffff;
    font-family: orbitron, monospace;
    font-size: 10px;
    line-height: 1.5;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
    text-align: left;
    margin: 10px auto;
    padding: 16px 20px;
    max-width: 380px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 255, 247, 0.25);
    border-radius: 8px;
    box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1);
    backdrop-filter: blur(4px);
  `;

  statusDisplay.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">
      STATUS: ${status.current}
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span style="color: #88ffff;">ALTITUDE</span>
      <span style="color: #0062ff;">[ ? m ]</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span style="color: #88ffff;">SPEED</span>
      <span style="color: #00d5ff;">[ ? m/s ]</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span style="color: #88ffff;">NEXT DEST</span>
      <span style="color: #2df600;">[ ? ]</span>
    </div>
  `;

  viewport.appendChild(statusDisplay);

  // Live render function — now updates the first line only (others are static placeholders)
  function renderStatus() {
    // Only update the status line dynamically
    statusDisplay.querySelector('div:first-child').textContent = `STATUS: ${status.current}`;
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
    padding: 20px 20px;
    background: linear-gradient(to right, #1c1c1ecb 0%, rgba(28, 28, 30, 0) 100%);
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
    font-size: 14px;
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

    // Right side: Emergency / Takeoff / Land / Hover buttons — consistent style
    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = `
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
    `;

    // Emergency Land — lighter green, same style as Takeoff but different icon color
    const emergencyBtn = document.createElement('button');
    emergencyBtn.innerHTML = '<i class="bi bi-arrow-down-circle-fill"></i>';  // same up arrow icon as takeoff
    emergencyBtn.style.cssText = `
      padding: 6px 10px;
      font-size: 22px;
      color: red;                   // lighter green
      border: 2px solid #ff0000;        // lighter green border
      border-radius: 12px;
      background: black;  // slightly faded since dead
      transition: all 0.3s;
      min-width: 50px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    emergencyBtn.addEventListener('mouseenter', () => {
      emergencyBtn.style.opacity = '0.9';
      emergencyBtn.style.boxShadow = '0 0 30px rgba(136, 255, 136, 0.6)';
      emergencyBtn.style.transform = 'scale(1.1)';
    });
    emergencyBtn.addEventListener('mouseleave', () => {
      emergencyBtn.style.opacity = '0.7';
      emergencyBtn.style.boxShadow = '0 0 20px rgba(136, 255, 136, 0.3)';
      emergencyBtn.style.transform = 'scale(1)';
    });
    buttonGroup.appendChild(emergencyBtn);

    // Takeoff (functional, unchanged except consistent sizing)
    const takeoffBtn = document.createElement('button');
    takeoffBtn.innerHTML = '<i class="bi bi-arrow-up-circle-fill"></i>';
    takeoffBtn.style.cssText = `
      padding: 6px 10px;
      font-size: 22px;
      color: #00ffff;
      background: rgba(0, 255, 255, 0.15);
      border: 2px solid #00ffff;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
      transition: all 0.3s;
      min-width: 50px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      takeoffBtn.style.transform = 'scale(1.1)';
    });
    takeoffBtn.addEventListener('mouseleave', () => {
      takeoffBtn.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
      takeoffBtn.style.transform = 'scale(1)';
    });
    buttonGroup.appendChild(takeoffBtn);

    // Land (placeholder, down arrow, same style)
    const landBtn = document.createElement('button');
    landBtn.innerHTML = '<i class="bi bi-arrow-down-circle-fill"></i>';
    landBtn.style.cssText = `
      padding: 6px 10px;
      font-size: 22px;
      color: #55ff55;
      background: rgba(0, 255, 255, 0.15);
      border: 2px solid #55ff55;
      border-radius: 8px;
      cursor: not-allowed;
      opacity: 0.7;
      transition: all 0.3s;
      min-width: 50px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    landBtn.addEventListener('mouseenter', () => {
      landBtn.style.opacity = '0.9';
      landBtn.style.boxShadow = '0 0 30px rgba(85, 255, 85, 0.6)';
      landBtn.style.transform = 'scale(1.1)';
    });
    landBtn.addEventListener('mouseleave', () => {
      landBtn.style.opacity = '0.7';
      landBtn.style.boxShadow = '0 0 20px rgba(85, 255, 85, 0.3)';
      landBtn.style.transform = 'scale(1)';
    });
    buttonGroup.appendChild(landBtn);

    // Hover mode — matches Takeoff style, uses "H" icon
    const hoverBtn = document.createElement('button');
    hoverBtn.innerHTML = '<i class="bi bi-h-square-fill"></i>';  // H icon for Hover
    hoverBtn.style.cssText = `
      padding: 6px 10px;
      font-size: 22px;
      color: #00ffff;
      background: rgba(0, 255, 255, 0.15);
      border: 2px solid #00ffff;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
      transition: all 0.3s;
      min-width: 50px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    hoverBtn.addEventListener('click', () => {
      const droneId = window.sharedXenoFrame?.activeDroneId || 'CF-001';
      console.log('[CONTROL CENTER] HOVER MODE ACTIVATED for', droneId);
      // nodeWire.emit('flight-command', { droneId, cmd: 'hover' }); // add when ready
      status.current = 'intent-sent — hover mode';
    });
    hoverBtn.addEventListener('mouseenter', () => {
      hoverBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
      hoverBtn.style.transform = 'scale(1.1)';
    });
    hoverBtn.addEventListener('mouseleave', () => {
      hoverBtn.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
      hoverBtn.style.transform = 'scale(1)';
    });
    buttonGroup.appendChild(hoverBtn);

    headerSection.appendChild(buttonGroup);
    viewport.appendChild(headerSection);
  // ──────────────────────────────────────────────────────────────────────────────
// ── Preset Button Groups: Speed & Altitude ───────────────────────────────────
const buttonSection = document.createElement('div');
buttonSection.style.cssText = `
  width: 90%;
  max-width: 500px;
  margin: 0 auto 40px auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 8px;
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Reusable function to create one preset button group
function createPresetGroup(labelText, fillColorStart, fillColorEnd, unit) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const label = document.createElement('div');
  label.textContent = labelText;
  label.style.cssText = `
    color: #00ffff;
    font-family: monospace;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
  `;

  const group = document.createElement('div');
  group.style.cssText = `
    display: flex;
    gap: 8px;
    justify-content: space-between;
  `;

  const presets = [25, 50, 75, 100];

  presets.forEach(value => {
    const btn = document.createElement('button');
    btn.textContent = `${value}${unit}`;
    btn.dataset.value = value;
    btn.style.cssText = `
      flex: 1;
      padding: 10px 0;
      font-size: 14px;
      font-family: monospace;
      color: #00ff88;
      background: linear-gradient(to bottom, ${fillColorStart}, ${fillColorEnd}22);
      border: 1.5px solid #00ff88;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 0 8px rgba(0, 255, 136, 0.2);
    `;

    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = '0 0 16px rgba(0, 255, 136, 0.6)';
      btn.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = '0 0 8px rgba(0, 255, 136, 0.2)';
      btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', () => {
      // Highlight selected button
      group.querySelectorAll('button').forEach(b => {
        b.style.background = `linear-gradient(to bottom, ${fillColorStart}, ${fillColorEnd}22)`;
        b.style.boxShadow = '0 0 8px rgba(0, 255, 136, 0.2)';
      });
      btn.style.background = `linear-gradient(to bottom, ${fillColorEnd}88, ${fillColorEnd})`;
      btn.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';

      console.log(`${labelText} set to ${value}${unit}`);
      // Later: add 2-second timer + nodeWire.emit here
      // e.g. nodeWire.emit('set-' + labelText.toLowerCase(), { value });
    });

    group.appendChild(btn);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(group);
  buttonSection.appendChild(wrapper);
}

// Create the two groups
createPresetGroup('SPEED',    '#1a3c1a', '#00ff88', ' m/s');
createPresetGroup('ALTITUDE', '#1a3c1a', '#00ff88', ' m');

viewport.appendChild(buttonSection);


  // Debug listener (unchanged)
  nodeWire.on('exoprint', (data) => {
    console.log('[CONTROL CENTER] DEBUG: Full exoprint object from relay:', data);
  });

  console.log('Control Center tendril running');

  return () => {
    console.log('Control Center tendril burned');
  };
}