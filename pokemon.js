const pokemonCount = 1015;
var pokedex = {};

window.onload = async function () {
  // Loop through all Pokémon
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i); // Fetch each Pokémon's data
    displayPokemonCard(i); // Render each Pokémon's card
  }
};

// Fetch Pokémon data from the API
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();

  let pokemonName = pokemon["name"];
  let pokemonTypes = pokemon["types"].map((type) => type.type.name); // Store types as an array
  let pokemonImg = pokemon["sprites"]["front_default"];

  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();

  let description = pokemonDesc["flavor_text_entries"].find(
    (entry) => entry.language.name === "en"
  ).flavor_text;

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonTypes, // Store types as array
    desc: description,
  };
}

// Function to display each Pokémon card
function displayPokemonCard(num) {
  let pokemon = pokedex[num];

  // Generate HTML for each type
  let typeHTML = pokemon.types
    .map((type) => `<p class="type-box ${type}">${type.toUpperCase()}</p>`) // Add 'type-box' class and type-specific class
    .join(""); // Join the generated HTML for multiple types

  // Create card structure
  let card = `
        <div class="col col-lg-2 mt-3">
            <div class="card" style="width: 10rem">
                <img src="${
                  pokemon.img
                }" class="card-img-top" height="100" width="100" alt="${
    pokemon.name
  }">
                <div class="card-body text-center">
                    <h5 class="card-title fs-6 text-center">${pokemon.name.toUpperCase()}</h5>
                    ${typeHTML} <!-- Insert generated type boxes -->
                </div>
            </div>
        </div>
    `;

  // Append the card to the Pokémon container
  document.querySelector(".pokemons").innerHTML += card;
}
