const PLAYER_MIN_DAMAGE = 1 //base 1
const PLAYER_MAX_DAMAGE = 2 //base 2
const PLAYER_HP = 5 //base 5
const CRIT_CHANCE = 5
const CRIT_MULTIPLIER = 1.5

const WOOD_ROLL_CHANCE = 50
const STONE_ROLL_CHANCE = 30
const METAL_ROLL_CHANCE = 20

const ONE_CHANCE = 50
const TWO_CHANCE = 25
const THREE_CHANCE = 10

const MINING_SKILL_BONUS = 30
const MINE_CHANCE = 40
const LEVEL_BONUS = 5
const LEVEL_BATTLE_BONUS = 15
const BATTLE_DICE_BONUS = 50

const ONE_RATE = ONE_CHANCE
const TWO_RATE = ONE_CHANCE + TWO_CHANCE
const THREE_RATE = ONE_CHANCE + TWO_CHANCE + THREE_CHANCE

const WOOD_RATE = WOOD_ROLL_CHANCE
const STONE_RATE = WOOD_ROLL_CHANCE + STONE_ROLL_CHANCE
const METAL_RATE = WOOD_ROLL_CHANCE + STONE_ROLL_CHANCE + METAL_ROLL_CHANCE

const skillPointsForMineLevel = [5, 8, 10, 13, 15, 20, 25, 30, 35, 50]
const skillPointsForBattleLevel = [3, 5, 12, 20, 30, 38, 52, 68]

const dialog = document.getElementById("lvlUpDialog")

const defaultGearBonuses = {
	"minDamage": PLAYER_MIN_DAMAGE,
	"maxDamage": PLAYER_MAX_DAMAGE,
	"bonusDamage": 0,
	"critMultiplier": CRIT_MULTIPLIER,
	"critChance": CRIT_CHANCE,
	"maxHp": 0,
}

let woodBonusChance = 0
let stoneBonusChance = 0
let metalBonusChance = 0

let gearBonuses = defaultGearBonuses
const miningSkills = {
	"selectRss": 0,
	"heal": 0,
	"miningChance": 0,
}

let battleSkills = {
	"vampirism": 0,
	"selectMob": 0,
	"battleDice": 0,
}
let diceBonus = 0
let levelBonus = 0

const equipment = {
	"weapon": {},
	"armor": {},
	"helmet": {},
}

let wood = 0
let stone = 0
let metal = 0

let alreadyMined = false
let rssCountToMine
let rssNameToMine
let alredyRerolled = false
let mobAlredyRerolled = false
let alreadyHealed = false
rssNameAndCount()
showElement("healButton", miningSkills.heal == 1)
showElement("rerollMob", battleSkills.selectMob == 1)

function rssNameAndCount() {
	rssCountToMine = rssCount() 
	rssNameToMine = rssName()
	setElementText("mineButton", "Mine " + rssCountToMine + " " + rssNameToMine + "")
	showElement("reroll", miningSkills.selectRss == 1 )
	enableButton("reroll", !alredyRerolled && !alreadyMined)
}

const battleInventory = {} 

let currentTurn = 1
let currentMob = randomMob()
let round = 1
let playerHp = PLAYER_HP
let maxPlayerHp = PLAYER_HP
let xp = 0
let currentPlayerLvl = 0

let woodLvl = 0
let stoneLvl = 0
let metalLvl = 0

let wagonOwned = false

updateCraft()
drawMob(currentMob)
updatePlayerStats()

function randomMob() {
	const randomIndex = random(mobs.length)-1
	const rnd = mobs[randomIndex]
	const copy = { ...rnd}
	copy.maxHp = copy.hp
	return copy
}

function mine() {
	alreadyMined = true
	enableButton("reroll", !alredyRerolled && !alreadyMined)
	enableButton("mineButton", false)
	let mined = false
	if (rssNameToMine == "wood") {
		mined = isRssMined(skillLevel(woodLvl), woodBonusChance)
	} else if (rssNameToMine == "stone") {
		mined = isRssMined(skillLevel(stoneLvl), stoneBonusChance)
	} else {
		mined = isRssMined(skillLevel(metalLvl), metalBonusChance)
	}

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
			updateRss(rssNameToMine, wood += rssCountToMine)
			enableButton("healButton", 
				isEnoughtResources([1, 0, 0]) && 
				!alreadyHealed && 
				playerHp != maxPlayerHp)
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
	const generate = random(WOOD_ROLL_CHANCE + STONE_ROLL_CHANCE + METAL_ROLL_CHANCE)
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
	const mineChanceSkill = miningSkills.miningChance * MINING_SKILL_BONUS
	return random(100) <= (MINE_CHANCE +  mineChanceSkill + chance + toolBonus)
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
			//addBattleBonus(gear.bonus)
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
	showElement("rerollMob", battleSkills.selectMob == 1)
	mobAlredyRerolled = false
	enableButton("rerollMob", true)
	rssNameAndCount()
	updateStatus("")
	currentTurn++
	updateTurn(currentTurn)
	enableButton("mineButton", true)
	currentMob = randomMob()
	drawMob(currentMob)
	addPlayerHp(1)
	updatePlayerStats()
	alreadyMined = false
	alredyRerolled = false
	alreadyHealed = false
	enableButton("reroll", !alredyRerolled && !alreadyMined)
	enableButton("healButton", 
		isEnoughtResources([1, 0, 0]) && 
		!alreadyHealed && 
		playerHp != maxPlayerHp)
	showElement("healButton", miningSkills.heal == 1)
}

function hit() {
	playerHit()
	mobHit()
	checkHP()
	drawBattleInventory("battleInventoryInBattle")
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
		if (battleSkills.vampirism == 1) {
			addPlayerHp(1)
			log("drained 1 hp from " + currentMob.name)
		}
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
	const damageRange = gearBonuses.maxDamage - gearBonuses.minDamage
	const playerDmg = gearBonuses.minDamage + random(damageRange + 1) - 1
	const bonus = diceBonus + levelBonus + gearBonuses.bonusDamage + battleSkills.battleDice * BATTLE_DICE_BONUS
	const crit = random(100) >= 100 - gearBonuses.critChance
	let additionalDamage = Math.floor(bonus/100)
	if (random(100) <= bonus % 100) {
		additionalDamage += 1
	}
	if (crit) {
		const critDamage = Math.ceil((playerDmg + additionalDamage) * gearBonuses.critMultiplier)
		log("you deal " + critDamage + " CRIT damage to " + currentMob.name)
		return critDamage
	} else {
		if (additionalDamage > 0) {
			log("you deal " + playerDmg + " + " + additionalDamage + " damage to " + currentMob.name)
		} else {
			log("you deal " + playerDmg + " damage to " + currentMob.name)
		}
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
	clearElement("dialogButtons")
	const playerLvl = checkLevel(xp, skillPointsForBattleLevel)
	maxPlayerHp = PLAYER_HP + +playerLvl + gearBonuses.maxHp
	levelBonus = LEVEL_BATTLE_BONUS * +playerLvl
	if (currentPlayerLvl != playerLvl) {
		const dialogButtonsElement = document.getElementById("dialogButtons")
		dialogButtonsElement.appendChild(
			createSkillButton("reroll resource", "selectRss", +playerLvl)
		)
		dialogButtonsElement.appendChild(
			createSkillButton("heal for 1 wood", "heal", +playerLvl)
		)
		dialogButtonsElement.appendChild(
			createSkillButton("+30% to mine chance", "miningChance", +playerLvl)
		)

		if (+playerLvl <= Object.keys(miningSkills).length) {
			dialog.showModal()
		}
	}
	return +playerLvl
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

function equip(text) {
	const arr = text.split(" ")
	const name = arr[arr.length - 1]

	for (gear of gears) {
		if (gear.name == name) {
			equipment[gear.type] = {...gear}
			
			gearBonuses = {...defaultGearBonuses}
			for (const key in equipment) {
				const gearItem = equipment[key]
				if(gearItem.hasOwnProperty("name")) {
					addBattleBonus(gearItem.bonus)
				}
			}
			break
		}
	}
	const playerLvl = checkLevel(xp, skillPointsForBattleLevel)
	maxPlayerHp = PLAYER_HP + +playerLvl + gearBonuses.maxHp
	updatePlayerStats()
	updateEquipment()
}

function reroll() {
	alredyRerolled = true
	rssNameAndCount()
}

function heal() {
	alreadyHealed = true
	addPlayerHp(1)
	consumeRss([1,0,0])
	enableButton("healButton", 
		!alreadyHealed && 
		playerHp != maxPlayerHp &&
		playerHp != maxPlayerHp)
}

function rerollMob() {
	mobAlredyRerolled = true
	enableButton("rerollMob", false)
	currentMob = randomMob()
	drawMob(currentMob)
	enableButton("fightButton", playerHp > 0 && currentMob.hp > 0)
}
