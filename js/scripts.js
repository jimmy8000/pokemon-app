let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Pikachu",
      height: 0.4,
      abilities: ["static", "lightningrod"],
    },
    {
      name: "Clefable",
      height: 1.3,
      abilities: ["cute-charm", "magic-guard", "unaware"],
    },
    {
      name: "Blastoise",
      height: 1.6,
      abilities: ["rain-dish", "torrent"],
    },
  ];
  function addListItem(pokemon) {
    let unorderedList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
// Event listener for button 
    button.addEventListener("click", () => showDetails(pokemon));
  }
// Show details function
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
