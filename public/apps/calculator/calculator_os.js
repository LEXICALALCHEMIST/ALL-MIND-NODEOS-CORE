// calculator_os.js — Final version with live preview + listeners
import { IntentSelect } from '../skins/components.js';

function CalculatorSkin() {

  //log root merge
  console.log('%cALL-MIND: ROOT - MERGE', 'color: #b388ff; font-family: monospace; font-size: 10px;');
  document.body.innerHTML = '';

  // START WITH NAX BACKGROUND - poly class
  const background = document.createElement('div');
  background.className = 'naxBackground';
  document.body.appendChild(background);

  // APP MAIN LOGIC ----------------------------------------------| BACKGROUND

  // NAX APP BUILD MANIFEST 

  // APP MAIN LOGIC ----------------------------------------------| CENTER-VIEW

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium'; // POLY-CLASS
  document.body.appendChild(card);

  // WRAPPER 100% ----------------------------------------------| POLY-CARD

  // Row + 2 columns
  const row = document.createElement('div');
  row.className = 'polygon_row';

  // Column A
  const colA = document.createElement('div');
  colA.className = 'polygon_col polygon_col_2';
  colA.innerHTML = '<label style="color:#0f0;font:24px monospace;">A</label>';
  const inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'Set';
  inputA.value = '';
  inputA.style.cssText = 'width:100%;padding:15px;background:#000;color:#0f0;border:2px solid #0f0;font:30px monospace;text-align:center;border-radius:8px;';
  colA.appendChild(inputA);
  row.appendChild(colA);

  // Column B
  const colB = document.createElement('div');
  colB.className = 'polygon_col polygon_col_2';
  colB.innerHTML = '<label style="color:#0f0;font:24px monospace;">B</label>';
  const inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'Push|Pull';
  inputB.value = '';
  inputB.style.cssText = inputA.style.cssText;
  colB.appendChild(inputB);
  row.appendChild(colB);

  card.appendChild(row);

  // Intent selector — IMPOPRTED COMPONENT - from components.js - LOGIC RETURN IS
  const intentComponent = IntentSelect('add', (newIntent) => {
    currentIntent = newIntent;  // Store selected intent
    updatePreview();
  });

  card.appendChild(intentComponent);

  const intentSelect = intentComponent.querySelector('select');
  if (!intentSelect) {
  console.error('Select element not found in IntentSelect component');
  }

  // Live preview
  const preview = document.createElement('div');
  preview.className = 'exoprint_preview';
  preview.textContent = 'Live Imprint: —';
  card.appendChild(preview);

// === LISTENERS + LIVE UPDATE + CONSOLE LOG ===
  const updatePreview = () => {
  const a = inputA.value.trim() || '0';
  const b = inputB.value.trim() || '0';
  const op = intentSelect.value;

  preview.textContent = `Live Imprint: A: ${a} OP: ${op} B: ${b}`;

  // SACRED CONSOLE LOG — real-time values
  console.log('CURRENT IMPRINT STATE:', {
    a: a,
    operation: op,
    b: b,
    full: `${a} ${op} ${b}`
  });
};  // Inside the calculate handler — right before the matrix call
const calculateBtn = document.createElement('button');
calculateBtn.className = 'polygon_btn';
calculateBtn.textContent = 'CALCULATE';
calculateBtn.style.marginTop = '40px';

calculateBtn.onclick = () => {
  console.log('XENOFRAME - ADAPTER - MELT');

  const imprint = {
    app: 'calculator',
    intent: intentSelect.value,
    a: parseFloat(inputA.value) || 0,
    b: parseFloat(inputB.value) || 0,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };

  console.log('FINAL IMPRINT FORGED:', imprint);


  // ONLY DISPATCH — matrix is listening via event
  document.dispatchEvent(new CustomEvent('imprint', { detail: imprint }));
};

// === ADD THIS LISTENER ONCE (outside the function, at bottom of file) ===
document.addEventListener('exoprint', (e) => {
  const exoprint = e.detail;
  console.log('EXOPRINT RECEIVED FROM XENO:', exoprint);

  // Update UI with real result
  const preview = document.querySelector('.exoprint_preview');
  if (preview) {
    if (exoprint.value !== null && exoprint.value !== undefined) {
      preview.textContent = `Result: ${exoprint.value}`;
    } else {
      preview.textContent = 'Result: ERROR (invalid computation)';
    }
  }
});
card.appendChild(calculateBtn);

// Forge the imprint (identical shape to CalcAdd13)
const imprint = {
  app: 'calculator',
  intent: intentSelect.value,
  a: parseFloat(inputA.value) || 0,
  b: parseFloat(inputB.value) || 0,
  id: crypto.randomUUID(),
  timestamp: Date.now()
};

console.log('FORGED IMPRINT:', imprint);

inputA.addEventListener('input', updatePreview);
inputB.addEventListener('input', updatePreview);
intentSelect.addEventListener('change', updatePreview);

// Initial update
updatePreview();

  // Polygon summon
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});

  console.log('%cALL-MIND: CALCULATOR APP [OPEN]', 'color: #b388ff; font-family: monospace; font-size: 10px;');
}

window.CalculatorSkin = CalculatorSkin;
window.dispatchEvent(new Event('calculator_os_ready'));