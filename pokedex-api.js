// fetch = Function used for making HTTP requests to fetch resources.
//              (JSON style data, images, files)
//              Simplifies asynchronous data fetching in JavaScript and
//              used for interacting with APIs to retrieve and send
//              data asynchronously over the web.
//              fetch(url, {options})

async function fetchData() {
  try {
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    // Log the entire data object to inspect its structure
    console.log(data);

    // Check if 'sprites' and 'front_default' exist
    if (data.sprites && data.sprites.front_default) {
      const pokemonSprite = data.sprites.front_default;
      const imgElement = document.getElementById("pokemonSprite");

      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
    } else {
      throw new Error("Sprite not found");
    }
  } catch (error) {
    console.error(error.message);
  }
}
