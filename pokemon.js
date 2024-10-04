const pokemonCount = 151;
var pokedex = {};

window.onload = async function () {
  // Loop through all Pokemon
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
  let pokemonType = pokemon["types"].map((type) => type.type.name).join(", ");
  let pokemonImg = pokemon["sprites"]["front_default"];

  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();

  let description = pokemonDesc["flavor_text_entries"].find(
    (entry) => entry.language.name === "en"
  ).flavor_text;

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: description,
  };
}

// Function to display each Pokemon card
function displayPokemonCard(num) {
  let pokemon = pokedex[num];

  // Create card structure
  let card = `
        <div class="col col-lg-2 mt-3">
            <div class="card" style="width: 10rem">
                <img src="${
                  pokemon.img
                }" class="card-img-top" height="100" width="100" alt="${
    pokemon.name
  }">
                <div class="card-body">
                    <h5 class="card-title fs-6">${pokemon.name.toUpperCase()}</h5>
                    <p>${pokemon.types}</p>
                </div>
            </div>
        </div>
    `;

  // Append the card to the Pokemon container
  document.querySelector(".pokemons").innerHTML += card;
}
