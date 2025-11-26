// calculator_os.mjs — bare bones test
export default function CalculatorSkin() {
  return document.createElement('div');
}

CalculatorSkin.prototype.render = function() {
  this.element = document.createElement('div');
  this.element.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:red;color:white;padding:50px;font-size:32px;font-family:Arial;border:3px solid white;';
  this.element.textContent = 'Calculator';
  return this.element;
};