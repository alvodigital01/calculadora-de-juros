const valorProdutoInput = document.getElementById('valorProduto');
const entradaInput = document.getElementById('entrada');
const tabelaParcelas = document.getElementById('tabelaParcelas');

// Tabela fixa baseada em financiamento de R$ 800 (compra 1000 - entrada 200)
const parcelasBase800 = {
  debito: 834.76,
  1: 845.42,
  2: 857.72,
  3: 863.05,
  4: 868.38,
  5: 874.12,
  6: 879.86,
  7: 888.63,
  8: 895.44,
  9: 900.36,
  10: 906.92,
  11: 912.66,
  12: 919.22,
  13: 922.50,
  14: 929.06,
  15: 934.80,
  16: 942.18,
  17: 948.74,
  18: 959.40
};

function atualizarParcelas() {
  const valorProduto = parseFloat(valorProdutoInput.value) || 0;
  const entrada = parseFloat(entradaInput.value) || 0;
  const valorFinanciado = Math.max(valorProduto - entrada, 0);
  const proporcao = valorFinanciado / 800; // Base para R$ 800 financiado

  tabelaParcelas.innerHTML = '';

  // Débito
  const debito = parcelasBase800.debito * proporcao;
  tabelaParcelas.innerHTML += criarLinha('Débito', debito, 1);

  // Parcelado
  for (let i = 1; i <= 18; i++) {
    const total = (parcelasBase800[i] || 0) * proporcao;
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
