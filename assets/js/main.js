const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");

if (container && viewSelect) {
  character_cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = `character-card ${view}`;

    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <span class="name">${card.name}</span>
      <span class="hp">❤️ ${card.hp}</span>
      <span class="set">${card.set}</span>
      <span class="type">${card.type || ""}</span>
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
