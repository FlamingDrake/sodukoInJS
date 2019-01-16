
const totalColumns = 9;
const totalRows = 9;

function generate() {
    let sodokuDiv = document.getElementById("generateMe");
    sodokuDiv.innerHTML = "";
    let sodokuMatrix = document.createElement("table");

    let solvedSoduko = generateValidSoduko();

    for(let i = 0; i < totalRows; i++){
        let row = document.createElement("tr");


        for(let j = 0; j < totalColumns; j++){
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

    for(let i = 1; i <= totalRows; i++){
        validNumbers[i-1] = i;
    }

    function validateArray(validNumbers, matrix, row, col) {
        for(let i = 0; i < totalRows; i++){
            if(matrix[col][i] !== 0){
                validNumbers[matrix[col][i]] = 0;
            }
        }
        for(let i = 0; i < totalColumns; i++){
            if(matrix[i][row] !== 0){
                validNumbers[matrix[i][row]] = 0;
            }
        }
        let returnValue = 0;

        for(let i = 0; i < validNumbers.length; i++){
            if(validNumbers[i] !== 0){
                return validNumbers[i];
            }
        }

        return returnValue;
    }

    function putNumber(matrix, col) {
        /*
        if (col < 0 || col >= totalColumns || row < 0 || row >= totalRows) {
            return false;
        }
        putNumber(matrix, row+1,col);
        putNumber(matrix, row,col+1);

        if (matrix[col][row] === 0){
            matrix[col][row] = validateArray(validNumbers,matrix,row,col);
            return true;
        }
        return false;
        */

        for (let row = 0; row < totalRows; row++) {
            if (col === totalColumns && row === totalRows) {
                return true;
            }

            if (validateArray()) {
                return false;
            }

            if (putNumber(matrix, col + 1)) {
                return true;
            }
        }


/*
        if(matrix[col][row] === 0){
            matrix[col][row] = validateArray(validNumbers, matrix, row, col);
            if(col < totalColumns-1){
                putNumber(matrix, row, col+1);
            } else if (row < totalRows-1){
                putNumber(matrix, row+1, 0);
            } else {
                return true;
            }
        } else {
            if(col < totalColumns-1){

                putNumber(matrix, row, col+1);
            } else if (row < totalRows-1){
                putNumber(matrix, row+1, 0);
            } else{
                return true;
            }
        }
        */
    }

    putNumber(matrix, 0, 0);

    return matrix;
}
