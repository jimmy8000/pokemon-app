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
  return {
    getAll: function () {
        return pokemonList;
    },
    add: function (pokemon) {
        pokemonList.push(pokemon);
    }
  }
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 1.5) {
      document.write(
        `${pokemon.name} (height: ${pokemon.height}) Wow that's big <br>`
      );
    } else if (pokemon.height < 0.5) {
      document.write(
        `${pokemon.name} (height: ${pokemon.height}) He's a small guy <br>`
      );
    } else {
      document.write(
        `${pokemon.name} (height: ${pokemon.height}) He's perfectly ordinary <br>`
      );
    }
  });
