const totalColumns = 9;
const totalRows = 9;

let currRow = 0;

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
            let cellText = document.createTextNode(solvedSoduko[i][j]);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        sodokuMatrix.appendChild(row);
    }
    sodokuDiv.appendChild(sodokuMatrix);
}

function generateValidSoduko() {
    let matrix = new Array(totalColumns).fill(new Array(totalRows).fill(0));

    let validNumbers = new Array(totalRows);

    for (let i = 1; i <= totalRows; i++) {
        validNumbers[i - 1] = i;
    }

    function validateArray(validNumbers, matrix, row, col) {
        for (let i = 0; i < totalRows; i++) {
            if (matrix[col][i] !== 0) {
                validNumbers[matrix[col][i]] = 0;
            }
        }
        for (let i = 0; i < totalColumns; i++) {
            if (matrix[i][row] !== 0) {
                validNumbers[matrix[i][row]] = 0;
            }
        }
        let returnValue = 0;

        for (let i = 0; i < validNumbers.length; i++) {
            if (validNumbers[i] !== 0) {
                return validNumbers[i];
            }
        }

        return returnValue;
    }

    function generateOptions(matrix, col, row) {
        let set = new Set();

        for (let i = 0; i < totalColumns; i++) {
            if (matrix[i][row] !== 0) {
                set.add(matrix[i][row]);
            }
        }

        for (let i = 0; i < totalRows; i++) {
            if (matrix[col][i] !== 0) {
                set.add(matrix[col][i]);
            }
        }

        let returnSet = new Set();


        for (let i = 0; i < validNumbers.length; i++) {
            if (!set.has(validNumbers[i])) {
                returnSet.add(validNumbers[i])
            }
        }

        return returnSet;
    }


    function putNumber(matrix, col) {

        if (col === totalColumns) {
            currRow++;
            col = 0;
        }
        if (currRow === totalRows) {
            return true;
        }

        let options = generateOptions(matrix, col, currRow);


        options.forEach(cellOption => {
            matrix[col][currRow] = cellOption;
            if (putNumber(matrix, col + 1)) {
                return true;
            }

        });

        matrix[col][currRow] = 0;
        return false;

    }

    currRow = 0;
    putNumber(matrix, 0,);

    return matrix;
}
