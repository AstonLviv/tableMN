	let wood = 0
	let stone = 0
	let metal = 0

	updateCraft()
	let currentMob = mobs[0]
	let playerHp = 5
	drawMob(currentMob)
	updatePlayerStats()

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

	let woodLvl = 0
	let stoneLvl = 0
	let metalLvl = 0

	let woodBonusChance = 0
	let stoneBonusChance = 0
	let metalBonusChance = 0

	let wagonOwned = false

	const skillPointsForLevel = [5, 8, 10, 13, 15, 20, 25, 30, 35, 50]

	function mine() {
		console.log("mined 1")
		let count = rssCountToMine() 
		const name = rssName()
		let mined = false
		console.log("mined 2")
		if (name == "wood") {
			mined = isRssMined(skillLevel(woodLvl), woodBonusChance)
		} else if (name == "stone") {
			mined = isRssMined(skillLevel(stoneLvl), stoneBonusChance)
		} else {
			mined = isRssMined(skillLevel(metalLvl), metalBonusChance)
		}
		console.log("mined = " + mined)

		if (mined) {
			if (wagonOwned == false) {
				updateStatus('mined 1(' + count + ') ' + name)
				count = 1
			} else {
				updateStatus('mined ' + count + ' ' + name)
			}
			setStatusRed(false)
			if (name == "wood") {
				woodLvl += count
				updateRss(name, wood += count)
			} else if (name == "stone") {
				stoneLvl += count
				updateRss(name, stone += count)
			} else {
				metalLvl += count
				updateRss(name, metal += count)
			}
			updateCraft()
		} else {
			updateStatus('failed to mine ' + count + ' ' + name)
			setStatusRed(true)
		}
	}

	function fight() {
		showBattle()

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

	function rssCountToMine() {
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
		const chance = level*LEVEL_BONUS
		return random(100) <= (MINE_CHANCE + chance + toolBonus)
	}

	function skillLevel(skill) {
		for (idx in skillPointsForLevel) {
			const n = skillPointsForLevel[idx]
			skill = skill - n 
			if (skill < 0 ) {
				return idx
			}
		}
		return skillPointsForLevel.length-1
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