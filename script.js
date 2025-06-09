const valorProdutoInput = document.getElementById('valorProduto');
const entradaInput = document.getElementById('entrada');
const tabelaParcelas = document.getElementById('tabelaParcelas');

const juros = {
  1: 0.06383,
  2: 0.06518,
  3: 0.073098,
  4: 0.081138,
  5: 0.08984,
  6: 0.103222,
  7: 0.105274,
  8: 0.111223,
  9: 0.115476,
  10: 0.121938,
  11: 0.129138,
  12: 0.135274,
  13: 0.141200,
  14: 0.147000,
  15: 0.153600,
  16: 0.159800,
  17: 0.165000,
  18: 0.170000
};

function atualizarParcelas() {
  const valorProduto = parseFloat(valorProdutoInput.value) || 0;
  const entrada = parseFloat(entradaInput.value) || 0;
  const valorFinanciado = Math.max(valorProduto - entrada, 0);

  tabelaParcelas.innerHTML = '';

  // Débito
  const debito = valorFinanciado * (1 + 0.02606);
  tabelaParcelas.innerHTML += criarLinha('Débito', debito, 1);

  // Parcelado
  for (let i = 1; i <= 18; i++) {
    const total = valorFinanciado * (1 + (juros[i] || 0));
    tabelaParcelas.innerHTML += criarLinha(`${i} x`, total, i);
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
