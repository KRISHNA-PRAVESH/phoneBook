console.clear()

//Picking elements in the HTML
const inputContainerEl = document.querySelector(".input-container");
const textInputEl = document.querySelector("input#text");
const suggestionEl = document.querySelector(".suggestion-container");


//Ascii values
const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;
const BACKSPACE_KEYCODE = 8;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const SPACE_KEYCODE = 32;



//contains all the contact names
let wordsArray = [];

let suggestedWord = "";
let suggestedWordsArray = [];
let currentWordIndex = 0;
let insertText = false;


textInputEl.addEventListener("input", e => {
	if (e.data != " ") {
		insertText = true;
	}
	if (insertText == false) {
		textInputEl.value = "";
	}

	let inputValue = e.target.value;
	suggestedWordsArray = filterArray(wordsArray, inputValue);
	suggestedWord = suggestedWordsArray[0];

	if (suggestedWord != undefined) {
		suggestionEl.innerHTML = suggestedWord;
	}

	if (inputValue.length == 0 || suggestedWordsArray.length == 0) {
		suggestionEl.innerHTML = "";
	}
 

	if (textInputEl.value.length == 0) {
		insertText = false;
	}
});

//When the user started entering a character
textInputEl.addEventListener("keydown", e => {

    //if the user presses ENTER then all the typed character will erased
	if (e.keyCode == ENTER_KEYCODE) {
		if (textInputEl.value.length == 0) return;
		let inputValue = textInputEl.value;
		let words = inputValue.split(" ");
		for (let i in words) {
			if (words[i].length != 0) {
				wordsArray.push(words[i]);
				textInputEl.value = "";
				suggestionEl.innerHTML = "";
			}
		}
		wordsArray = removeDuplicatesFromArray(wordsArray);
		inputContainerEl.classList.add("animate");
		svgTabIcon.classList.add("hidden");
		svgEnterIcon.classList.add("hidden");
		removeClassAfterAnimationCompletes(inputContainerEl, "animate");
	}

    
	if (textInputEl.value.length != 0) {

        //If Arrow-up is pressed then go up in the lis of all related words
		if (e.keyCode == UP_ARROW_KEYCODE) {
			if (currentWordIndex == 0) return;
			currentWordIndex--;
			suggestionEl.innerHTML = suggestedWordsArray[currentWordIndex];
		}
 
        //If arrow-down is pressed go down in the list of all related words
		if (e.keyCode == DOWN_ARROW_KEYCODE) {
			if (currentWordIndex == suggestedWordsArray.length - 1) return;
			currentWordIndex++;
			suggestionEl.innerHTML = suggestedWordsArray[currentWordIndex];
		}
        

		if (e.keyCode == BACKSPACE_KEYCODE) {
			currentWordIndex = 0;
		}
	}

	if (suggestedWord != undefined && suggestedWord != "") {

		//if the user presses tab then fill the box with the currently suggested word
        if (e.keyCode == TAB_KEYCODE) {
			e.preventDefault();
			textInputEl.value = suggestedWordsArray[currentWordIndex];
			suggestionEl.innerHTML = "";
			svgTabIcon.classList.add("hidden");
			svgEnterIcon.classList.add("hidden");
		}
	}
});

removeClassAfterAnimationCompletes(inputContainerEl, "animate");

function removeClassAfterAnimationCompletes(el, className) {
	let elStyles = window.getComputedStyle(inputContainerEl);
	setTimeout(function() {
		el.classList.remove(className);
	}, +elStyles.animationDuration.replace("s", "") * 1000);
}


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



//Add contacts into the map also into the suggestions array
const contacts = new Map();
function addContact(){
    let name = prompt("Enter name");
    let number = prompt("Enter Number");
    contacts.set(name,number);

    //adding name to the suggestions
    wordsArray.push(name);

    console.log(wordsArray)
}

//Printing the number of selected person if exists
function Get(){
    let toGet = document.getElementById("text").value;

    let num = contacts.get(toGet);
    if(num!=undefined){
        alert(`Name:${toGet} , Number: ${contacts.get(toGet)}`);

    }
    else{
        alert("No results found")
    }
}


//Feature to be added: Determine who is callling Given their phone number


