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

  // Live preview area
  const preview = document.createElement('div');
  preview.className = 'exoprint_preview';
  preview.textContent = 'Live Imprint: —';
  preview.style.cssText = 'margin-top:40px;color:#0f0;font:32px monospace;text-align:center;';
  card.appendChild(preview);

  // === LISTENERS — LIVE UPDATE ===
  const updatePreview = () => {
    const a = inputA.value.trim() || '0';
    const b = inputB.value.trim() || '0';
    const op = 'add'; // placeholder until intent selector added
    preview.textContent = `Live Imprint: ${a} ${op} ${b}`;
  };

  inputA.addEventListener('input', updatePreview);
  inputB.addEventListener('input', updatePreview);

  // Initial call
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