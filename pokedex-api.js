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

    // Set Pokémon Name in uppercase
    document.getElementById("pokemon-name").textContent =
      data.name.toUpperCase();

    // Clear previous types
    const typeContainer = document.querySelector(".typeContainer");
    typeContainer.innerHTML = ""; // Clear previous types

    // Create a new type box for each type and display it
    data.types.forEach((typeInfo) => {
      const type = document.createElement("span");
      type.textContent = typeInfo.type.name.toUpperCase();
      type.classList.add("type-box", typeInfo.type.name); // Add type-specific class for background color
      type.style.display = "inline-block"; // Display the type box
      typeContainer.appendChild(type);
    });

    // Display height and weight
    const heightInMeters = data.height / 10; // height in meters
    const weightInKg = data.weight / 10; // weight in kg
    document.getElementById(
      "pokemonHeight"
    ).textContent = `Height: ${heightInMeters} m`;
    document.getElementById(
      "pokemonWeight"
    ).textContent = `Weight: ${weightInKg} kg`;

    // Set Pokémon Sprite if available
    if (data.sprites && data.sprites.front_default) {
      const pokemonSprite = data.sprites.front_default;
      const imgElement = document.getElementById("pokemonSprite");
      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
    } else {
      document.getElementById("pokemonSprite").style.display = "none";
    }

    // Fetch Pokémon Description from the Species API
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    // Find the description in English
    const flavorTextEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    if (flavorTextEntry) {
      document.getElementById("pokemonDescription").textContent =
        flavorTextEntry.flavor_text;
    } else {
      document.getElementById("pokemonDescription").textContent =
        "Description not available.";
    }
  } catch (error) {
    console.error(error.message);
    document.getElementById("pokemonDescription").textContent =
      "An error occurred. Please try again.";
  }
}
