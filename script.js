let blockNames = ["empty", 
"spruce log",  "spruce planks",
"oak log","oak planks", "stripped oak log",
"dark oak log","dark oak planks","stripped dark oak log",
"birch log","birch planks",
"oak leaves","jungle leaves","moss block","flowering azalea leaves",
"quartz pillar","quartz block",
"blackstone", "polished blackstone bricks",
"deepslate tiles","deepslate bricks","cobbled deepslate", "stone bricks", 
"cobblestone", "andesite","polished andesite", "basalt",
"glowstone","amethyst block","bookshelf","barrel","glass",    
]
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

		let woodWords = ["plank", "log"]
		let natureWords = ["leave", "moss", "grass", "flower"]
		let stoneWords = ["stone", "cobble", "slate", "quartz"]

		// Determine Category
		if (checkKeyWords(blockName, woodWords)) {
			category = document.getElementById("wood")
		} 
		else if (checkKeyWords(blockName, natureWords)){
			category = document.getElementById("nature")
		} 
		else if (checkKeyWords(blockName, stoneWords) ) {
			category = document.getElementById("stone")
		} 
		else {
			category = document.getElementById("decorative")
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




