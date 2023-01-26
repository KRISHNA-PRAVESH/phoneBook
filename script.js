//Add contacts into the map also into the suggestions array
const contacts = new Map();
function addContact(){
	let name = prompt("Enter name");
	let number = prompt("Enter Number");
	//Saving contact to the map.
	contacts.set(name,number);

	//adding contact name to the suggestions
	contactNames.push(name);
}

//Picking elements in the HTML
const inputContainer = document.querySelector(".input-container");
const textInput = document.querySelector("input#text");
const suggestion = document.querySelector(".suggestion-container");


//Ascii values
const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;
const BACKSPACE_KEYCODE = 8;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const SPACE_KEYCODE = 32;


//contains all the contact names
let contactNames = [];
let suggestedWord = "";
let suggestedWordsArray = [];
let currentWordIndex = 0;
let insertText = false;


textInput.addEventListener("input", e => {
	if (e.data != " ") {
		insertText = true;
	}
	if (insertText == false) {
		textInput.value = "";
	}

	let inputValue = e.target.value;
	suggestedWordsArray = filterArray(contactNames, inputValue);
	suggestedWord = suggestedWordsArray[0];

	if (suggestedWord != undefined) {
		suggestion.innerHTML = suggestedWord;
	}

	if (inputValue.length == 0 || suggestedWordsArray.length == 0) {
		suggestion.innerHTML = "";
	}
 

	if (textInput.value.length == 0) {
		insertText = false;
	}
});

//When the user started entering a character
textInput.addEventListener("keydown", e => {

    //if the user presses ENTER then all the typed character will be erased
	if (e.keyCode == ENTER_KEYCODE) {
		if (textInput.value.length == 0) return;
		let inputValue = textInput.value;
		let words = inputValue.split(" ");
		for (let i in words) {
			if (words[i].length != 0) {
				contactNames.push(words[i]);
				textInput.value = "";
				suggestion.innerHTML = "";
			}
		}
		contactNames = removeDuplicatesFromArray(contactNames);

	}

    
	if (textInput.value.length != 0) {

        //If Arrow-up is pressed then go up in the list of all related words
		if (e.keyCode == UP_ARROW_KEYCODE) {
			if (currentWordIndex == 0) return;
			currentWordIndex--;
			//suggesting a word.
			suggestion.innerHTML = suggestedWordsArray[currentWordIndex];
		}
 
        //If arrow-down is pressed go down in the list of all related words
		if (e.keyCode == DOWN_ARROW_KEYCODE) {
			if (currentWordIndex == suggestedWordsArray.length - 1) return;
			currentWordIndex++;
			suggestion.innerHTML = suggestedWordsArray[currentWordIndex];
		}
        

		if (e.keyCode == BACKSPACE_KEYCODE) {
			currentWordIndex = 0;
		}
	}

	if (suggestedWord != undefined && suggestedWord != "") {

		//if the user presses tab then fill the box with the currently suggested word
        if (e.keyCode == TAB_KEYCODE) {
			e.preventDefault();
			textInput.value = suggestedWordsArray[currentWordIndex];
			suggestion.innerHTML = "";
		}
	}
});





//Filtering suggestions based on input 
function filterArray(array, item, reverse = false) {
	if (reverse) {
		return array
			.filter(word => compareTwoStrings(word, item))
			.sort((a, b) => a.length - b.length);
	} else {
		return array
			.filter(word => compareTwoStrings(word, item))
			.sort((a, b) => b.length - a.length);
	}
}

function removeDuplicatesFromArray(array) {
	return [...new Set(array.map(i => i))];
}

function compareTwoStrings(string, subString) {
	let temp = string.split("", subString.length).join("");
	if (subString == temp) return subString;
}




//Printing the number of selected person if exists
function Get(){
    let toGet = document.getElementById("text").value;
    let num = contacts.get(toGet);
    if(num!=undefined){
        alert(`Name:${toGet} , Number: ${num}`);

    }
    else{
        alert("No results found")
    }
}


//Feature to be added: Determine who is calling Given their phone number


