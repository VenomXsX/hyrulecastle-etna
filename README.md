# Groupe de phan_n 1012066

# The Hyrule Castle

## Base game logic

- Welcome menu (can select 2 modes: default or custom (mod))
- Initialize game data in `object`
- then loop the game with the data :)



	
## Gamemodes

- Default:

  - game as the subject

- Enhanced:
  - custom mode where you can customize your character, starting inventory (?), number of floors, item drops (?), etc. 

## Documentation
### gameInit() function

- the `gameInit()` function takes in `mode` as a paramter and generate the whole game (floors, monsters on each floors, etc.) and put it in an object. 
- After that a gameloop will start the game with the data inside this object.

### runGame() function

- this functions takes in a `SaveType` object as parameter and serves as the main gameloop.

### chooseGameMode() function
- this function prompts the user to choose a gamemode and handles input errors.

### type.ts file
- this TS file stores all the typings used by the program.

### helper.ts file
- this TS file stores all the helper functions used by the program (sleep, press_to_continue, etc.).
## Features to implement:

- [ ] Accepts player options with number and string case-insensitive.
- [ ] ~~Dynamic characters.~~
- [ ] Random last boss spawn based on rarity.
- [ ] Random player character fetched from JSON.
- [ ] Inventory object
- [x] Game state object, to save the game
- [x] need to loads saved file then pass the contents to gameInit()
- [ ] ~~Restart feature~~
- [ ] Item drops by monsters/bosses
- [ ] Random boss spawn by rarity

### Brainstorming section
```plaintext
Link: hp [                  ]
Enemie: hp [    ]
=========
1. attack	// go to atk/skill list
2. items	// go to inventory
3. settings	// go to settings*
```

- settings has 2 options: restart the game and save/quit the game,

* save the game, in json file

```json
{
	"current" {},
	"initial": {},
}
```

> use current and initial in game loop (when select `continue`)

## Screens

### New title screen [mod] ---------------------

1. New game
2. Continue game (found 0 saved game)
3. Quit


### "New game" screen ---------------------
```
Gamemode selector
1. Default
2. Custom (enhanced)

Enter which gamemode you want to play: 
```

### "Game difficulty selector" [mod] screen ---------------------
```
1. Normal
2. Difficult (1.5x)
3. Insane (2x)

Enter which difficulty you wish to play at: 
```
### "Number of floors selector" screen ---------------------
```
How many floors would you like to fight? (default 10, minimum 10):
```

### New battle screen [mod] ---------------------

```
[BATTLE] | Floor <number> | Gamemode <mode> | Difficulty <diff> | Coins : <number>
---------------------------------------------------------

Player : HP-bar
Stats: [stats array]

Monster : HP-bar
Stats: [stats array]
==========================================

Your actions:
1. Attack       2. Heal
3. Escape* [mod] 4. Protect* [mod]


[*] Escape: stops the fight
[*] Protect: reduces incoming damage by 50% 

------------------------------------------
Enter your action:
```