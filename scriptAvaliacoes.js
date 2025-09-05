async function listarProduto(){
    const res = await fetch('/avaliacao');
    const avaliacoes = await res.json();
    const lista = document.getElementById("lista-produto");
    lista.innerHTML = "";
    avaliacoes.forEach(a => {
        const li = document.createElement("li");
        li.textContent = `${a.id} - ${a.desc}`;
        lista.appendChild(li);
    });
}

async function adicionarProduto(){
    const av = document.getElementById("produto").value;
    await fetch('/avaliacao',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ av })
    });
    listarProduto();
}

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
