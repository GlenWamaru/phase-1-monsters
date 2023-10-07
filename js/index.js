const monsterContainer = document.getElementById("monster-container");
const monsterForm = document.getElementById("monster-form");
const loadMoreButton = document.getElementById("load-monsters");
let currentPage = 1;

function fetchMonsters(page = 1, limit = 50) {
  fetch(`http://localhost:4000/monsters/?_page=${page}&_limit=${limit}`)
    .then((response) => response.json())
    .then((monsters) => {
      // Display monsters in the DOM
      monsters.forEach((monster) => {
        displayMonster(monster);
      });
    });
}

function displayMonster(monster) {
  const monsterCard = document.createElement("div");
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <p>Age: ${monster.age}</p>
    <p>Description: ${monster.description}</p>
  `;
  monsterContainer.appendChild(monsterCard);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMonsters(currentPage);

  // Add event listener to the "Create Monster" button
  monsterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createMonster();
  });

  // Add event listener to the "Load More" button
  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    fetchMonsters(currentPage);
  });
});

function createMonster() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const description = document.getElementById("description").value;

  const monsterData = {
    name,
    age: parseInt(age),
    description,
  };

  fetch("http://localhost:4000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(monsterData),
  })
    .then((response) => response.json())
    .then((newMonster) => {
      displayMonster(newMonster);
      // Clear form fields after creating a monster
      monsterForm.reset();
    });
}
