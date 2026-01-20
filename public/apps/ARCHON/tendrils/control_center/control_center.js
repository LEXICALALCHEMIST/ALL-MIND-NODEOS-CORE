// src/apps/ARCHON/tendrils/control_center/control_center.js

export default function control_centerTendril(viewport) {
  viewport.innerHTML = '';

  const status = document.createElement('div');
  status.textContent = 'Control Center Loaded — Idle';
  status.style.cssText = `
    color: aqua;
    font-family: monospace;
    font-size: 1.6rem;
    text-shadow: 0 0 20px aqua;
    text-align: center;
    margin: 40px 0;
  `;
  viewport.appendChild(status);

  const btn = document.createElement('button');
  btn.textContent = 'TAKEOFF';
  btn.style.cssText = `
    padding: 16px 48px;
    font-size: 1.4rem;
    font-family: orbitron, monospace;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
    border: 2px solid #00ffff;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
    transition: all 0.3s;
  `;
  btn.addEventListener('click', () => {
    nodeWire.emit({
      type: 'flight-command',
      droneId: window.sharedXenoFrame?.activeDroneId || 'CF-001',
      cmd: 'takeoff'
    });
    status.textContent = 'TAKEOFF INTENT SENT — Waiting for exoprint...';
  });
  viewport.appendChild(btn);

  // Listen for exoprint feedback
  const unsubscribe = nodeWire.on('exoprint', (data) => {
    if (data.droneId === (window.sharedXenoFrame?.activeDroneId || 'CF-001')) {
      sharedXenoFrame.droneStatus = data.status;
      status.textContent = data.status;
    }
  });

  // Cleanup on burn (optional — call when unloading tendril)
  return unsubscribe;
}