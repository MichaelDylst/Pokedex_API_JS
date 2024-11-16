//let input = "bulbasaur"
const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'
let buttonSearch = document.getElementById("search-button")


async function getPokemon(){
    // assigning the variables from the html document 
    let searchInput = document.getElementById("search").value.toLowerCase();
    let image = document.getElementById("pokemon-image");
        console.log(searchInput)
    let pokemonName = document.getElementsByClassName("pokemon-name")[0];
    let pokemonType = document.getElementsByClassName("pokemon-type")[0];
    let pokemonMoves = document.getElementsByClassName("pokemon-moves-list")[0];
    let pokedexMoves = document.getElementById("pokedex-moves")
    let runner = 1;
    let pokemonId = document.getElementsByClassName("pokemon-id")[0];

    const pokemonTypes = [];
    const pokemonMoveArray = [];
    const pokedexInfo = document.getElementById("pokedex-info")
    
    //removing the h3,li elements that were created with the previous search.
    const pokedexInfoH2Childs = pokedexInfo.querySelectorAll("h3");
            pokedexInfoH2Childs.forEach(element => {
                element.remove();
            });
    
    if(pokedexMoves.querySelectorAll("li")){
        const pokemonMovesChilds = pokedexMoves.querySelectorAll("li");
        pokemonMovesChilds.forEach(element => {
            element.remove();
        });

    }

    // first API-call to fetch the data when the searchbutton is clicked.
    let pokeResponse = await fetch(`${pokeURL}${searchInput}`);
    let pokeData = await pokeResponse.json();

    // change the variables that were made before with the data provided by API-call 
    let pokemonImageSrc = pokeData.sprites.other.dream_world.front_default;
    image.src = pokemonImageSrc 

    pokemonName.innerHTML = pokeData.name;
        pokemonName.style.textTransform = "capitalize";

    // get pokemon_id
    let pokeID = pokeData.id;
    pokemonId.innerHTML = pokeID;
        
    // Type select,  putting them in array, foreach through array and adding h3 elements for each element in array.
    for(let i = 0; i < pokeData.types.length; i++){
        pokemonTypes.push(pokeData.types[i].type.name)
    }
        if (pokemonTypes.length >= 1){
            pokemonTypes.forEach(j => {
                console.log(j)
                let typeElement = document.createElement("h3");
                typeElement.classList.add(`pokemon-type-${j}`)
                typeElement.textContent = `Type ${runner}: ` + j;
                typeElement.style.textTransform = "capitalize"
                pokedexInfo.appendChild(typeElement);
                runner++;
            });
        }


    // Getting the first 4 moves and adding them to an array - making 4 li items from that array with the forEach 
    for(let i = 0; i <pokeData.moves.length && i < 4; i++ ){
        pokemonMoveArray.push(pokeData.moves[i].move.name);
        console.log(pokemonMoveArray)
        } pokemonMoveArray.forEach(j => {
            let moveElement = document.createElement("li");
            moveElement.classList.add(`pokemon-move-${j}`);
            moveElement.textContent = j;
            pokemonMoves.appendChild(moveElement)
    });
    
    


}
buttonSearch.onclick = getPokemon;