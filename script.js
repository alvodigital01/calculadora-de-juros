const valorProdutoInput = document.getElementById('valorProduto');
const entradaInput = document.getElementById('entrada');
const tabelaParcelas = document.getElementById('tabelaParcelas');

// Juros fixos por número de parcelas (em % decimal)
const taxasJuros = {
  debito: 0.0385,  // 3.85%
  1: 0.0516,
  2: 0.0669,
  3: 0.0736,
  4: 0.0802,
  5: 0.0873,
  6: 0.0945,
  7: 0.1054,
  8: 0.1138,
  9: 0.1199,
  10: 0.1281,
  11: 0.1353,
  12: 0.1434,
  13: 0.1475,
  14: 0.1557,
  15: 0.1628,
  16: 0.1714,
  17: 0.1822,
  18: 0.1927
};

function atualizarParcelas() {
  const valorProduto = parseFloat(valorProdutoInput.value) || 0;
  const entrada = parseFloat(entradaInput.value) || 0;
  const valorFinanciado = Math.max(valorProduto - entrada, 0);

  tabelaParcelas.innerHTML = '';

  // Débito
  const totalDebito = valorFinanciado * (1 + taxasJuros.debito);
  tabelaParcelas.innerHTML += criarLinha('Débito', totalDebito, 1);

  // Parcelado
  for (let i = 1; i <= 18; i++) {
    const taxa = taxasJuros[i] || 0;
    const total = valorFinanciado * (1 + taxa);
    tabelaParcelas.innerHTML += criarLinha(`${i}x`, total, i);
  }
}

function criarLinha(label, total, parcelas) {
  const valorParcela = total / parcelas;
  return `
    <tr>
      <td>${label}</td>
      <td>R$ ${valorParcela.toFixed(2).replace('.', ',')}</td>
      <td>R$ ${total.toFixed(2).replace('.', ',')}</td>
    </tr>
  `;
}

valorProdutoInput.addEventListener('input', atualizarParcelas);
entradaInput.addEventListener('input', atualizarParcelas);
