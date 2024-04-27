	function updateRss(id, value) {
		const element = document.getElementById(id)
		element.innerHTML = value
		updateRssSkill(id)		
	}

	function updateStatus(msg) {
		const element = document.getElementById("status")
		element.innerHTML = msg
	}

	function setStatusRed(red) {
		const element = document.getElementById("status")
		if (red == true) {
			element.style.color = 'red'
		} else {
			element.style.color = 'black'
		}
	}

	function updateRssSkill(rssName) {
		let element = document.getElementById("woodSkill")
		element.innerHTML = skillLevel(woodLvl)

		element = document.getElementById("stoneSkill")
		element.innerHTML = skillLevel(stoneLvl)

		element = document.getElementById("metalSkill")
		element.innerHTML = skillLevel(metalLvl)
	}

	function updateCraft() {
		const craftElement = document.getElementById('craft')
		craftElement.innerHTML = ""
		for (tool of tools) {
			if (tool.owned == true) continue

			const descriptionElement = document.createElement("div")
			descriptionElement.textContent = ' ' + tool.description

			const buttonElement = document.createElement('button')
			buttonElement.textContent = tool.name
			buttonElement.onclick = (event) => {
				craft(event.target.textContent)
			}
			buttonElement.disabled = !isEnoughtResources(tool.price)
			
			const toolPriceElement = document.createElement("div")
			toolPriceElement.innerHTML = priceToString(tool.price)

			craftElement.appendChild(buttonElement)
			craftElement.appendChild(descriptionElement)
			craftElement.appendChild(document.createElement('br'))
			craftElement.appendChild(toolPriceElement)
			craftElement.appendChild(document.createElement('br'))    		
		}
	}

	function priceToString(price) {
		let result = ""
		result += `<pre>wood:  ${price[0]}\n`
		result += `stone: ${price[1]}\n`
		result += `metal: ${price[2]}</pre>`
		return result
	}

	function isEnoughtResources(price) {
		let result = true
		if (wood < price[0]) {
			return false
		}
		if (stone < price[1]) {
			return false
		}
		if (metal < price[2]) {
			return false
		}
		return result
	}