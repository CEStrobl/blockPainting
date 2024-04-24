let blockNames = ["empty", 
"oak log", 
"stripped oak log", 
"oak planks", 

"spruce log", 
"stripped spruce log", 
"spruce planks", 

"dark oak log", 
"stripped dark oak log", 
"dark oak planks", 

"birch log", 
"birch planks", 

"moss block", 
"oak leaves", 
"jungle leaves", 
"flowering azalea leaves", 
"cherry leaves", 

"sand", 
"smooth sandstone", 
"chiseled sandstone", 

"quartz pillar", 
"quartz block",
"quartz bricks", 

"cobblestone", 
"stone bricks", 
"chiseled stone bricks", 
"mossy stone bricks", 
"bricks", 

"blackstone", 
"polished blackstone bricks", 
"chiseled polished blackstone", 
"gilded blackstone", 

"deepslate", 
"cobbled deepslate", 
"deepslate tiles", 
"deepslate bricks", 

"obsidian", 
"crying obsidian", 
"andesite", 
"polished andesite", 

"basalt", 

"emerald ore", 
"diamond ore", 
"gold ore", 
"lapis ore", 
"iron ore", 
"coal ore", 

"glowstone", 
"amethyst block", 

"crafting table", 
"furnace", 
"blast furnace", 
"smoker", 
"barrel", 
"smithing table", 
"cauldron", 
"bookshelf", 
"note block", 

"bamboo block", 
"redstone lamp", 
"sea lantern", 

"glass", 
"light gray stained glass", 

"sculk", 
"beehive", 
]

let wood = []
let nature = []
let stone = []
let mines = []
let decorative = []

let blockImgs = []

let blockSelectionElements = []

let blockGridElements = []

let blockCoords = []

let selected = 1; // spruce log
let prevSelected = selected;

let isMouseDown = false;

let activeWidth = 0;
let activeHeight = 0;




function populateBlockImgs() {
	for (let i = 0; i < blockNames.length; i++) {
		const x = blockNames[i];

		let convertedName = x.split(' ').join('_');

		blockImgs.push("img/" + convertedName + ".png")
	}
}

populateBlockImgs() 


function updateBlock(thisBlock, event, index) {
    if (isMouseDown || (event && event.which === 3)) { // Check for left mouse button or right mouse button click
        if (event && event.which === 3) { // If right mouse button clicked, set to empty block
            thisBlock.src = blockImgs[0];
        } else { // Otherwise, update with selected block
            thisBlock.src = blockImgs[selected];
			console.log(blockCoords[index])
        }
    }
}


function clearBlockSelection() {
	for (let i = 0; i < blockSelectionElements.length; i++) {
		const thisBlock = blockSelectionElements[i];
		
		thisBlock.className = ""
	}
}

function selectBlock(thisBlock, index) {
	clearBlockSelection()
	thisBlock.className = "selected"
	selected = index
	prevSelected = selected;
}

function checkKeyWords(blockName, arrayOfWords) {
	let retVal = false; 

	for (let i = 0; i < arrayOfWords.length; i++) {
		const x = arrayOfWords[i];
		
		if(blockName.includes(x)){
			retVal = true;
		}
	}

	return retVal;
}


function populateBlockSelection() {
	let blockContainer = document.getElementById("blockSelection")

	for (let i = 1; i < blockNames.length; i++) {
		const blockName = blockNames[i];
		const img = blockImgs[i];

		let category = "None"

		if (!checkKeyWords(blockName, ["lamp", "glowstone"])) {
			let woodWords = ["plank", "log"]
			let natureWords = ["sand", "leave", "moss ", "grass", "flower", "quartz"]
			let stoneWords = ["stone", "cobble", "slate", "brick", "basalt"]
			let minesWords = ["ore", "obsidian", "andesite", "diorite", "amethyst", "sculk"]
	
			// Determine Category
			if (checkKeyWords(blockName, woodWords)) {
				category = document.getElementById("wood")
				wood.push(blockName)
			} 
			else if (checkKeyWords(blockName, natureWords)){
				category = document.getElementById("nature")
				nature.push(blockName)
			} 
			else if (checkKeyWords(blockName, stoneWords) ) {
				category = document.getElementById("stone")
				stone.push(blockName)
			} 
			else if (checkKeyWords(blockName, minesWords)){
				category = document.getElementById("mines")
				mines.push(blockName)
			} 
			else {
				category = document.getElementById("decorative")
				decorative.push(blockName)
			}

		} else {
			category = document.getElementById("decorative")
			decorative.push(blockName)
		}

		// Generate image
		embedImg(category, "img", img, blockName)

		let thisBlock = document.getElementById(blockName)

		blockSelectionElements.push(thisBlock)

		thisBlock.onclick = function() {
			selectBlock(thisBlock, i)
		}
	}
	
}

populateBlockSelection()

let newBlockNames = []
function redoBlockNames() {
	newBlockNames = wood.concat(nature, stone, mines, decorative);

	let output = "";

	for (let i = 0; i < newBlockNames.length; i++) {
		const x = newBlockNames[i];
		
		output += ("\"" + x + "\", \n");
	}
	console.log(output);
}

redoBlockNames()



let container = document.getElementById("container")

function burnGrid() {
	for (let index = 0; index < blockGridElements.length; index++) {
		const x = blockGridElements[index];
		
		x.remove()
	}
}

function buildGrid(width, height) {

	burnGrid()

	if (width == null ) {
		width = document.getElementById('width').value;
		height = document.getElementById('height').value;
	}

	if (width > 100) {
		width = 100
		document.getElementById('width').value = "100"
	}
	if (height > 100) {
		height = 100
		document.getElementById('height').value = "100"
	}
	// create rows
	for (let i = 0; i < height; i++) {

		embedElement(container, "div", "", "row"+i, "row")

		for (let o = 0; o < width; o++) {
			const thisRow = document.getElementById("row"+i)

			embedImg(thisRow, "img", blockImgs[0], "row"+i+"col"+o)
			
			let thisimg = document.getElementById("row"+i+"col"+o)

			let thisIndex = blockGridElements.length
			blockGridElements.push(thisimg)
			blockCoords.push([i,o])

			thisimg.onmouseover = function(event) {
				updateBlock(thisimg, event, thisIndex); // Pass the event object to updateBlock
			};
			thisimg.onmousedown = function(event) {
				updateBlock(thisimg, event,thisIndex); // Pass the event object to updateBlock
			};
		}
	}

}

buildGrid(10,10)




