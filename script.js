// JavaScript File// Code goes here
var n = 8;     
var sqr = n * n;  

var dx = [0,  2,  1, -1, -2, -2, -1, 1, 2]; 
var dy = [0, -1, -2, -2,  1, -1,  2, 2, 1];
var board = [] ;    


function Move(i,x,y) {
  var j, u, v, ways=[0,8,0,0],res;

  for(j = 1; j <= n ; j++)  
  	{    
	    u = x + dx[j];     
	    v = y + dy[j];    
		if ( 0 <= u && u < n && 0 <= v && v < n && (board[u][v] == 0))
		{   
			res=find(i,u,v);
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
		}
    }	
    board[ways[2]][ways[3]] = i;
    if (i < sqr)
      {
        Move (i + 1, ways[2], ways[3]);
      }       
    else 
      	{ return }
} 
function find(i,x1,y1) {
	var j, u, v, way=0;
	if(sqr== i){ way=1; return way;}
	for(j = 1; j <= n ; j++)  
  	{    
	    u = x1 + dx[j];     
	    v = y1 + dy[j];    
	    if ( 0 <= u && u < n && 0 <= v && v < n && (board[u][v] == 0))
	    {    
	 		way +=1;
	    }  
  	}
  	return way;
}

function masCreate() {
	for(var i = 0; i < n; i++)
	{
		board [i] = [];
		for(var j = 0; j < n; j++)
		{
			board [i][j] =0;
		}
	}
	board[1][1] = 1;
	masShow();
}

function masShow() {
	var node , textnode; 
	for(var i = 0; i < n; i++)
	{
		node = document.createElement("TR");
		document.getElementById("tab").appendChild(node);
		for(var j = 0; j < n; j++)
		{
			node = document.createElement("TD");
    		textnode = document.createTextNode(board [i][j]);
    		node.appendChild(textnode);
    		document.getElementById("tab").appendChild(node);
		}
	}
}
