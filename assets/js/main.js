const container = document.getElementById("character-cards");
const header = document.getElementById("list-header");
const viewSelect = document.getElementById("view-select");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderCards(view) {
  container.innerHTML = "";
  container.className = view === "list" ? "list-view" : "grid-view";
  header.classList.toggle("hidden", view !== "list");

  character_cards.forEach(card => {
    const cardEl = document.createElement("a");
    cardEl.href = `cards/${slugify(card.name)}.html`;
    cardEl.className = `character-card ${view === "list" ? "character-card--list" : "character-card--grid"}`;

    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <span class="character-card__name">${card.name}</span>
      <span class="character-card__hp">❤️ ${card.hp}</span>
      <span class="character-card__set">${card.set}</span>
      <span class="character-card__type">${card.type ?? "Postava"}</span>
    `;

    container.appendChild(cardEl);
  });
}

viewSelect.addEventListener("change", e => {
  renderCards(e.target.value);
});

// Initial render
renderCards("grid");
