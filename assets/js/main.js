const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");
const searchBox = document.getElementById("search-box");
const searchCriteria = document.getElementById("search-criteria");
const sortBy = document.getElementById("sort-by");
const sortOrder = document.getElementById("sort-order");

let currentView = "grid";
let currentSort = { key: "name", asc: true };

if (container) {

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Filter cards based on selected criteria
  function filterCards() {
    const query = searchBox.value.trim().toLowerCase();
    const criterion = searchCriteria.value;

    if (!query) return character_cards;

    return character_cards.filter(card => {
      const value = card[criterion].toString().toLowerCase();
      return value.includes(query);
    });
  }

  // Sort cards based on currentSort state
  function sortCards(cards) {
    return cards.sort((a, b) => {
      const valA = a[currentSort.key];
      const valB = b[currentSort.key];
      if (typeof valA === "string") {
        return currentSort.asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return currentSort.asc ? valA - valB : valB - valA;
      }
    });
  }

  // Render cards in grid or list view
  function renderCards(view = currentView) {
    currentView = view;
    container.innerHTML = "";
    container.className = view + "-view";

    let cardsToRender = filterCards();
    cardsToRender = sortCards(cardsToRender);

    if (view === "list") {
      const header = document.createElement("div");
      header.className = "list-header";
      header.innerHTML = `
        <div data-sort="name">Jméno</div>
        <div data-sort="hp">HP</div>
        <div data-sort="set">Sada</div>
        <div data-sort="type">Typ</div>
      `;
      container.appendChild(header);

      // Header click sorting
      header.querySelectorAll("div").forEach(col => {
        col.style.cursor = "pointer";
        col.addEventListener("click", () => {
          const key = col.dataset.sort;
          if (currentSort.key === key) currentSort.asc = !currentSort.asc;
          else {
            currentSort.key = key;
            currentSort.asc = true;
          }
          // sync combo boxes
          sortBy.value = currentSort.key;
          sortOrder.value = currentSort.asc ? "asc" : "desc";
          renderCards("list");
        });
      });
    }

    cardsToRender.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.className = `character-card ${view}`;

      if (view === "grid") {
        cardEl.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
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

  // Update sort state when combo boxes change
  sortBy.addEventListener("change", () => {
    currentSort.key = sortBy.value;
    renderCards(currentView);
  });

  sortOrder.addEventListener("change", () => {
    currentSort.asc = sortOrder.value === "asc";
    renderCards(currentView);
  });

  // Event listeners
  viewSelect.addEventListener("change", e => renderCards(e.target.value));
  searchBox.addEventListener("input", () => renderCards(currentView));
  searchCriteria.addEventListener("change", () => renderCards(currentView));

  // Initial render
  renderCards("grid");
}
