// Add that the user can add the amount of cols and rows to the program
// let the user place where they want to start and end, for example let the point b be on a different col and a different row. Let this also apply for point a. 

// DO NOT FIX THE NO SOULTION PROBLEM that has to be there to set up the no solution method

// NOT AS IMPORTANT 
//Still have the maze draw itself and and produce a  random amount of blocks that will appear to set up a maze like situation

//The main problem with this code would be that most of the time the blocks a and b are blocked off 

var cols = 30;
var rows = 30;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w;
var h;
var path = [];
var diagonal = true;
var run = false;
var neigh = true;
var ran = false;
var ranGen = 0.35;
var noSol = false;

function Spot(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.neighbours =[];
    this.previous = undefined;
    this.wall = false;
    
    this.show = function(col){
      fill(col);
      if(this.wall){
        fill(0);
      }
      stroke(0);
      rect(this.i*w,this.j*h,w-1,h-1)
    }
    
    this.addNeighbours = function(grid){
      if(this.i < cols-1){
        this.neighbours.push(grid[this.i+1][this.j]);
      }
      if(this.i > 0){
        this.neighbours.push(grid[this.i-1][this.j]);
      }
      if(this.j < rows -1){
        this.neighbours.push(grid[this.i][this.j+1]);
      }
      if(this.j > 0){
        this.neighbours.push(grid[this.i][this.j-1]);
      }
      if(diagonal){
        if(i > 0 && j > 0 && 9+!(grid[this.i][this.j-1].wall && grid[this.i-1][this.j].wall)){
          this.neighbours.push(grid[this.i -1][this.j-1]);
        }
        if(i < cols-1 && j > 0 && !(grid[this.i+1][this.j].wall && grid[this.i][this.j-1].wall)){
          this.neighbours.push(grid[this.i +1][this.j-1]);
        }
        if(i > 0 && j < rows - 1 && !(grid[this.i - 1][this.j].wall && grid[this.i][this.j+1].wall)){
          this.neighbours.push(grid[this.i -1][this.j+1]);
        }
        if(i < cols -1 && j < rows - 1 && !(grid[this.i][this.j+1].wall && grid[this.i+1][this.j].wall)){
          this.neighbours.push(grid[this.i +1][this.j+1]);
        }
      }
    }
  }


function removeFromArray(arr, elt){
  for(var i = arr.length - 1; i >=0; i--){
    if(arr[i] == elt){
       arr.splice(i,1);
    }
  }
}

function heuristic(a,b){
  var d = 0;
  if(diagonal){
     d = dist(a.i,a.j,b.i,b.j);
  }else{
    d = abs(a.i - b.i) + abs(a.j - b.j);
  }
  return d;
}

function runP(){
  run = true;
}

function ranP(){
  ran = true;
}

function dia(){
  diagonal = !diagonal;
}

function rest(){
//   console.log("HEKLOODJS");
  w = width/cols;
  h = height/rows;
  grid = new Array(cols);
  //Makes the 2D array
  for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }
  
  openSet = [];
  closedSet = [];
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new Spot(i,j);
    }
  }
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].show(255);
    }
  }
  
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
  run = false;
  neigh = true;
  ran = false;
  noSol = false;
  loop();
  
  
}

function setup(){
  createCanvas(400, 400);
  
  w = width/cols;
  h = height/rows;
  //Makes the 2D array
  for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }
  
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new Spot(i,j);
    }
  }
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].show(255);
    }
  }
  
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
  
  console.log(grid);
  let runButton = createButton("Run");
  runButton.mousePressed(runP);
  
  let ranButton = createButton("Random");
  ranButton.mousePressed(ranP);
  
  let resetButton = createButton("Reset");
  resetButton.mousePressed(rest);
  

  checkbox = createCheckbox('Diagonal', true);
  checkbox.changed(dia);
  
}

function draw() {
  // background(255);
  if(!run){
    
    if(ran){
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          grid[i][j].wall = false;
        }
      }
      
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          if(random(1) < ranGen){
            grid[i][j].wall = true;
          }
        }
      }
      
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          grid[i][j].show(255);
        }
      }
      start.wall = false;
      end.wall = false;
      
      ran = false;
    }
    
    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
          var curGrid = grid[i][j];
          if(mouseX >= curGrid.i * w && mouseX <= (curGrid.i*w + w-1) && mouseY >= curGrid.j*h && mouseY <= (curGrid.j*h + h - 1)){
            curGrid.show(color(0,255,0));
            if(mouseIsPressed){
              curGrid.wall = true;
            }
          }else{
            curGrid.show(color(255));
          }
        }
    }
    start.show(color(0,0,255));
    end.show(color(255,0,0));
  }
  
  if(run){
    if(neigh){
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          grid[i][j].addNeighbours(grid);
        }
      }
      neigh = false;
    }
    
    if(openSet.length > 0){

    var winner = 0;
    for(var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }

    var current = openSet[winner];

    if(openSet[winner] === end){ 
      console.log("DONE!");
      noLoop();  
    }

    // openSet.remove(current);
    removeFromArray(openSet,current);
    closedSet.push(current);

    var neighbours = current.neighbours;
    for(var i = 0; i < neighbours.length; i++){
      var neighbour = neighbours[i];

      if(!closedSet.includes(neighbour) && !neighbour.wall){
        if(diagonal){
          var tempG = current.g + heuristic(neighbour,current);
        }else{
          var tempG = current.g + 1;
        }
        

        var newPath = false;

        if(openSet.includes(neighbour)){
          if(tempG < neighbour.g){
            neighbour.g = tempG;
            newPath = true;
          }
        }else{
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }

        if(newPath){
          neighbour.h = heuristic(neighbour,end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }        
      }
    }
    //Keep going
  } else {
    console.log("No Solution");
    noSol = true;
    noLoop();
    // return;
    
    //No Solution
  }


    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        grid[i][j].show(color(255));
      }
    }

    for(var i = 0; i < closedSet.length; i++){
      closedSet[i].show(color(255,0,0));
    }

    for(var i = 0; i < openSet.length; i++){
      openSet[i].show(color(0,255,0));
    }

    if(!noSol){
      //Find Path    
      path = [];
      var temp = current;
      path.push(temp)
      while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      }
    }
    
    
    end.show(color(255,0,0));

    for(var i = 0; i < path.length; i++){
      path[i].show(color(0,0,255));
    }
  }

}




