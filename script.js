const grids = document.querySelectorAll('.grid');

const Player = (symbol) => {
    
    return {symbol}
}

const gameBoard = (() => {
    
    let _markList = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    const displayBoard = () => {
        let i = 0;
        grids.forEach(grid => {
            grid.textContent = _markList[i];
            i++;
        });
    }

    const getMarkList = () => _markList;

    const addMark = (symbol, index) => {
        _markList[index] = symbol;
    }
    const isMarked = index => {
        return _markList[index] == " " ? false : true;
    }
    const isFull = () => {
        return _markList.includes(" ") ? false : true;
    }
    
    return {displayBoard, isMarked, addMark, isFull, getMarkList}
    
})();

const displayController = (() => {
    
    let _lastPlayer;
    let _winner;
    
    const setLastPlayer = player => {
        _lastPlayer = player;
    }
    const getLastPlayer = () => _lastPlayer;
    
    // Gewinnsituationen: [1 2 3], [4 5 6], [7 8 9], 
        // [1 4 7], [2 5 8], [3 6 9]
        // [1 5 9], [3 5 7], 
    const checkRowWin = (markList) => {
        

        for(let i = 0; i < 7; i += 3){
            let temp = markList.slice(i, i + 3);
            const sum = temp.reduce((accumulator,current) => accumulator + current);
            if (sum == 'xxx') {
                _winner = 'x';
            } else if (sum == 'ooo') {
                _winner = 'o';
            }
        }
    }
    return {setLastPlayer, getLastPlayer, checkRowWin}

})();


grids.forEach(grid => grid.addEventListener('click', () => {

    let index = Array.prototype.indexOf.call(grids, grid);
    if (!gameBoard.isMarked(index)){
        switch (displayController.getLastPlayer().symbol) {
            case 'o': 
                gameBoard.addMark('x', index); 
                displayController.setLastPlayer(player_x);
                break;
            case 'x': 
                gameBoard.addMark('o', index);
                displayController.setLastPlayer(player_o);
                break;
        };
        gameBoard.displayBoard();
        displayController.checkRowWin(gameBoard.getMarkList());
        if (gameBoard.isFull()){
            console.log("Game over")
        }
    }
    
}));

gameBoard.displayBoard();

const player_o = Player('o');
const player_x = Player('x');

displayController.setLastPlayer(player_o);

