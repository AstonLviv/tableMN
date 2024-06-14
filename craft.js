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
		description: "axe will help you to fight mobs",
		bonus: {
			"bonusDamage": 50,
			"critMultiplier": 0.25,
			"critChance": 20
		},
		owned: false
	}
]