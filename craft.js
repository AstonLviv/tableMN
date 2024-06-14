const tools = [
	{	
		name: 	"saw",
		price: 	[3, 0, 0],
		description: "+5% to mine wood",
		bonus: [5, 0, 0],
		owned: false
	},
	{	
		name: 	"chainsaw",
		price: 	[6, 0, 0],
		description: "+10% to mine wood",
		bonus: [10, 0, 0],
		owned: false
	},
	{	
		name: 	"pickaxe",
		price: 	[3, 1, 1],
		description: "+5% to mine stone and metal",
		bonus: [0, 5, 5],
		owned: false
	},
	{	
		name: 	"drill",
		price: 	[5, 2, 2],
		description: "+10% to mine stone and metal",
		bonus: [0, 10, 10],
		owned: false
	},
	{
		name: 	"wagon",
		price: 	[2, 2, 2],
		description: "you can mine more resources",
		bonus: [0, 0, 0],
		owned: false
	}
]

const gears = [
	{
		name: 	"axe",
		price: 	[4, 2, 1],
		description: "will help you to fight mobs",
		bonus: {
			"minDamage":1,
			"maxDamage": 2,
			"bonusDamage": 50,
			"critMultiplier": 0.25,
			"critChance": 20
		},
		owned: false,
		type: "weapon",
	},
	{
		name: 	"sword",
		price: 	[4, 3, 3],
		description: "will help you to fight mobs",
		bonus: {
			"minDamage":2,
			"maxDamage": 2,
			"bonusDamage": 60,
			"critMultiplier": 0.40,
			"critChance": 10,
		},
		owned: false,
		type: "weapon",
	},
	{
		name: 	"spear",
		price: 	[5, 4, 4],
		description: "will help you to fight mobs",
		bonus: {
			"minDamage":1,
			"maxDamage": 2,
			"bonusDamage": 70,
			"critMultiplier": 0.30,
			"critChance": 15
		},
		owned: false,
		type: "weapon",
	},
	{
		name: 	"helmet",
		price: 	[3, 6, 2],
		description: "will help you to defend from mobs",
		bonus: {
			"maxHp": 3,
		},
		owned: false,
		type: "armor_1",
	},
	{
		name: 	"armour",
		price: 	[5, 5, 5],
		description: "will help you to defend from mobs",
		bonus: {
			"maxHp": 5,
		},
		owned: false,
		type: "armor_2",
	},
	{
		name: 	"pants",
		price: 	[3, 4, 3],
		description: "will help you to defend from mobs",
		bonus: {
			"maxHp": 4,
		},
		owned: false,
		type: "armor_3",
	},
	{
		name: 	"boots",
		price: 	[0, 0, 4],
		description: "will help you to defend from mobs",
		bonus: {
			"maxHp": 1,
		},
		owned: false,
		type: "armor_4",
	}
]