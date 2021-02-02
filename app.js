const data = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": 372,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]


// Create Dino Constructor
// *****DEVELOPER IDEA***** 
// Use Builder pattern
class DinoBuilder {
    constructor(species) {
        this.species = species;
    }

    addWeight(weight) {
        this.weight = weight;
        return this;
    }

    addHeight(height) {
        this.height = height;
        return this;
    }

    addDiet(diet) {
        this.diet = diet;
        return this;
    }

    addWhere(where) {
        this.where = where;
        return this;
    }

    addWhen(when) {
        this.when = when;
        return this;
    }

    addFact(fact) {
        this.fact = fact;
        return this;
    }

    build() {
        return new Dino(this);
    }
}

class Dino {
    constructor(builder) {
        this.species = builder.species;
        this.weight = builder.weight;
        this.height = builder.height;
        this.diet = builder.diet;
        this.where = builder.where;
        this.when = builder.when;
        this.fact = builder.fact;
    }
}

// Create Dino Objects
const dinos = data.map(dino => new DinoBuilder(dino.species)
    .addWeight(dino.weight)
    .addHeight(dino.height)
    .addDiet(dino.diet)
    .addWhere(dino.where)
    .addWhen(dino.when)
    .addFact(dino.fact)
    .build());

// Create Human Object
// *****DEVELOPER IDEA***** 
// Use Reveal Module pattern


// Use IIFE to get human data from form
const human = (function () {

    const getName = function () {
        return document.getElementById('name').value;
    }
    const getDiet = function () {
        return document.getElementById('diet').value;
    }

    const compareToDinoWeight = function (dinoWeight) {
        const humanWeight = document.getElementById('weight').value;
        return humanWeight / dinoWeight;
    }

    const compareToDinoHeight = function (dinoHeight) {
        const humanHeight = document.getElementById('feet').value * 12 + document.getElementById('inches').value;
        return humanHeight / dinoHeight;
    }

    return {
        getName,
        getDiet,
        compareToDinoWeight,
        compareToDinoHeight,
    };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
const compareWeight = function (species, dinoWeight, compareToDinoWeight) {
    const weightToDino = compareToDinoWeight(dinoWeight).toFixed(2);
    if (weightToDino > 1)
        return `You weight more than ${species} ${weightToDino} times.`
    else if (weightToDino < 1) {
        const dinoToHuman = (1 / weightToDino).toFixed(2);
        return `${species} were ${dinoToHuman} times heavier than you.`
    }
    else if (weightToDino === 1)
        return `${species} had a same weight as you.`
    else
        return `Something wrong with dino weight, you may try again.`
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareHeight = function (species, dinoHeight, compareToDinoHeight) {
    const heightToDino = compareToDinoHeight(dinoHeight).toFixed(2);
    if (heightToDino > 1)
        return `You are taller than ${species} ${heightToDino} times.`
    else if (heightToDino < 1) {
        const dinoToHuman = (1 / heightToDino).toFixed(2);
        return `${species} was ${dinoToHuman} times taller than you.`
    }
    else if (heightToDino === 1)
        return `${species} were as tall as you.`
    else
        return `Something wrong with dino height, you may try again.`
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = function (species, dinoDiet, humanDiet) {
    humanDiet = humanDiet.toLowerCase();
    dinoDiet = dinoDiet.toLowerCase();

    if (humanDiet === dinoDiet) {
        return `${species} had a same diet as you.`
    }
    else if (dinoDiet === 'herbavor' || humanDiet === 'carnivor') {
        return `${species} ate more green than you.`
    }
    else if (dinoDiet === 'carnivor' || humanDiet === 'herbavor') {
        return `You love green food more than ${species}.`
    }
}

// Generate Tiles for each Dino in Array
const dinoTiles = dinos.map(dino => {
    const species = dino.species;
    const image = `${species.toLowerCase()}.png`;
    let fact = '';
    if (species === 'Pigeon')
        fact = dino.fact;
    else {
        const randomNumber = Math.floor((Math.random() * 9) + 1);   // random number from 1 to 9
        switch (randomNumber) {
            case 1:
                fact = `${species} weighted ${dino.weight} lbs.`;
                break;
            case 2:
                fact = `${species} was ${dino.height} inches tall.`;
                break;
            case 3:
                fact = `Their diet was ${dino.diet}.`;
                break;
            case 4:
                fact = `${species} mainly lived in ${dino.where}.`;
                break;
            case 5:
                fact = `They lived in ${dino.when}.`;
                break;
            case 6:
                fact = `${dino.fact}`;
                break;
            case 7:
                fact = compareWeight(species, dino.weight, human.compareToDinoWeight);
                break;
            case 8:
                fact = compareHeight(dino.species, dino.height, human.compareToDinoHeight);
                break;
            case 9:
                fact = compareDiet(dino.species, dino.diet, human.getDiet());
                break;
            default:
                break;
        }
    }
    return `<div class="grid-item">
            <h3>${species}</h3>
            <img src="./images/${image}" alt="${species} image" />
            <p>${fact}</p>
    </div>`;
})

// Add tiles to DOM
const addTilesToDom = function (humanName, dinoTiles) {
    const tilesBeforeHuman = dinoTiles.slice(0, 4);
    const tilesAfterHuman = dinoTiles.slice(4, 8);
    const humanTile = `<div>
        <h3>${humanName}</h3>
        <img src="./images/human.png" alt="human image" />
    </div>`;

    const main = document.getElementById('grid');
    main.innerHTML = tilesBeforeHuman.join('') + humanTile + tilesAfterHuman.join('');
}

// Remove form from screen
const removeForm = function () {
    document.getElementById('dino-compare').remove();
}



// Validation
const validate = function () {

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
    const result = [];
    
    const name = document.getElementById('name').value;
    if (name.trim().length === 0) {
        result.push('<p>Name must not be empty</p>');
    }
    const feet = document.getElementById('feet').value;
    if (!isNumeric(feet)) {
        result.push('<p>Feet is not valid</p>')
    }
    const inches = document.getElementById('inches').value;
    if (!isNumeric(inches)) {
        result.push('<p>Inches is not valid</p>')
    }
    const weight = document.getElementById('weight').value;
    if (!isNumeric(weight)) {
        result.push('<p>Weight is not valid</p>')
    }
    return result;
}

// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener('click', (function () {
    return function () {
        const error = validate();
        if (error.length === 0)
        {
            addTilesToDom(human.getName(), dinoTiles);
            removeForm();
        }
        else
        {
            document.getElementById('error').innerHTML = error.join('');
        }
    }
})())