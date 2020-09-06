function templateItemLista(lista = []) {
  let template = "";
  for (const item of lista) {
    template += `<li>${item}</li>`;
  }
  return template;
}

function templateReceita(receita) {
  return `<article class="recipe">
  <h2 class="recipe__title">${receita.titulo}</h2>
  <span class="recipe__author">${receita.autor}</span>
  <img class="recipe__photo" alt="Foto de ${receita.titulo}"
    src="${receita.foto}">
  <section>
    <h3 class="recipe__sectiontitle">Ingredientes</h3>
    <ul class="recipe__ingredients">
      ${templateItemLista(receita.ingredientes)}
    </ul>
  </section>
  <section>
    <h3 class="recipe__sectiontitle">Modo de preparo</h3>
    <ol class="recipe__prepare">
      ${templateItemLista(receita.modoPreparo)}
    </ol>
  </section>
  </article>`;
}

function criarTemplateHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content;
}

async function loadData() {
  const resposta = await fetch("./receitas.json");
  const dados = await resposta.json();
  for (const receita of dados) {
    if (!receita.titulo) continue;
    const receitaHtml = criarTemplateHtml(templateReceita(receita));
    console.log(receitaHtml);
    const clone = document.importNode(receitaHtml, true);
    document.querySelector(".recipes").appendChild(clone);
  }
}

loadData();
