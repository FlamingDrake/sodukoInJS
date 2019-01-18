const totalColumns = 9;
const totalRows = 9;

let ugly = [];


function generate() {
    let sodokuDiv = document.getElementById("generateMe");
    sodokuDiv.innerHTML = "";
    let sodokuMatrix = document.createElement("table");

    let solvedSoduko = generateValidSoduko();

    for (let i = 0; i < totalRows; i++) {
        let row = document.createElement("tr");


        for (let j = 0; j < totalColumns; j++) {
            let cell = document.createElement("td");
            //TODO Generate a solvable sodoku here. Also make sure the cells that generate with empty cells are changeable.
            //let cellText = document.createTextNode("0");
            cell.setAttribute("id", "cell" + i + "." + j);

            //cell.appendChild(cellText);
            row.appendChild(cell);
        }
        sodokuMatrix.appendChild(row);
    }
    sodokuDiv.appendChild(sodokuMatrix);


    sodokuMatrix.childNodes.forEach(function (row) {
            row.childNodes.forEach(function (cell) {
                let difficulty = 0.5;
                let random = Math.random();
                let tempNumber = solvedSoduko.pop();
                let cellText;
                if(random>difficulty){
                    cellText = document.createTextNode(tempNumber);
                } else {
                    cellText = document.createElement("INPUT");
                    cellText.setAttribute("type", "text");
                }
                cell.appendChild(cellText);
            })
        }
    );
}

function validateSudoko() {
    let validCells = true;
    let value = 0;
    for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalColumns; j++) {
            value = document.getElementById("cell" + i + "." + j).value;
            console.log(value);
            // check row
            for (let k = i; k < totalRows; k++) {
                if (document.getElementById("cell" + k + "." + j).value === value) {
                    console.log("check: " + document.getElementById("cell" + k + "." + j).value);
                    validCells = false;
                } else {

                }
            }
            // check colum
            // check box
        }
    }
}

function generateValidSoduko() {
    let availableNumbers = generateNumbers();

    let sortedNumbers = [];

    try{
        sortNumbers(availableNumbers, sortedNumbers);
    } catch (e) {
        let errMsg = document.createTextNode("Try again, soduko failed to generate.");
        let sodokuDiv = document.getElementById("generateMe");
        sodokuDiv.innerHTML = "";
        sodokuDiv.appendChild(errMsg);
    }

    let numberSet = [];


    for (let i = 0; i < totalRows * totalColumns; i++) {
        numberSet.push(ugly[i]);
    }

    return numberSet;
}

function allowedNumbers(listOfNumbers) {
    let row =  listOfNumbers.length / 9;
    let col = listOfNumbers.length % 9;

    let allowedNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let returnSet = new Set();

    for (let i = 0; i < totalRows; i++){
        if(listOfNumbers[(Math.floor(row) * totalRows) + i]){
            returnSet.add(listOfNumbers[(Math.floor(row) * totalRows) + i])
        }
        if(listOfNumbers[i * totalRows + col]){
            returnSet.add(listOfNumbers[i * totalRows + col])
        }

    }
    let quadrantRowFirst = Math.floor(row / 3) * 3;
    let quadrantColFirst = Math.floor(col / 3) * 3;

    //TODO make this not hardcoded
    for(let i = 0; i < 3; i++){
        let currentRow = quadrantRowFirst + i;
        for (let j = 0; j < 3; j++){
            if(listOfNumbers[quadrantColFirst + j + currentRow*9]){
                returnSet.add(listOfNumbers[quadrantColFirst + j + currentRow*9])
            }
        }
    }

    returnSet.forEach(number => {
        allowedNumbers.delete(number);
    });

    return allowedNumbers;
}

function sortNumbers(availableNumbers, sortedNumbers) {
    if(availableNumbers.length === 0){
        return Array.from(sortedNumbers);
    }

    let tempNumber = availableNumbers.pop();
    let options = allowedNumbers(ugly);


    if(options.size > 0) {
        while (!options.has(tempNumber)) {
            availableNumbers.unshift(tempNumber);
            tempNumber = availableNumbers.pop();
        }

        ugly.push(tempNumber);
        sortNumbers(availableNumbers, sortedNumbers);
    } else {
        ugly = [];

        sortNumbers(generateNumbers(), sortedNumbers)
    }
    /*
    while (availableNumbers.length > 0) {
        let tempNumber = availableNumbers.pop();



        if (allowedInsert(tempNumber, sortedNumbers)) {
            maxTries = 0;
            sortedNumbers.push(tempNumber);
        } else {
            if(maxTries > 80){
                break;
            }
            availableNumbers.unshift(tempNumber);
            maxTries++;
            //sortedNumbers.push("0");
        }

    }
    return sortedNumbers;
    */
}

function generateNumbers() {
    let arrayNumbers = [];
    for (let i = 1; i <= totalRows; i++){
        for(let j = 1; j <= totalColumns; j++){
            arrayNumbers.push(j);
        }
    }
    for (let i = 1; i < arrayNumbers.length; i++){
        let randomIndex = Math.floor(Math.random() * (i+1));
        let randomValue = arrayNumbers[randomIndex];
        arrayNumbers[randomIndex] = arrayNumbers[i];
        arrayNumbers[i] = randomValue;
    }



    return arrayNumbers;
}
