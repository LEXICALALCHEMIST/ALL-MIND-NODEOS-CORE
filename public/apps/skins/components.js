// ALL-MIND/public/NAXUS/skins/components.js — Styled dropdown IntentSelect

export function IntentSelect() {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width:100%;text-align:center;margin-top:40px;';

  const label = document.createElement('label');
  label.textContent = 'Operation';
  label.style.cssText = 'color:#00ff9f;font:1.8rem monospace;display:block;margin-bottom:15px;text-shadow:0 0 20px #00ff9f;';
  wrapper.appendChild(label);

  const select = document.createElement('select');
  select.className = 'intent_selector';
  select.style.cssText = `
    background: #000;
    color: aqua;
    font-family: monospace;
    font-size: 1.6rem;
    padding: 12px 12px;
    border: 2px solid #00ff9f;
    border-radius: 12px;
    min-width: 200px;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(0, 255, 159, 0.4);
    outline: none;
    appearance: none;
    text-align: center;
    transition: all 0.3s ease;
  `;

  // Hover/active glow
  select.addEventListener('mouseenter', () => {
    select.style.boxShadow = '0 0 40px #00ff9f';
    select.style.borderColor = '#00ffff';
  });
  select.addEventListener('mouseleave', () => {
    select.style.boxShadow = '0 0 30px rgba(0, 255, 159, 0.4)';
    select.style.borderColor = '#00ff9f';
  });

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
    option.style.cssText = 'background:#000; color:aqua; font-size:1.4rem; padding:10px;';
    select.appendChild(option);
  });

  wrapper.appendChild(select);

  return wrapper;
}