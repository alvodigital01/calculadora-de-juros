const valorProdutoInput = document.getElementById('valorProduto');
const entradaInput = document.getElementById('entrada');
const tabelaParcelas = document.getElementById('tabelaParcelas');

// Tabela fixa de parcelas (baseada em valor financiado de R$ 1.000,00)
const parcelasFixas = {
  1: 1051.62,
  2: 533.46,
  3: 357.85,
  4: 270.05,
  5: 217.46,
  6: 182.41,
  7: 157.91,
  8: 139.23,
  9: 124.44,
  10: 112.81,
  11: 103.21,
  12: 95.29,
  13: 88.27,
  14: 82.55,
  15: 77.52
};

function atualizarParcelas() {
  const valorProduto = parseFloat(valorProdutoInput.value) || 0;
  const entrada = parseFloat(entradaInput.value) || 0;
  const valorFinanciado = Math.max(valorProduto - entrada, 0);
  tabelaParcelas.innerHTML = '';

  // Débito (simples acréscimo de 2,606% como estava antes)
  const debito = valorFinanciado * (1 + 0.02606);
  tabelaParcelas.innerHTML += criarLinha('Débito', debito, 1);

  for (let i = 1; i <= 15; i++) {
    const parcelaBase = parcelasFixas[i]; // valor da parcela para R$ 1.000 financiado
    const valorParcela = (parcelaBase / 1000) * valorFinanciado;
    const total = valorParcela * i;
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
