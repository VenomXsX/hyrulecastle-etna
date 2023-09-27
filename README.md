# Groupe de phan_n 1012066
# The Hyrule Castle

## Base game

- welcome menu (can select 2 mode: default or custom (mod))
- init player in `object` and monsters in `object[]`
- then loop the game :)

- save the game (optional)

```plaintext
Link: hp [                  ]
Enemie: hp [    ]
=========
1. attack	// go to atk/skill list
2. items	// go to inventory
3. settings	// go to settings*
```

* settings has 2 options: restart the game and save/quit the game,

## Gamemodes
- Default: 
  - game as the subject

- Enhanced: 
  - to be announced

## gameInit() function
- the gameInit() function takes in mode as a paramter and generate the whole game (floors, monsters on each floors) and put it in an object. after that a gameloop with start the game.



## outputText() function
- this functions takes in a path parameter and logs the content of a txt file, mainly used to display menus.

## Features to implement:
- Iventory object
- Game state object, to save the game
  - need to loads saved file then pass the contents to gameInit()
- Restart feature


