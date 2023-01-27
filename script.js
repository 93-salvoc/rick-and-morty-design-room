const logo = document.querySelector("#logo");
const appContainer = document.querySelector("#app-container");
const gallery = document.querySelector("#gallery");
const mainShirt = document.querySelector("#main-shirt");
const shirtsBar = document.querySelector("#shirts-bar");
const infoCharacter = document.querySelector("#info-character");
const ads = document.querySelector("#ads");
let page = 1;
let characters = [];

function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            characters = characters.concat(data.results);
            if (data.info.next) {
                fetchCharacters(page + 1);
            } else {
                renderCharactersInGallery(characters);
                let firstImage = characters[0].image;
                let overlayImg = document.getElementById("overlay-img");
                overlayImg.style.backgroundImage = `url(${firstImage})`;
            }
        });
}


function renderCharactersInGallery(characters) {
    const characterImageElements = characters.map((character, index) => {
        return `<img class="gallery-img" src="${character.image}" alt="${character.name}" onclick="renderCharacterInfo(${index})">`;
    });

    const characterImageHTML = characterImageElements.join('');

    const imageContainer = document.getElementById('gallery');
    imageContainer.innerHTML = characterImageHTML;
    const firstImage = document.querySelector(".gallery-img");
    firstImage.click();
}

fetchCharacters(1);


function renderCharacterInfo(index) {
    const character = characters[index];
    const characterInfoHTML = `
    <div>
      <p>Name: ${character.name}</p>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Type: ${character.type}</p>
      <p>Gender: ${character.gender}</p>
      <p>Origin: ${character.origin.name}</p>
    </div>  `;

    const infoContainer = document.getElementById('info-character');
    infoContainer.innerHTML = characterInfoHTML;

    const overlayImg = document.getElementById("overlay-img");
    overlayImg.style.backgroundImage = `url(${character.image})`;
}


function colorChoice(event) {
    let target = event.target;
    let mainShirt = document.getElementById("main-shirt");
    mainShirt.style.backgroundImage = `url(${event.target.src})`;
    target.classList.add("selected-img");
}


let colorImages = document.querySelectorAll(".color1, .color2, .color3");
colorImages.forEach(img => img.addEventListener("click", colorChoice));

window.addEventListener("load", function() {
    let color1 = document.getElementsByClassName("color1")[0];
    let mainShirt = document.getElementById("main-shirt");
    mainShirt.style.backgroundImage = `url(${color1.src})`;
});