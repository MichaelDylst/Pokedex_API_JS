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
    let pokemonMoves = document.getElementsByClassName("pokemon-moves-span")[0];
    let pokedexMoves = document.getElementById("pokedex-moves")
    let runner = 1;
    let pokemonId = document.getElementsByClassName("pokemon-id")[0];
    let evoImages = document.getElementById("evo-images")

    const pokemonTypes = [];
    const pokemonMoveArray = [];
    const evoNames = [];
    const imageEvoList = [];
    const pokedexInfo = document.getElementById("pokedex-info")
    
    //removing the h3,li,p & img elements that were created with the previous search.
        let pokedexInfoH2Childs = pokedexInfo.querySelectorAll("h3");
            pokedexInfoH2Childs.forEach(element => {
                element.remove();
            });
    
    /*if(pokedexMoves.querySelectorAll("li")){
        const pokemonMovesChilds = pokedexMoves.querySelectorAll("li");
        pokemonMovesChilds.forEach(element => {
            element.remove();
        });
    }*/

    if(evoImages.querySelectorAll("p")){
        let pokemonEvoChilds = evoImages.querySelectorAll("p")
        pokemonEvoChilds.forEach(element =>{
            element.remove();
        })
    };

    if(evoImages.querySelectorAll("img")){
        let pokemonEvoChilds = evoImages.querySelectorAll("img")
        pokemonEvoChilds.forEach(element =>{
            element.remove();
        })
    };

    if(pokemonMoves.querySelectorAll("p")){
        let pokemonEvoChilds = pokemonMoves.querySelectorAll("p");
        pokemonEvoChilds.forEach(element =>{
            element.remove();
        })
    };



    // first API-call to fetch the data when the searchbutton is clicked.
    let pokeResponse = await fetch(`${pokeURL}${searchInput}`);
    let pokeData = await pokeResponse.json();

    // change the variables that were made before with the data provided by API-call 
    let pokemonImageSrc = pokeData.sprites.other.dream_world.front_default;
    image.src = pokemonImageSrc 
    let pokeID = pokeData.id;
    pokemonName.innerHTML = pokeData.name + " # " + pokeID;

        pokemonName.style.textTransform = "capitalize";

    // get pokemon_id
    
    //pokemonId.innerHTML = "ID: " + pokeID;
        
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
            });;
        }
    console.log("moves length: " + pokeData.moves.length)
    console.log("random value: " + Math.floor( Math.random()*pokeData.moves.length))


    // Getting the first 4 moves and adding them to an array - making 4 p items from that array with the forEach 
    /*for(let i = Math.floor( Math.random()*pokeData.moves.length); i <pokeData.moves.length && i < 4; i++){
        console.log(i);
        pokemonMoveArray.push(pokeData.moves[i].move.name);
        console.log(pokemonMoveArray)
        } */

        let shuffledMoves = pokeData.moves.sort(() =>  0.5 - Math.random()).slice(0, 4);
        shuffledMoves.forEach(move => {
            pokemonMoveArray.push(move.move.name);
        })
    
        
        pokemonMoveArray.forEach(j => {
            let moveElement = document.createElement("p");
            moveElement.classList.add(`pokemon-move-${j}`);
            moveElement.textContent = j;
            pokemonMoves.appendChild(moveElement)
    });
    
    // get evolution data from API call 
    let pokeSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`;
    let pokeSpeciesAPI = await fetch(`${pokeSpeciesURL}`);
    let pokeSpeciesData = await pokeSpeciesAPI.json();
    console.log(pokeSpeciesData)
    let pokeEvoURL = `${pokeSpeciesData.evolution_chain.url}`
    console.log(pokeEvoURL)
    let pokeEvoAPI = await fetch(`${pokeEvoURL}`)
    let pokeEvoData = await pokeEvoAPI.json()
    console.log(pokeEvoData)

    evoNames.push(pokeEvoData.chain.species.name);
    pokeEvoData.chain.evolves_to.forEach(evolution => {
        evoNames.push(evolution.species.name)

        evolution.evolves_to.forEach(nextEvolution => {
            evoNames.push(nextEvolution.species.name);
        });
    });
    console.log(evoNames);
    if (evoNames[0] === pokeData.name){
        console.log("There is only a base evolution.");
    }  

    if(evoNames.length >= 1){
        for(let i = 0; i < evoNames.length; i++){
            let pokeEvoImage = await fetch(`${pokeURL}${evoNames[i]}`);
            let pokeEvoImageData = await pokeEvoImage.json();
            imageEvoList.push(pokeEvoImageData.sprites.front_default);
        };

        console.log(imageEvoList);
        let e = 0;
         imageEvoList.forEach(element => {
                console.log(element);
                let evoPElement = document.createElement("p");
                let evoImgElement = document.createElement("img");
                evoPElement.textContent = evoNames[e];
                evoImgElement.src = element;
                evoPElement.style.textTransform = "capitalize";
                evoImages.appendChild(evoPElement);
                evoImages.appendChild(evoImgElement);
                e++;
            });
    };

}
buttonSearch.onclick = getPokemon;