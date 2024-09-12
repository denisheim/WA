const username = "coffee";
const password = "kafe";

const baseURL = "http://ajax1.lmsoft.cz/procedure.php?cmd=";

window.onload = function () {
	getPeople();
	getDrinks();
};

function getDrinks()
{
	var xhr = new XMLHttpRequest();

	xhr.open(
		"GET",
		baseURL + "getTypesList",
		true,
		username,
		password
	);

    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			let json = JSON.parse(xhr.responseText);
			parseTypes(json);
		} else {
			console.error("Request failed with status " + xhr.status);
		}
	};

	xhr.send();
}

function parseTypes(responseJson) 
{
	let typesList = document.getElementById("types");

	Object.keys(responseJson).forEach((key) => {
		let drink = responseJson[key];

		let numInput = document.createElement("input");
		numInput.type = "number";
		numInput.min = 0;
		numInput.max = 10;
		numInput.id = drink.typ;

		let label = document.createElement("label");
		label.htmlFor = drink.typ;
		label.innerText = drink.typ;

		let br = document.createElement("br");

		typesList.appendChild(label);
		typesList.appendChild(numInput);
		typesList.appendChild(br);
	});
}

function getPeople() {
	var xhr = new XMLHttpRequest();

	xhr.open(
		"GET",
		baseURL + "getPeopleList",
		true,
		username,
		password
	);
    
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			let json = JSON.parse(xhr.responseText);
			parsePeople(json);
		} else {
			console.error("Request failed with status " + xhr.status);
		}
	};

	xhr.send();
}

function parsePeople(responseJson) {
	let peopleList = document.getElementById("peopleList");

	Object.keys(responseJson).forEach((key) => {
		let person = responseJson[key];

		let radio = document.createElement("input");
		radio.type = "radio";
		radio.name = "name";
		radio.value = person.ID;
		radio.id = person.name;

		let label = document.createElement("label");
		label.htmlFor = person.name;
		label.innerText = person.name;

		let br = document.createElement("br");

		peopleList.appendChild(radio);
		peopleList.appendChild(label);
		peopleList.appendChild(br);
	});
}