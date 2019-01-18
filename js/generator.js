const totalColumns = 9;
const totalRows = 9;

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
                let cellText = document.createTextNode(solvedSoduko.pop());
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

    let sortedNumbers = sortNumbers(availableNumbers);

    let numberSet = [];

    for (let i = 0; i < totalRows * totalColumns; i++) {
        numberSet.push(sortedNumbers[i]);
    }

    return Array.from(numberSet);
}

function allowedInsert(t, listOfNumbers) {
    let row =  listOfNumbers.length / 9;
    let col = listOfNumbers.length % 9;

    for (let i = 0; i < totalRows; i++){
        console.log(parseInt(row) + " : " + ((Math.floor(row) * totalRows) + i) + " : " + listOfNumbers.length);
        if(listOfNumbers[(Math.floor(row) * totalRows) + i] === t){
            return false;
        }
        if(listOfNumbers[i * totalRows + col] ===t){
            return false;
        }
    }
    return true;
}

function sortNumbers(availableNumbers) {
    let sortedNumbers = [];

    while (availableNumbers.length > 0) {
        let tempNumber = availableNumbers.pop();

        if (allowedInsert(tempNumber, sortedNumbers)) {
            console.log(availableNumbers + " : " + sortedNumbers.length);
            sortedNumbers.push(tempNumber);
        } else {
            sortedNumbers.push("0");
        }

    }
    return sortedNumbers;
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
