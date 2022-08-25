// Get Elements from the DOM
const numbersButtonGroup = document.querySelectorAll(".numbers button"),
	operatorsButtonGroup = document.querySelectorAll(".operators button"),
	btnsToShow = document.querySelectorAll(".show"),
	mathBtns = document.querySelectorAll(".math-btn"),
	trigBtns = document.querySelectorAll(".trig"),
	modeBtns = document.querySelectorAll(".mode button"),
	answer = document.querySelector(".answer"),
	equalToBtn = document.querySelector("#equal"),
	deleteBtn = document.querySelector("#delete"),
	clearBtn = document.querySelector("#clear"),
	inverseBtn = document.querySelector("#inverse"),
	scientificBtnGroup = document.querySelector("#scientific"),
	openBtn = document.querySelector("#open");

// Checks if the scientific menu is open
let isOpen = false;

// Mode selected
let mode = "rad";

// Checks if inverse button is active
let isInverse = false;

const changeModeAndToggleClass = (btn) => {
	// the button getting clicked
	btn.classList.add("active-mode");
	mode = btn.id;

	// Compare the button getting clicked to all the buttons in the original array and remove the active class if id does not match
	modeBtns.forEach((button) => {
		if (btn.id !== button.id) {
			button.classList.remove("active-mode");
		}
	});
};

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

	input.value += btnValue;
};

const calculateScientifically = (e) => {
	let btnValue = e.target.value;
	if (btnValue === "sin") {
		console.log("sine");
		evaluateMaths(Math.sin);
	} else if (btnValue === "cos") {
		evaluateMaths(Math.cos);
	} else if (btnValue === "tan") {
		evaluateMaths(Math.tan);
	} else evaluateMaths(Math.sqrt);
};

const evaluateMaths = (mathFunction) => {
	const input = document.querySelector("#input");
	let result = Function(`return ${mathFunction(input.value)}`)();
	if (result) {
		answer.innerHTML = result;
	} else {
		answer.innerHTML = "";
	}
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

modeBtns.forEach((button) => {
	button.addEventListener("click", (e) => {
		let btn = e.target;
		changeModeAndToggleClass(btn);
	});
});

// Add blink effect to buttons
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

// Show button values on click
btnsToShow.forEach((button) => {
	button.addEventListener("click", (e) => {
		showBtnsValue(e);
	});
});

mathBtns.forEach((button) => {
	button.addEventListener("click", (e) => {
		calculateScientifically(e);
	});
});

const changeToArcTrig = (value) => {
	trigBtns.forEach((button) => {
		if (value) {
			button.innerHTML = `${button.value}<sup><small>-1</small></sup>`;
		} else {
			button.innerHTML = `${button.value}`;
		}
	});
};

inverseBtn.addEventListener("click", () => {
	isInverse = !isInverse;
	if (isInverse) {
		inverseBtn.classList.add("active-inverse");
	} else {
		inverseBtn.classList.remove("active-inverse");
	}
	changeToArcTrig(isInverse);
});

window.addEventListener("keydown", (e) => {
	// To identify what key the user pressed
	let key = e.key;

	numbersButtonGroup.forEach((button) => {
		if (button.value === key) {
			button.click();
		}
	});

	operatorsButtonGroup.forEach((button) => {
		if (button.value === key) {
			button.click();
		}
	});

	if (key === "Backspace") {
		deleteBtn.click();
	} else if (key === "Delete") {
		clearBtn.click();
	} else if (key === "Enter") {
		equalToBtn.click();
	}
});

equalToBtn.addEventListener("click", evaluate);
deleteBtn.addEventListener("click", deleteSingleNumber);
clearBtn.addEventListener("click", clearScreen);
openBtn.addEventListener("click", openModal);

window.onload = clearScreen();
