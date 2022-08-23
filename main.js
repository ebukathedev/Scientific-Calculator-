// Get Elements from the DOM
const numbersButtonGroup = document.querySelectorAll(".numbers button");
const operatorsButtonGroup = document.querySelectorAll(".operators button");
const btnsToShow = document.querySelectorAll(".show");
const answer = document.querySelector(".answer");
const equalToBtn = document.querySelector("#equal");
const deleteBtn = document.querySelector("#delete");
const scientificBtnGroup = document.querySelector("#scientific");
const openBtn = document.querySelector("#open");

// Checks if the scientific menu is open
let isOpen = false;

// Button color blink effect
const blinkColor = (e, color) => {
	let button = e.target;
	button.classList.add(color);
	setTimeout(() => button.classList.remove(color), 200);
	//console.log(button.classList);
};

// Display numbers as you type
const showBtnsValue = (e) => {
	let btnValue = e.target.value;
	const input = document.querySelector("#input");
	// if (!Number(btnValue) && btnValue != '0' && btnValue != '.') {
	//  btnValue = ` ${btnValue} `
	//  }

	input.value += btnValue;
};

// Evaluate the equation and display result
const evaluate = () => {
	const input = document.querySelector("#input");
	let result = Function(`return ${input.value}`)();
	if (result) {
		answer.innerHTML = result;
	} else {
		answer.innerHTML = "";
	}
};

// Delete;single;number
const deleteSingleNumber = () => {
	const input = document.querySelector("#input");
	let inputString = input.value;
	let inputStringToArray = inputString.split("");
	let lastNumber = inputStringToArray[inputStringToArray.length - 1];

	let result;
	//if (lastNumber === " ") {
	//  result = inputString.slice(0, -3);
	// } else {
	//   result = inputString.slice(0, -1)
	// }
	result = inputString.slice(0, -1);
	input.value = result;
};

// Clear the screen
const clearScreen = () => {
	const input = document.querySelector("#input");
	input.value = "";
	answer.innerHTML = "";
};

// Open scientific section modal
const openModal = () => {
	// Open the menu when button is clicked
	isOpen = !isOpen;
	scientificBtnGroup.classList.remove("fade-out");
	scientificBtnGroup.classList.add("fade-in");

	if (!isOpen) {
		// if isOpen === false
		scientificBtnGroup.classList.remove("fade-in");
		scientificBtnGroup.classList.add("fade-out");
	}
};

// Event Listeners
numbersButtonGroup.forEach((button) => {
	button.addEventListener("click", (e) => {
		blinkColor(e, "num-hover");
	});
});

operatorsButtonGroup.forEach((button) => {
	button.addEventListener("click", (e) => {
		blinkColor(e, "operator-hover");
	});
});

btnsToShow.forEach((button) => {
	button.addEventListener("click", (e) => {
		showBtnsValue(e);
	});
});

equalToBtn.addEventListener("click", evaluate);

deleteBtn.addEventListener("click", deleteSingleNumber);
deleteBtn.addEventListener("dblclick", clearScreen);

openBtn.addEventListener("click", openModal);

window.onload = clearScreen();
