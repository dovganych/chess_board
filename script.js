var boardSize,x_initial,y_initial,STEP,allSquare; 
var dx = [2,  1, -1, -2, -2, -1, 1, 2]; 
var dy = [-1, -2, -2,  1, -1,  2, 2, 1];
var board = [] ;  
function doInitia() 
{
    STEP=1;
    boardSize=10; 
    allSquare = boardSize * boardSize;
    x_initial = y_initial = 0;
    for(var i = 0; i < boardSize; i++){ board [i] = []; }
    board[x_initial][y_initial] = STEP;
    STEP++;
    Move(x_initial,y_initial);
    drawBoard();
} 
function changeBoard() 
{
    STEP=1;
    boardSize = parseInt(document.getElementById("boardSize").value);
    x_initial = parseInt(document.getElementById("x_initial").value) - 1;
    y_initial = parseInt(document.getElementById("y_initial").value) - 1;
    allSquare = boardSize * boardSize;
    for(var i = 0; i < boardSize; i++){ board [i] = []; }
    board[x_initial][y_initial] = STEP;
    STEP++;
    Move(x_initial,y_initial);
    drawBoard();
} 
function Move(intial_x,intial_y)
{
  var nextStep_X, nextStep_Y,countWays,lastStep_X,lastStep_Y;
  var nextMove = 
  {
   minCountWays:8,
   step_X:undefined,
   step_Y:undefined,
  };
  for(var j = 0; j <= 8 ; j++)  
    {    
        nextStep_X = intial_x + dx[j];     
        nextStep_Y = intial_y + dy[j];    
        if ( 0 <= nextStep_X && nextStep_X < boardSize && 0 <= nextStep_Y && nextStep_Y < boardSize && (board[nextStep_X][nextStep_Y] == undefined))
        {   
            countWays=Find(nextStep_X,nextStep_Y);
            if( countWays != 0 && countWays <= nextMove.minCountWays )
            {
                nextMove.minCountWays = countWays;
                nextMove.step_X = nextStep_X;
                nextMove.step_Y = nextStep_Y; 
            }
            else
            {
                lastStep_X=nextStep_X;
                lastStep_Y=nextStep_Y;
            }
        }
    }  
    if ( countWays == undefined) { return; } 
    if ( nextMove.step_X == undefined) { board[lastStep_X][lastStep_Y] = STEP; return; }
    board[nextMove.step_X][nextMove.step_Y] = STEP;
    if (STEP < allSquare)
        {
            STEP++;
            Move(nextMove.step_X, nextMove.step_Y);
        }       
    else { return }
} 
function Find(x,y) 
{
    var x1, y1, countWay=0;
    if( allSquare == STEP){ return 1; }
    for(var j = 0; j <= 8 ; j++)  
    {    
        x1 = x + dx[j];     
        y1 = y + dy[j];    
        if ( 0 <= x1 && x1 < boardSize && 0 <= y1 && y1 < boardSize && (board[x1][y1] == undefined)){ countWay++; }  
    }
    return countWay;
}
function drawBoard() 
{
    var x=0,y=0;
    var canvas=document.getElementById("board");
    canvas.style.border="1px black solid";
    canvas.width=boardSize*50;
    canvas.height=boardSize*50;
    var draw= canvas.getContext('2d');
    for(var i = 0; i < boardSize; i++)
    {
        for(var j = 0; j < boardSize; j++)
        {
            if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)){draw.fillStyle="black";}
            else {draw.fillStyle="white";}
            draw.fillRect(x,y,50,50);
            draw.font = "20px";
            draw.fillStyle = "red";
            if(board[i][j] != undefined) { draw.fillText( board[i][j],x+20,y+30); }
            x+=50;     
        }
        y+=50;
        x=0;
    }
}
function change(e)
{
    document.getElementById("x_initial").max= e.target.value;
    document.getElementById("y_initial").max= e.target.value;
}
