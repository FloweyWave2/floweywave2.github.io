const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");

if (container) {
  function renderCards(view = "grid") {
    container.innerHTML = "";
    container.className = view + "-view";

    // LIST HEADER (only for checklist view)
    if (view === "list") {
      const header = document.createElement("div");
      header.className = "list-header";
      header.innerHTML = `
        <span>Jméno</span>
        <span>HP</span>
        <span>Sada</span>
        <span>Typ</span>
      `;
      container.appendChild(header);
    }

    character_cards.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.className = `character-card ${view}`;

      cardEl.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <div class="card-info">
          <span class="name">${card.name}</span>
          <span class="hp">❤️ ${card.hp}</span>
          <span class="set">${card.set}</span>
          <span class="type">${card.type}</span>
        </div>
      `;

      cardEl.addEventListener("click", () => {
        window.location.href = `bang/${slugify(card.name)}.html`;
      });

      container.appendChild(cardEl);
    });
  }

  // Initial render
  renderCards("grid");

  // View switcher
  viewSelect.addEventListener("change", e => {
    renderCards(e.target.value);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
