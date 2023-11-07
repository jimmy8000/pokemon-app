let pokemonList = [
    {
        name: 'Pikachu', 
        height: 0.4,
        abilities: ['static', 'lightningrod']
    },
    {
        name: 'Clefable',
        height: 1.3,
        abilities: ['cute-charm', 'magic-guard', 'unaware']
    },
    {
        name: 'Blastoise',
        height: 1.6,
        abilities: ['rain-dish', 'torrent']
    }
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) Wow that's big <br>`)
    } else if (pokemonList[i].height < 0.5) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) He's a small guy <br>`)
    }
    else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) He's perfectly ordinary <br>`)
    }
}