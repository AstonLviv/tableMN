	let wood = 0
	let stone = 0
	let metal = 0

	const WOOD_CHANCE = 50
	const STONE_CHANCE = 30
	const METAL_CHANCE = 20

	const ONE_CHANCE = 50
	const TWO_CHANCE = 25
	const THREE_CHANCE = 10

	const MINE_CHANCE = 40
	const LEVEL_BONUS = 5

	const ONE_RATE = ONE_CHANCE
	const TWO_RATE = ONE_CHANCE + TWO_CHANCE
	const THREE_RATE = ONE_CHANCE + TWO_CHANCE + THREE_CHANCE

	const WOOD_RATE = WOOD_CHANCE
	const STONE_RATE = WOOD_CHANCE + STONE_CHANCE
	const METAL_RATE = WOOD_CHANCE + STONE_CHANCE + METAL_CHANCE

	let gearBonuses = {
		"bonusDamage": 0,
		"critMultiplier": 1.5,
		"critChance": 5
	}

	let rssCountToMine
	let rssNameToMine
	rssNameAndCount()

	function rssNameAndCount() {
		rssCountToMine = rssCount() 
		rssNameToMine = rssName()
		setElementText("mineButton", "Mine " + rssCountToMine + " " + rssNameToMine + "")
	}
	

	const skillPointsForMineLevel = [5, 8, 10, 13, 15, 20, 25, 30, 35, 50]
	const skillPointsForBattleLevel = [3, 8, 15, 25, 38, 53, 71, 95]

	let diceBonus = 0
	let levelBonus = 0

	const LEVEL_BATTLE_BONUS = 15
	let alreadyMined = false

	const battleInventory = {} 

	updateCraft()
	const PLAYER_DAMAGE = 2 //base 2
	const PLAYER_HP = 5 //base 5
	let currentMob = randomMob()
	let round = 1
	let playerHp = PLAYER_HP
	let maxPlayerHp = PLAYER_HP
	let xp = 0
	drawMob(currentMob)
	updatePlayerStats()

	let currentTurn = 1

	let woodLvl = 0
	let stoneLvl = 0
	let metalLvl = 0

	let woodBonusChance = 0
	let stoneBonusChance = 0
	let metalBonusChance = 0

	let wagonOwned = false

	function randomMob() {
		const randomIndex = random(mobs.length)-1
		const rnd = mobs[randomIndex]
		const copy = { ...rnd}
		copy.maxHp = copy.hp
		return copy
	}

	function mine() {
		alreadyMined = true
		enableButton("mineButton", false)
		let mined = false
		if (rssNameToMine == "wood") {
			mined = isRssMined(skillLevel(woodLvl), woodBonusChance)
		} else if (rssNameToMine == "stone") {
			mined = isRssMined(skillLevel(stoneLvl), stoneBonusChance)
		} else {
			mined = isRssMined(skillLevel(metalLvl), metalBonusChance)
		}
		console.log("mined = " + mined)

		if (mined) {
			if (wagonOwned == false) {
				updateStatus('mined 1(' + rssCountToMine + ') ' + rssNameToMine)
				rssCountToMine = 1
			} else {
				updateStatus('mined ' + rssCountToMine + ' ' + rssNameToMine)
			}
			setStatusRed(false)
			if (rssNameToMine == "wood") {
				woodLvl += rssCountToMine
				updateRss(rssNameToMine, wood += count)
			} else if (rssNameToMine == "stone") {
				stoneLvl += rssCountToMine
				updateRss(rssNameToMine, stone += rssCountToMine)
			} else {
				metalLvl += rssCountToMine
				updateRss(rssNameToMine, metal += rssCountToMine)
			}
			updateCraft()
		} else {
			updateStatus('failed to mine ' + rssCountToMine + ' ' + rssNameToMine)
			setStatusRed(true)
		}
	}

	function fight() {
		round  = 1
		showBattle(playerHp, currentMob)
	} 


	function rssName() {
		const generate = random(WOOD_CHANCE + STONE_CHANCE + METAL_CHANCE)
		if (generate <= WOOD_RATE) {
			return "wood"
		} else if (generate <= STONE_RATE) {
			return 'stone'
		} else if (generate <= METAL_RATE) {
			return 'metal'
		}
	}

	function rssCount() {
		const generate = random(ONE_CHANCE + TWO_CHANCE + THREE_CHANCE) 
		if (generate <= ONE_RATE) {
			return 1
		} else if (generate <= TWO_RATE) {
			return 2
		} else if (generate <= THREE_RATE) {
			return 3
		}
	}

	function isRssMined(level, toolBonus) {
		const chance = level * LEVEL_BONUS + diceBonus
		diceBonus = 0
		updatePlayerStats()
		return random(100) <= (MINE_CHANCE + chance + toolBonus)
	}

	function skillLevel(skill) {
		return checkLevel(skill, skillPointsForMineLevel)
	}

	function addBonus(bonus) {
		if (bonus.length != 3) {
			alert("wrong addBonus usage")
		}

		woodBonusChance = woodBonusChance + bonus[0]
		stoneBonusChance = stoneBonusChance + bonus[1]
		metalBonusChance = metalBonusChance + bonus[2]

	}

	function craft(name) {
		for (tool of tools) {
			if (tool.name == name) {
				consumeRss(tool.price)
				tool.owned = true
				updateCraft()
				addBonus(tool.bonus)
			}
			if (name == "wagon") {
				wagonOwned = true
			}
		}
		for (gear of gears) {
			if (gear.name == name) {
				consumeRss(gear.price)
				gear.owned = true
				updateCraft()
				addBattleBonus(gear.bonus)
			}
		}
		updateInventory()
	}

	function consumeRss(price) {
		wood  = wood  - price[0]
		updateRss("wood", wood)
		stone = stone - price[1]
		updateRss("stone", stone)
		metal = metal - price[2]
		updateRss("metal", metal)
	}

	function endTurn() {
		rssNameAndCount()
		updateStatus("")
		currentTurn++
		updateTurn(currentTurn)
		enableButton("mineButton", true)
		currentMob = randomMob()
		drawMob(currentMob)
		addPlayerHp(1)
		updatePlayerStats()
	}

	function hit() {
		playerHit()
		mobHit()
		checkHP()
		round++
	}

	function checkHP() {
		if (playerHp <= 0) {
			playerHp = 0
			updateBattleButtons(false)
		} else if (currentMob.hp <= 0) {
			xp += currentMob.xp
			checkPlayerLevel()
			loot(currentMob)
			updateBattleButtons(false)
		}
	}

	function playerHit() {
		if (random(100) >= 90) {
			log("haha looser you missed, lol")
		} else {
			const dmg = playerDamage()	
			currentMob.hp -= dmg
			setElementText("mobHpBattle", mobHpString(currentMob))
		}
	}

	function mobHit() {
		if (random(100) >= currentMob.hitChance) {
			log(currentMob.name + " looser he missed, lol")
			return
		} 
		const damage = mobDamage()
		playerHp -= damage
		setElementText("playerHpBattle", playerHpString())
	}

	function mobDamage() {
		const addDamageRange = currentMob.maxDamage - currentMob.minDamage + 1
		const additionalDamage = random(addDamageRange) - 1
		const regularDamage = currentMob.minDamage + additionalDamage

		if (random(100) >= 100 - currentMob.critChance) {
			const critDamage = Math.ceil(regularDamage * 1.5)
			log(currentMob.name + " deals crit " + critDamage)
			return critDamage 
		} 
		log(currentMob.name + " deals " + regularDamage)
		return regularDamage
	}

	function playerDamage() {
		const playerDmg = random(PLAYER_DAMAGE)
		const bonus = diceBonus + levelBonus + gearBonuses.bonusDamage
		let additionalDamage = Math.floor(bonus/100)
		if (random(100) <= bonus % 100) {
			additionalDamage += 1
		}
		if (additionalDamage > 0) {
			log("you deal " + playerDmg + " + " + additionalDamage + " damage to " + currentMob.name)
		} else {
			log("you deal " + playerDmg + " damage to " + currentMob.name)
		}
		if (random(100) >= 100 - gearBonuses.critChance) {
			const critDamage = Math.ceil(playerDmg * gearBonuses.critMultiplier)
			log(currentMob.name + " deals crit " + critDamage)
			return critDamage 
		} 
		return playerDmg + additionalDamage
	}

	function loot(mob) {
		const dice = random(6)
		for (const lootItem of mob.loot) {
			if (lootItem.dice == dice) {
				if (lootItem.name == "hp") {
					addPlayerHp(lootItem.value)
					log("restored " + lootItem.value + "hp")
				} else {
					addLootItem(lootItem)
					log("looted " + lootItem.name)
				}
			}	
		}
	}

	function updateBattleButtons(newBattle) {
		enableButton("hitButton", newBattle)
		enableButton("endBattleButton", !newBattle)
		if (newBattle == false) {
			diceBonus = 0
		}
	}

	function addPlayerHp(value) {
		playerHp += value
		if (playerHp > maxPlayerHp) {
			playerHp = maxPlayerHp
		}
	}

	function addLootItem(lootItem) {
		const key = lootItem.name
		if (battleInventory.hasOwnProperty(key)) {
			battleInventory[key] += lootItem.value
		} else {
			battleInventory[key] = lootItem.value
		}
	}

	function useLootItem(lootItem) {
		const key = lootItem
		if (battleInventory.hasOwnProperty(key)) {
			if (battleInventory[key] > 1) {
				battleInventory[key]--
			} else {
				delete battleInventory[key]
			} 

			if (lootItem == "potion") {
				addPlayerHp(1)
			} else if (lootItem == "dice") {
				diceBonus += 20
			} else {
				alert("wtf are you doing?")
			}
		} else {
			alert("oops, " + lootItem.name + " not exist")
		}
		updatePlayerStats()
		setElementText("playerHpBattle", playerHpString())
		drawBattleInventory('battleInventoryInBattle')
	}

	function checkPlayerLevel() {
		const playerLvl = checkLevel(xp, skillPointsForBattleLevel)
		maxPlayerHp = PLAYER_HP + +playerLvl
		levelBonus = LEVEL_BATTLE_BONUS * +playerLvl
		return playerLvl
	}

	function checkLevel(skill, levels) {
		for (idx in levels) {
			const n = levels[idx]
			skill = skill - n 
			if (skill < 0 ) {
				return idx
			}
		}
		return +levels.length-1
	}
	
	function addBattleBonus(bonus) {
		for (const key in bonus) {
			if (gearBonuses.hasOwnProperty(key)){
				gearBonuses[key] += bonus[key]
			} else {
				gearBonuses[key] = bonus[key]
			}
		} 
	}