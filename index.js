
window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'X';
    const PLAYERO_WON = 'O';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const a = board[winningConditions[i][0]];
            const b = board[winningConditions[i][1]];
            const c = board[winningConditions[i][2]];
            if (a === b && b === c && a != '') {
                roundWon = true;
                break;
            }
            else {
                continue;
            }
        }

    if (roundWon) {
            if (currentPlayer === 'X') {
                announce(PLAYERX_WON)
            }
            else {
                announce(PLAYERO_WON)
            }
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    function announce(type) {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'O Won!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'X Won!';
                break;
            case TIE:
                announcer.innerText = 'It\'s a Tie!';
        }
        announcer.classList.remove('hide');
    };

    function  isValidAction(tile) {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    function updateBoard(index) {
        board[index] = currentPlayer;
    }

    function changePlayer() {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        }
        else {
            currentPlayer = 'X';
        }
    }

    function userAction(tile, index) {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`${currentPlayer}`);
            console.log({currentPlayer})
            console.log({tile})

            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('X');
            tile.classList.remove('O');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});