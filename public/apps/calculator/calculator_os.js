// FINAL LAW — PURE DOM APP (NO REACT, NO OBJECTS, NO ERRORS)
function CalculatorSkin() {
  const div = document.createElement('div');
  div.style.cssText = `
    position:fixed;inset:0;background:#000;color:#0f0;
    font:140px monospace;display:grid;place-items:center;
    text-shadow:0 0 80px #0f0;border:12px solid #0f0;
    box-shadow:0 0 160px #0f0;z-index:999999;
    pointer-events:none;user-select:none;
  `;
  div.innerHTML = 'CALCULATOR';
  document.body.appendChild(div);

  // Return nothing (or null) — React expects a valid child
  return null;
}

// Expose it
window.CalculatorSkin = CalculatorSkin;
window.dispatchEvent(new Event('calculator_os_ready'));