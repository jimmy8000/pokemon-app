let pokemonRepository = (function ($) {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = $("#myModal");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let listItem = $("<div>").addClass("col-md-4 mb-3");
    let button = $("<button>")
      .text(pokemon.name)
      .addClass("btn btn-primary btn-block");
    listItem.append(button);
    $("#pokemonGrid").append(listItem);

    button.on("click", function (event) {
      showDetails(pokemon);
      modalContainer.modal("show");
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: capitalizeFirstLetter(item.name),
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      $(".modal-body").html("");
      $("#myModalLabel").text(item.name);

      let modalDiv = $("<div>");
      let contentElementHeight = $("<p>").text("Height: " + item.height);
      let contentElementWeight = $("<p>").text("Weight: " + item.weight);

      const abilities = item.abilities.map((ability) =>
        capitalizeFirstLetter(ability.ability.name)
      );
      let contentElementAbilities = $("<p>").text("Abilities: " + abilities);
      let elementImg = $("<img>").attr("src", item.imageUrl);

      modalDiv.append(
        contentElementHeight,
        contentElementWeight,
        contentElementAbilities,
        elementImg
      );
      $(".modal-body").append(modalDiv);
    });
  }

  function hideModal() {
    modalContainer.modal("hide");
  }

  $(window).on("keydown", function (e) {
    if (e.key === "Escape" && modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });

  modalContainer.on("click", function (e) {
    let target = $(e.target);
    if (target.is(modalContainer)) {
      hideModal();
    }
  });

  function searchPokemon() {
    let searchInput = $("#pokemonSearch").val().toLowerCase();
    let filteredList = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchInput);
    });
    displayPokemonList(filteredList);
  }

  function displayPokemonList(list) {
    $("#pokemonGrid").empty(); 
    list.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  }

  $(document).ready(function () {
    $("#pokemonSearch").on("input", function () {
      searchPokemon();
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})(jQuery);

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
