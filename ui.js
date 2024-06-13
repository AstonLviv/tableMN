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

	function updatePlayerStats() {
		setElementText("hp", playerHpString())
		setElementText("xp", xp + "(" + checkPlayerLevel() + ")")
		showElement("bonusInBattle", diceBonus > 0)
		setElementText("diceBonusInBattle", diceBonus + "%")
		showElement("bonus", diceBonus > 0)
		setElementText("diceBonus", diceBonus + "%")
		enableButton("fightButton", playerHp > 0 && currentMob.hp > 0)
		drawBattleInventory('battleInventory')
	}

	function drawBattleInventory(elementId) {
		const battleInventoryElement = document.getElementById(elementId)
		battleInventoryElement.innerHTML = ""
		
		for (const item in battleInventory) {
			const descriptionElement = document.createElement("div")
			descriptionElement.textContent = " " + item + " x" + battleInventory[item]

			const buttonElement = document.createElement('button')
			buttonElement.textContent = "use"
			buttonElement.onclick = (event) => {
				useLootItem(item)
			}
			//buttonElement.disabled = !isEnoughtResources(tool.price)

			battleInventoryElement.appendChild(buttonElement)
			battleInventoryElement.appendChild(descriptionElement)
			battleInventoryElement.appendChild(document.createElement('br'))
		}
	}

	function drawMob(mob) {
		const mobElement = document.getElementById('fighting')
		mobElement.innerHTML = ""
		const nameElement = document.createElement('div')
		nameElement.innerText = mob.name
		mobElement.appendChild(nameElement)
		const mobHpElement = document.createElement('div')
		if (mob.hp > 0) {
			mobHpElement.innerText = mobHpString(mob)

		} else {
			mobHpElement.innerText = "dead ):"
		}
		
		mobElement.appendChild(document.createElement("br"))
		const hpLabelElement = document.createElement('div')
		hpLabelElement.innerHTML = "HP: "
		mobElement.appendChild(hpLabelElement)
		mobElement.appendChild(mobHpElement)
	}

	function showBattle(playerHp, mob) {
		showElement('main', false)
		showElement('battle', true)

		setElementText("playerHpBattle", playerHpString())
		setElementText("mobHpBattle", mobHpString(mob))
		setElementText("mobNameBattle", mob.name)

		updateBattleButtons(true)
		setElementText("log", "")

		drawBattleInventory('battleInventoryInBattle')
	}

	function endBattle() {
		showElement('main', true)
		showElement('battle', false)
		
		drawMob(currentMob)
		updatePlayerStats()
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

	function updateInventory() {
		const inventElement = document.getElementById('inventory')
		inventElement.innerHTML = ""
		for (tool of tools) {
			if (tool.owned == false) continue

			const descriptionElement = document.createElement("div")
			descriptionElement.textContent = ' ' + tool.description

			const nameElement = document.createElement('div')
			nameElement.textContent = tool.name

			inventElement.appendChild(nameElement)
			inventElement.appendChild(descriptionElement)
			inventElement.appendChild(document.createElement('br'))    		
		}
	}
	
 	function updateTurn(turn) {
		const turnElement = document.getElementById("turn")
		turnElement.textContent = turn
	}

	function enableButton(elementId, enable) {
		document.getElementById(elementId).disabled = !enable
	}

	function setElementText(id, text) {
		const element = document.getElementById(id)
		element.textContent = text
	}

	function log(message) {
		appendElementText("log", "round " + round+": "+message)
	}

	function appendElementText(id, text) {
		const element = document.getElementById(id)
		element.innerHTML += "<br>"+text
	}

	function showElement(id, show) {
		const element = document.getElementById(id)
		element.style.display = show ? "block" : "none"
	}

	function playerHpString() {
		return unitHpString(playerHp, maxPlayerHp)
	}

	function mobHpString(mob) {
		return unitHpString(mob.hp, mob.maxHp)
	}

	function unitHpString(currentHp, maxHp) {
		let result = currentHp + "/" + maxHp + "  "
		for (let step = 1; step <= maxHp; step++) {
			if (step <= currentHp) {
				result += "❤️"
			} else {
				result += "🤍"
			}
		}
		return result
	}
