let mobs = [
	{	
		name: 	"spider",
		hp: 	4,
		description: "a big spider that lives in a cave",
		damage: 1,
		maxDamage: 2,
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
		damage: 1,
		maxDamage: 3,
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
				name: "dice and potion",
				value: 1,
				dice: 6
			}
		]	
	},
	{	
		name: 	"skeleton",
		hp: 	12,
		description: "skeleton king raised this skeleton to defeat you",
		damage: 2,
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
				name: "dice and potion",
				value: 1,
				dice: 5
			},
			{
				name: "dice and potion",
				value: 1,
				dice: 6
			}
		]		
	},
	{	
		name: 	"blaze",
		hp: 	20,
		description: "a burning skeleton that can throw fireballs and fly",
		damage: 3,
		maxDamage: 5, 
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
				name: "dice and potion",
				value: 2,
				dice: 5
			},
			{
				name: "dice and potion",
				value: 2,
				dice: 6
			}
		]	
	},
	{
		name: 	"Skeleton King",
		hp: 	35,
		description: "THE FINAL BOSS",
		damage: 7,
		maxDamage: 9,
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
				name: "dice and potion",
				value: 3,
				dice: 4
			},
			{
				name: "dice and potion",
				value: 4,
				dice: 5
			},
			{
				name: "dice and potion",
				value: 5,
				dice: 6
			}
		]	
	}
]
