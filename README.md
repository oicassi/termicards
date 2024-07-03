# Termicards 🎴

A simple terminal app to help you study with flashcards.

## How this works

The app will read all the info that you have on your json file that represents every flashcard deck that you want to study.
Then the app will present a list of subjects (based on what you defined in the json file)
You will select a subject based on it's name or it's id
After that you will select how many cards you want to the current study session

> Tip: you can pass the number of cards directly through arguments when starting the app using `termicards number_of_cards`

Then the questions will be presented and you will answer then
At the end a summary of your answers alogside with previous answers will be displayed and the file will be updated with the answers

## Pre requisites

`Node.js` - with the version 20.0.0

## How to install

1. Download or clone this repo

```bash
git clone git@github.com:oicassi/termicards.git
```

2. Access the directory

```bash
cd termicards
```

3. Create a `cards.json` file that will hold the decks and flashcards. Follow the structure of the `cards.example.json` in the `src/assets` directory

````bash
touch src/assets/cards.json
nano src/assets/cards.json

# You can use whatever text editor you want.
# Don't forget to follow the json structure of the cards.example.json file

3. Give execution permission to `install.sh`
```bash
chmod +x ./install.sh
````

4. Execute installation script

```bash
./install.sh
```

The installation script will copy the application to the node global executables directory, install dependencies and create a symlink

## Running the application

Simple execute the application by typing it's name on terminal: `termicards`

### Running the applicaiton with arguments (optional)

Optionally you can execute the application passing the amount of cards you wat to study in that session. To do this, simple pass the number after executing the application's command:

```bash
termicards 5 # This will start the study session with 5 cards
```

## Updating cards.json

In order to update the `cards.json` file in you installation directory, update the file in this project and then execute the script `update_cards.sh`

> Don't forget to add execution permission to `update_cards.sh` with `chmod +x ./update_cards.sh`

## Notes

- This application is in early access. So bugs may occur
- If you inform an amount of cards that is greater than the amount of cards that is defined in the `cards.json` file, the amount of cards defined in `cards.json` file will be use instead
- Don't forget to create you `cards.json` file in the `src/assets` directory according to the structure defined in the example json file: `src/assets/cards.example.json`

## Future To-Do

- Add the possibility for the user to not type the answer. In this case no answer will recorded
- Segregate the file that will have the answers from the files that have the questions
- If the selected amount of cards is greater than the amount of cards registered in the deck, repeat cards to fill the desired amount
- `cards.json` segregation - Allow the user to split the decks and subjects into multiple files
- Add a better and easier way to create and update cards
- Add a way to just see a summary of the results
- Connect to some generative AI to check if the user's answer is corrrect
