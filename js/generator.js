const totalColumns = 9;
const totalRows = 9;

let ugly = [];


function generate() {
    let sodokuDiv = document.getElementById("generateMe");
    sodokuDiv.innerHTML = "";
    let sodokuMatrix = document.createElement("table");

    let solvedSudoku = generateValidSudoku();

    for (let i = 0; i < totalRows; i++) {
        let row = document.createElement("tr");


        for (let j = 0; j < totalColumns; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "cell" + i + "." + j);
            if((j+1)%3===0 && j !== totalColumns - 1){
                cell.style.borderRight = "2px solid#000000"
            }
            if((i+1)%3 === 0 && i !== totalRows - 1){
                cell.style.borderBottom = "2px solid#000000"
            }

            row.appendChild(cell);
        }
        sodokuMatrix.appendChild(row);
    }
    sodokuDiv.appendChild(sodokuMatrix);


    sodokuMatrix.childNodes.forEach(function (row) {
            row.childNodes.forEach(function (cell) {
                let difficulty = document.getElementById("difficultyRange").value / 100;
                let random = Math.random();
                let tempNumber = solvedSudoku.pop();
                let cellText;
                if (random > difficulty) {
                    cellText = document.createTextNode(tempNumber);
                } else {
                    cellText = document.createElement("INPUT");
                    cellText.setAttribute("type", "text");
                    cellText.setAttribute("maxlength", "1");
                }
                cell.appendChild(cellText);
            })
        }
    );
}

function validateSudoko() {
    let validCells = true;
    let value = 0;
    let entry = [];
    for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalColumns; j++) {
            let child = document.getElementById("cell" + i + "." + j).childNodes;
            child.forEach(text => {
                if (!text.value) {
                    entry.push(parseInt(text.nodeValue));
                } else {
                    entry.push(parseInt(text.value))
                }

            });
            // check row
            // check colum
            // check box
        }
    }

    if (entry.length === 81) {
        for (let i = 0; i < entry.length; i++) {
            let temp = entry[i];
            entry[i] = 0;
            let validOptions = allowedNumbers(entry, i);
            if (!validOptions.has(temp)) {
                document.getElementById("successLine").innerText = "YOU ARE DEFEATED";
                return;
            }
            entry[i] = temp;
        }
        document.getElementById("successLine").innerText = "YOU ARE VICTORIOUS"
    }

}

function generateValidSudoku() {
    let availableNumbers = generateNumbers();

    let sortedNumbers = [];

    try {
        sortNumbers(availableNumbers, sortedNumbers);
    } catch (e) {
        let errMsg = document.createTextNode("Try again, sudoku failed to generate.");
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

function allowedNumbers(listOfNumbers, location = listOfNumbers.length) {
    let row = location / 9;
    let col = location % 9;

    let allowedNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let returnSet = new Set();


    for (let i = 0; i < totalRows; i++) {
        if (listOfNumbers[(Math.floor(row) * totalRows) + i]) {
            returnSet.add(listOfNumbers[(Math.floor(row) * totalRows) + i])
        }
        if (listOfNumbers[i * totalRows + col]) {
            returnSet.add(listOfNumbers[i * totalRows + col])
        }

    }
    let quadrantRowFirst = Math.floor(row / 3) * 3;
    let quadrantColFirst = Math.floor(col / 3) * 3;

    //TODO make this not hardcoded
    for (let i = 0; i < 3; i++) {
        let currentRow = quadrantRowFirst + i;
        for (let j = 0; j < 3; j++) {
            if (listOfNumbers[quadrantColFirst + j + currentRow * 9]) {
                returnSet.add(listOfNumbers[quadrantColFirst + j + currentRow * 9])
            }
        }
    }

    returnSet.forEach(number => {
        allowedNumbers.delete(number);
    });

    return allowedNumbers;
}

function sortNumbers(availableNumbers, sortedNumbers) {
    if (availableNumbers.length === 0) {
        return Array.from(sortedNumbers);
    }

    let tempNumber = availableNumbers.pop();
    let options = allowedNumbers(ugly);


    if (options.size > 0) {
        while (!options.has(tempNumber)) {
            availableNumbers.unshift(tempNumber);
            tempNumber = availableNumbers.pop();
        }

        ugly.push(tempNumber);
        sortNumbers(availableNumbers, sortedNumbers);
    } else {
        ugly = [];

        //TODO Make this not dependent on random, waiting on randomly generated string of numbers being ok is really bad :D.

        sortNumbers(generateNumbers(), sortedNumbers)
    }
}

function generateNumbers() {
    let arrayNumbers = [];
    for (let i = 1; i <= totalRows; i++) {
        for (let j = 1; j <= totalColumns; j++) {
            arrayNumbers.push(j);
        }
    }
    for (let i = 1; i < arrayNumbers.length; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let randomValue = arrayNumbers[randomIndex];
        arrayNumbers[randomIndex] = arrayNumbers[i];
        arrayNumbers[i] = randomValue;
    }


    return arrayNumbers;
}
