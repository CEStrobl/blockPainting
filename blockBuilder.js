
/**
 * 
 * @param {object} divIn 
 * @param {string} type 
 * @param {string} content 
 * @param {string} id
 * 
 * Example use: addElement ( control, "p", "Hello World!", "paragraph1" )
 * Creates a paragraph with the id:"paragraph1" saying "Hello World!" inside div obj control
 */
function addElement(divIn, type, content, id, cssClass) {
	const newDiv = document.createElement(type)

	newDiv.className = cssClass;

	newDiv.innerHTML = content;
	
	newDiv.id = id

	divIn.after(newDiv)
}

/**
 * 
 * @param {object} divIn 
 * @param {string} type 
 * @param {string} content 
 * @param {string} id
 * 
 * Example use: addElement ( control, "p", "Hello World!", "paragraph1" )
 * Creates a paragraph with the id:"paragraph1" saying "Hello World!" inside div obj control
 */
function embedElement(divIn, type, content, id, cssClass) {
	const newDiv = document.createElement(type)

	newDiv.className = cssClass;

	newDiv.innerHTML = content;
	
	newDiv.id = id

	divIn.appendChild(newDiv)
}

function embedImg(divIn, type, source, id) {
	const newDiv = document.createElement(type)

	newDiv.src = source;
	
	newDiv.id = id
	
	divIn.appendChild(newDiv)
	
}
