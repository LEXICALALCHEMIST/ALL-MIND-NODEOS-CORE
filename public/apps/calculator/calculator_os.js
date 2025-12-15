// calculator_os.js — Final version with live preview + listeners

function CalculatorSkin() {
  document.body.innerHTML = '';

  // Black void
  const background = document.createElement('div');
  background.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:-1;';
  document.body.appendChild(background);

  // Title bar
  const title = document.createElement('div');
  title.className = 'app_title';
  title.innerHTML = 'CALCULATOR';
  document.body.appendChild(title);

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium';
  document.body.appendChild(card);

  // Row + 2 columns
  const row = document.createElement('div');
  row.className = 'polygon_row';

  // Column A
  const colA = document.createElement('div');
  colA.className = 'polygon_col polygon_col_2';
  colA.innerHTML = '<label style="color:#0f0;font:24px monospace;">A</label>';
  const inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'First number';
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
  inputB.placeholder = 'Second number';
  inputB.value = '';
  inputB.style.cssText = inputA.style.cssText;
  colB.appendChild(inputB);
  row.appendChild(colB);

  card.appendChild(row);

  // Intent selector — above preview
const intentWrapper = document.createElement('div');
intentWrapper.style.cssText = 'width:100%;text-align:center;margin-top:30px;';

const intentLabel = document.createElement('label');
intentLabel.textContent = 'Operation';
intentLabel.style.cssText = 'color:#0f0;font:24px monospace;display:block;margin-bottom:10px;';
intentWrapper.appendChild(intentLabel);

const intentSelect = document.createElement('select');
intentSelect.className = 'intent_selector';
const operations = [
  { value: 'add', text: '+' },
  { value: 'sub', text: '-' },
  { value: 'mul', text: '×' },
  { value: 'div', text: '÷' }
];
operations.forEach(op => {
  const option = document.createElement('option');
  option.value = op.value;
  option.textContent = op.text;
  intentSelect.appendChild(option);
});
intentWrapper.appendChild(intentSelect);
card.appendChild(intentWrapper);

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

  preview.textContent = `Live Imprint: ${a} ${op} ${b}`;

  // SACRED CONSOLE LOG — real-time values
  console.log('CURRENT IMPRINT STATE:', {
    a: a,
    operation: op,
    b: b,
    full: `${a} ${op} ${b}`
  });
};  // Inside the calculate handler — right before the matrix call
// CALCULATE button — finalizes imprint
// CALCULATE button
const calculateBtn = document.createElement('button');
calculateBtn.className = 'polygon_btn';
calculateBtn.textContent = 'CALCULATE';
calculateBtn.style.marginTop = '40px';
calculateBtn.onclick = async () => {
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

  try {
    const exoprint = await window.xenoMatrix.initialize("calculator", imprint); // if using modified initialize;
    console.log('EXOPRINT RECEIVED FROM XENO:', exoprint);
    preview.textContent = `Result: ${exoprint.value}`;
  } catch (err) {
    console.error('XENO REJECT:', err);
    preview.textContent = 'ERROR';
  }
};

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
  fetch('http://localhost:3001/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});

  console.log('CALCULATOR SKIN LOADED — LIVE PREVIEW ACTIVE');
}

window.CalculatorSkin = CalculatorSkin;
window.dispatchEvent(new Event('calculator_os_ready'));