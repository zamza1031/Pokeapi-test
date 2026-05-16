
async function FetchData() {
    try {
        const PokemonName = document.getElementById("PokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`);
        if (!response.ok) {
            throw new Error("could not fetch resource");
        }
        const data = await response.json();
        const PokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("PokemonSprite");
        const PokemonNameElement = document.getElementById("PokemonNameElement");
        const PokemonDescription = document.getElementById("PokemonDescription");

        PokemonNameElement.textContent = `Name: ${data.name}`;
        PokemonDescription.textContent = `Description: ${data.description}`;
        const PokemonID = document.getElementById("PokemonID");
        PokemonID.textContent = `ID: ${data.id}`;
        imgElement.src = PokemonSprite;
        imgElement.alt = data.name;
        imgElement.style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

async function RandomPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100");
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex].name;

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        if (!pokemonResponse.ok) {
            throw new Error("Could not fetch Pokemon data");
        }
        const pokemonData = await pokemonResponse.json();
        const PokemonNameElement = document.getElementById("PokemonNameElement");
        const PokemonSprite = pokemonData.sprites.front_default;
        const imgElement = document.getElementById("PokemonSprite");
        const PokemonID = document.getElementById("PokemonID");

        PokemonNameElement.textContent = `Name: ${pokemonData.name}`;
        PokemonID.textContent = `ID: ${pokemonData.id}`;
        imgElement.src = PokemonSprite;
        imgElement.alt = pokemonData.name;
        imgElement.style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

async function tableofpokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100");
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();

        const pokemonDetails = await Promise.all(data.results.map(async pokemon => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
                throw new Error(`Could not fetch details for ${pokemon.name}`);
            }
            return pokemonResponse.json();
        }));

        const tableBody = document.getElementById("pokemonTableBody");
        tableBody.innerHTML = "";

        pokemonDetails.forEach(pokemon => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pokemon.name}</td>
                <td>${pokemon.id}</td>
                <td><img src="${pokemon.sprites.front_default || ''}" alt="${pokemon.name}" width="80"></td>
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}
