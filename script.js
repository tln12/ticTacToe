const grids = document.querySelectorAll('.grid');
const resultDisplay = document.querySelector('#result');
const restartBtn = document.querySelector('#restart');

const Player = (symbol) => {
    
    
    return {symbol}
}

const gameBoard = (() => {
    
    let _markList = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let _lastPlayer;

    const setLastPlayer = player => {
        _lastPlayer = player;
    }
    const getLastPlayer = () => _lastPlayer;
    
    const displayBoard = () => {
        let i = 0;
        grids.forEach(grid => {
            grid.textContent = _markList[i];
            i++;
        });
    }
    const addMark = (symbol, index) => {
        _markList[index] = symbol;
    }
    const isMarked = index => {
        return _markList[index] == " " ? false : true;
    }
    const _isFull = () => {
        return _markList.includes(" ") ? false : true;
    }

    const clearBoard = () => {
        _markList = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        displayBoard();
    }

    /*  Check winning positions:
        Row:         [1 2 3], [4 5 6], [7 8 9]
        Column:      [1 4 7], [2 5 8], [3 6 9]
        Diagonal:    [1 5 9], [3 5 7]
     */
    const _checkRowWin = () => {
        for(let i = 0; i < 7; i += 3){
            let temp = _markList.slice(i, i + 3);
            const sum = temp.reduce((accumulator,current) => accumulator + current);
            
            if (sum == 'xxx') {
                return 'x';
            } else if (sum == 'ooo') {
                return 'o';
            }
        }
        return false;
    }
    const _checkColumnWin = () => {
        for(let i = 0; i < 3; i++) {
            let sum = _markList[i] + _markList[i+3] + _markList[i+6];
            if (sum == 'xxx') {
                return 'x';
            } else if (sum == 'ooo') {
                return 'o';
            }
        } 
        return false;
    }
    const _checkDiagWin = () => {
        
        let sum_1 = _markList[0] + _markList[4] + _markList[8];
        let sum_2 = _markList[2] + _markList[4] + _markList[6];
        if (sum_1 == 'xxx' || sum_2 == 'xxx'){
            return 'x';
        } else if (sum_1 == 'ooo' || sum_2 == 'ooo') {
            return 'o';
        } else {
            return false;
        }
    }
    const gameOver = () => {
        let rowWin = _checkRowWin();
        let columnWin = _checkColumnWin();
        let diagWin = _checkDiagWin();
        
        if (_isFull()){
            return 'Game ends in a tie.'
        } else if (rowWin){
            return `Player ${rowWin} wins.`;
        } else if (columnWin){
            return `Player ${columnWin} wins.`;
        } else if (diagWin) {
            return `Player ${diagWin} wins.`;
        } else {
            return false;
        }
    }
    
    return {
        displayBoard,
        setLastPlayer,
        getLastPlayer,
        isMarked,
        addMark,
        clearBoard,
        gameOver
    }
    
})();

const displayController = (() => {
    const displayResult = result => {
        if (result) {
            resultDisplay.textContent = result;
        }
    }


    return {displayResult}
})();


grids.forEach(grid => grid.addEventListener('click', () => {

    let index = Array.prototype.indexOf.call(grids, grid);
    if (!gameBoard.isMarked(index) && !gameBoard.gameOver()){
        switch (gameBoard.getLastPlayer().symbol) {
            case 'o': 
                gameBoard.addMark('x', index); 
                gameBoard.setLastPlayer(player_x);
                break;
            case 'x': 
                gameBoard.addMark('o', index);
                gameBoard.setLastPlayer(player_o);
                break;
        };
        gameBoard.displayBoard();
        if (gameBoard.gameOver()){
            displayController.displayResult(gameBoard.gameOver());
            restartBtn.style.display = 'block';
        }
    }
    
}));

restartBtn.addEventListener('click', () => {
    gameBoard.clearBoard();
    restartBtn.style.display = 'none';
    result.textContent = "";
}
);


gameBoard.displayBoard();

const player_o = Player('o');
const player_x = Player('x');

gameBoard.setLastPlayer(player_o);

