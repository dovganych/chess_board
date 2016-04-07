var n,x,y,step; 
var sqr;  

var dx = [0,  2,  1, -1, -2, -2, -1, 1, 2]; 
var dy = [0, -1, -2, -2,  1, -1,  2, 2, 1];
var board = [] ;    


function Move(x,y) {
  var j, u, v, ways=[0,8],res,u1,v1;
  //if((sqr % 2) != 0){sqr-=1;}
  for(j = 1; j <= 8 ; j++)  
    {    
        u = x + dx[j];     
        v = y + dy[j];    
        if ( 0 <= u && u < n && 0 <= v && v < n && (board[u][v] == 0))
        {   
            res=find(u,v);
            if( res != 0)
            {
                ways[0] =res; 
                if( ways[0] <= ways[1] )
                    {
                        ways[1] = ways[0];
                        ways[2] = u;
                        ways[3] = v;
                    }
            }
            else
            {
                u1=u;
                v1=v;
            }
        }
    }	
    if( ways[2] == undefined){ board[u1][v1] = step;return }
    board[ways[2]][ways[3]] = step;
    if (step < sqr)
      {
        step++;
        Move (ways[2], ways[3]);
      }       
    else 
        { return }
} 
function find(x1,y1) {
    var j, u, v, way=0;
    if(sqr== step){ way=1; return way;}
    for(j = 1; j <= 8 ; j++)  
    {    
        u = x1 + dx[j];     
        v = y1 + dy[j];    
        if ( 0 <= u && u < n && 0 <= v && v < n && (board[u][v] == 0))
        {    
            way++;
        }  
    }
    return way;
}

function masCreate() {
    step=1;
    n=prompt('Enter size:',5); 
    sqr = n * n;
    var num1 =  prompt("Enter a Value","0");
    var num2 = prompt("Enter a Value", "0");
    x = parseInt(num1);
    y = parseInt(num2);
    for(var i = 0; i < n; i++)
    {
        board [i] = [];
        for(var j = 0; j < n; j++)
        {
            board [i][j] =0;
        }
    }
    board[x][y] = step;
    step++;
    masShow();
}

function masShow() {
    $( ".white" ).remove();
    $( ".break" ).remove();
    $( ".black" ).remove();
    var div;
    for(var i = 0; i < n; i++)
    {
        div = document.createElement("div");
        div.className += "break";
        document.body.appendChild(div);
        for(var j = 0; j < n; j++)
        {

            div = document.createElement("div");
            if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {div.className = "black";}
            else {div.className = "white";}
            div.innerHTML=board[i][j];
            document.body.appendChild(div);
        }

    }
}
function Run() {
    Move(x,y);
    masShow();
}