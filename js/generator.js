
const totalColumns = 9;
const totalRows = 9;

function generate() {
    let sodokuDiv = document.getElementById("generateMe");
    sodokuDiv.innerHTML = "";
    let sodokuMatrix = document.createElement("table");

    for(let i = 0; i < totalRows; i++){
        let row = document.createElement("tr");


        for(let j = 0; j < totalColumns; j++){
            let cell = document.createElement("td");
            //TODO Generate a solvable sodoku here. Also make sure the cells that generate with empty cells are changeable.
            let cellText = document.createTextNode("0");

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        sodokuMatrix.appendChild(row);
    }
    sodokuDiv.appendChild(sodokuMatrix);
}