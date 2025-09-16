// Corrige erro: não usar optional chaining no lado esquerdo de atribuição
function sendForm(e){
  if(e && typeof e.preventDefault === 'function') e.preventDefault();
  const okElement = document.getElementById('ok');
  if (okElement) {
    okElement.style.display = 'block';
    okElement.setAttribute('role','status');
  }
  if (e && e.target && typeof e.target.reset === 'function') {
    e.target.reset();
  }
}

// Testes básicos (não intrusivos)
(function runTests(){
  try {
    // Caso 1: sem elemento #ok (remove/recupera temporariamente)
    const contatoContainer = document.querySelector('#contato .container');
    const ok = document.getElementById('ok');
    let placeholder; let removed = false;
    if (ok && contatoContainer) { placeholder = ok; contatoContainer.removeChild(ok); removed = true; }
    let threw = false;
    try { sendForm({preventDefault(){}, target:{reset(){}}}); } catch(err){ threw = true; console.error(err); }
    console.assert(!threw, 'sendForm NÃO deve lançar erro quando #ok não existir');
    // Restaura DOM
    if (removed && contatoContainer) contatoContainer.appendChild(placeholder);

    // Caso 2: com #ok presente — deve ficar visível
    const ok2 = document.getElementById('ok');
    const before = ok2 ? ok2.style.display : '';
    sendForm({preventDefault(){}, target:{reset(){}}});
    console.assert(ok2 && ok2.style.display === 'block', 'sendForm deve exibir o #ok quando presente');
    if (ok2) ok2.style.display = before; // restaura estado visual
    console.log('Testes do formulário passaram ✅');
  } catch (e) {
    console.warn('Falha ao rodar testes', e);
  }
})();
