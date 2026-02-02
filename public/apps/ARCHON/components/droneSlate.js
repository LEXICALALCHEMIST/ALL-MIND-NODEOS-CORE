  export function createDroneSlate(drone) {
    // Create the main container div
    const slate = document.createElement('div');
    
    // Basic styling - small rectangle, full width, fixed height
    slate.style.height = '22px';
    slate.style.width = '95%';
    slate.style.background = 'linear-gradient(to right, #111010 0%, rgba(0,0,0,0) 100%)';
    slate.style.color = '#e0e0ff';
    slate.style.borderBottom = '1px solid #33333339';
    slate.style.display = 'flex';
    slate.style.alignItems = 'center';
    slate.style.padding = '2px 10px';
    slate.style.fontFamily = 'monospace, sans-serif';
    slate.style.fontSize = '13px';
    slate.style.cursor = 'pointer';
    slate.style.userSelect = 'none';
    slate.style.position = 'relative';
    slate.style.overflow = 'hidden';

  // Hover effect — preserve the gradient
  slate.addEventListener('mouseenter', () => {
    slate.style.background = 'linear-gradient(to right, #2a2a3f 0%, rgba(42,42,63,0.3) 100%)'; // darker version of your gradient
  });

  slate.addEventListener('mouseleave', () => {
    slate.style.background = 'linear-gradient(to right, #111010 0%, rgba(0,0,0,0) 100%)'; // back to original gradient
  });

    // Drone ID
    const idSpan = document.createElement('span');
    idSpan.textContent = drone.id || '???';
    idSpan.style.fontWeight = 'bold';
    idSpan.style.minWidth = '100px';
    idSpan.style.color = '#a5d6ff';

    // Status indicator (colored dot) — improved for mobile
    const statusDot = document.createElement('span');
    statusDot.style.width = '10px';                    // ← increase to 10–12px
    statusDot.style.height = '10px';                   // same height
    statusDot.style.minWidth = '10px';                 // prevent flex shrink
    statusDot.style.minHeight = '10px';
    statusDot.style.borderRadius = '50%';
    statusDot.style.marginRight = '10px';              // a bit more breathing room
    statusDot.style.display = 'inline-block';
    statusDot.style.flexShrink = '0';                  // ← crucial: stop flex from squashing it
    statusDot.style.boxShadow = '0 0 4px currentColor'; // subtle glow — helps visibility a lot

    // Optional: stronger visibility on low-contrast backgrounds
    statusDot.style.boxShadow = '0 0 6px rgba(0,0,0,0.6), inset 0 0 2px rgba(255,255,255,0.4)';
      
    const statusColors = {
      ready: '#4caf50',
      charging: '#ff9800',
      offline: '#f44336',
      maintenance: '#9e9e9e',
      testing: '#2196f3',
      default: '#757575'
    };
    statusDot.style.backgroundColor = statusColors[drone.status] || statusColors.default;

    // Name
    const nameSpan = document.createElement('span');
    nameSpan.textContent = drone.name || 'Unnamed';
    nameSpan.style.minWidth = '140px';
    nameSpan.style.whiteSpace = 'nowrap';
    nameSpan.style.overflow = 'hidden';
    nameSpan.style.textOverflow = 'ellipsis';

    // Battery progress bar (your current code - looks good)
    const batteryContainer = document.createElement('div');
    batteryContainer.style.minWidth = '60px';
    batteryContainer.style.height = '16px';
    batteryContainer.style.marginLeft = 'auto';
    batteryContainer.style.position = 'relative';
    batteryContainer.style.overflow = 'hidden';
    batteryContainer.style.borderRadius = '4px';
    batteryContainer.style.border = '1px solid #333';
    batteryContainer.style.background = '#0a0a0a';

    const batteryFill = document.createElement('div');
    const percent = drone.battery != null ? Math.max(0, Math.min(100, drone.battery)) : 0;
    batteryFill.style.width = `${percent}%`;
    batteryFill.style.height = '100%';
    batteryFill.style.background = 'linear-gradient(to right, #042904, #00ff00)';
    batteryFill.style.transition = 'width 0.4s ease-out';

    batteryContainer.appendChild(batteryFill);

    const batteryText = document.createElement('span');
    batteryText.textContent = drone.battery != null ? `${drone.battery}%` : '—';
    batteryText.style.position = 'absolute';
    batteryText.style.inset = '0';
    batteryText.style.display = 'flex';
    batteryText.style.alignItems = 'center';
    batteryText.style.justifyContent = 'center';
    batteryText.style.color = percent > 30 ? '#000' : '#e0e0ff';
    batteryText.style.fontSize = '11px';
    batteryText.style.fontWeight = 'bold';
    batteryText.style.textShadow = percent <= 30 ? '0 0 3px #000' : 'none';
    batteryText.style.pointerEvents = 'none';

    batteryContainer.appendChild(batteryText);

    // Vertiport
    const vertiportSpan = document.createElement('span');
    vertiportSpan.textContent = drone.location?.vertiport || '—';
    vertiportSpan.style.minWidth = '80px';
    vertiportSpan.style.textAlign = 'right';
    vertiportSpan.style.color = '#aaa';
    vertiportSpan.style.marginLeft = '12px';

    // Assemble the slate – FIXED ORDER, no batterySpan
    slate.appendChild(statusDot);
    slate.appendChild(idSpan);
    slate.appendChild(nameSpan);
    slate.appendChild(batteryContainer);     // ← correct
    slate.appendChild(vertiportSpan);

    // Click handler
    slate.addEventListener('click', () => {
      console.log('Selected drone:', drone.id);
    });

    return slate;
  }