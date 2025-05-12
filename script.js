const produtos = [
  { id: 1, nome: "Vestido Azul", preco: 190.90, imagem: "./vestido1.jpeg" },
  { id: 2, nome: "Vestido Longo marrom", preco: 300.00, imagem: "./vestido2.jpeg" },
  { id: 3, nome: "roupa casa", preco: 239.90, imagem: "./vestidocasa.png" },
  { id: 4, nome: "Vestido Azul marinho", preco: 120.00, imagem: "./vestido4.jpeg" },
  { id: 5, nome: "Blaze Rosa", preco: 199.90, imagem: "./vestido5.jpeg" },
  { id: 6, nome: "Vestido Laminal Marrom", preco: 130.90, imagem: "./vestido6.jpeg" },
  { id: 7, nome: "Vestido Florido Amarelo", preco: 150.90, imagem: "./vestido7.jpeg" },
  { id: 8, nome: "Vestido Rosa", preco: 149.90, imagem: "./vestido8.jpeg" },
  { id: 9, nome: "Vestido Azul Marinho", preco: 100.90, imagem: "./vestido9.jpeg" },
  { id: 10, nome: "Vestido longo salmão", preco: 109.90, imagem: "./vestido10.jpeg" }
];

const listaProdutos = document.getElementById("lista-produtos");
const carrinho = [];

function renderizarProdutos() {
  listaProdutos.innerHTML = "";
  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
    `;
    listaProdutos.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const item = produtos.find(p => p.id === id);
  const itemNoCarrinho = carrinho.find(i => i.id === id);

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...item, quantidade: 1 });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const itensContainer = document.getElementById("cart-items");
  const contador = document.getElementById("cart-count");
  const valorTotal = document.getElementById("valor-total");

  itensContainer.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;

    const div = document.createElement("div");
    div.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
        <img src="${item.imagem}" alt="${item.nome}" class="thumbnail" />
        <div style="flex: 1;">
          <strong>${item.nome}</strong><br />
          <small>R$ ${(item.preco * item.quantidade).toFixed(2)}</small>
          <div class="quantidade-btns">
            <button class="decrementar" onclick="alterarQuantidade(${item.id}, -1)">-</button>
            <span>${item.quantidade}</span>
            <button class="incrementar" onclick="alterarQuantidade(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
    itensContainer.appendChild(div);
  });

  contador.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);
  valorTotal.textContent = total.toFixed(2);
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    const index = carrinho.findIndex(p => p.id === id);
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

function toggleCarrinho() {
  const carrinhoEl = document.getElementById("carrinho");
  carrinhoEl.style.display = carrinhoEl.style.display === "block" ? "none" : "block";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }function abrirModal(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById("modal-img").src = produto.imagem;
  document.getElementById("modal-nome").textContent = produto.nome;
  document.getElementById("modal-preco").textContent = `R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("modal-adicionar").onclick = function () {
    adicionarAoCarrinho(produto.id);
    fecharModal();
  };

  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

  alert("🎉 Parabéns pela aquisição!\nCaso queira que o projeto dê certo, nos avalie positivamente.");
  carrinho.length = 0;
  atualizarCarrinho();
}

renderizarProdutos();