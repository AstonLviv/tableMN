// 1...max
function random(max) {
	x = Math.floor(Math.random()*max) 
	return x+1
}

// ui utils
function appendElementText(id, text) {
	const element = document.getElementById(id)
	element.innerHTML += "<br>"+text
}

function showElement(id, show) {
	const element = document.getElementById(id)
	element.style.display = show ? "block" : "none"
}

function enableButton(elementId, enable) {
	document.getElementById(elementId).disabled = !enable
}

function setElementText(id, text) {
	const element = document.getElementById(id)
	element.textContent = text
}