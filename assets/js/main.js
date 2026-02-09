const container = document.getElementById("card_database");
const header = document.getElementById("list-header");
const viewSelect = document.getElementById("view-select");

function renderCards(view) {
  container.innerHTML = "";

  container.className = view === "list" ? "list-view" : "grid-view";
  header.classList.toggle("hidden", view !== "list");

  character_cards.forEach(card => {
    const cardEl = document.createElement("a");
    cardEl.href = `cards/${card.name}.html`;
    cardEl.className = `card ${view}`;

    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.name}">

      <span class="name">${card.name}</span>
      <span class="hp">❤️ ${card.hp}</span>
      <span class="set">${card.set}</span>
      <span class="type">${card.type ?? "Postava"}</span>
    `;

    container.appendChild(cardEl);
  });
}

viewSelect.addEventListener("change", e => {
  renderCards(e.target.value);
});

renderCards("grid");
