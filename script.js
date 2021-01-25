const x = 'x';
const circle = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgTextElement = document.querySelector('[data-win-msg-text]');
const winningMessage = document.getElementById('winning-message');
const restart = document.getElementById('restartButton');
let circleTurn;
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();
restart.addEventListener('click',startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell=>{
        cell.classList.remove(x);
        cell.classList.remove(circle);
        cell.removeEventListener('click',onClick);
        cell.addEventListener('click',onClick,{once:true}); 
        });
    setBoardHover();
    winningMessage.classList.remove('show');
};

function onClick(event){
    const cell = event.target;
    const currentClass = circleTurn ? circle : x;

    //place the marks
    placeMarks(cell, currentClass);
    //check for win
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
    //switch turns
        changeTurns();
        setBoardHover();//to be called after changing the turns
    }
}


function placeMarks(cell, currentClass){
    cell.classList.add(currentClass);
}

function changeTurns(){
    circleTurn = !circleTurn;
}

function setBoardHover(){
    board.classList.remove(x);
    board.classList.remove(circle);
    if(circleTurn)
        board.classList.add(circle);
    else
        board.classList.add(x);    
}

function checkWin(currentClass){
    return winning_combinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        });
    })
}

function endGame(draw){
    if(draw){
        winningMsgTextElement.innerText = 'Draw!';
        winningMessage.classList.add('show');
    }
    else{
        winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        winningMessage.classList.add('show');
    }
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(circle) || cell.classList.contains(x)
    })
}