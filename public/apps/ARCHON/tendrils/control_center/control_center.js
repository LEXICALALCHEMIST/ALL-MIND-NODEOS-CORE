// src/apps/ARCHON/tendrils/control_center/control_center.js — Tendril: Drone Selection Added

import nodeWire from '../../nodeWire.js';  // ← Import at top — intent bus

export default function control_centerTendril(viewport) {
  viewport.innerHTML = '';

  // Status object — live reactive state with getter (unchanged)
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

  // Drone selection buttons
  const droneContainer = document.createElement('div');
  droneContainer.style.cssText = `
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 20px 0;
  `;
  viewport.appendChild(droneContainer);

  const drones = [
    { id: 'CF-001', label: 'Drone 1' },
    { id: 'CF-002', label: 'Drone 2' },
    { id: 'CF-003', label: 'Drone 3' }
  ];

  drones.forEach(drone => {
    const btn = document.createElement('button');
    btn.textContent = drone.label;
    btn.dataset.droneId = drone.id;
    btn.style.cssText = `
      padding: 10px 22px;
      font-size: 10px;
      color: #00ffff;
      background: rgba(0, 255, 255, 0.08);
      border: 2px solid #00ffff;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;
    `;
    btn.addEventListener('click', () => {
      window.sharedXenoFrame.activeDroneId = drone.id;
      status.current = `Selected: ${drone.label} — Ready`;
      // Highlight active button
      document.querySelectorAll('[data-drone-id]').forEach(b => b.style.background = 'rgba(0, 255, 255, 0.08)');
      btn.style.background = 'rgba(0, 255, 255, 0.3)';
      console.log(`Drone selected: ${drone.id}`);
    });
    droneContainer.appendChild(btn);
  });

  // Takeoff button — injects selected droneId (unchanged)
  const btn = document.createElement('button');
  btn.textContent = 'TAKEOFF';
  btn.style.cssText = `
    padding: 10px 14px;
    font-size: 22px;
    font-family: monospace;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
    border: 2px solid #00ffff;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
    transition: all 0.3s;
  `;
  btn.addEventListener('click', () => {
    console.log('[CONTROL CENTER] TAKEOFF INTENT EMITTED');
    nodeWire.emit('flight-command', {  // ← Injects selected droneId
      droneId: window.sharedXenoFrame?.activeDroneId || 'CF-001',
      cmd: 'takeoff'
    });
    status.current = 'intent-sent';  // Setter — no ()
  });
  viewport.appendChild(btn);

  // Status display (unchanged)
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

  // Live render function (unchanged)
  function renderStatus() {
    statusDisplay.textContent = `Status: ${status.current}`;
    console.log('[CONTROL CENTER] Rendered status:', status.current);
  }

  // Initial render
  renderStatus();

  // Simulate intent success after click (for demo — unchanged)
  btn.addEventListener('click', () => {
    setTimeout(() => {
      status.current = 'airborne';  // Setter triggers render
    }, 800);
  });

  // Debug: console the full exoprint object from relay (unchanged)
  nodeWire.on('exoprint', (data) => {
    console.log('[CONTROL CENTER] DEBUG: Full exoprint object from relay:', data);
  });

  console.log('Control Center tendril running');

  return () => {
    console.log('Control Center tendril burned');
  };
}