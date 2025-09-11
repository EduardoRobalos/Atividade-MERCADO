async function atualizarProduto(){
    const id = document.getElementById("id-update").value;
    const desc = document.getElementById("desc-update").value;
    await fetch(`/avaliacao/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc })
    });
    listarProduto();
}

async function deletarProduto(){
    const id = document.getElementById("id-delete").value;
    await fetch(`/avaliacao/${id}`,{ method: "DELETE" });
    listarProduto();
}
const openBtn  = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  const modal    = document.getElementById("contactModal");
  const form     = document.getElementById("productForm");
  const table    = document.getElementById("productTable").querySelector("tbody");
  const editIndexInput = document.getElementById("editIndex");
  const modalTitle = document.getElementById("modalTitle");

  let produtos = [
    { nome: "Arroz", categoria: "Alimentos", preco: 5.00, estoque: 20 },
    { nome: "Feijão", categoria: "Alimentos", preco: 7.50, estoque: 35 },
    { nome: "Detergente", categoria: "Limpeza", preco: 2.30, estoque: 50 },
    { nome: "Refrigerante", categoria: "Bebidas", preco: 6.90, estoque: 40 },
  ];

  function listarProdutosPorCategoria() {
    const lista = document.getElementById("lista-produto");
    lista.innerHTML = "";

    if (!Array.isArray(produtos) || produtos.length === 0) {
      lista.innerHTML = "<li>Nenhum produto cadastrado.</li>";
      return;
    }

    const grupos = produtos.reduce((acc, p) => {
      const cat = p.categoria || 'Sem Categoria';
      (acc[cat] = acc[cat] || []).push(p);
      return acc;
    }, {});

    Object.keys(grupos).sort().forEach(cat => {
      const liCat = document.createElement("li");
      liCat.innerHTML = `<strong>${cat}</strong>`;
      lista.appendChild(liCat);

      grupos[cat].forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)} (Estoque: ${p.estoque})`;
        li.style.marginLeft = "20px";
        lista.appendChild(li);
      });
    });
  }
    function renderTable() {
      table.innerHTML = "";
      produtos.forEach((p, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.nome}</td>
          <td>${p.categoria}</td>
          <td>R$ ${p.preco.toFixed(2)}</td>
          <td>${p.estoque}</td>
          <td>
            <button class="btn btn-edit" onclick="editarProduto(${index})">Editar</button>
            <button class="btn btn-delete" onclick="excluirProduto(${index})">Excluir</button>
          </td>
        `;
        table.appendChild(row);
      });
    }

    function openModal(editing = false) {
      modal.style.display = "flex";
      if (!editing) {
        modalTitle.textContent = "Adicionar Produto";
        form.reset();
        editIndexInput.value = "";
      }
    }
    function closeModal() { modal.style.display = "none"; }

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const categoria = document.getElementById("categoria").value;
      const preco = parseFloat(document.getElementById("preco").value);
      const estoque = parseInt(document.getElementById("estoque").value);
      const editIndex = editIndexInput.value;

      if (editIndex === "") {
        produtos.push({ nome, categoria, preco, estoque });
      } else {
        produtos[editIndex] = { nome, categoria, preco, estoque };
      }
      
  openBtn.addEventListener("click", () => openModal());
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
      renderTable();
      closeModal();
    });

    function editarProduto(index) {
      const p = produtos[index];
      document.getElementById("nome").value = p.nome;
      document.getElementById("categoria").value = p.categoria;
      document.getElementById("preco").value = p.preco;
      document.getElementById("estoque").value = p.estoque;
      editIndexInput.value = index;
      modalTitle.textContent = "Editar Produto";
      openModal(true);
    }

    function excluirProduto(index) {
      if (confirm("Deseja realmente excluir este produto?")) {
        produtos.splice(index, 1);
        renderTable();
      }
    }

    openBtn.addEventListener("click", () => openModal());
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    renderTable();