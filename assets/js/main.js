const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");

if (container) {
  function renderCards(view = "grid") {
    container.innerHTML = "";
    container.className = view + "-view";

    if (view === "list") {
      const header = document.createElement("div");
      header.className = "list-header";
      header.innerHTML = `
        <div>Jméno</div>
        <div>HP</div>
        <div>Sada</div>
        <div>Typ</div>
      `;
      container.appendChild(header);
    }

    character_cards.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.className = `character-card ${view}`;

      if (view === "grid") {
        cardEl.innerHTML = `
          <img src="${card.image}" alt="${card.name}">
        `;
      } else {
        cardEl.innerHTML = `
          <div class="name">${card.name}</div>
          <div class="hp">❤️ ${card.hp}</div>
          <div class="set">${card.set}</div>
          <div class="type">${card.type}</div>
        `;
      }

      cardEl.addEventListener("click", () => {
        window.location.href = `bang/${slugify(card.name)}.html`;
      });

      container.appendChild(cardEl);
    });
  }

  renderCards("grid");

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
