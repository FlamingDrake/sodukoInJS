
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
            let cellText = document.createTextNode("0");
            cell.setAttribute("id", "cell"+i+"."+j);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        sodokuMatrix.appendChild(row);
    }
    sodokuDiv.appendChild(sodokuMatrix);
}
function validateSudoko(){
    let validCells = true;
    let value = 0;
    for(let i = 0; i < totalRows; i++){
        for(let j = 0; j < totalColumns; j++){
            value = document.getElementById("cell"+i+"."+j).value;
            console.log(value);
            // check row
            for(let k = i; k < totalRows; k++){
                if(document.getElementById("cell"+k+"."+j).value == value){
                    console.log("check: " + document.getElementById("cell"+k+"."+j).value);
                    validCells = false;
                }
                else{

                }
            }
            // check colum
            // check box
        }
    }
}

function generateValidSoduko() {
    let availableNumbers = generateNumbers();
}

function generateNumbers() {
    let arrayNumbers = [];
    for (let i = 1; i <= totalRows; i++){
        for(let j = 1; j <= totalColumns; j++){
            arrayNumbers.push(j);
        }
    }
    return arrayNumbers;
}
