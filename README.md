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

- [x] Accepts player options (combat phase & character selection phase) with number and string case-insensitive.
- [x] Random last boss spawn based on rarity.
- [x] Random player character fetched from JSON.
- [x] Inventory object
- [x] Game state object, to save the game
- [x] need to loads saved file then pass the contents to gameInit()
- [x] Item drops by monsters/bosses
- [x] Random boss spawn by rarity

## Screen

### New battle screen [mod] 

```
[BATTLE] | Floor <number> | Gamemode <mode> | Difficulty <diff> | Coins : <number>
---------------------------------------------------------

Player : HP-bar
Stats: [stats array]

Monster : HP-bar
Stats: [stats array]
==========================================

Your actions:
1. Attack       2. Skills/Heal [mod]
3. Escape* [mod] 4. Protect* [mod]
5. Display inventory [mod]

[*] Escape: return to 1st floor.
[*] Protect: reduces incoming damage by 50% 
9. Save and quit.

------------------------------------------
Enter your action:
```


> filter inv ok display to not show qty of 0

.
|_ atk > physics or spells
|_ items > [items] with exit inv
|_ save
