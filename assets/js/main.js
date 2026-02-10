const container = document.getElementById("character-cards");
const viewSelect = document.getElementById("view-select");
const searchBox = document.getElementById("search-box");

let currentView = "grid";
let currentSort = { key: "name", asc: true };

if (container) {

  // Utility: slugify for card links
  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Filter based on search query
  function filterCards(query) {
    query = query.trim();
    if (!query) return character_cards;

    const hpMatch = query.match(/HP([><]?=?)\s*(\d+)/i);
    const typeMatch = query.match(/type=(.+)/i);
    const nameMatch = query.match(/name=(.+)/i);
    const textMatch = query.match(/text=(.+)/i);

    return character_cards.filter(card => {
      let pass = true;

      if (hpMatch) {
        const op = hpMatch[1] || "=";
        const value = parseInt(hpMatch[2], 10);
        if (op === "=") pass = card.hp === value;
        else if (op === ">") pass = card.hp > value;
        else if (op === "<") pass = card.hp < value;
        else if (op === ">=") pass = card.hp >= value;
        else if (op === "<=") pass = card.hp <= value;
      }

      if (typeMatch) {
        pass = pass && card.type.toLowerCase().includes(typeMatch[1].trim().toLowerCase());
      }

      if (nameMatch) {
        pass = pass && card.name.toLowerCase().includes(nameMatch[1].trim().toLowerCase());
      }

      if (textMatch) {
        pass = pass && card.text.toLowerCase().includes(textMatch[1].trim().toLowerCase());
      }

      // default search by name if no operator
      if (!hpMatch && !typeMatch && !nameMatch && !textMatch) {
        pass = card.name.toLowerCase().includes(query.toLowerCase());
      }

      return pass;
    });
  }

  // Sort cards
  function sortCards(cards) {
    return cards.sort((a, b) => {
      const valA = a[currentSort.key];
      const valB = b[currentSort.key];
      if (typeof valA === "string") {
        return currentSort.asc
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return currentSort.asc ? valA - valB : valB - valA;
      }
    });
  }

  // Render cards
  function renderCards(view = currentView) {
    currentView = view;
    container.innerHTML = "";
    container.className = view + "-view";

    let cardsToRender = filterCards(searchBox.value);
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

      // Make headers clickable
      header.querySelectorAll("div").forEach(col => {
        col.style.cursor = "pointer";
        col.addEventListener("click", () => {
          const key = col.dataset.sort;
          if (currentSort.key === key) currentSort.asc = !currentSort.asc;
          else {
            currentSort.key = key;
            currentSort.asc = true;
          }
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

  // Initial render
  renderCards("grid");

  // Event listeners
  viewSelect.addEventListener("change", e => renderCards(e.target.value));
  searchBox.addEventListener("input", () => renderCards(currentView));
}
