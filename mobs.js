const mobs = [
	{	
		name: 	"spider",
		hp: 	4,
		description: "a big spider that lives in a cave",
		minDamage: 1,
		critChance: 10,
		maxDamage: 1,
		hitChance: 80,
		xp: 1,
		loot: [
			{
				name: "hp",
				value: 1,
				dice: 4
			},
			{
				name: "potion",
				value: 1,
				dice: 5
			},
			{
				name: "dice",
				value: 1,
				dice: 6
			}
		]		
	},
	{	
		name: 	"zombie",
		hp: 	8,
		description: "a zombie that raise from a grave at night",
		minDamage: 1,
		maxDamage: 2,
		critChance: 10,
		hitChance: 80,
		xp: 3,
		loot: [
			{
				name: "hp",
				value: 2,
				dice: 2
			},
			{
				name: "hp",
				value: 3,
				dice: 3
			},
			{
				name: "potion",
				value: 1,
				dice: 4
			},
			{
				name: "dice",
				value: 1,
				dice: 5
			},
			{
				name: "dice",
				value: 1,
				dice: 6
			},
			{
				name: "potion",
				value: 1,
				dice: 6
			},
		]	
	},
	{	
		name: 	"skeleton",
		hp: 	12,
		description: "skeleton king raised this skeleton to defeat you",
		minDamage: 2,
		critChance: 15,
		maxDamage: 3,
		hitChance: 80,
		xp: 5,
		loot: [
			{
				name: "hp",
				value: 3,
				dice: 1
			},
			{
				name: "hp",
				value: 3,
				dice: 2
			},
			{
				name: "potion",
				value: 2,
				dice: 3
			},
			{
				name: "dice",
				value: 2,
				dice: 4
			},
			{
				name: "dice",
				value: 1,
				dice: 5
			},
			{
				name: "potion",
				value: 1,
				dice: 5
			},
			{
				name: "dice",
				value: 1,
				dice: 6
			},	
			{
				name: "potion",
				value: 1,
				dice: 6
			}
		]		
	},
	{	
		name: 	"blaze",
		hp: 	20,
		description: "a burning skeleton that can throw fireballs and fly",
		minDamage: 3,
		maxDamage: 5, 
		critChance: 10,
		hitChance: 80,
		xp: 20,
		loot: [
			{
				name: "hp",
				value: 5,
				dice: 1
			},
			{
				name: "hp",
				value: 5,
				dice: 2
			},
			{
				name: "potion",
				value: 4,
				dice: 3
			},
			{
				name: "dice",
				value: 3,
				dice: 4
			},
			{
				name: "potion",
				value: 2,
				dice: 5
			},
			{
				name: "dice",
				value: 2,
				dice: 5
			},
			{
				name: "dice",
				value: 2,
				dice: 6
			},
			{
				name: "potion",
				value: 2,
				dice: 6
			}
		]	
	},
	{
		name: 	"lich",
		hp: 	35,
		description: "THE FINAL BOSS",
		minDamage: 5,
		critChance: 15,
		maxDamage: 7,
		hitChance: 80,
		xp: 50,
		loot: [
			{
				name: "hp",
				value: 6,
				dice: 1
			},
			{
				name: "hp",
				value: 7,
				dice: 2
			},
			{
				name: "potion",
				value: 4,
				dice: 3
			},
			{
				name: "dice",
				value: 3,
				dice: 4
			},
			{
				name: "potion",
				value: 3,
				dice: 4
			},
			{
				name: "dice",
				value: 4,
				dice: 5
			},
			{
				name: "potion",
				value: 4,
				dice: 5
			},
			{
				name: "dice",
				value: 5,
				dice: 6
			},
			{
				name: "potion",
				value: 5,
				dice: 6
			}
		]	
	}
]
