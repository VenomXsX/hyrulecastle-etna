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

- [ ] Iventory object
- [x] Game state object, to save the game
- [x] need to loads saved file then pass the contents to gameInit()
- [ ] Restart feature
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