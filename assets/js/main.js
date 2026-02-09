const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");

if (container && viewSelect) {
  function renderCards(view) {
    container.innerHTML = "";
    container.className = view + "-view";

    character_cards.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.className = `character-card ${view}`;

      cardEl.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <div class="card-info">
          <span class="name">${card.name}</span>
          <span>❤️ ${card.hp}</span>
          <span>${card.set}</span>
        </div>
      `;

      cardEl.addEventListener("click", () => {
        window.location.href = `bang/${slugify(card.name)}.html`;
      });

      container.appendChild(cardEl);
    });
  }

  viewSelect.addEventListener("change", e => {
    renderCards(e.target.value);
  });

  renderCards("grid");
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
