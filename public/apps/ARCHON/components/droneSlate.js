
export function createDroneSlate(drone) {
  // Create the main container div
  const slate = document.createElement('div');
  
  // Basic styling - small rectangle, full width, fixed height
  slate.style.height = '22px';
  slate.style.width = '95%';
  slate.style.backgroundColor = '#1e1e2e';       // dark background (adjust as needed)
  slate.style.color = '#e0e0ff';                 // light text
  slate.style.borderBottom = '1px solid #33333339';   // subtle separator
  slate.style.display = 'flex';
  slate.style.alignItems = 'center';
  slate.style.padding = '2px 10px';
  slate.style.fontFamily = 'monospace, sans-serif';
  slate.style.fontSize = '13px';
  slate.style.cursor = 'pointer';                // clickable feel
  slate.style.userSelect = 'none';

  // Hover effect (optional but nice for list items)
  slate.addEventListener('mouseenter', () => {
    slate.style.backgroundColor = '#2a2a3f';
  });
  slate.addEventListener('mouseleave', () => {
    slate.style.backgroundColor = '#1e1e2e';
  });

  // Drone ID - first / most prominent
  const idSpan = document.createElement('span');
  idSpan.textContent = drone.id || '???';
  idSpan.style.fontWeight = 'bold';
  idSpan.style.minWidth = '100px';          // consistent spacing
  idSpan.style.color = '#a5d6ff';           // highlight ID

  // Status indicator (colored dot)
  const statusDot = document.createElement('span');
  statusDot.style.width = '8px';
  statusDot.style.height = '8px';
  statusDot.style.borderRadius = '50%';
  statusDot.style.marginRight = '8px';
  statusDot.style.display = 'inline-block';
  
  // Color based on status
  const statusColors = {
    ready: '#4caf50',        // green
    charging: '#ff9800',     // orange
    offline: '#f44336',      // red
    maintenance: '#9e9e9e',  // gray
    testing: '#2196f3',      // blue
    default: '#757575'
  };
  statusDot.style.backgroundColor = statusColors[drone.status] || statusColors.default;

  // Name (shortened if too long)
  const nameSpan = document.createElement('span');
  nameSpan.textContent = drone.name || 'Unnamed';
  nameSpan.style.minWidth = '140px';
  nameSpan.style.whiteSpace = 'nowrap';
  nameSpan.style.overflow = 'hidden';
  nameSpan.style.textOverflow = 'ellipsis';

  // Battery %
  const batterySpan = document.createElement('span');
  batterySpan.textContent = drone.battery != null ? `${drone.battery}%` : '—';
  batterySpan.style.minWidth = '60px';
  batterySpan.style.textAlign = 'right';
  batterySpan.style.marginLeft = 'auto';     // push to right

  // Optional: vertiport / location tag
  const vertiportSpan = document.createElement('span');
  vertiportSpan.textContent = drone.location?.vertiport || '—';
  vertiportSpan.style.minWidth = '80px';
  vertiportSpan.style.textAlign = 'right';
  vertiportSpan.style.color = '#aaa';
  vertiportSpan.style.marginLeft = '12px';

  // Assemble the slate
  slate.appendChild(statusDot);
  slate.appendChild(idSpan);
  slate.appendChild(nameSpan);
  slate.appendChild(batterySpan);
  slate.appendChild(vertiportSpan);

  // Optional: click to select / manual override
  slate.addEventListener('click', () => {
    console.log('Selected drone:', drone.id);
    // Here you can later dispatch an event, call a function, etc.
    // e.g. showManualOverride(drone);
  });

  return slate;
}