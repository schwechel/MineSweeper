
function startGame(){
    var columns = document.getElementById("columnsInput").value;
    var rows = document.getElementById("rowsInput").value;
    var bombs = document.getElementById("bombsInput").value;

    var currentRow = 0;
    var currentColumn = 0;
    
    var bombGrid = getBombsGrid(columns, rows, bombs);

    var html = '';

    while(currentRow < rows){
        html += "<div class='row'>";
        while(currentColumn < columns){
            html += "<div class='node covered' data-bomb='" + getNodeValue(bombGrid, currentRow, currentColumn) + "' onclick='clicked(this.id);' ondrag='mark(this.id);' id='" + currentRow + "-" + currentColumn + "'></div>"
            currentColumn++;
        }
        html += "</div>";
        currentColumn = 0;
        currentRow++;
    }
    document.getElementById("game").innerHTML = html;
}

function getBombsGrid(columns, rows, bombs){
    var grid = [];

    grid.length = rows;

    var a = 0;
    while(a < grid.length){
        grid[a] = [];
        grid[a].length = columns;
        a++
    }

    var currentNumberOfBombs = 0;
    while(currentNumberOfBombs < bombs){
        var col = Math.floor(Math.random() * (columns - 1));
        var row = Math.floor(Math.random() * (rows - 1));
        if(grid[row][col] !== 1){
            grid[row][col] = 1;
            currentNumberOfBombs++;
        }
    }
    return grid;
}

function getNodeValue(grid, row, column){
    var value;
    if(grid[row][column] === 1){
        value = "BOMB";
    }
    else{
        var adjacentBombs = 0;
        var currentRowOffset = -1;
        var currentColumnOffset = -1;
        while(currentRowOffset < 2){
            while(currentColumnOffset < 2){
                if((currentRowOffset !== 0 || currentColumnOffset !== 0) && 
                    currentRowOffset + row >= 0 && currentRowOffset + row < grid.length &&
                    currentColumnOffset + column >= 0 && currentColumnOffset + column < grid[row + currentRowOffset].length &&
                    grid[row + currentRowOffset][column + currentColumnOffset] === 1){
                    adjacentBombs++;
                }
                currentColumnOffset++;
            }
            currentColumnOffset = -1
            currentRowOffset++;
        }
        value = adjacentBombs;
    }
    return value;
}

function clicked(id){
    var node = document.getElementById(id);
    if(node.classList.contains("marked")){
        return;
    }
    if(node.attributes["data-bomb"].value === 'BOMB'){
        alert('Game Over');
        var allNodes = document.getElementsByClassName("covered");
        while(allNodes.length > 0){
            uncover(allNodes[0]);
        }
    }
    else{
        uncover(node);
    }
}

function mark(id){
    var node = document.getElementById(id);
    if(node.classList.contains("covered")){
        if(node.classList.contains("marked")){
            node.innerText = "";
            node.classList.remove("marked");
        }
        else{
            node.innerText = "X";
            node.classList.add("marked");
        }
    }
}

function uncover(node){
    node.innerText = node.attributes["data-bomb"].value;
    node.classList.remove("covered");
}