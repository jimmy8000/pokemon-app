let pokemonRepository=function(t){let e=[],n=t("#myModal");function o(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function i(){return e}function a(t){return t.charAt(0).toUpperCase()+t.slice(1)}function r(e){pokemonRepository.loadDetails(e).then(function(){t(".modal-body").html(""),t("#myModalLabel").text(e.name);let n=t("<div>"),o=t("<p>").text("Height: "+e.height),i=t("<p>").text("Weight: "+e.weight),r=e.abilities.map(t=>a(t.ability.name)),l=t("<p>").text("Abilities: "+r),c=t("<img>").attr("src",e.imageUrl);n.append(o,i,l,c),t(".modal-body").append(n)})}function l(){n.modal("hide")}return t(window).on("keydown",function(t){"Escape"===t.key&&n.hasClass("is-visible")&&l()}),n.on("click",function(e){t(e.target).is(n)&&l()}),t(document).ready(function(){t("#pokemonSearch").on("input",function(){var n;let o;o=t("#pokemonSearch").val().toLowerCase(),n=e.filter(function(t){return t.name.toLowerCase().includes(o)}),t("#pokemonGrid").empty(),n.forEach(function(t){pokemonRepository.addListItem(t)})})}),{add:o,getAll:i,addListItem:function e(o){let i=t("<div>").addClass("col-md-4 mb-3"),a=t("<button>").text(o.name).addClass("btn btn-primary btn-block");i.append(a),t("#pokemonGrid").append(i),a.on("click",function(t){r(o),n.modal("show")})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){o({name:a(t.name),detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:function t(e){return fetch(e.detailsUrl).then(function(t){return t.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.weight=t.weight,e.abilities=t.abilities}).catch(function(t){console.error(t)})},showDetails:r}}(jQuery);pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});