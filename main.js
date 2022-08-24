// Get Elements from the DOM
const numbersButtonGroup = document.querySelectorAll(".numbers button"),
	operatorsButtonGroup = document.querySelectorAll(".operators button"),
	btnsToShow = document.querySelectorAll(".show"),
	mathBtns = document.querySelectorAll(".math-btn"),
	answer = document.querySelector(".answer"),
	equalToBtn = document.querySelector("#equal"),
	deleteBtn = document.querySelector("#delete"),
	clearBtn = document.querySelector("#clear"),
	scientificBtnGroup = document.querySelector("#scientific"),
	openBtn = document.querySelector("#open");

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

	input.value += btnValue;
};

const calculateScientifically = (e) => {
	let btnValue = e.target.value;
	if (btnValue === "sin") {
		console.log("sine");
		evaluateMaths(Math.sin);
	}
	else if (btnValue === "cos") { 
		evaluateMaths(Math.cos);
	}
	else if (btnValue === "tan") { 
		evaluateMaths(Math.tan);
	}
	else evaluateMaths(Math.sqrt);
}

const evaluateMaths = (mathFunction) => {
	const input = document.querySelector("#input");
	let result = Function(`return ${mathFunction(input.value)}`)();
	if (result) {
		answer.innerHTML = result;
	} else {
		answer.innerHTML = "";
	}
}

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

mathBtns.forEach(button => {
	button.addEventListener("click", (e) => {
		calculateScientifically(e);
	})
})

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
