const container = document.getElementById("character-cards");

character_cards.forEach(card => {
  const cardEl = document.createElement("div");
  cardEl.className = "character-card";

  cardEl.innerHTML = `
    <img src="${card.image}" alt="${card.name}">
    <h3>${card.name}</h3>
    <div class="card-meta">
      <span class="hp">❤️ ${card.hp}</span>
      <span class="set">${card.set}</span>
    </div>
    <p class="card-text">${card.text}</p>
  `;

  container.appendChild(cardEl);
});
